// MP3 di una lezione (schede, domande dell'interrogazione, risposte modello, frasi fisse) con Edge TTS.
// Così l'ascolto funziona anche online e sul telefono, senza il server di casa.
//   node scripts/lezione-audio.mjs arte-mesopotamia-egitto
// Pezzi in lingua straniera (<span lang="es">) con voce madrelingua; schede miste a due voci.
// Rifà solo i file che mancano o il cui testo è cambiato (manifest.json accanto agli MP3).

import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'

const id = process.argv[2]
if (!id) throw new Error('Uso: node scripts/lezione-audio.mjs <id-lezione>')
const cartella = path.join('public', 'lezioni', id)
const contesto = { window: {} }
vm.runInNewContext(readFileSync(path.join(cartella, 'dati.js'), 'utf8'), contesto)
const L = contesto.window.LEZIONE

const VOCE_SCHEDA = { voce: 'it-IT-IsabellaNeural', rate: '-5%' }
const VOCE_PROF = { voce: 'it-IT-DiegoNeural', rate: '+0%' }

/** Dall'html della scheda al testo da dire: niente tag, sigle lette per intero. */
export function perLaVoce(html) {
  return html
    .replace(/<svg[\s\S]*?<\/svg>/g, '')
    .replace(/<li>/g, ' ').replace(/<\/(p|li|ol|ul)>/g, '. ')
    .replace(/<[^>]+>/g, '')
    .replace(/→/g, ', ')
    .replace(/\ba\.C\./g, 'avanti Cristo')
    .replace(/\bab\/km²/g, 'abitanti per chilometro quadrato')
    .replace(/\bkm²/g, 'chilometri quadrati')
    .replace(/\bkm\b/g, 'chilometri')
    .replace(/ = /g, ' uguale ')
    .replace(/ : /g, ' diviso ')
    // niente emoji: ⚠️ veniva letto "simbolo di avviso"
    .replace(/\p{Extended_Pictographic}️?\s*/gu, '')
    .replace(/\s*\.\s*\./g, '.')
    .replace(/\s+/g, ' ')
    .trim()
}


/* ── Lingue straniere ──
 * Nelle schede e negli esercizi i pezzi in un'altra lingua sono marcati <span lang="es">…</span>.
 * Ognuno diventa audio/<lingua>-<firma>.mp3 con una voce madrelingua: la pagina lo suona quando
 * lo si tocca (stessa firmaTesto di index.html). Una scheda con pezzi stranieri si legge a due voci:
 * italiano con Isabella, il resto con la voce della lingua, pezzi uniti con ffmpeg. */
const VOCI_LINGUA = {
  es: { voce: 'es-ES-ElviraNeural', rate: '-10%' },
}

/** Stessa funzione di index.html: FNV-1a sul testo normalizzato. */
export function firmaTesto(t) {
  t = t.replace(/\s+/g, ' ').trim()
  let h = 0x811c9dc5
  for (const ch of t) { h ^= ch.codePointAt(0); h = Math.imul(h, 0x01000193) >>> 0 }
  return h.toString(16).padStart(8, '0')
}
const soloTesto = (h) => h.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
const RE_LINGUA = /<span lang="([a-z]{2})">([\s\S]*?)<\/span>/g

/** I pezzi da dire di un html: [{ lingua, testo }]. Le tabelle si leggono cella per cella. */
function pezzi(html) {
  const out = []
  const italiano = (h) => {
    const t = perLaVoce(h.replace(/<\/td>/g, ', ').replace(/<\/tr>/g, '. '))
      .replace(/^[\s,.;:·]+/, '').replace(/[\s,;:·]+$/, '')
    if (/[a-zà-ù0-9]/i.test(t)) out.push({ lingua: 'it', testo: t })
  }
  let da = 0
  for (const m of html.matchAll(RE_LINGUA)) {
    italiano(html.slice(da, m.index))
    out.push({ lingua: m[1], testo: soloTesto(m[2]) })
    da = m.index + m[0].length
  }
  italiano(html.slice(da))
  return out
}

const dove = path.join(cartella, 'audio')
mkdirSync(dove, { recursive: true })
// i pezzi italiani delle schede a due voci: cache fuori da git e fuori dal sito
const cache = path.join('dati', 'cache-audio', id)
mkdirSync(cache, { recursive: true })
const fileManifest = path.join(dove, 'manifest.json')
const manifest = existsSync(fileManifest) ? JSON.parse(readFileSync(fileManifest, 'utf8')) : {}
const salvaManifest = () => writeFileSync(fileManifest, JSON.stringify(manifest, null, 1))

let fatti = 0
const pausa = (ms) => spawnSync(process.execPath, ['-e', `setTimeout(()=>{},${ms})`])

/** Un MP3 con edge-tts; Microsoft rallenta (e chiude la connessione a) chi chiede troppo in fretta:
 * dopo una cinquantina di pezzi di fila serve una pausa lunga, quindi le attese crescono. */
function tts(out, { voce, rate, testo }) {
  const TENTATIVI = 6
  for (let tentativo = 1; tentativo <= TENTATIVI; tentativo++) {
    // python -m edge_tts e non edge-tts.exe: dal 15/11 Windows (controllo delle applicazioni) blocca l'eseguibile
    const r = spawnSync('python', ['-m', 'edge_tts', '--voice', voce, `--rate=${rate}`, '--text', testo, '--write-media', out], { encoding: 'utf8', timeout: 120_000 })
    if (r.status === 0) break
    const motivo = r.error ? r.error.message : String(r.stderr).trim().split('\n').pop()
    console.error(`  ${path.basename(out)}: tentativo ${tentativo} fallito ${motivo.slice(0, 160)}`)
    if (r.error && r.error.code === 'ENOENT') throw new Error('python non trovato: serve per edge_tts')
    if (tentativo === TENTATIVI) throw new Error(`edge-tts non riesce a fare ${out}`)
    pausa(15000 * tentativo)
  }
  fatti++
  console.log(`ok ${path.basename(out)} (${testo.length} caratteri)`)
  pausa(1500)
}

/** Un file del sito: si rifà solo se manca o se è cambiato (manifest). */
function fileSito(file, firma, fai) {
  const out = path.join(dove, file)
  if (manifest[file] === firma && existsSync(out)) return
  fai(out)
  manifest[file] = firma
  salvaManifest()
}

const voceDi = (lingua) => {
  const v = VOCI_LINGUA[lingua]
  if (!v) throw new Error(`Manca la voce per la lingua "${lingua}" in VOCI_LINGUA`)
  return v
}

// 1. pronuncia: ogni pezzo straniero di schede ed esercizi
const stranieri = new Map()
const htmlConLingue = [
  ...L.schede.map((s) => s.html),
  ...(L.esercizi || []).flatMap((e) => [e.testo, e.metodo, e.soluzione]),
]
for (const h of htmlConLingue) for (const m of h.matchAll(RE_LINGUA)) {
  const testo = soloTesto(m[2])
  if (testo) stranieri.set(`${m[1]}-${firmaTesto(testo)}.mp3`, { lingua: m[1], testo })
}
for (const [file, { lingua, testo }] of stranieri) {
  const v = voceDi(lingua)
  fileSito(file, `${v.voce}|${v.rate}|${testo}`, (out) => tts(out, { ...v, testo }))
}

// 2. schede: una voce sola, oppure a due voci se hanno pezzi stranieri
for (const s of L.schede) {
  const file = `${s.id}.mp3`
  if (!RE_LINGUA.test(s.html)) {
    RE_LINGUA.lastIndex = 0
    const l = { testo: `${s.titolo}. ${perLaVoce(s.html)}`, ...VOCE_SCHEDA }
    fileSito(file, `${l.voce}|${l.rate}|${l.testo}`, (out) => tts(out, l))
    continue
  }
  RE_LINGUA.lastIndex = 0
  const lista = [{ lingua: 'it', testo: `${s.titolo}.` }, ...pezzi(s.html)]
  const firma = lista.map((p) => `${p.lingua}:${p.testo}`).join('|') + `|${VOCE_SCHEDA.voce}|${VOCE_SCHEDA.rate}|` + JSON.stringify(VOCI_LINGUA)
  fileSito(file, firma, (out) => {
    const fileDeiPezzi = lista.map((p) => {
      if (p.lingua !== 'it') return path.join(dove, `${p.lingua}-${firmaTesto(p.testo)}.mp3`)
      const f = path.join(cache, `it-${firmaTesto(VOCE_SCHEDA.voce + VOCE_SCHEDA.rate + p.testo)}.mp3`)
      if (!existsSync(f)) tts(f, { ...VOCE_SCHEDA, testo: p.testo })
      return f
    })
    const elenco = path.join(cache, `${s.id}.txt`)
    writeFileSync(elenco, fileDeiPezzi.map((f) => `file '${path.resolve(f).replace(/\\/g, '/')}'`).join('\n'))
    const r = spawnSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', elenco,
      '-ar', '24000', '-ac', '1', '-c:a', 'libmp3lame', '-b:a', '64k', out], { encoding: 'utf8' })
    if (r.status !== 0) throw new Error(`ffmpeg non riesce a unire ${file}: ${r.stderr}`)
    console.log(`ok ${file} a due voci (${lista.length} pezzi)`)
  })
}

// 3. interrogazione (se la lezione ce l'ha)
if (L.interrogazione?.length) {
  const lavori = [
    ...L.interrogazione.map((q, i) => ({ file: `d${i}.mp3`, testo: perLaVoce(q.d), ...VOCE_PROF })),
    ...L.interrogazione.map((q, i) => ({ file: `r${i}.mp3`, testo: perLaVoce(q.risposta), ...VOCE_SCHEDA })),
    { file: 'inizio.mp3', testo: L.materia
      ? `Bene, cominciamo l'interrogazione di ${L.materia.toLowerCase()}. ${L.titolo}. Prima domanda.`
      : 'Bene, cominciamo l\'interrogazione di arte. Mesopotamia ed Egitto. Prima domanda.', ...VOCE_PROF },
    { file: 'bravo.mp3', testo: 'Bravo, risposta giusta. Andiamo avanti.', ...VOCE_PROF },
    { file: 'ripassa.mp3', testo: 'Non ci siamo ancora. Ripassa questa parte, poi te la richiedo.', ...VOCE_PROF },
    { file: 'fine.mp3', testo: 'L\'interrogazione è finita. Ottimo lavoro!', ...VOCE_PROF },
  ]
  for (const l of lavori) fileSito(l.file, `${l.voce}|${l.rate}|${l.testo}`, (out) => tts(out, l))
}

console.log(`Fatto: ${fatti} file nuovi con edge-tts.`)
