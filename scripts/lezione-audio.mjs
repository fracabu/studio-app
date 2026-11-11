// MP3 di una lezione (schede, domande dell'interrogazione, risposte modello, frasi fisse) con Edge TTS.
// Così l'ascolto funziona anche online e sul telefono, senza il server di casa.
//   node scripts/lezione-audio.mjs arte-mesopotamia-egitto
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
    .replace(/📖\s*/g, '')
    .replace(/\s*\.\s*\./g, '.')
    .replace(/\s+/g, ' ')
    .trim()
}

const lavori = [
  ...L.schede.map((s) => ({ file: `${s.id}.mp3`, testo: `${s.titolo}. ${perLaVoce(s.html)}`, ...VOCE_SCHEDA })),
  ...L.interrogazione.map((q, i) => ({ file: `d${i}.mp3`, testo: perLaVoce(q.d), ...VOCE_PROF })),
  ...L.interrogazione.map((q, i) => ({ file: `r${i}.mp3`, testo: perLaVoce(q.risposta), ...VOCE_SCHEDA })),
  { file: 'inizio.mp3', testo: L.materia
    ? `Bene, cominciamo l'interrogazione di ${L.materia.toLowerCase()}. ${L.titolo}. Prima domanda.`
    : 'Bene, cominciamo l\'interrogazione di arte. Mesopotamia ed Egitto. Prima domanda.', ...VOCE_PROF },
  { file: 'bravo.mp3', testo: 'Bravo, risposta giusta. Andiamo avanti.', ...VOCE_PROF },
  { file: 'ripassa.mp3', testo: 'Non ci siamo ancora. Ripassa questa parte, poi te la richiedo.', ...VOCE_PROF },
  { file: 'fine.mp3', testo: 'L\'interrogazione è finita. Ottimo lavoro!', ...VOCE_PROF },
]

const dove = path.join(cartella, 'audio')
mkdirSync(dove, { recursive: true })
const fileManifest = path.join(dove, 'manifest.json')
const manifest = existsSync(fileManifest) ? JSON.parse(readFileSync(fileManifest, 'utf8')) : {}

let fatti = 0
for (const l of lavori) {
  const firma = `${l.voce}|${l.rate}|${l.testo}`
  const out = path.join(dove, l.file)
  if (manifest[l.file] === firma && existsSync(out)) continue
  for (let tentativo = 1; tentativo <= 3; tentativo++) {
    const r = spawnSync('edge-tts', ['--voice', l.voce, `--rate=${l.rate}`, '--text', l.testo, '--write-media', out], { encoding: 'utf8', timeout: 120_000 })
    if (r.status === 0) break
    console.error(`  ${l.file}: tentativo ${tentativo} fallito ${String(r.stderr).slice(0, 200)}`)
    if (tentativo === 3) throw new Error(`edge-tts non riesce a fare ${l.file}`)
    spawnSync(process.execPath, ['-e', 'setTimeout(()=>{},8000)'])
  }
  manifest[l.file] = firma
  writeFileSync(fileManifest, JSON.stringify(manifest, null, 1))
  fatti++
  console.log(`ok ${l.file} (${l.testo.length} caratteri)`)
  // Microsoft rallenta chi chiede troppo in fretta
  spawnSync(process.execPath, ['-e', 'setTimeout(()=>{},1500)'])
}
console.log(`Fatto: ${fatti} nuovi, ${lavori.length} in tutto.`)
