import { useSyncExternalStore } from 'react'
import type { MateriaId } from '../data/materie'
import { chiave, piuGiorni, prossimaLezione, spostaGiorniScuola } from './date'

export interface Compito {
  id: string
  materia: MateriaId | null
  testo: string
  /** giorno di consegna, 'YYYY-MM-DD': il compito sta su quella pagina del diario */
  perIl: string
  fatto: boolean
  creato: string
  /** registrazione della dettatura da cui viene il compito */
  audioId?: string
  /** screen da cui è stato letto il compito */
  fonteId?: string
}

export const nuovoId = () =>
  globalThis.crypto?.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`

/* ── Archivio: il diario è della CLASSE, la spunta è di ognuno ──────────
 * L'elenco dei compiti è uno solo per tutti quelli che entrano (api/compiti.ts, tabella `compiti`):
 * se uno carica gli screen, gli altri trovano il diario già scritto.
 * - `studio-classe:compiti`: copia nel browser dell'elenco del server (fuori da "studio-app:",
 *   così sync.js non la mette nei progressi personali e non la toglie quando cambia utente).
 * - `studio-classe:sospese`: modifiche non ancora arrivate al server (partono appena c'è rete).
 * - `studio-app:fatti`: gli id dei compiti spuntati da CHI è collegato (progressi personali, sync.js).
 * Vecchi browser: `studio-app:compiti` (diario personale di prima) si manda come "importa"
 * (entra solo se il server non l'ha mai avuto) e poi si toglie.
 */

type Condiviso = Omit<Compito, 'fatto'>
type Sospese = { metti: Record<string, Condiviso>; importa: Record<string, Condiviso>; togli: string[] }

const CLASSE = 'studio-classe:compiti'
const SOSPESE = 'studio-classe:sospese'
const FATTI = 'studio-app:fatti'
const VECCHIA = 'studio-app:compiti'

const leggiJson = <T,>(k: string, vuoto: T): T => {
  try {
    const v = localStorage.getItem(k)
    return v ? (JSON.parse(v) as T) : vuoto
  } catch {
    return vuoto
  }
}
const scriviJson = (k: string, v: unknown) => {
  try {
    localStorage.setItem(k, JSON.stringify(v))
  } catch {
    /* memoria del browser non disponibile */
  }
}
const senzaFatto = (c: Compito): Condiviso => {
  const copia: Partial<Compito> = { ...c }
  delete copia.fatto
  return copia as Condiviso
}

let server: Condiviso[] = leggiJson(CLASSE, [])
let sospese: Sospese = { metti: {}, importa: {}, togli: [], ...leggiJson<Partial<Sospese>>(SOSPESE, {}) }
let fatti = new Set<string>(leggiJson<string[]>(FATTI, []))
let cache: Compito[] = []
const ascoltatori = new Set<() => void>()

/** Elenco da mostrare: quello del server con sopra le modifiche locali non ancora mandate, più le spunte mie. */
function ricomponi() {
  const togli = new Set(sospese.togli)
  const lista = server.filter((c) => !togli.has(c.id)).map((c) => sospese.metti[c.id] ?? c)
  const visti = new Set(lista.map((c) => c.id))
  for (const c of [...Object.values(sospese.importa), ...Object.values(sospese.metti)])
    if (!visti.has(c.id) && !togli.has(c.id)) {
      lista.push(c)
      visti.add(c.id)
    }
  cache = lista.map((c) => ({ ...c, fatto: fatti.has(c.id) }))
  ascoltatori.forEach((f) => f())
}

const vuote = () => !Object.keys(sospese.metti).length && !Object.keys(sospese.importa).length && !sospese.togli.length
const salvaSospese = () => scriviJson(SOSPESE, sospese)

/** Porta nel diario della classe i compiti del vecchio diario personale di questo browser. */
function migraVecchi() {
  if (localStorage.getItem(VECCHIA) === null) return
  const vecchi = leggiJson<Compito[]>(VECCHIA, [])
  for (const c of vecchi) {
    if (!c?.id || sospese.importa[c.id] || sospese.metti[c.id]) continue
    sospese.importa[c.id] = senzaFatto(c)
    if (c.fatto) fatti.add(c.id)
  }
  salvaSospese()
  if (vecchi.some((c) => c?.fatto)) scriviJson(FATTI, [...fatti])
  localStorage.removeItem(VECCHIA) // sync.js lo toglie anche dai progressi sul server
  ricomponi()
  pianifica()
}

let timer: ReturnType<typeof setTimeout> | undefined
let inVolo = false
const pianifica = () => {
  clearTimeout(timer)
  timer = setTimeout(() => void manda(), 1500)
}

function arrivato(compiti: Condiviso[]) {
  server = compiti
  scriviJson(CLASSE, compiti)
  ricomponi()
}

/** Manda le modifiche in sospeso (null se il server non risponde); poi l'elenco è quello del server. */
async function manda(keepalive = false): Promise<boolean> {
  clearTimeout(timer)
  if (vuote()) return true
  if (inVolo && !keepalive) {
    pianifica() // ne sta già partendo una: si riprova dopo
    return false
  }
  const corpo = {
    metti: Object.values(sospese.metti),
    importa: Object.values(sospese.importa),
    togli: sospese.togli,
  }
  const mandate = JSON.stringify(corpo)
  inVolo = true
  try {
    const r = await fetch('/api/compiti', {
      method: 'PUT', keepalive, credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: mandate,
    })
    if (!r.ok) return false
    const { compiti } = (await r.json()) as { compiti: Condiviso[] }
    // tolte solo le modifiche mandate e non cambiate di nuovo nel frattempo
    for (const c of corpo.metti) if (JSON.stringify(sospese.metti[c.id]) === JSON.stringify(c)) delete sospese.metti[c.id]
    for (const c of corpo.importa) delete sospese.importa[c.id]
    sospese.togli = sospese.togli.filter((id) => !corpo.togli.includes(id))
    salvaSospese()
    arrivato(compiti)
    return true
  } catch {
    return false
  } finally {
    inVolo = false
  }
}

let ultimoScarico = 0
/** Prende dal server il diario della classe (prima manda le modifiche in sospeso). */
async function scarica() {
  if (!vuote()) {
    await manda()
    return
  }
  ultimoScarico = Date.now()
  try {
    const r = await fetch('/api/compiti', { credentials: 'same-origin', cache: 'no-store' })
    if (!r.ok) return // 401: nessuno collegato (Accesso chiede il login)
    const { compiti } = (await r.json()) as { compiti: Condiviso[] }
    if (vuote()) arrivato(compiti)
    else await manda()
  } catch {
    /* senza rete resta la copia del browser */
  }
}

migraVecchi()
ricomponi()
void scarica()
// dopo il login (sync.js) e quando si torna sull'app: il diario si riallinea con quello che hanno scritto gli altri
addEventListener('studio-sync:collegato', () => {
  fatti = new Set(leggiJson<string[]>(FATTI, [])) // può essere entrato un altro utente: spunte sue
  ricomponi()
  void scarica()
})
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    if (!vuote()) void manda(true)
  } else if (Date.now() - ultimoScarico > 10_000) void scarica()
})
setInterval(() => {
  if (document.visibilityState === 'visible') void scarica()
}, 120_000)
// i progressi personali sono arrivati dal server (sync.js): spunte di chi è collegato
addEventListener('studio-sync:dati', () => {
  migraVecchi()
  fatti = new Set(leggiJson<string[]>(FATTI, []))
  ricomponi()
})

export function useCompiti(): Compito[] {
  return useSyncExternalStore(
    (f) => {
      ascoltatori.add(f)
      return () => ascoltatori.delete(f)
    },
    () => cache,
  )
}

function segnaFatto(id: string, fatto: boolean) {
  if (fatto) fatti.add(id)
  else fatti.delete(id)
  scriviJson(FATTI, [...fatti])
}

export function aggiungiCompiti(nuovi: Compito[]) {
  for (const c of nuovi) {
    sospese.metti[c.id] = senzaFatto(c)
    if (c.fatto) segnaFatto(c.id, true)
  }
  salvaSospese()
  ricomponi()
  pianifica()
}

export function aggiornaCompito(id: string, modifica: Partial<Compito>) {
  const { fatto, ...resto } = modifica
  if (fatto !== undefined) segnaFatto(id, fatto)
  const attuale = cache.find((c) => c.id === id)
  if (attuale && Object.keys(resto).length) {
    sospese.metti[id] = senzaFatto({ ...attuale, ...resto })
    salvaSospese()
    pianifica()
  }
  ricomponi()
}

export function eliminaCompito(id: string) {
  delete sospese.metti[id]
  delete sospese.importa[id]
  if (!sospese.togli.includes(id)) sospese.togli.push(id)
  if (fatti.has(id)) segnaFatto(id, false)
  salvaSospese()
  ricomponi()
  pianifica()
}

const parole = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .split(/[^a-z0-9]+/)
    .filter((p) => p.length > 1)

/**
 * Lo stesso compito è già sul diario? Stesso giorno, stessa materia (o materia ignota) e quasi
 * tutte le sue parole già scritte nei compiti di quel giorno: gli screen si sovrappongono
 * (lo stesso compito ricompare per giorni) e a volte uno era stato diviso in due.
 */
export function giaSulDiario(b: { materia: MateriaId | null; testo: string; perIl: string }, esistenti = cache): boolean {
  const stessi = esistenti.filter((c) => c.perIl === b.perIl && (!b.materia || !c.materia || c.materia === b.materia))
  if (!stessi.length) return false
  const scritte = new Set(stessi.flatMap((c) => parole(c.testo)))
  const sue = parole(b.testo)
  if (!sue.length) return false
  return sue.filter((p) => scritte.has(p)).length / sue.length >= 0.8
}

/* ── Dal testo dettato ai compiti ─────────────────────── */

const ALIAS: [RegExp, MateriaId][] = [
  [/\b(matematica|mate|geometria|aritmetica)\b/gi, 'matematica'],
  [/\binglese\b/gi, 'inglese'],
  [/\bspagnolo\b/gi, 'spagnolo'],
  [/\bstoria\b/gi, 'storia'],
  [/\bgeografia\b/gi, 'geografia'],
  [/\bscienze\b/gi, 'scienze'],
  [/\b(tecnologia|tecnica)\b/gi, 'tecnologia'],
  [/\bmusica\b/gi, 'musica'],
  [/\b(arte e immagine|arte)\b/gi, 'arte'],
  [/\b(motoria|educazione fisica|ginnastica)\b/gi, 'motoria'],
  [/\breligione\b/gi, 'religione'],
  [/\bepica\b/gi, 'epica'],
  [/\bantologia\b/gi, 'antologia'],
  [/\bgrammatica\b/gi, 'grammatica'],
  [/\bitaliano\b/gi, 'italiano'],
]

const GIORNI = ['domenica', 'lunedi', 'martedi', 'mercoledi', 'giovedi', 'venerdi', 'sabato']
const MESI = [
  'gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno',
  'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre',
]
const MESI_RE = MESI.join('|')
const FINE = String.raw`(?=[\s.,;:!?]|$)` // \b non funziona dopo le lettere accentate

/** Espressioni di data. Il gruppo 1 è "per"/"entro": se c'è, la data si riferisce al compito appena detto. */
const RE_DATE: RegExp[] = [
  // "martedì", "per martedì", "mercoledì 11", "la prossima settimana" no; "domani", "per dopodomani"
  new RegExp(
    String.raw`(?:\b(per|entro)\s+)?(?:(?:il|la)\s+)?(?:prossim[oa]\s+)?\b(dopodomani|domani|luned[iì]|marted[iì]|mercoled[iì]|gioved[iì]|venerd[iì]|sabato)(?:\s+(\d{1,2})(?!\s*\d))?(?:\s+prossimo)?${FINE}`,
    'gi',
  ),
  // "11 novembre", "per il 15 dicembre"
  new RegExp(String.raw`(?:\b(per|entro)\s+)?(?:\bil\s+)?\b(\d{1,2})\s+(${MESI_RE})${FINE}`, 'gi'),
  // "per il 15" (solo con "per", altrimenti si confonde con i numeri di pagina)
  new RegExp(String.raw`\b(per|entro)\s+il\s+(\d{1,2})${FINE}(?!\s+(?:${MESI_RE}))`, 'gi'),
]

const togliAccento = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '')

/** Il giorno n del mese corrente se non è ancora passato, altrimenti del mese dopo. */
function giornoDelMese(n: number, oggi: Date): Date {
  const d = new Date(oggi.getFullYear(), oggi.getMonth(), n)
  return n > oggi.getDate() ? d : new Date(oggi.getFullYear(), oggi.getMonth() + 1, n)
}

function risolviData(m: RegExpMatchArray, quale: number, oggi: Date): Date {
  if (quale === 0) {
    const parola = togliAccento(m[2].toLowerCase())
    if (parola === 'domani') return piuGiorni(oggi, 1)
    if (parola === 'dopodomani') return piuGiorni(oggi, 2)
    if (m[3]) return giornoDelMese(Number(m[3]), oggi) // "mercoledì 11": conta il numero
    const diff = ((GIORNI.indexOf(parola) - oggi.getDay() + 7) % 7) || 7
    return piuGiorni(oggi, diff)
  }
  if (quale === 1) {
    const mese = MESI.indexOf(m[3].toLowerCase())
    const anno = oggi.getFullYear() + (mese < oggi.getMonth() ? 1 : 0)
    return new Date(anno, mese, Number(m[2]))
  }
  return giornoDelMese(Number(m[2]), oggi)
}

type Segno =
  | { tipo: 'materia'; inizio: number; fine: number; materia: MateriaId }
  | { tipo: 'data'; inizio: number; fine: number; data: Date; conPer: boolean }

function trovaSegni(testo: string, oggi: Date): Segno[] {
  const tutti: Segno[] = []
  RE_DATE.forEach((re, quale) => {
    for (const m of testo.matchAll(re)) {
      tutti.push({
        tipo: 'data', inizio: m.index!, fine: m.index! + m[0].length,
        data: risolviData(m, quale, oggi), conPer: Boolean(m[1]),
      })
    }
  })
  for (const [re, materia] of ALIAS) {
    for (const m of testo.matchAll(re)) {
      tutti.push({ tipo: 'materia', inizio: m.index!, fine: m.index! + m[0].length, materia })
    }
  }
  // a parità di inizio vince il più lungo; poi si scartano le sovrapposizioni
  tutti.sort((a, b) => a.inizio - b.inizio || b.fine - a.fine)
  const segni: Segno[] = []
  for (const s of tutti) if (!segni.length || s.inizio >= segni[segni.length - 1].fine) segni.push(s)
  return segni
}

const RIEMPITIVI_INIZIO = /^(?:[\s,.:;–-]+|(?:allora|poi|e|ed|ok|okay|quindi|dunque|invece|anche|inoltre|per|di|da fare|c'è|ci sono|i compiti(?: sono)?|compiti)(?=[\s,.:;]|$))+/i
const RIEMPITIVI_FINE = /(?:[\s,.:;–-]+|(?<=\s)(?:poi|e|ed|allora|quindi|invece|anche|per|di))+$/i

function pulisci(s: string): string {
  let t = s.trim()
  let prima
  do {
    prima = t
    t = t.replace(RIEMPITIVI_INIZIO, '').replace(RIEMPITIVI_FINE, '').trim()
  } while (t !== prima)
  return t.charAt(0).toUpperCase() + t.slice(1)
}

export interface Bozza {
  id: string
  materia: MateriaId | null
  testo: string
  perIl: string
}

/**
 * Dal testo dettato ai compiti.
 * - Una materia nominata apre un compito nuovo.
 * - Un giorno detto da solo ("martedì storia…", "poi mercoledì 11 italiano…") vale
 *   per i compiti che seguono, finché non si nomina un altro giorno.
 * - "per lunedì" detto dopo un compito vale per quel compito.
 * - Senza giorno, il compito va alla prossima lezione di quella materia.
 */
export function capisciCompiti(testo: string, oggi: Date): Bozza[] {
  interface Aperto { materia: MateriaId | null; testo: string; data: Date | null; contesto: Date | null }
  const fatti: Bozza[] = []
  let contesto: Date | null = null
  const nuovo = (materia: MateriaId | null): Aperto => ({ materia, testo: '', data: null, contesto })
  const chiudi = (a: Aperto) => {
    const t = pulisci(a.testo)
    if (!t) return
    const quando =
      a.data ?? a.contesto ?? (a.materia && prossimaLezione(a.materia, oggi)) ?? spostaGiorniScuola(oggi, 1)
    fatti.push({ id: nuovoId(), materia: a.materia, testo: t, perIl: chiave(quando) })
  }

  let aperto = nuovo(null)
  let cursore = 0
  for (const s of trovaSegni(testo, oggi)) {
    aperto.testo += ' ' + testo.slice(cursore, s.inizio)
    cursore = s.fine
    const vuoto = pulisci(aperto.testo) === ''

    if (s.tipo === 'materia') {
      if (aperto.materia === null && vuoto) aperto.materia = s.materia
      else {
        chiudi(aperto)
        aperto = nuovo(s.materia)
      }
    } else if (s.conPer && !(vuoto && aperto.materia === null)) {
      // "matematica pagina 45 per lunedì": la data è di questo compito
      aperto.data ??= s.data
    } else if (vuoto) {
      // "martedì matematica…", "per martedì matematica…", "matematica martedì pagina 4"
      aperto.data = s.data
      contesto = s.data
    } else {
      // "…esercizi 3 e 4 poi mercoledì italiano…": si chiude il compito e cambia giorno
      chiudi(aperto)
      contesto = s.data
      aperto = nuovo(null)
      aperto.data = s.data
    }
  }
  aperto.testo += ' ' + testo.slice(cursore)
  chiudi(aperto)
  return fatti
}
