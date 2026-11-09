// Elenco delle materie. Il colore è una tonalità OKLCH (0–360): il CSS ne ricava
// sfondo, bordo e testo sia per il tema chiaro sia per quello scuro.

export type MateriaId =
  | 'inglese'
  | 'spagnolo'
  | 'storia'
  | 'geografia'
  | 'motoria'
  | 'scienze'
  | 'tecnologia'
  | 'musica'
  | 'matematica'
  | 'epica'
  | 'grammatica'
  | 'antologia'
  | 'arte'
  | 'religione'
  | 'italiano'
  | 'pianoforte'
  | 'musica-gruppo'

export interface Materia {
  id: MateriaId
  nome: string
  emoji: string
  hue: number
  /** saturazione del colore; 0 = grigio */
  chroma?: number
  /** per i compiti: valgono anche queste lezioni (i compiti di italiano vanno alla prima ora d'italiano, grammatica, epica o antologia) */
  gruppo?: MateriaId[]
  /** nota visibile quando la materia è ancora da chiarire */
  daChiarire?: string
}

const ELENCO: Materia[] = [
  { id: 'inglese', nome: 'Inglese', emoji: '🇬🇧', hue: 25 },
  { id: 'spagnolo', nome: 'Spagnolo', emoji: '🇪🇸', hue: 50 },
  { id: 'storia', nome: 'Storia', emoji: '🏛️', hue: 75 },
  { id: 'geografia', nome: 'Geografia', emoji: '🗺️', hue: 100 },
  { id: 'motoria', nome: 'Motoria', emoji: '🏃', hue: 125 },
  { id: 'scienze', nome: 'Scienze', emoji: '🔬', hue: 150 },
  { id: 'tecnologia', nome: 'Tecnologia', emoji: '⚙️', hue: 170 },
  { id: 'musica', nome: 'Musica', emoji: '🎵', hue: 205 },
  { id: 'pianoforte', nome: 'Pianoforte', emoji: '🎹', hue: 232 },
  { id: 'musica-gruppo', nome: 'Musica di gruppo', emoji: '🎶', hue: 190 },
  { id: 'matematica', nome: 'Matematica', emoji: '📐', hue: 262 },
  // La famiglia dell'italiano ha tonalità vicine (viola → magenta): sono tutte della prof di italiano
  { id: 'epica', nome: 'Epica', emoji: '⚔️', hue: 280 },
  { id: 'italiano', nome: 'Italiano', emoji: '📚', hue: 298, gruppo: ['italiano', 'grammatica', 'epica', 'antologia'] },
  { id: 'grammatica', nome: 'Grammatica', emoji: '✏️', hue: 316 },
  { id: 'antologia', nome: 'Antologia', emoji: '📖', hue: 336 },
  { id: 'arte', nome: 'Arte', emoji: '🎨', hue: 358 },
  { id: 'religione', nome: 'Religione', emoji: '🕊️', hue: 90, chroma: 0.03 },
]

export const MATERIE: Record<MateriaId, Materia> = Object.fromEntries(
  ELENCO.map((m) => [m.id, m]),
) as Record<MateriaId, Materia>

export const ELENCO_MATERIE = ELENCO
