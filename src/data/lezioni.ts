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
    fonte: 'La stanza delle meraviglie · A1 · pag. 25-47',
    perIl: ['2026-11-11', '2026-11-16'],
    domande: 24,
    sezioni: ['scheda', 'quiz', 'interroga', 'video'],
  },
  {
    id: 'matematica-potenze',
    materia: 'matematica',
    titolo: 'Le potenze',
    fonte: 'Tutto chiaro! Aritmetica 1 · U3 · pag. 200-205 e 223-231',
    perIl: ['2026-11-12', '2026-11-16', '2026-11-19'],
    domande: 16,
    sezioni: ['video', 'scheda', 'esercizi', 'quiz'],
  },
  {
    id: 'geografia-popolazione',
    materia: 'geografia',
    titolo: 'La popolazione',
    fonte: 'GeoAgenda 1 · cap. 6 · pag. B4-B6',
    perIl: ['2026-11-13'],
    domande: 12,
    sezioni: ['video', 'scheda', 'esercizi', 'quiz'],
  },
  {
    id: 'spagnolo-nacionalidades',
    materia: 'spagnolo',
    titolo: 'Países y nacionalidades',
    fonte: '¡Venga, vamos! 1 · unità 2 · pag. 46-47, 59, 62',
    perIl: ['2026-11-13'],
    domande: 12,
    sezioni: ['scheda', 'esercizi', 'quiz'],
  },
  {
    id: 'spagnolo-demostrativos-posesivos',
    materia: 'spagnolo',
    titolo: 'Demostrativos y posesivos',
    fonte: '¡Venga, vamos! 1 · unità 2 · pag. 52-53, 63-64',
    perIl: ['2026-11-16'],
    domande: 12,
    sezioni: ['scheda', 'esercizi', 'quiz'],
  },
  {
    id: 'scienze-calore',
    materia: 'scienze',
    titolo: 'Il calore e come si propaga',
    fonte: 'Che meraviglia la scienza · A3 lezione 2 · pag. A70-A74',
    perIl: ['2026-11-17', '2026-11-19'],
    domande: 14,
    sezioni: ['scheda', 'esercizi', 'quiz', 'interroga'],
  },
  {
    id: 'inglese-units-1-2',
    materia: 'inglese',
    titolo: 'Units 1-2: ripasso per la verifica',
    fonte: 'This is me! 1 · units 1-2 · pag. 25-52, Workbook 172-175',
    perIl: ['2026-11-17'],
    domande: 20,
    sezioni: ['scheda', 'esercizi', 'quiz'],
  },
  {
    id: 'spagnolo-repaso-unidades-1-2',
    materia: 'spagnolo',
    titolo: 'Repaso: unidades 1 y 2',
    fonte: '¡Venga, vamos! 1 · ripasso unità 1-2 · pag. 65-67',
    perIl: ['2026-11-20'],
    domande: 22,
    sezioni: ['scheda', 'esercizi', 'quiz'],
  },
  {
    id: 'musica-strumenti',
    materia: 'musica',
    titolo: 'Strumenti, voci e formazioni',
    fonte: "D'amore e d'Accordi · Volume A · pag. 17-32",
    perIl: ['2026-11-18'],
    domande: 24,
    sezioni: ['scheda', 'esercizi', 'quiz', 'interroga'],
  },
  {
    id: 'inglese-family-friends',
    materia: 'inglese',
    titolo: 'Unit 3: family, pets e have got',
    fonte: 'This is me! 1 · unit 3 · pag. 57-63',
    perIl: ['2026-11-19'],
    domande: 20,
    sezioni: ['scheda', 'esercizi', 'quiz'],
  },
  {
    id: 'storia-carlo-magno',
    materia: 'storia',
    titolo: 'Dai Franchi a Carlo Magno',
    fonte: 'Il nuovo Tutto è storia 1 · cap. 2 lezioni 1-2 · pag. 55-63',
    perIl: ['2026-11-20'],
    domande: 18,
    sezioni: ['scheda', 'esercizi', 'quiz', 'interroga'],
  },
  {
    id: 'storia-curtis-longobardi',
    materia: 'storia',
    titolo: 'La curtis e i Longobardi',
    fonte: 'Il nuovo Tutto è storia 1 · cap. 1 · pag. 39-52',
    perIl: ['2026-11-13'],
    domande: 20,
    sezioni: ['scheda', 'esercizi', 'quiz', 'interroga'],
  },
  {
    id: 'storia-primo-medioevo',
    materia: 'storia',
    titolo: 'Il primo Medioevo in quattro temi',
    fonte: 'Il nuovo Tutto è storia 1 · quattro temi · pag. 23-37',
    perIl: [],
    domande: 20,
    sezioni: ['scheda', 'esercizi', 'quiz', 'interroga'],
  },
]

/** Indirizzo completo: con la sola barra finale il server di Vite rimanda all'app. */
export const urlLezione = (l: Lezione, vista: Sezione = l.sezioni[0]) => `/lezioni/${l.id}/index.html#${vista}`

export const lezionePerCompito = (c: Compito): Lezione | undefined =>
  LEZIONI.find((l) => l.materia === c.materia && l.perIl.includes(c.perIl))
