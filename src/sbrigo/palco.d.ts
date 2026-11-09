// Tipi per palco.js (il palco è JavaScript puro, condiviso con il prototipo in mini-me-3d).

export interface Frasi {
  saluto: string
  viste: Record<string, string[]>
  presa: string[]
  botta: string[]
  ripresa: string[]
  tocco: string[]
  noia: string[]
  rutto: string[]
  scoreggia: string[]
  festa: string[]
  via: string[]
  torna: string[]
}

export const FRASI: Frasi
export function tutteLeFrasi(frasi?: Frasi): string[]

export interface OpzioniPalco {
  altezza?: number
  frasi?: Frasi
  parent?: HTMLElement
  zIndex?: number
  margine?: number
  saluto?: string
  visibile?: boolean
  onVisibile?: (visibile: boolean) => void
  voceUrl?: ((testo: string) => string) | null
  suoni?: Partial<Record<'rutto' | 'scoreggia' | 'botta', string[]>>
}

export interface Palco {
  readonly visibile: boolean
  canvas: HTMLCanvasElement
  dici(testo: string): void
  zitto(): void
  presenta(vista: string): void
  festa(testo?: string): void
  rutto(): void
  scoreggia(): void
  vattene(): void
  torna(frase?: string): void
  destroy(): void
  debug(pose: 'parla' | 'stordito' | 'preso'): void
}

export function createStage(opzioni?: OpzioniPalco): Palco
