// Diario della classe: crea la tabella `compiti` e ci porta i compiti che ogni utente aveva nei
// suoi progressi (`studio-app:compiti`). La spunta resta di ognuno: diventa `studio-app:fatti`
// (elenco di id) nei suoi progressi. La vecchia chiave la toglie poi l'app da ogni browser.
// Si può rilanciare: un compito già portato non si riscrive, le spunte si uniscono.
//   node --env-file=.env.local scripts/migra-diario.mjs          (scrive)
//   node --env-file=.env.local scripts/migra-diario.mjs --prova  (mostra soltanto)
import { neon } from '@neondatabase/serverless'

if (!process.env.DATABASE_URL) { console.error('Manca DATABASE_URL (vercel env pull .env.local)'); process.exit(1) }
const prova = process.argv.includes('--prova')
const db = neon(process.env.DATABASE_URL)

if (!prova) await db`CREATE TABLE IF NOT EXISTS compiti (
  id text PRIMARY KEY,
  dati jsonb NOT NULL,
  autore int REFERENCES utenti(id) ON DELETE SET NULL,
  creato timestamptz NOT NULL DEFAULT now(),
  aggiornato timestamptz NOT NULL DEFAULT now(),
  tolto boolean NOT NULL DEFAULT false
)`

const righe = await db`SELECT p.utente_id, u.nome, p.dati FROM progressi p JOIN utenti u ON u.id = p.utente_id ORDER BY p.utente_id`
const CAMPI = ['id', 'materia', 'testo', 'perIl', 'creato', 'audioId', 'fonteId']
let portati = 0
for (const r of righe) {
  let lista = []
  try { lista = JSON.parse(r.dati['studio-app:compiti'] ?? '[]') } catch {}
  if (!lista.length) { console.log(`${r.nome}: nessun compito`); continue }
  const fatti = lista.filter((c) => c.fatto).map((c) => c.id)
  let giaFatti = []
  try { giaFatti = JSON.parse(r.dati['studio-app:fatti'] ?? '[]') } catch {}
  const tuttiFatti = [...new Set([...giaFatti, ...fatti])]
  console.log(`${r.nome}: ${lista.length} compiti, ${fatti.length} fatti`)
  if (prova) continue
  for (const c of lista) {
    const dati = Object.fromEntries(CAMPI.filter((k) => c[k] !== undefined).map((k) => [k, c[k]]))
    const ok = await db`INSERT INTO compiti (id, dati, autore) VALUES (${c.id}, ${JSON.stringify(dati)}::jsonb, ${r.utente_id})
      ON CONFLICT (id) DO NOTHING RETURNING id`
    portati += ok.length
  }
  await db`UPDATE progressi SET dati = dati || ${JSON.stringify({ 'studio-app:fatti': JSON.stringify(tuttiFatti) })}::jsonb, aggiornato = now()
    WHERE utente_id = ${r.utente_id}`
}
if (!prova) {
  const [{ n }] = await db`SELECT count(*)::int AS n FROM compiti WHERE NOT tolto`
  console.log(`Portati ora: ${portati}. Sul diario della classe: ${n} compiti.`)
}
