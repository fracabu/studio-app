// I progressi dell'utente: tutte le chiavi "studio-app:*" del browser (compiti, stelle,
// personaggi, palette, zaino…), salvate come un unico oggetto JSON.
//   GET /api/progressi → {dati, aggiornato}   (dati = {} e aggiornato = null se non c'è ancora niente)
//   PUT /api/progressi  {dati} → {aggiornato}
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
  // solo stringhe sotto "studio-app:", come in localStorage
  for (const [k, v] of Object.entries(dati)) {
    if (!k.startsWith('studio-app:') || typeof v !== 'string') return json({ errore: 'Dati non validi' }, 400)
  }
  const righe = (await sql()`
    INSERT INTO progressi (utente_id, dati, aggiornato) VALUES (${id}, ${JSON.stringify(dati)}::jsonb, now())
    ON CONFLICT (utente_id) DO UPDATE SET dati = EXCLUDED.dati, aggiornato = now()
    RETURNING aggiornato`) as { aggiornato: string }[]
  return json({ aggiornato: righe[0].aggiornato })
}
