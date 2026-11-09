import { useState } from 'react'
import { ELENCO_MATERIE } from '../data/materie'
import { ORARIO } from '../data/orario'
import { blocchi, bloccoInCorso, indiceOggi } from '../lib/tempo'
import { Cella } from './Cella'

export function OrarioSettimana({ adesso }: { adesso: Date }) {
  const oggi = indiceOggi(adesso)
  const inCorso = oggi !== null ? bloccoInCorso(ORARIO[oggi], adesso) : null
  const maxOre = Math.max(...ORARIO.map((g) => g.ore.length))
  const [scelto, setScelto] = useState(oggi ?? 0)

  const note = [
    ...ORARIO.filter((g) => g.daConfermare).map((g) => `${g.nome}: ${g.daConfermare}`),
    ...ELENCO_MATERIE.filter((m) => m.daChiarire).map((m) => `${m.nome}: ${m.daChiarire}`),
  ]

  return (
    <section className="vista">
      {note.length > 0 && (
        <p className="nota-rossa" title={note.join('\n')}>
          <strong>Da confermare:</strong> {note.join(' — ')}
        </p>
      )}

      <div className="pannello pannello-orario">
        <span className="linguetta">Orario della settimana</span>
      {/* Schermi larghi: tutta la settimana */}
      <div
        className="griglia"
        style={{ gridTemplateRows: `auto repeat(${maxOre}, minmax(0, 1fr))` }}
      >
        {oggi !== null && (
          <div
            className="colonna-oggi"
            aria-hidden="true"
            style={{ gridColumn: oggi + 2, gridRow: `1 / span ${maxOre + 1}` }}
          />
        )}
        {ORARIO.map((g, i) => (
          <div
            key={g.nome}
            className={'intestazione' + (i === oggi ? ' oggi' : '')}
            style={{ gridColumn: i + 2, gridRow: 1 }}
          >
            <span className="giorno">
              {g.nome}
              {i === oggi && <span className="sr-only"> (oggi)</span>}
            </span>
            <span className="orario-giorno">
              {g.entrata}–{g.uscita}
              {g.daConfermare && <span className="domanda"> ?</span>}
            </span>
          </div>
        ))}
        {Array.from({ length: maxOre }, (_, r) => (
          <div key={r} className="numero-ora" style={{ gridColumn: 1, gridRow: r + 2 }}>
            {r + 1}ª
          </div>
        ))}
        {ORARIO.flatMap((g, i) =>
          blocchi(g).map((b) => (
            <Cella
              key={`${g.nome}-${b.inizio}`}
              blocco={b}
              inCorso={i === oggi && inCorso?.inizio === b.inizio}
              style={{ gridColumn: i + 2, gridRow: `${b.inizio + 2} / span ${b.durata}` }}
            />
          )),
        )}
      </div>

      {/* Telefono: un giorno alla volta */}
      <div className="giorno-singolo">
        <div className="schede-giorni" role="tablist" aria-label="Giorno">
          {ORARIO.map((g, i) => (
            <button
              key={g.nome}
              role="tab"
              aria-selected={i === scelto}
              className={i === oggi ? 'oggi' : undefined}
              onClick={() => setScelto(i)}
            >
              {g.nome.slice(0, 3)}
            </button>
          ))}
        </div>
        <div className="lista-ore">
          {blocchi(ORARIO[scelto]).map((b) => (
            <Cella
              key={b.inizio}
              blocco={b}
              inCorso={scelto === oggi && inCorso?.inizio === b.inizio}
              style={{ flexGrow: b.durata }}
            />
          ))}
        </div>
      </div>
      </div>
    </section>
  )
}
