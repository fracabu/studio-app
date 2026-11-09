import type { CSSProperties } from 'react'
import { PERSONAGGI, RARITA } from '../data/personaggi'
import { personaggioDelGiorno, prossimo, scegliDelGiorno, totaleStelle, usePremi } from '../lib/premi'
import { Avatar } from './Avatar'

export function Personaggi({ adesso }: { adesso: Date }) {
  const premi = usePremi()
  const stelle = totaleStelle(premi)
  const dopo = prossimo(premi)
  const oggi = personaggioDelGiorno(premi, adesso).p
  const massimo = PERSONAGGI[PERSONAGGI.length - 1].stelle
  const pos = (n: number) => `${Math.min(100, (n / massimo) * 100)}%`

  return (
    <section className="vista">
      {/* La strada delle stelle */}
      <div className="pannello strada">
        <span className="linguetta">Strada delle stelle</span>
        <div className="strada-testa">
          <span className="contatore-grande">★ {stelle}</span>
          <span>
            {dopo
              ? <>Ancora <strong>{dopo.stelle - stelle} stelle</strong> per sbloccare un personaggio {RARITA[dopo.rarita].nome.toLowerCase()}</>
              : 'Hai sbloccato tutti i personaggi!'}
          </span>
        </div>
        <div className="binario" aria-hidden="true">
          <div className="binario-pieno" style={{ width: pos(stelle) }} />
          {PERSONAGGI.map((p) => (
            <span
              key={p.id}
              className={'tappa' + (p.stelle <= stelle ? ' presa' : '')}
              style={{ left: pos(p.stelle), '--rar': RARITA[p.rarita].colore } as CSSProperties}
            >
              {p.stelle}
            </span>
          ))}
        </div>
      </div>

      {/* La collezione */}
      <div className="collezione">
        {PERSONAGGI.map((p) => {
          const preso = p.stelle <= stelle
          const r = RARITA[p.rarita]
          return (
            <article
              key={p.id}
              className={'carta' + (preso ? '' : ' chiusa') + (p.id === oggi.id ? ' scelta' : '')}
              style={{ '--rar': r.colore } as CSSProperties}
            >
              <span className="rarita">{r.nome}</span>
              <Avatar p={p} bloccato={!preso} className="carta-avatar" />
              <h2>{preso ? p.nome : '???'}</h2>
              {preso ? (
                <>
                  <p className="carta-abilita"><strong>{p.abilita.nome}</strong> {p.abilita.effetto}</p>
                  {p.id === oggi.id ? (
                    <span className="carta-oggi">Studi con lui oggi</span>
                  ) : (
                    <button className="link" onClick={() => scegliDelGiorno(adesso, p.id)}>Studia con {p.nome}</button>
                  )}
                </>
              ) : (
                <p className="carta-abilita">Si sblocca a <strong>★ {p.stelle}</strong></p>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}
