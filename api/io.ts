// GET /api/io → profilo dell'utente collegato {id, nome, nomeVisibile, immagine}, 401 se non c'è sessione
import { json, profiloDi, utenteDa } from './_lib.js'

export async function GET(req: Request) {
  const id = utenteDa(req)
  if (id == null) return json({ errore: 'Non collegato' }, 401)
  const profilo = await profiloDi(id)
  if (!profilo) return json({ errore: 'Non collegato' }, 401)
  return json(profilo)
}
