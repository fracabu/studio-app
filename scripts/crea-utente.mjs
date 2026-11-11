// Crea un utente (o gli cambia la password) e prepara le tabelle se mancano.
//   node --env-file=.env.local scripts/crea-utente.mjs <nome> <password>
// La password non viene salvata né stampata: nel database finisce solo l'hash scrypt.
import { neon } from '@neondatabase/serverless'
import { randomBytes, scrypt as scryptCb } from 'node:crypto'
import { promisify } from 'node:util'

const scrypt = promisify(scryptCb)
const [nomeArg, password] = process.argv.slice(2)
const nome = (nomeArg ?? '').trim().toLowerCase()
if (!nome || !password) { console.error('uso: node --env-file=.env.local scripts/crea-utente.mjs <nome> <password>'); process.exit(2) }
if (!process.env.DATABASE_URL) { console.error('Manca DATABASE_URL (vercel env pull .env.local)'); process.exit(1) }

const db = neon(process.env.DATABASE_URL)
await db`CREATE TABLE IF NOT EXISTS utenti (
  id serial PRIMARY KEY, nome text UNIQUE NOT NULL, hash text NOT NULL, creato timestamptz NOT NULL DEFAULT now())`
await db`CREATE TABLE IF NOT EXISTS progressi (
  utente_id int PRIMARY KEY REFERENCES utenti(id) ON DELETE CASCADE,
  dati jsonb NOT NULL DEFAULT '{}'::jsonb, aggiornato timestamptz NOT NULL DEFAULT now())`
await db`ALTER TABLE utenti ADD COLUMN IF NOT EXISTS nome_visibile text`
await db`ALTER TABLE utenti ADD COLUMN IF NOT EXISTS immagine text`

const salt = randomBytes(16)
const h = await scrypt(password, salt, 32)
const hash = `scrypt$${salt.toString('base64')}$${h.toString('base64')}`
const [r] = await db`INSERT INTO utenti (nome, hash) VALUES (${nome}, ${hash})
  ON CONFLICT (nome) DO UPDATE SET hash = EXCLUDED.hash RETURNING id, (xmax = 0) AS nuovo`
console.log(r.nuovo ? `Creato l'utente "${nome}" (id ${r.id})` : `Password aggiornata per "${nome}" (id ${r.id})`)
