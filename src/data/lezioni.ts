import type { Compito } from '../lib/compiti'
import type { MateriaId } from './materie'

/*
 * Lezioni pronte: pagine statiche in public/lezioni/<id>/index.html (video, scheda, esercizi, quiz).
 * Le stelle le scrive la pagina stessa in studio-app:premi, con id `video:<id>` e `quiz:<id>:…`.
 * Un compito mostra il pulsante della lezione se ha la stessa materia e il giorno di consegna in `perIl`.
 */
export type Sezione = 'video' | 'scheda' | 'esercizi' | 'quiz' | 'interroga'

export const NOMI_SEZIONI: Record<Sezione, string> = {
  video: '🎬 Video', scheda: '📄 Scheda', esercizi: '✏️ Esercizi', quiz: '⭐ Quiz', interroga: '🎤 Interrogazione',
}

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
  /** linguette della pagina, nell'ordine; la prima è quella che si apre */
  sezioni: Sezione[]
}

export const LEZIONI: Lezione[] = [
  {
    id: 'scienze-temperatura',
    materia: 'scienze',
    titolo: 'Misurare la temperatura',
    fonte: 'Che meraviglia la scienza · A3 lezione 1 · pag. 64-68',
    perIl: ['2026-11-10'],
    domande: 12,
    sezioni: ['video', 'scheda', 'esercizi', 'quiz'],
  },
  {
    id: 'arte-mesopotamia-egitto',
    materia: 'arte',
    titolo: 'Mesopotamia ed Egitto',
    fonte: 'La stanza delle meraviglie · A1 · pag. 25-43',
    perIl: ['2026-11-11'],
    domande: 18,
    sezioni: ['scheda', 'quiz', 'interroga', 'video'],
  },
]

/** Indirizzo completo: con la sola barra finale il server di Vite rimanda all'app. */
export const urlLezione = (l: Lezione, vista: Sezione = l.sezioni[0]) => `/lezioni/${l.id}/index.html#${vista}`

export const lezionePerCompito = (c: Compito): Lezione | undefined =>
  LEZIONI.find((l) => l.materia === c.materia && l.perIl.includes(c.perIl))
