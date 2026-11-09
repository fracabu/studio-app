import { useEffect, useRef, useState } from 'react'
import { esci } from './components/Accesso'
import { Avatar } from './components/Avatar'
import { Diario } from './components/Diario'
import { Icona } from './components/Icona'
import { Lezioni } from './components/Lezioni'
import { Materie } from './components/Materie'
import { Oggi } from './components/Oggi'
import { OrarioSettimana } from './components/OrarioSettimana'
import { Personaggi } from './components/Personaggi'
import { Rivelazione } from './components/Rivelazione'
import { Sbrigo } from './components/Sbrigo'
import { applicaPalette, PALETTE, paletteSalvata } from './data/palette'
import { personaggioDelGiorno, totaleStelle, usePremi } from './lib/premi'
import { useAdesso } from './lib/tempo'

const PAGINE = [
  { id: 'oggi', nome: 'Oggi' },
  { id: 'diario', nome: 'Diario' },
  { id: 'lezioni', nome: 'Lezioni' },
  { id: 'orario', nome: 'Orario' },
  { id: 'materie', nome: 'Materie' },
  { id: 'personaggi', nome: 'Personaggi' },
] as const

type PaginaId = (typeof PAGINE)[number]['id']

function paginaDaHash(): PaginaId {
  const h = location.hash.replace('#', '')
  return PAGINE.some((p) => p.id === h) ? (h as PaginaId) : 'oggi'
}

export function App() {
  const adesso = useAdesso()
  const premi = usePremi()
  const [pagina, setPagina] = useState<PaginaId>(paginaDaHash)
  const [palette, setPalette] = useState(paletteSalvata)
  const [coloriAperti, setColoriAperti] = useState(false)
  const menuColori = useRef<HTMLDivElement>(null)

  useEffect(() => applicaPalette(palette), [palette])

  useEffect(() => {
    const onHash = () => setPagina(paginaDaHash())
    addEventListener('hashchange', onHash)
    return () => removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    if (!coloriAperti) return
    const fuori = (e: PointerEvent) => {
      if (!menuColori.current?.contains(e.target as Node)) setColoriAperti(false)
    }
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setColoriAperti(false)
    addEventListener('pointerdown', fuori)
    addEventListener('keydown', esc)
    return () => {
      removeEventListener('pointerdown', fuori)
      removeEventListener('keydown', esc)
    }
  }, [coloriAperti])

  const compagno = personaggioDelGiorno(premi, adesso).p

  return (
    <div className="telaio">
      <header className="barra">
        <span className="marchio">Il mio studio</span>
        <nav className="linguette" aria-label="Sezioni">
          {PAGINE.map((p) => (
            <a key={p.id} href={`#${p.id}`} aria-current={p.id === pagina ? 'page' : undefined}>
              <Icona nome={p.id} />
              <span>{p.nome}</span>
            </a>
          ))}
        </nav>
        <div className="barra-destra">
          <Sbrigo pagina={pagina} adesso={adesso} />
          <div className="menu-colori" ref={menuColori}>
            <button
              className="bottone-colori"
              aria-expanded={coloriAperti}
              onClick={() => setColoriAperti((v) => !v)}
            >
              <Icona nome="colori" /> <span>Colori</span>
            </button>
            {coloriAperti && (
              <div className="tavolozza" role="menu">
                {PALETTE.map((p) => (
                  <button
                    key={p.id}
                    role="menuitemradio"
                    aria-checked={p.id === palette.id}
                    onClick={() => setPalette(p)}
                  >
                    <span className="campioni" aria-hidden="true">
                      <i style={{ background: p.sfondo }} />
                      <i style={{ background: p.linguetta }} />
                      <i style={{ background: p.accento }} />
                    </span>
                    {p.nome}
                  </button>
                ))}
                <button role="menuitem" className="tavolozza-esci" onClick={esci}>Esci ↩</button>
              </div>
            )}
          </div>
          <a className="contatore" href="#personaggi" aria-label={`${totaleStelle(premi)} stelle, vai ai personaggi`}>
            <span aria-hidden="true">★</span> {totaleStelle(premi)}
          </a>
          <a className="compagno" href="#personaggi" title={`Oggi studi con ${compagno.nome}`}>
            <Avatar p={compagno} />
          </a>
        </div>
      </header>
      <main className="app">
        {pagina === 'oggi' && <Oggi adesso={adesso} />}
        {pagina === 'diario' && <Diario adesso={adesso} />}
        {pagina === 'lezioni' && <Lezioni />}
        {pagina === 'orario' && <OrarioSettimana adesso={adesso} />}
        {pagina === 'materie' && <Materie />}
        {pagina === 'personaggi' && <Personaggi adesso={adesso} />}
      </main>
      <Rivelazione />
    </div>
  )
}
