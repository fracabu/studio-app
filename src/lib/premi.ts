import { useSyncExternalStore } from 'react'
import { PERSONAGGI, PERSONAGGI_PER_ID, type Personaggio } from '../data/personaggi'
import { chiave } from './date'

/*
 * Stelle e personaggi. Ogni stella viene da un evento con un id unico, così una
 * cosa fatta non si conta due volte e, se si annulla, le stelle tornano indietro.
 *
 * Stelle per evento (da tarare quando ci sono quiz e video):
 *   compito fatto        2
 *   video visto          5
 *   quiz                 1 per risposta giusta, +5 se tutto giusto
 *   bonus               10
 */
export const STELLE = { compito: 2, video: 5, rispostaGiusta: 1, quizPerfetto: 5, bonus: 10 } as const

export interface Evento {
  id: string
  tipo: 'compito' | 'video' | 'quiz' | 'bonus'
  stelle: number
  quando: string
}

interface Stato {
  eventi: Evento[]
  /** personaggi di cui si è già vista la scena di sblocco */
  visti: string[]
  /** personaggio scelto per ogni giorno, 'YYYY-MM-DD' → id */
  delGiorno: Record<string, string>
}

const CHIAVE = 'studio-app:premi'
const VUOTO: Stato = { eventi: [], visti: ['bit'], delGiorno: {} }
let stato: Stato = leggi()
const ascoltatori = new Set<() => void>()

function leggi(): Stato {
  try {
    return { ...VUOTO, ...JSON.parse(localStorage.getItem(CHIAVE) ?? '{}') }
  } catch {
    return VUOTO
  }
}

// dati arrivati dal server (public/sync.js, es. dopo il login): si rilegge la copia nel browser
addEventListener('studio-sync:dati', () => {
  stato = leggi()
  ascoltatori.forEach((f) => f())
})

function scrivi(nuovo: Stato) {
  stato = nuovo
  try {
    localStorage.setItem(CHIAVE, JSON.stringify(nuovo))
  } catch {
    /* memoria del browser non disponibile */
  }
  ascoltatori.forEach((f) => f())
}

export function usePremi(): Stato {
  return useSyncExternalStore(
    (f) => {
      ascoltatori.add(f)
      return () => ascoltatori.delete(f)
    },
    () => stato,
  )
}

export const totaleStelle = (s: Stato) => s.eventi.reduce((n, e) => n + e.stelle, 0)
export const sbloccati = (s: Stato): Personaggio[] => PERSONAGGI.filter((p) => p.stelle <= totaleStelle(s))
export const prossimo = (s: Stato): Personaggio | undefined => PERSONAGGI.find((p) => p.stelle > totaleStelle(s))
/** Sbloccati ma senza ancora la scena di sblocco. */
export const daRivelare = (s: Stato) => sbloccati(s).filter((p) => !s.visti.includes(p.id))

export function registra(evento: Omit<Evento, 'quando'>) {
  if (stato.eventi.some((e) => e.id === evento.id)) return
  scrivi({ ...stato, eventi: [...stato.eventi, { ...evento, quando: new Date().toISOString() }] })
}

export function annulla(id: string) {
  scrivi({ ...stato, eventi: stato.eventi.filter((e) => e.id !== id) })
}

/** Spuntare un compito dà stelle; togliere la spunta le toglie. */
export function premiaCompito(idCompito: string, fatto: boolean) {
  const id = `compito:${idCompito}`
  if (fatto) {
    registra({ id, tipo: 'compito', stelle: STELLE.compito })
    // Sbrigo fa la festa (vedi components/Sbrigo.tsx)
    dispatchEvent(new CustomEvent('studio-app:compito-fatto', { detail: idCompito }))
  } else annulla(id)
}

export function segnaVisto(id: string) {
  if (!stato.visti.includes(id)) scrivi({ ...stato, visti: [...stato.visti, id] })
}

export function scegliDelGiorno(giorno: Date, id: string) {
  scrivi({ ...stato, delGiorno: { ...stato.delGiorno, [chiave(giorno)]: id } })
}

/** Il personaggio di oggi: quello scelto, altrimenti l'ultimo usato, altrimenti Bit. */
export function personaggioDelGiorno(s: Stato, giorno: Date): { p: Personaggio; scelto: boolean } {
  const id = s.delGiorno[chiave(giorno)]
  if (id && PERSONAGGI_PER_ID[id]) return { p: PERSONAGGI_PER_ID[id], scelto: true }
  const ultimo = Object.keys(s.delGiorno).sort().at(-1)
  return { p: PERSONAGGI_PER_ID[ultimo ? s.delGiorno[ultimo] : 'bit'] ?? PERSONAGGI[0], scelto: false }
}
