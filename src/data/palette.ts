// Palette provabili dal pulsante "Colori". Ogni palette imposta le variabili CSS
// del telaio; i colori delle materie (evidenziatori) restano gli stessi.

export interface Palette {
  id: string
  nome: string
  /** fondo a quadretti */
  sfondo: string
  quadretto: string
  /** striscia in alto */
  barra: string
  /** linguette di navigazione */
  linguetta: string
  linguettaTesto: string
  /** pulsanti principali */
  accento: string
  accentoTesto: string
  /** testo e contorni sui fogli bianchi */
  inchiostro: string
}

export const PALETTE: Palette[] = [
  {
    id: 'viola-lime', nome: 'Viola e lime',
    sfondo: '#5b2a9e', quadretto: 'rgba(255,255,255,.14)', barra: '#35115f',
    linguetta: '#a6d84f', linguettaTesto: '#22103f', accento: '#ff7a1a', accentoTesto: '#ffffff', inchiostro: '#24124a',
  },
  {
    id: 'blu-giallo', nome: 'Blu e giallo',
    sfondo: '#1f45b5', quadretto: 'rgba(255,255,255,.14)', barra: '#102a78',
    linguetta: '#ffd23f', linguettaTesto: '#14204d', accento: '#ff4f3a', accentoTesto: '#ffffff', inchiostro: '#14204d',
  },
  {
    id: 'lavagna', nome: 'Lavagna',
    sfondo: '#1d6b57', quadretto: 'rgba(255,255,255,.12)', barra: '#0f4536',
    linguetta: '#ffe36e', linguettaTesto: '#123b30', accento: '#ff6fa3', accentoTesto: '#ffffff', inchiostro: '#123b30',
  },
  {
    id: 'turchese-corallo', nome: 'Turchese e corallo',
    sfondo: '#0e8a8c', quadretto: 'rgba(255,255,255,.15)', barra: '#075a5c',
    linguetta: '#ffb703', linguettaTesto: '#0b2f30', accento: '#fb5607', accentoTesto: '#ffffff', inchiostro: '#0b2f30',
  },
  {
    id: 'rosso-fuoco', nome: 'Rosso fuoco',
    sfondo: '#c2352b', quadretto: 'rgba(255,255,255,.14)', barra: '#7d1d17',
    linguetta: '#ffd23f', linguettaTesto: '#3a0d09', accento: '#2b59ff', accentoTesto: '#ffffff', inchiostro: '#3a0d09',
  },
  {
    id: 'notte', nome: 'Notte stellata',
    sfondo: '#1b1640', quadretto: 'rgba(255,255,255,.08)', barra: '#0e0b26',
    linguetta: '#7cf29c', linguettaTesto: '#0e0b26', accento: '#ff4fa3', accentoTesto: '#ffffff', inchiostro: '#1b1640',
  },
]

const CHIAVE = 'studio-app:palette'

export function paletteSalvata(): Palette {
  try {
    return PALETTE.find((p) => p.id === localStorage.getItem(CHIAVE)) ?? PALETTE[0]
  } catch {
    return PALETTE[0]
  }
}

export function applicaPalette(p: Palette) {
  const s = document.documentElement.style
  s.setProperty('--sfondo', p.sfondo)
  s.setProperty('--quadretto-fondo', p.quadretto)
  s.setProperty('--barra', p.barra)
  s.setProperty('--linguetta', p.linguetta)
  s.setProperty('--linguetta-testo', p.linguettaTesto)
  s.setProperty('--accento', p.accento)
  s.setProperty('--accento-testo', p.accentoTesto)
  s.setProperty('--inchiostro', p.inchiostro)
  try {
    localStorage.setItem(CHIAVE, p.id)
  } catch {
    /* resta solo per questa visita */
  }
}
