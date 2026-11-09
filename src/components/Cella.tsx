import type { CSSProperties } from 'react'
import { MATERIE } from '../data/materie'
import type { Blocco } from '../lib/tempo'

export const coloreMateria = (hue: number, chroma = 0.13) =>
  ({ '--h': hue, '--c': chroma }) as CSSProperties

interface Props {
  blocco: Blocco
  inCorso?: boolean
  style?: CSSProperties
}

export function Cella({ blocco, inCorso, style }: Props) {
  const m = MATERIE[blocco.materia]
  const classi = ['cella']
  if (inCorso) classi.push('in-corso')
  if (m.daChiarire) classi.push('da-chiarire')
  if (blocco.durata > 1) classi.push('doppia')
  return (
    <div
      className={classi.join(' ')}
      style={{ ...coloreMateria(m.hue, m.chroma), ...style }}
      title={m.daChiarire}
    >
      <span className="cella-dentro">
        <span className="cella-nome">
          {m.nome}
          {m.daChiarire && <span className="domanda"> ?</span>}
        </span>
        <span className="cella-ora">
          {blocco.dalle}–{blocco.alle}
          {blocco.durata > 1 && `, ${blocco.durata} ore`}
        </span>
      </span>
      {inCorso && <span className="adesso">adesso</span>}
    </div>
  )
}
