import type { Personaggio } from '../data/personaggi'

interface Props {
  p: Personaggio
  bloccato?: boolean
  /** usa la clip "esulta" se c'è */
  esulta?: boolean
  className?: string
}

/**
 * Il personaggio: clip animata di Flow se c'è, altrimenti l'immagine,
 * altrimenti un segnaposto disegnato con il suo colore.
 */
export function Avatar({ p, bloccato, esulta, className }: Props) {
  const clip = esulta ? p.media?.esulta ?? p.media?.fermo : p.media?.fermo
  const classe = 'avatar' + (bloccato ? ' bloccato' : '') + (className ? ` ${className}` : '')

  if (!bloccato && clip) {
    return <video className={classe} src={clip} autoPlay loop muted playsInline aria-label={p.nome} />
  }
  if (p.media?.immagine) {
    return <img className={classe} src={p.media.immagine} alt={bloccato ? 'Personaggio bloccato' : p.nome} />
  }
  return (
    <svg className={classe} viewBox="0 0 120 120" role="img" aria-label={bloccato ? 'Personaggio bloccato' : p.nome}>
      <path
        d="M60 8c26 0 44 16 46 44 2 30-12 58-46 58S12 82 14 52C16 24 34 8 60 8z"
        fill={bloccato ? '#2a1450' : p.colore}
        stroke="#24124a"
        strokeWidth="5"
      />
      {bloccato ? (
        <text x="60" y="78" textAnchor="middle" fontSize="54" fontFamily="Lilita One, sans-serif" fill="#7d5bc7">?</text>
      ) : (
        <>
          <ellipse cx="44" cy="54" rx="11" ry="13" fill="#fff" stroke="#24124a" strokeWidth="4" />
          <ellipse cx="76" cy="54" rx="11" ry="13" fill="#fff" stroke="#24124a" strokeWidth="4" />
          <circle cx="47" cy="57" r="5" fill="#24124a" />
          <circle cx="79" cy="57" r="5" fill="#24124a" />
          <path d="M44 80q16 14 32 0" fill="none" stroke="#24124a" strokeWidth="5" strokeLinecap="round" />
        </>
      )}
    </svg>
  )
}
