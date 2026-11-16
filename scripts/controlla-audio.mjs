// Controlla che ogni MP3 che la pagina di una lezione chiederà esista e non sia vuoto.
//   node scripts/controlla-audio.mjs <id-lezione>
import { readFileSync, existsSync, statSync } from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'

const id = process.argv[2]
const dir = path.join('public', 'lezioni', id)
const ctx = { window: {} }
vm.runInNewContext(readFileSync(path.join(dir, 'dati.js'), 'utf8'), ctx)
const L = ctx.window.LEZIONE

function firmaTesto(t) {
  t = t.replace(/\s+/g, ' ').trim()
  let h = 0x811c9dc5
  for (const ch of t) { h ^= ch.codePointAt(0); h = Math.imul(h, 0x01000193) >>> 0 }
  return h.toString(16).padStart(8, '0')
}
const soloTesto = (h) => h.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
const RE = /<span lang="([a-z]{2})">([\s\S]*?)<\/span>/g

const attesi = new Set(L.schede.map((s) => `${s.id}.mp3`))
for (const h of [...L.schede.map((s) => s.html), ...(L.esercizi || []).flatMap((e) => [e.testo, e.metodo, e.soluzione])])
  for (const m of h.matchAll(RE)) { const t = soloTesto(m[2]); if (t) attesi.add(`${m[1]}-${firmaTesto(t)}.mp3`) }
if (L.interrogazione?.length) {
  L.interrogazione.forEach((_, i) => { attesi.add(`d${i}.mp3`); attesi.add(`r${i}.mp3`) })
  for (const f of ['inizio.mp3', 'bravo.mp3', 'ripassa.mp3', 'fine.mp3']) attesi.add(f)
}
const mancano = [...attesi].filter((f) => { const p = path.join(dir, 'audio', f); return !existsSync(p) || statSync(p).size < 1000 })
console.log(`${id}: ${attesi.size} file attesi, ${mancano.length} mancanti o vuoti`)
if (mancano.length) console.log('  ', mancano.slice(0, 20).join(' '))
process.exitCode = mancano.length ? 1 : 0
