// Copia di sicurezza dei progressi di tutti gli utenti in dati/backup/ (fuori da git).
//   node --env-file=.env.local scripts/backup-progressi.mjs
import { neon } from '@neondatabase/serverless'
import { mkdirSync, writeFileSync } from 'node:fs'

const db = neon(process.env.DATABASE_URL)
const righe = await db`SELECT u.nome, p.dati, p.aggiornato FROM progressi p JOIN utenti u ON u.id = p.utente_id`
mkdirSync('dati/backup', { recursive: true })
const file = `dati/backup/progressi-${new Date().toISOString().replace(/[:.]/g, '-')}.json`
writeFileSync(file, JSON.stringify(righe, null, 2))
for (const r of righe) {
  const compiti = JSON.parse(r.dati['studio-app:compiti'] ?? '[]').length
  console.log(`${r.nome}: ${Object.keys(r.dati).length} chiavi, ${compiti} compiti, aggiornato ${new Date(r.aggiornato).toISOString()}`)
}
console.log('Salvato in', file)
