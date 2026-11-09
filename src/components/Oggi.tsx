import { useEffect, useState, type CSSProperties } from 'react'
import { lezionePerCompito, urlLezione } from '../data/lezioni'
import { MATERIE } from '../data/materie'
import { ORARIO } from '../data/orario'
import { EXTRA_ZAINO } from '../data/zaino'
import { RARITA } from '../data/personaggi'
import { aggiornaCompito, useCompiti } from '../lib/compiti'
import { chiave, spostaGiorniScuola } from '../lib/date'
import { personaggioDelGiorno, premiaCompito, sbloccati, scegliDelGiorno, usePremi } from '../lib/premi'
import { blocchi, bloccoInCorso, indiceOggi } from '../lib/tempo'
import { Avatar } from './Avatar'
import { Cella, coloreMateria } from './Cella'

const fmtGiorno = new Intl.DateTimeFormat('it-IT', { weekday: 'long' })
const fmtData = new Intl.DateTimeFormat('it-IT', { day: 'numeric', month: 'long' })

/** Lo zaino spuntato resta salvato sul dispositivo per la giornata. */
function useZaino(chiaveZaino: string) {
  const [fatti, setFatti] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(chiaveZaino) ?? '[]')
    } catch {
      return []
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem(chiaveZaino, JSON.stringify(fatti))
    } catch {
      /* resta solo per questa visita */
    }
  }, [chiaveZaino, fatti])
  const cambia = (id: string) =>
    setFatti((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]))
  return [fatti, cambia] as const
}

export function Oggi({ adesso }: { adesso: Date }) {
  const premi = usePremi()
  const compiti = useCompiti()
  const [scegli, setScegli] = useState(false)

  const oggi = indiceOggi(adesso)
  const giornoOggi = oggi !== null ? ORARIO[oggi] : null
  const inCorso = giornoOggi ? bloccoInCorso(giornoOggi, adesso) : null

  const dataProssimo = spostaGiorniScuola(adesso, 1)
  const giornoProssimo = ORARIO[dataProssimo.getDay() - 1]
  const eDomani = dataProssimo.getDate() === new Date(adesso.getFullYear(), adesso.getMonth(), adesso.getDate() + 1).getDate()
  const quando = eDomani ? 'domani' : fmtGiorno.format(dataProssimo)
  const materieZaino = [...new Set(giornoProssimo.ore)].map((id) => MATERIE[id])
  const extraZaino = EXTRA_ZAINO[dataProssimo.getDay()] ?? []
  const [fatti, cambia] = useZaino(`studio-app:zaino:${adesso.toDateString()}`) // col prefisso: così si sincronizza col database
  const compitiProssimi = compiti.filter((c) => c.perIl === chiave(dataProssimo))

  const { p: compagno } = personaggioDelGiorno(premi, adesso)
  const disponibili = sbloccati(premi)

  return (
    <section className="vista">
      <div className="oggi-layout">
        {/* Al centro: il personaggio del giorno */}
        <div className="eroe">
          <div className="cartello">
            <span className="cartello-giorno">{fmtGiorno.format(adesso)}</span>
            <span className="cartello-data">{fmtData.format(adesso)}</span>
          </div>
          <div className="eroe-macchia" style={{ '--rar': RARITA[compagno.rarita].colore } as CSSProperties}>
            <svg className="scarabocchi" viewBox="0 0 400 400" aria-hidden="true">
              <path d="M40 120c-10-40 10-70 40-80" />
              <path d="M72 34l10 7-11 6" />
              <path d="M360 140c14 40 4 80-26 100" />
              <path d="M326 232l8 10 6-12" />
              <path d="M60 300c20 40 60 60 100 60" />
              <path d="M150 352l12 8-12 8" />
              <path d="M300 50l14-14M318 70l20-6M290 36l4-20" />
            </svg>
            <Avatar p={compagno} className="eroe-avatar" />
          </div>
          <div className="targhetta">
            <span>Oggi studi con</span>
            <strong>{compagno.nome}</strong>
            <button className="link" onClick={() => setScegli((v) => !v)} aria-expanded={scegli}>
              {scegli ? 'Chiudi' : 'Cambia'}
            </button>
          </div>
          {scegli && (
            <div className="scelta-compagno" role="radiogroup" aria-label="Con chi studi oggi">
              {disponibili.map((p) => (
                <button
                  key={p.id}
                  role="radio"
                  aria-checked={p.id === compagno.id}
                  onClick={() => {
                    scegliDelGiorno(adesso, p.id)
                    setScegli(false)
                  }}
                >
                  <Avatar p={p} />
                  <span>{p.nome}</span>
                </button>
              ))}
              {disponibili.length === 1 && (
                <p>Fai i compiti e i quiz per sbloccare altri personaggi.</p>
              )}
            </div>
          )}
        </div>

        {/* A sinistra: le lezioni di oggi */}
        <div className="pannello pannello-lezioni">
          <span className="linguetta">Lezioni di oggi</span>
          {giornoOggi ? (
            <div className="lista-ore">
              {blocchi(giornoOggi).map((b) => (
                <Cella
                  key={b.inizio}
                  blocco={b}
                  inCorso={inCorso?.inizio === b.inizio}
                  style={{ flexGrow: b.durata }}
                />
              ))}
            </div>
          ) : (
            <p className="vuoto">Oggi niente scuola. Ricarica le batterie!</p>
          )}
        </div>

        {/* A destra: compiti e zaino per il prossimo giorno */}
        <div className="colonna-destra">
          <div className="pannello pannello-compiti">
            <span className="linguetta">Compiti per {quando}</span>
            {compitiProssimi.length === 0 ? (
              <p className="vuoto">
                Niente sul diario per {quando}. <a href="#diario">Apri il diario</a>
              </p>
            ) : (
              <ul className="lista-spunta">
                {compitiProssimi.map((c) => {
                  const m = c.materia ? MATERIE[c.materia] : null
                  return (
                    <li key={c.id} style={m ? coloreMateria(m.hue, m.chroma) : coloreMateria(0, 0)}>
                      <label>
                        <input
                          type="checkbox"
                          checked={c.fatto}
                          onChange={() => {
                            aggiornaCompito(c.id, { fatto: !c.fatto })
                            premiaCompito(c.id, !c.fatto)
                          }}
                        />
                        <span>
                          {m && <b>{m.nome}</b>} {c.testo}
                        </span>
                      </label>
                      {lezionePerCompito(c) && (
                        <a className="bottone-lezione" href={urlLezione(lezionePerCompito(c)!, 'video')}>
                          ▶ Lezione
                        </a>
                      )}
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          <div className="pannello pannello-zaino">
            <span className="linguetta">Zaino per {quando}</span>
            <ul className="lista-spunta zaino">
              {materieZaino.map((m) => (
                <li key={m.id} style={coloreMateria(m.hue, m.chroma)}>
                  <label>
                    <input type="checkbox" checked={fatti.includes(m.id)} onChange={() => cambia(m.id)} />
                    <span>{m.nome}</span>
                  </label>
                </li>
              ))}
              {extraZaino.map((x) => (
                <li key={x.id} className="zaino-extra" style={coloreMateria(0, 0)}>
                  <label>
                    <input type="checkbox" checked={fatti.includes(x.id)} onChange={() => cambia(x.id)} />
                    <span><span aria-hidden="true">{x.icona}</span> {x.nome}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
