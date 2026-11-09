// Libri di testo adottati in prima media (dalla foto dell'elenco della scuola, 8 novembre 2026,
// trascritta riga per riga). La foto è tagliata dopo Spagnolo: mancano le righe successive
// (probabilmente storia e tecnologia). L'asterisco a penna su alcune materie c'è sul foglio,
// il significato è da chiedere.
// Per ogni libro le foto delle pagine vanno in dati/libri/<cartella>/ (fuori da git).

import type { MateriaId } from './materie'

export interface Libro {
  materia: MateriaId
  titolo: string
  /** sottotitolo e componenti del volume, come scritti sul foglio */
  dettagli?: string
  autori: string
  editore: string
  isbn: string
  /** "U" = volume unico, "1" = primo volume */
  volume: 'U' | '1'
  /** cartella in dati/libri/ per le foto delle pagine */
  cartella: string
  /** segnato con l'asterisco a penna sul foglio */
  asterisco?: boolean
}

export const LIBRI: Libro[] = [
  {
    materia: 'arte',
    titolo: 'La stanza delle meraviglie',
    dettagli: 'Edizione verde',
    autori: 'Pier Luigi Mulas, Stefano Maggi, Chiara Copes',
    editore: 'B. Mondadori',
    isbn: '9791221602210',
    volume: 'U',
    cartella: 'arte-la-stanza-delle-meraviglie',
  },
  {
    materia: 'geografia',
    titolo: 'Geoagenda',
    dettagli: 'Edizione rossa, volume 1 con Le regioni italiane / Strumenti della geografia. Il paesaggio. Le attività umane',
    autori: 'Carla Tondelli',
    editore: 'Zanichelli',
    isbn: '9788808431813',
    volume: '1',
    cartella: 'geografia-geoagenda',
    asterisco: true,
  },
  {
    materia: 'grammatica',
    titolo: 'Le parole per dirlo',
    dettagli: 'Verde, volume unico',
    autori: 'Luca Serianni, Giuseppe Patota, Valeria Della Valle',
    editore: 'B. Mondadori',
    isbn: '9791221604542',
    volume: 'U',
    cartella: 'grammatica-le-parole-per-dirlo',
    asterisco: true,
  },
  {
    materia: 'antologia',
    titolo: 'Il libro geniale 1',
    dettagli: 'NIN',
    autori: 'P. Aristodemo, O. Pozzoli, B. Savino',
    editore: 'Paravia',
    isbn: '9788839568779',
    volume: '1',
    cartella: 'antologia-il-libro-geniale',
    asterisco: true,
  },
  {
    materia: 'matematica',
    titolo: 'Tutto chiaro!',
    dettagli: 'Edizione tematica: Aritmetica 1 + Geometria 1 + Quaderno e prontuario 1 + Ebook + Easy ebook (su DVD)',
    autori: 'Anna Montemurro',
    editore: 'De Agostini',
    isbn: '9788851160456',
    volume: '1',
    cartella: 'matematica-tutto-chiaro',
  },
  {
    materia: 'musica',
    titolo: "D'amore e d'accordi",
    dettagli: 'Con brio / Volume A: Storia della musica con brio + ebook',
    autori: 'Roberto Paoli, Fabrizio Ferrarin, Giulia Bolzan, Giuseppina Mascari',
    editore: 'Petrini',
    isbn: '9788849428773',
    volume: 'U',
    cartella: 'musica-damore-e-daccordi',
    asterisco: true,
  },
  {
    materia: 'religione',
    titolo: 'Religione a colori',
    dettagli: 'Volume unico + Arte e religione in Italia + Ora di religione + Ebook + Percorsi semplificati in digitale',
    autori: 'Michele Genisio, Luca Raspi, Mattia Davì',
    editore: 'Marietti Scuola',
    isbn: '9788839304711',
    volume: 'U',
    cartella: 'religione-religione-a-colori',
  },
  {
    materia: 'scienze',
    titolo: 'Che meraviglia la scienza',
    dettagli: 'Edizione tematica + EB: Volume A + B + C + D + libro digitale',
    autori: 'Perri, Giacomin, Ciocca, Della Ceca, Gasca',
    editore: 'Garzanti Scuola',
    isbn: '9791254552582',
    volume: 'U',
    cartella: 'scienze-che-meraviglia-la-scienza',
    asterisco: true,
  },
  {
    materia: 'inglese',
    titolo: 'This is me!',
    dettagli: 'Edizione IN + EB, vol. 1 + percorso inglese + libro digitale + narrativa digitale "Peter Pan"',
    autori: "O'Neill, Worman, Stubbs",
    editore: 'CIDEB - Black Cat',
    isbn: '9788853039446',
    volume: '1',
    cartella: 'inglese-this-is-me',
  },
  {
    materia: 'spagnolo',
    titolo: '¡Venga vamos!',
    dettagli: 'Edición verde compacta + Ebook / Libro del alumno y cuaderno (riga tagliata nella foto)',
    autori: 'C. Ramos, M. J. Santos, M. Santos',
    editore: 'DeA Scuola',
    isbn: '9791255312574',
    volume: 'U',
    cartella: 'spagnolo-venga-vamos',
    asterisco: true,
  },
]
