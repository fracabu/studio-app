// Genera gli effetti sonori di Sbrigo con ElevenLabs (una volta sola: i file restano in public/).
//   node scripts/sbrigo-suoni.mjs --env ../zerohedge-app/.env.local [--solo rutto]
// La chiave si legge da ELEVENLABS_API_KEY o dal file .env indicato: non viene copiata né stampata.
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const args = process.argv.slice(2)
const opt = (k) => { const i = args.indexOf('--' + k); return i >= 0 ? args[i + 1] : undefined }

let chiave = process.env.ELEVENLABS_API_KEY
if (!chiave && opt('env')) {
  const riga = readFileSync(opt('env'), 'utf8').split(/\r?\n/).find((r) => r.startsWith('ELEVENLABS_API_KEY='))
  chiave = riga?.slice('ELEVENLABS_API_KEY='.length).trim().replace(/^["']|["']$/g, '')
}
if (!chiave) { console.error('Manca ELEVENLABS_API_KEY'); process.exit(1) }

const SUONI = [
  ['rutto-1', 1.2, 'Short loud comedic cartoon burp from a small goofy creature, dry studio sound, no music, no voice words'],
  ['rutto-2', 1.8, 'Long rumbling cartoon belch that ends with a satisfied little sigh, comedic, kid friendly, no music'],
  ['rutto-3', 0.8, 'Tiny squeaky cartoon hiccup burp, funny, dry, no music'],
  ['scoreggia-1', 1.0, 'Short squeaky cartoon fart sound effect, comedic, kid friendly, dry, no music'],
  ['scoreggia-2', 1.8, 'Long wobbly cartoon fart like a deflating balloon, comedic, kid friendly, no music'],
  ['scoreggia-3', 0.7, 'Quick little cartoon toot fart, funny pop, dry, no music'],
  ['botta-1', 0.8, 'Cartoon bonk sound of a head hitting a wall, comedic boing, short, dry, no music'],
  ['botta-2', 1.0, 'Cartoon slapstick crash into a wall with a springy boing and tiny tweeting birds, short, no music'],
]

const solo = opt('solo')
const dir = join(import.meta.dirname, '..', 'public', 'sbrigo', 'suoni')
mkdirSync(dir, { recursive: true })

for (const [nome, durata, testo] of SUONI) {
  if (solo && !nome.startsWith(solo)) continue
  const file = join(dir, `${nome}.mp3`)
  if (existsSync(file) && !args.includes('--rifai')) { console.log('c\'è già', nome); continue }
  const r = await fetch('https://api.elevenlabs.io/v1/sound-generation', {
    method: 'POST',
    headers: { 'xi-api-key': chiave, 'Content-Type': 'application/json', Accept: 'audio/mpeg' },
    body: JSON.stringify({ text: testo, duration_seconds: durata, prompt_influence: 0.5 }),
  })
  if (!r.ok) { console.error('ERRORE', nome, r.status, (await r.text()).slice(0, 300)); process.exitCode = 1; continue }
  writeFileSync(file, Buffer.from(await r.arrayBuffer()))
  console.log('ok', nome)
}
