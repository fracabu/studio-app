// Il diario della classe: un solo elenco di compiti, uguale per tutti quelli che entrano.
// Una riga per compito (tabella `compiti`), così due persone che scrivono insieme non si
// cancellano a vicenda. La spunta "fatto" NON sta qui: è di ognuno (chiave `studio-app:fatti`
// nei progressi personali), come le stelle.
//   GET /api/compiti → {compiti: Compito[]}
//   PUT /api/compiti  {metti?: Compito[], importa?: Compito[], togli?: string[]} → {compiti}
//     metti   = aggiunge o aggiorna (un compito già tolto non torna: l'id non si riusa)
//     importa = aggiunge solo se l'id non c'è mai stato (dati vecchi di un browser)
//     togli   = cancella (resta la riga con `tolto`, così un browser indietro non lo rimette)
import { json, sql, utenteDa } from './_lib.js'

const MAX_BYTE = 1_000_000
const CAMPI = ['id', 'materia', 'testo', 'perIl', 'creato', 'audioId', 'fonteId'] as const

type Compito = Record<(typeof CAMPI)[number], string | null | undefined>

/** Tiene solo i campi del compito condiviso (niente `fatto`); null se non è un compito valido. */
function pulisci(c: unknown): Compito | null {
  if (!c || typeof c !== 'object') return null
  const o = c as Record<string, unknown>
  if (typeof o.id !== 'string' || !o.id || o.id.length > 100) return null
  if (typeof o.testo !== 'string' || typeof o.perIl !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(o.perIl)) return null
  const out: Record<string, string | null> = {}
  for (const k of CAMPI) {
    const v = o[k]
    if (typeof v === 'string') out[k] = v
    else if (k === 'materia') out[k] = null
  }
  return out as Compito
}

async function elenco() {
  const righe = (await sql()`SELECT dati FROM compiti WHERE NOT tolto ORDER BY dati->>'creato', creato, id`) as { dati: Compito }[]
  return righe.map((r) => r.dati)
}

export async function GET(req: Request) {
  if (utenteDa(req) == null) return json({ errore: 'Non collegato' }, 401)
  return json({ compiti: await elenco() })
}

export async function PUT(req: Request) {
  const id = utenteDa(req)
  if (id == null) return json({ errore: 'Non collegato' }, 401)
  const testo = await req.text()
  if (testo.length > MAX_BYTE) return json({ errore: 'Troppi dati' }, 413)
  let corpo: { metti?: unknown; importa?: unknown; togli?: unknown }
  try { corpo = JSON.parse(testo) } catch { return json({ errore: 'Richiesta non valida' }, 400) }

  const lista = (v: unknown) => (Array.isArray(v) ? v : v == null ? [] : null)
  const metti = lista(corpo.metti)?.map(pulisci)
  const importa = lista(corpo.importa)?.map(pulisci)
  const togli = lista(corpo.togli)
  if (!metti || !importa || !togli || metti.includes(null) || importa.includes(null) || togli.some((t) => typeof t !== 'string'))
    return json({ errore: 'Dati non validi' }, 400)

  // Una query per gruppo, non una per compito: su Cloudflare ogni query è una sottorichiesta
  // e oltre 50 per chiamata la funzione fallisce (500). Visto il 24/11 con 52 compiti da importare.
  // Un id ripetuto nello stesso INSERT … ON CONFLICT DO UPDATE è un errore: si tiene l'ultimo.
  const unici = (l: Compito[]) => JSON.stringify([...new Map(l.map((c) => [c.id, c])).values()])
  const db = sql()
  if (importa.length)
    await db`INSERT INTO compiti (id, dati, autore)
      SELECT x->>'id', x, ${id}::int FROM jsonb_array_elements(${unici(importa as Compito[])}::jsonb) AS x
      ON CONFLICT (id) DO NOTHING`
  if (metti.length)
    await db`INSERT INTO compiti (id, dati, autore)
      SELECT x->>'id', x, ${id}::int FROM jsonb_array_elements(${unici(metti as Compito[])}::jsonb) AS x
      ON CONFLICT (id) DO UPDATE SET dati = EXCLUDED.dati, aggiornato = now() WHERE NOT compiti.tolto`
  if (togli.length)
    await db`UPDATE compiti SET tolto = true, aggiornato = now() WHERE id = ANY(${togli as string[]}::text[])`
  return json({ compiti: await elenco() })
}
