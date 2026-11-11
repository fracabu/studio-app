// Aggiunge al database le colonne del profilo (nome da mostrare e foto). Si può rilanciare: non rompe niente.
//   node --env-file=.env.local scripts/migra-utenti.mjs
import { neon } from '@neondatabase/serverless'

if (!process.env.DATABASE_URL) { console.error('Manca DATABASE_URL (vercel env pull .env.local)'); process.exit(1) }
const db = neon(process.env.DATABASE_URL)
await db`ALTER TABLE utenti ADD COLUMN IF NOT EXISTS nome_visibile text`
await db`ALTER TABLE utenti ADD COLUMN IF NOT EXISTS immagine text`
const colonne = await db`SELECT column_name FROM information_schema.columns WHERE table_name = 'utenti' ORDER BY ordinal_position`
console.log('utenti:', colonne.map((c) => c.column_name).join(', '))
