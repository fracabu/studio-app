// PUT /api/profilo  {nomeVisibile?, immagine?} → profilo aggiornato
// nomeVisibile: il nome che si vede nell'app (il nome per entrare non cambia).
// immagine: data URL di una foto già rimpicciolita nel browser (~256 px), oppure null per toglierla.
import { json, profiloDi, sql, utenteDa } from './_lib.js'

const MAX_IMMAGINE = 300_000 // caratteri del data URL (~220 KB): una foto 256×256 ne occupa 20–40 mila

export async function PUT(req: Request) {
  const id = utenteDa(req)
  if (id == null) return json({ errore: 'Non collegato' }, 401)
  const testo = await req.text()
  if (testo.length > MAX_IMMAGINE + 2000) return json({ errore: 'La foto è troppo grande' }, 413)
  let corpo: { nomeVisibile?: unknown; immagine?: unknown }
  try { corpo = JSON.parse(testo) } catch { return json({ errore: 'Richiesta non valida' }, 400) }

  const db = sql()
  if (corpo.nomeVisibile !== undefined) {
    if (typeof corpo.nomeVisibile !== 'string') return json({ errore: 'Nome non valido' }, 400)
    const nome = corpo.nomeVisibile.replace(/\s+/g, ' ').trim().slice(0, 30)
    if (!nome) return json({ errore: 'Il nome non può essere vuoto' }, 400)
    await db`UPDATE utenti SET nome_visibile = ${nome} WHERE id = ${id}`
  }
  if (corpo.immagine !== undefined) {
    const img = corpo.immagine
    if (img !== null && (typeof img !== 'string' || !/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(img))) {
      return json({ errore: 'Immagine non valida' }, 400)
    }
    if (typeof img === 'string' && img.length > MAX_IMMAGINE) return json({ errore: 'La foto è troppo grande' }, 413)
    await db`UPDATE utenti SET immagine = ${img} WHERE id = ${id}`
  }
  return json(await profiloDi(id))
}
