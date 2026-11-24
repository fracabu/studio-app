// Elenca i compiti del diario della classe per un giorno di consegna (o per una materia).
//   node --env-file=.env.local scripts/compiti-del-giorno.mjs 2026-11-25 [materia]
import { neon } from '@neondatabase/serverless'

const [giorno, materia] = process.argv.slice(2)
if (!giorno) {
  console.error('Uso: node --env-file=.env.local scripts/compiti-del-giorno.mjs AAAA-MM-GG [materia]')
  process.exit(1)
}
const sql = neon(process.env.DATABASE_URL)
const righe = await sql`SELECT dati FROM compiti WHERE NOT tolto ORDER BY dati->>'perIl', dati->>'creato'`
for (const { dati: c } of righe) {
  if (materia ? c.materia !== materia : c.perIl !== giorno) continue
  console.log(`${c.perIl}  ${c.materia ?? '-'}  ${c.testo}  (id ${c.id.slice(0, 8)}, creato ${c.creato ?? '?'})`)
}
