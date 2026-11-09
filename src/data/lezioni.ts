import type { Compito } from '../lib/compiti'
import type { MateriaId } from './materie'

/*
 * Lezioni pronte: pagine statiche in public/lezioni/<id>/index.html (video, scheda, esercizi, quiz).
 * Le stelle le scrive la pagina stessa in studio-app:premi, con id `video:<id>` e `quiz:<id>:…`.
 * Un compito mostra il pulsante della lezione se ha la stessa materia e il giorno di consegna in `perIl`.
 */
export interface Lezione {
  id: string
  materia: MateriaId
  titolo: string
  /** da dove viene: libro e pagine */
  fonte: string
  /** giorni di consegna ('YYYY-MM-DD') dei compiti che la lezione aiuta a preparare */
  perIl: string[]
  /** numero di domande del quiz, per mostrare il punteggio */
  domande: number
}

export const LEZIONI: Lezione[] = [
  {
    id: 'scienze-temperatura',
    materia: 'scienze',
    titolo: 'Misurare la temperatura',
    fonte: 'Che meraviglia la scienza · A3 lezione 1 · pag. 64-68',
    perIl: ['2026-11-10'],
    domande: 12,
  },
]

/** Indirizzo completo: con la sola barra finale il server di Vite rimanda all'app. */
export const urlLezione = (l: Lezione, vista?: 'video' | 'scheda' | 'esercizi' | 'quiz') =>
  `/lezioni/${l.id}/index.html${vista ? `#${vista}` : ''}`

export const lezionePerCompito = (c: Compito): Lezione | undefined =>
  LEZIONI.find((l) => l.materia === c.materia && l.perIl.includes(c.perIl))
