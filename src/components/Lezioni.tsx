import { LEZIONI, NOMI_SEZIONI, urlLezione, type Lezione } from '../data/lezioni'
import { MATERIE } from '../data/materie'
import { usePremi } from '../lib/premi'
import { coloreMateria } from './Cella'

const fmtGiorno = new Intl.DateTimeFormat('it-IT', { weekday: 'long', day: 'numeric', month: 'long' })

/** Vista "Lezioni": una scheda per lezione, con video, scheda per studiare, esercizi e quiz. */
export function Lezioni() {
  const premi = usePremi()
  const ordinate = [...LEZIONI].sort((a, b) => (b.perIl[0] ?? '').localeCompare(a.perIl[0] ?? ''))

  const stato = (l: Lezione) => {
    const ev = premi.eventi
    return {
      video: ev.some((e) => e.id === `video:${l.id}`),
      giuste: ev.filter((e) => e.id.startsWith(`quiz:${l.id}:`) && !e.id.endsWith(':perfetto')).length,
      perfetto: ev.some((e) => e.id === `quiz:${l.id}:perfetto`),
    }
  }

  return (
    <section className="vista">
      <div className="pannello pannello-lezioni-tutte">
        <span className="linguetta">Lezioni</span>
        <ul className="griglia-lezioni">
          {ordinate.map((l) => {
            const m = MATERIE[l.materia]
            const s = stato(l)
            const giorno = l.perIl[0] ? new Date(l.perIl[0] + 'T12:00') : null
            return (
              <li key={l.id} className="scheda-lezione" style={coloreMateria(m.hue, m.chroma)}>
                <a className="copertina" href={urlLezione(l)}>
                  <span className="copertina-materia">{m.emoji} {m.nome}</span>
                  <span className="copertina-titolo">{l.titolo}</span>
                  <span className="copertina-play" aria-hidden="true">▶</span>
                </a>
                <div className="scheda-lezione-testo">
                  <p className="scheda-lezione-fonte">{l.fonte}</p>
                  {giorno && <p className="scheda-lezione-per">Per {fmtGiorno.format(giorno)}</p>}
                  <p className="scheda-lezione-stato">
                    <span className={s.video ? 'fatto' : ''}>{s.video ? '✔' : '○'} Video</span>
                    <span className={s.giuste ? 'fatto' : ''}>
                      ★ Quiz {s.giuste}/{l.domande}{s.perfetto ? ' · perfetto!' : ''}
                    </span>
                  </p>
                  <div className="scheda-lezione-azioni">
                    {l.sezioni.map((v) => (
                      <a key={v} className="bottone-secondario" href={urlLezione(l, v)}>{NOMI_SEZIONI[v]}</a>
                    ))}
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
