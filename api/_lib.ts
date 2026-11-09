// Pezzi comuni alle funzioni di api/ (il trattino basso dice a Vercel che questo non è un indirizzo).
// Utenti e progressi stanno su Neon (Postgres, Francoforte): DATABASE_URL arriva dall'integrazione
// di Vercel. Le password sono salvate solo come hash scrypt; la sessione è un cookie firmato
// con SESSION_SECRET, che il JavaScript della pagina non può leggere.

import { neon } from '@neondatabase/serverless'
import { createHmac, randomBytes, scrypt as scryptCb, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'

const scrypt = promisify(scryptCb) as (pw: string, salt: Buffer, len: number) => Promise<Buffer>

export const sql = () => {
  const url = process.env.DATABASE_URL
  if (!url) throw new Error('Manca DATABASE_URL')
  return neon(url)
}

/** Crea le tabelle se mancano: si chiama dallo script degli utenti, non a ogni richiesta. */
export async function preparaTabelle() {
  const db = sql()
  await db`CREATE TABLE IF NOT EXISTS utenti (
    id serial PRIMARY KEY,
    nome text UNIQUE NOT NULL,
    hash text NOT NULL,
    creato timestamptz NOT NULL DEFAULT now()
  )`
  await db`CREATE TABLE IF NOT EXISTS progressi (
    utente_id int PRIMARY KEY REFERENCES utenti(id) ON DELETE CASCADE,
    dati jsonb NOT NULL DEFAULT '{}'::jsonb,
    aggiornato timestamptz NOT NULL DEFAULT now()
  )`
}

// ── Password ──────────────────────────────────────────────
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16)
  const h = await scrypt(password, salt, 32)
  return `scrypt$${salt.toString('base64')}$${h.toString('base64')}`
}

export async function passwordGiusta(password: string, salvato: string): Promise<boolean> {
  const [tipo, s, h] = salvato.split('$')
  if (tipo !== 'scrypt' || !s || !h) return false
  const atteso = Buffer.from(h, 'base64')
  const calcolato = await scrypt(password, Buffer.from(s, 'base64'), atteso.length)
  return timingSafeEqual(atteso, calcolato)
}

// ── Sessione ──────────────────────────────────────────────
const COOKIE = 'studio_sessione'
const DURATA = 60 * 24 * 3600 // 60 giorni, in secondi

function segreto(): string {
  const s = process.env.SESSION_SECRET
  if (!s || s.length < 32) throw new Error('Manca SESSION_SECRET')
  return s
}
const firma = (testo: string) => createHmac('sha256', segreto()).update(testo).digest('base64url')

export function cookieSessione(utenteId: number, req: Request): string {
  const scade = Math.floor(Date.now() / 1000) + DURATA
  const valore = `${utenteId}.${scade}`
  const sicuro = new URL(req.url).protocol === 'https:' ? '; Secure' : ''
  return `${COOKIE}=${valore}.${firma(valore)}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${DURATA}${sicuro}`
}

export const cookieUscita = () => `${COOKIE}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`

/** L'id dell'utente collegato, o null. */
export function utenteDa(req: Request): number | null {
  const riga = req.headers.get('cookie') ?? ''
  const m = riga.match(new RegExp(`(?:^|;\\s*)${COOKIE}=([^;]+)`))
  if (!m) return null
  const [id, scade, f] = m[1].split('.')
  if (!id || !scade || !f) return null
  const atteso = Buffer.from(firma(`${id}.${scade}`))
  const arrivato = Buffer.from(f)
  if (atteso.length !== arrivato.length || !timingSafeEqual(atteso, arrivato)) return null
  if (Number(scade) < Date.now() / 1000) return null
  return Number(id)
}

export const json = (dati: unknown, status = 200, extra: Record<string, string> = {}) =>
  new Response(JSON.stringify(dati), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...extra },
  })
