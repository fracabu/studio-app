// POST /api/logout → cancella il cookie di sessione
import { cookieUscita, json } from './_lib.js'

export async function POST() {
  return json({ ok: true }, 200, { 'Set-Cookie': cookieUscita() })
}
