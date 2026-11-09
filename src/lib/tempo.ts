import { useEffect, useState } from 'react'
import type { MateriaId } from '../data/materie'
import { ORARIO, type Giorno } from '../data/orario'

export const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

export const fromMin = (min: number) =>
  `${String(Math.floor(min / 60)).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`

/** Inizio e fine di ogni ora della giornata. */
export function orariOre(g: Giorno): [string, string][] {
  if (g.orari) return g.orari
  const a = toMin(g.entrata)
  const durata = (toMin(g.uscita) - a) / g.ore.length
  return g.ore.map((_, i) => [
    fromMin(Math.round(a + i * durata)),
    fromMin(Math.round(a + (i + 1) * durata)),
  ])
}

/** Ore consecutive della stessa materia unite in un blocco ("doppia ora"). */
export interface Blocco {
  materia: MateriaId
  /** indice della prima ora (0 = prima ora) */
  inizio: number
  durata: number
  dalle: string
  alle: string
}

export function blocchi(g: Giorno): Blocco[] {
  const orari = orariOre(g)
  const out: Blocco[] = []
  g.ore.forEach((materia, i) => {
    const ultimo = out[out.length - 1]
    if (ultimo && ultimo.materia === materia && ultimo.inizio + ultimo.durata === i) {
      ultimo.durata++
      ultimo.alle = orari[i][1]
    } else {
      out.push({ materia, inizio: i, durata: 1, dalle: orari[i][0], alle: orari[i][1] })
    }
  })
  return out
}

/** Indice del giorno di scuola di oggi (0 = lunedì), oppure null nel fine settimana. */
export function indiceOggi(d: Date): number | null {
  const w = d.getDay() // 0 = domenica
  return w >= 1 && w <= ORARIO.length ? w - 1 : null
}

/** Il prossimo giorno di scuola dopo oggi, e se è proprio domani. */
export function prossimoGiorno(d: Date): { indice: number; eDomani: boolean } {
  const w = d.getDay()
  if (w >= 1 && w < ORARIO.length) return { indice: w, eDomani: true }
  // venerdì, sabato, domenica → lunedì
  return { indice: 0, eDomani: w === 0 }
}

export function bloccoInCorso(g: Giorno, d: Date): Blocco | null {
  const ora = d.getHours() * 60 + d.getMinutes()
  return blocchi(g).find((b) => ora >= toMin(b.dalle) && ora < toMin(b.alle)) ?? null
}

/** Data e ora correnti, aggiornate ogni 30 secondi. */
export function useAdesso(): Date {
  const [adesso, setAdesso] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setAdesso(new Date()), 30_000)
    return () => clearInterval(t)
  }, [])
  return adesso
}
