// I personaggi da collezionare. Sono originali: le descrizioni servono anche da
// traccia per crearli con Flow. Quando ci sono i file, si mettono in
// public/personaggi/<id>/ e si indicano in `media`.

export type Rarita = 'comune' | 'raro' | 'super-raro' | 'epico' | 'mitico' | 'leggendario'

export const RARITA: Record<Rarita, { nome: string; colore: string }> = {
  comune: { nome: 'Comune', colore: '#8fb8de' },
  raro: { nome: 'Raro', colore: '#5fd35f' },
  'super-raro': { nome: 'Super raro', colore: '#3d8bff' },
  epico: { nome: 'Epico', colore: '#c04dff' },
  mitico: { nome: 'Mitico', colore: '#ff4d6d' },
  leggendario: { nome: 'Leggendario', colore: '#ffd23f' },
}

export interface Abilita {
  nome: string
  /** cosa fa nei quiz, detto semplice */
  effetto: string
}

export interface Personaggio {
  id: string
  nome: string
  rarita: Rarita
  /** stelle totali che servono per sbloccarlo (0 = c'è da subito) */
  stelle: number
  colore: string
  chiE: string
  abilita: Abilita
  media?: {
    /** immagine ritagliata (png con trasparenza) */
    immagine?: string
    /** clip animata in loop, da fermo */
    fermo?: string
    /** clip animata quando si fa una cosa bene */
    esulta?: string
  }
}

export const PERSONAGGI: Personaggio[] = [
  {
    id: 'bit', nome: 'Bit', rarita: 'comune', stelle: 0, colore: '#7fd6ff',
    chiE: 'Un robottino curioso che fa mille domande.',
    abilita: { nome: 'Indizio', effetto: 'Toglie una risposta sbagliata, una volta per quiz.' },
  },
  {
    id: 'pitagatto', nome: 'Pitagatto', rarita: 'raro', stelle: 20, colore: '#ffb347',
    chiE: 'Un gatto con la squadretta che misura tutto.',
    abilita: { nome: 'Seconda possibilità', effetto: 'Se sbagli una domanda, puoi riprovarla.' },
  },
  {
    id: 'nota', nome: 'Nota', rarita: 'raro', stelle: 50, colore: '#ff8fd1',
    chiE: 'Una piovra che suona otto strumenti insieme.',
    abilita: { nome: 'Salto', effetto: 'Salta una domanda senza perdere stelle.' },
  },
  {
    id: 'talpa', nome: 'Talpa Mappa', rarita: 'super-raro', stelle: 90, colore: '#c9a26b',
    chiE: 'Un’esploratrice che scava gallerie sotto tutti i continenti.',
    abilita: { nome: 'Scudo', effetto: 'Il primo errore del quiz non conta.' },
  },
  {
    id: 'fiamma', nome: 'Fiamma', rarita: 'epico', stelle: 150, colore: '#ff6b3d',
    chiE: 'Un draghetto che ha visto tutta la storia dal vivo.',
    abilita: { nome: 'Doppie stelle', effetto: 'Le stelle del quiz valgono il doppio.' },
  },
  {
    id: 'volt', nome: 'Volt', rarita: 'epico', stelle: 230, colore: '#b6f03c',
    chiE: 'Una scintilla elettrica che non sta mai ferma.',
    abilita: { nome: 'Bonus lampo', effetto: 'Sblocca subito la domanda bonus.' },
  },
  {
    id: 'atlante', nome: 'Atlante', rarita: 'mitico', stelle: 330, colore: '#5b8cff',
    chiE: 'Un gigante gentile che si porta il mondo sulle spalle.',
    abilita: { nome: 'Super indizio', effetto: 'Toglie due risposte sbagliate.' },
  },
  {
    id: 'fenice', nome: 'Fenice', rarita: 'leggendario', stelle: 450, colore: '#ffd23f',
    chiE: 'Rinasce ogni volta che sbagli e ti fa ricominciare più forte.',
    abilita: { nome: 'Rinascita', effetto: 'Rifai il quiz tenendo le stelle migliori.' },
  },
]

export const PERSONAGGI_PER_ID = Object.fromEntries(PERSONAGGI.map((p) => [p.id, p]))
