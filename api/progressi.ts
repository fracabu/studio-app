// I progressi dell'utente: tutte le chiavi "studio-app:*" del browser (compiti, stelle,
// personaggi, palette, zaino…), salvate come un unico oggetto JSON.
//   GET /api/progressi → {dati, aggiornato}   (dati = {} e aggiornato = null se non c'è ancora niente)
//   PUT /api/progressi  {dati: {chiave: valore | null}} → {dati, aggiornato}
// Il PUT UNISCE: le chiavi mandate si aggiornano, null le cancella, quelle non mandate restano.
// Così un browser rimasto indietro non può cancellare quello che hanno scritto gli altri.
import { json, sql, utenteDa } from './_lib.js'

const MAX_BYTE = 2_000_000

export async function GET(req: Request) {
  const id = utenteDa(req)
  if (id == null) return json({ errore: 'Non collegato' }, 401)
  const righe = (await sql()`SELECT dati, aggiornato FROM progressi WHERE utente_id = ${id}`) as { dati: unknown; aggiornato: string }[]
  return json(righe[0] ?? { dati: {}, aggiornato: null })
}

export async function PUT(req: Request) {
  const id = utenteDa(req)
  if (id == null) return json({ errore: 'Non collegato' }, 401)
  const testo = await req.text()
  if (testo.length > MAX_BYTE) return json({ errore: 'Troppi dati' }, 413)
  let corpo: { dati?: unknown }
  try { corpo = JSON.parse(testo) } catch { return json({ errore: 'Richiesta non valida' }, 400) }
  const dati = corpo.dati
  if (!dati || typeof dati !== 'object' || Array.isArray(dati)) return json({ errore: 'Dati non validi' }, 400)
  const metti: Record<string, string> = {}
  const togli: string[] = []
  for (const [k, v] of Object.entries(dati)) {
    if (!k.startsWith('studio-app:')) return json({ errore: 'Dati non validi' }, 400)
    if (v === null) togli.push(k)
    else if (typeof v === 'string') metti[k] = v
    else return json({ errore: 'Dati non validi' }, 400)
  }
  const righe = (await sql()`
    INSERT INTO progressi (utente_id, dati, aggiornato) VALUES (${id}, ${JSON.stringify(metti)}::jsonb, now())
    ON CONFLICT (utente_id) DO UPDATE
      SET dati = (progressi.dati || EXCLUDED.dati) - ${togli}::text[], aggiornato = now()
    RETURNING dati, aggiornato`) as { dati: Record<string, string>; aggiornato: string }[]
  return json(righe[0])
}
