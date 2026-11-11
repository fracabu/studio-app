// POST /api/password  {vecchia, nuova} → cambia la password dell'utente collegato.
// Serve la password di prima: così chi trova l'app aperta non può cambiarla.
import { hashPassword, json, passwordGiusta, sql, utenteDa } from './_lib.js'

export async function POST(req: Request) {
  const id = utenteDa(req)
  if (id == null) return json({ errore: 'Non collegato' }, 401)
  let corpo: { vecchia?: unknown; nuova?: unknown }
  try { corpo = await req.json() } catch { return json({ errore: 'Richiesta non valida' }, 400) }
  const vecchia = typeof corpo.vecchia === 'string' ? corpo.vecchia.slice(0, 200) : ''
  const nuova = typeof corpo.nuova === 'string' ? corpo.nuova : ''
  if (nuova.length < 6) return json({ errore: 'La nuova password deve avere almeno 6 caratteri' }, 400)
  if (nuova.length > 200) return json({ errore: 'La nuova password è troppo lunga' }, 400)

  const db = sql()
  const righe = (await db`SELECT hash FROM utenti WHERE id = ${id}`) as { hash: string }[]
  if (!righe[0] || !(await passwordGiusta(vecchia, righe[0].hash))) {
    await new Promise((r) => setTimeout(r, 600))
    return json({ errore: 'La password di adesso non è giusta' }, 403)
  }
  await db`UPDATE utenti SET hash = ${await hashPassword(nuova)} WHERE id = ${id}`
  return json({ ok: true })
}
