import { MATERIE, type MateriaId } from '../data/materie'
import { ORARIO } from '../data/orario'

/** 'YYYY-MM-DD' in ora locale (non UTC, altrimenti di sera si sbaglia giorno). */
export function chiave(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function daChiave(s: string): Date {
  const [y, m, g] = s.split('-').map(Number)
  return new Date(y, m - 1, g)
}

export function piuGiorni(d: Date, n: number): Date {
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate())
  x.setDate(x.getDate() + n)
  return x
}

export const eGiornoDiScuola = (d: Date) => d.getDay() >= 1 && d.getDay() <= ORARIO.length

/** Il giorno di scuola n posizioni dopo (n > 0) o prima (n < 0) di d. */
export function spostaGiorniScuola(d: Date, n: number): Date {
  let x = d
  let restanti = Math.abs(n)
  const passo = Math.sign(n)
  while (restanti > 0) {
    x = piuGiorni(x, passo)
    if (eGiornoDiScuola(x)) restanti--
  }
  return x
}

/** d stesso se è giorno di scuola, altrimenti il primo giorno di scuola successivo. */
export const giornoScuolaDa = (d: Date) => (eGiornoDiScuola(d) ? piuGiorni(d, 0) : spostaGiorniScuola(d, 1))

/** Prima lezione della materia dopo il giorno d (escluso). */
export function prossimaLezione(materia: MateriaId, d: Date): Date | null {
  const valide = MATERIE[materia].gruppo ?? [materia]
  for (let i = 1; i <= 14; i++) {
    const x = piuGiorni(d, i)
    if (eGiornoDiScuola(x) && ORARIO[x.getDay() - 1].ore.some((o) => valide.includes(o))) return x
  }
  return null
}

export const fmtGiorno = new Intl.DateTimeFormat('it-IT', { weekday: 'long' })
export const fmtMese = new Intl.DateTimeFormat('it-IT', { month: 'long' })
export const fmtBreve = new Intl.DateTimeFormat('it-IT', { weekday: 'short', day: 'numeric', month: 'short' })
