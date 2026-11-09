// POST /api/login  {nome, password} → cookie di sessione
import { cookieSessione, json, passwordGiusta, sql } from './_lib.js'

export async function POST(req: Request) {
  let corpo: { nome?: unknown; password?: unknown }
  try { corpo = await req.json() } catch { return json({ errore: 'Richiesta non valida' }, 400) }
  const nome = typeof corpo.nome === 'string' ? corpo.nome.trim().toLowerCase().slice(0, 40) : ''
  const password = typeof corpo.password === 'string' ? corpo.password.slice(0, 200) : ''
  if (!nome || !password) return json({ errore: 'Scrivi nome e password' }, 400)

  const righe = (await sql()`SELECT id, nome, hash FROM utenti WHERE nome = ${nome}`) as { id: number; nome: string; hash: string }[]
  const utente = righe[0]
  const giusta = utente ? await passwordGiusta(password, utente.hash) : false
  if (!utente || !giusta) {
    await new Promise((r) => setTimeout(r, 600)) // rallenta chi prova a indovinare
    return json({ errore: 'Nome o password sbagliati' }, 401)
  }
  return json({ nome: utente.nome }, 200, { 'Set-Cookie': cookieSessione(utente.id, req) })
}
