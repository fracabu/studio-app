import { useEffect, useRef, type CSSProperties } from 'react'
import { RARITA } from '../data/personaggi'
import { daRivelare, segnaVisto, usePremi } from '../lib/premi'
import { Avatar } from './Avatar'

/** La scena di sblocco: compare da sola quando le stelle superano una soglia. */
export function Rivelazione() {
  const premi = usePremi()
  const p = daRivelare(premi)[0]
  const bottone = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    bottone.current?.focus()
  }, [p?.id])

  if (!p) return null
  const r = RARITA[p.rarita]
  return (
    <div className="rivelazione" role="dialog" aria-modal="true" aria-labelledby="riv-titolo">
      <div className="raggi" aria-hidden="true" style={{ '--rar': r.colore } as CSSProperties} />
      <div className="riv-carta" style={{ '--rar': r.colore } as CSSProperties}>
        <p className="riv-sopra">Nuovo personaggio sbloccato!</p>
        <Avatar p={p} esulta className="riv-avatar" />
        <p className="rarita">{r.nome}</p>
        <h2 id="riv-titolo">{p.nome}</h2>
        <p className="riv-chi">{p.chiE}</p>
        <p className="riv-abilita">
          <strong>{p.abilita.nome}:</strong> {p.abilita.effetto}
        </p>
        <button ref={bottone} className="bottone-gioco" onClick={() => segnaVisto(p.id)}>
          Evvai!
        </button>
      </div>
    </div>
  )
}
