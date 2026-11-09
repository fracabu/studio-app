import type { MateriaId } from './materie'

export interface Giorno {
  nome: string
  entrata: string
  uscita: string
  /** materie in ordine, un elemento per ogni ora */
  ore: MateriaId[]
  /**
   * orari precisi di ogni ora, se non sono tutte da 60 minuti
   * (per esempio nei giorni con la mensa). Se manca, la giornata
   * viene divisa in parti uguali fra entrata e uscita.
   */
  orari?: [string, string][]
  daConfermare?: string
}

/** Lunedì → venerdì */
export const ORARIO: Giorno[] = [
  {
    nome: 'Lunedì',
    entrata: '08:00',
    uscita: '14:00',
    ore: ['motoria', 'matematica', 'arte', 'grammatica', 'spagnolo', 'religione'],
  },
  {
    nome: 'Martedì',
    entrata: '08:00',
    uscita: '14:45',
    ore: ['inglese', 'inglese', 'grammatica', 'epica', 'matematica', 'scienze', 'pianoforte'],
    orari: [
      ['08:00', '09:00'],
      ['09:00', '10:00'],
      ['10:00', '11:00'],
      ['11:00', '12:00'],
      ['12:00', '13:00'],
      ['13:00', '14:00'],
      ['14:00', '14:45'],
    ],
  },
  {
    nome: 'Mercoledì',
    entrata: '08:00',
    uscita: '15:30',
    // esce alle 14:00 e rientra alle 14:50
    ore: ['motoria', 'arte', 'italiano', 'musica', 'tecnologia', 'tecnologia', 'musica-gruppo'],
    orari: [
      ['08:00', '09:00'],
      ['09:00', '10:00'],
      ['10:00', '11:00'],
      ['11:00', '12:00'],
      ['12:00', '13:00'],
      ['13:00', '14:00'],
      ['14:50', '15:30'],
    ],  },
  {
    nome: 'Giovedì',
    entrata: '08:00',
    uscita: '14:00',
    ore: ['scienze', 'matematica', 'musica', 'inglese', 'italiano', 'antologia'],
  },
  {
    nome: 'Venerdì',
    entrata: '08:00',
    uscita: '14:00',
    ore: ['storia', 'storia', 'spagnolo', 'matematica', 'geografia', 'geografia'],
  },
]
