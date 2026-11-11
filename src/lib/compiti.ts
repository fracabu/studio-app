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

/* ── Archivio (per ora nel browser; poi passerà a un server di casa) ── */

const CHIAVE = 'studio-app:compiti'
let cache: Compito[] = leggi()
const ascoltatori = new Set<() => void>()

function leggi(): Compito[] {
  try {
    return JSON.parse(localStorage.getItem(CHIAVE) ?? '[]')
  } catch {
    return []
  }
}

// dati arrivati dal server (public/sync.js, es. dopo il login): si rilegge la copia nel browser
addEventListener('studio-sync:dati', () => {
  cache = leggi()
  ascoltatori.forEach((f) => f())
})

function salva(lista: Compito[]) {
  cache = lista
  try {
    localStorage.setItem(CHIAVE, JSON.stringify(lista))
  } catch {
    /* memoria del browser non disponibile */
  }
  ascoltatori.forEach((f) => f())
}

export function useCompiti(): Compito[] {
  return useSyncExternalStore(
    (f) => {
      ascoltatori.add(f)
      return () => ascoltatori.delete(f)
    },
    () => cache,
  )
}

export const aggiungiCompiti = (nuovi: Compito[]) => salva([...cache, ...nuovi])
export const aggiornaCompito = (id: string, modifica: Partial<Compito>) =>
  salva(cache.map((c) => (c.id === id ? { ...c, ...modifica } : c)))
export const eliminaCompito = (id: string) => salva(cache.filter((c) => c.id !== id))

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
