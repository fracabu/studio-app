// GET /api/io → {nome} dell'utente collegato, 401 se non c'è sessione
import { json, sql, utenteDa } from './_lib.js'

export async function GET(req: Request) {
  const id = utenteDa(req)
  if (id == null) return json({ errore: 'Non collegato' }, 401)
  const righe = (await sql()`SELECT nome FROM utenti WHERE id = ${id}`) as { nome: string }[]
  if (!righe[0]) return json({ errore: 'Non collegato' }, 401)
  return json({ nome: righe[0].nome })
}
