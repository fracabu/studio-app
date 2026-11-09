import { ELENCO_MATERIE } from '../data/materie'
import { ORARIO } from '../data/orario'
import { coloreMateria } from './Cella'

export function Materie() {
  const righe = ELENCO_MATERIE.map((m) => {
    const giorni = ORARIO.filter((g) => g.ore.includes(m.id)).map((g) => g.nome.slice(0, 3))
    const ore = ORARIO.reduce((n, g) => n + g.ore.filter((o) => o === m.id).length, 0)
    return { m, giorni, ore }
  })
    .filter((r) => r.ore > 0)
    .sort((a, b) => b.ore - a.ore || a.m.nome.localeCompare(b.m.nome))

  return (
    <section className="vista">
      <p className="sotto-barra">Ogni quadretto è un’ora di lezione alla settimana.</p>
      <div className="pannello pannello-materie">
        <span className="linguetta">Le mie materie</span>
      <div className="indice" style={{ gridTemplateRows: `repeat(${Math.ceil(righe.length / 2)}, minmax(0, 1fr))` }}>
        {righe.map(({ m, giorni, ore }) => (
          <div
            key={m.id}
            className={'indice-riga' + (m.daChiarire ? ' da-chiarire' : '')}
            style={coloreMateria(m.hue, m.chroma)}
            title={m.daChiarire}
          >
            <span className="tacca" aria-hidden="true" />
            <h2>
              {m.nome}
              {m.daChiarire && <span className="domanda"> ?</span>}
            </h2>
            <div className="ore-quadretti" aria-label={`${ore} ore a settimana`}>
              {Array.from({ length: ore }, (_, i) => (
                <i key={i} aria-hidden="true" />
              ))}
            </div>
            <p className="giorni">{giorni.join(' ')}</p>
          </div>
        ))}
      </div>
      </div>
    </section>
  )
}
