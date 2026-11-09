// Cose da mettere nello zaino oltre ai libri delle materie, giorno per giorno
// (1 = lunedì … 5 = venerdì, come Date.getDay()). Compaiono in "Zaino per domani" nella vista Oggi.

export type CosaZaino = { id: string; nome: string; icona: string }

const SCARPE: CosaZaino = { id: 'scarpe-ginnastica', nome: 'Scarpe da ginnastica', icona: '👟' }

export const EXTRA_ZAINO: Record<number, CosaZaino[]> = {
  1: [
    { id: 'cartellina-arte', nome: 'Cartellina di arte', icona: '🎨' },
    { id: 'libro-pianoforte', nome: 'Libro di pianoforte', icona: '🎹' },
    { id: 'portalistini-pianoforte', nome: 'Portalistini di pianoforte', icona: '📁' },
    SCARPE,
  ],
  3: [
    { id: 'cartellina-tecnica', nome: 'Cartellina di tecnica', icona: '📐' },
    { id: 'ukulele', nome: 'Ukulele', icona: '🎸' },
    SCARPE,
  ],
}
