import { useEffect, useRef, useState } from 'react'
import { MATERIE } from '../data/materie'
import { useCompiti, type Compito } from '../lib/compiti'
import { chiave, piuGiorni, spostaGiorniScuola } from '../lib/date'
import { createStage, tutteLeFrasi, type Palco } from '../sbrigo/palco'

// Sbrigo, il presentatore dell'app: sta su ogni vista, la presenta, fa la festa quando
// spunti un compito. Si caccia e si richiama dal pulsante nella barra (scelta ricordata).

const CHIAVE = 'studio-app:sbrigo'
const BASE = import.meta.env.BASE_URL
const SUONI = {
  rutto: [1, 2, 3].map((n) => `${BASE}sbrigo/suoni/rutto-${n}.mp3`),
  scoreggia: [1, 2, 3].map((n) => `${BASE}sbrigo/suoni/scoreggia-${n}.mp3`),
  botta: [1, 2].map((n) => `${BASE}sbrigo/suoni/botta-${n}.mp3`),
}
const voceUrl = (testo: string) => `/api/sbrigo/voce?t=${encodeURIComponent(testo)}`

const NUMERI = ['zero', 'uno', 'due', 'tre', 'quattro', 'cinque', 'sei', 'sette', 'otto', 'nove', 'dieci']
const fmtGiorno = new Intl.DateTimeFormat('it-IT', { weekday: 'long' })

function elenco(parole: string[]): string {
  return parole.length <= 1 ? parole.join('') : `${parole.slice(0, -1).join(', ')} e ${parole.at(-1)}`
}

/** Il saluto con i compiti veri del prossimo giorno di scuola. */
export function salutoDelGiorno(compiti: Compito[], adesso: Date): string {
  const giorno = spostaGiorniScuola(adesso, 1)
  const quando = chiave(giorno) === chiave(piuGiorni(adesso, 1)) ? 'domani' : fmtGiorno.format(giorno)
  const tutti = compiti.filter((c) => c.perIl === chiave(giorno))
  const daFare = tutti.filter((c) => !c.fatto)
  if (tutti.length === 0)
    return `Ciao! Per ${quando} sul diario non c'è niente… sicuro sicuro? Controlla bene, che io non ci casco! Se è tutto vero… si va a basket!`
  if (daFare.length === 0) return `Ciao! Per ${quando} hai già fatto tutto. Campione! Allora oggi si va a basket, altroché.`
  const materie = [...new Set(daFare.map((c) => (c.materia ? MATERIE[c.materia].nome.toLowerCase() : null)).filter(Boolean))] as string[]
  const quanti = NUMERI[daFare.length] ?? String(daFare.length)
  const cosa = daFare.length === 1 ? `un compito da fare${materie.length ? ` di ${materie[0]}` : ''}` : `${quanti} compiti da fare${materie.length ? `: ${elenco(materie)}` : ''}`
  return `Ciao! Per ${quando} ci hanno caricato: ${cosa}… Ma se vogliamo andare a basket tocca sbrigarsi! Facciamoli bene e organizzati: così ci mettiamo di meno e prendiamo pure un bel voto!`
}

function visibileSalvato(): boolean {
  try {
    return localStorage.getItem(CHIAVE) !== 'via'
  } catch {
    return true
  }
}

export function Sbrigo({ pagina, adesso }: { pagina: string; adesso: Date }) {
  const compiti = useCompiti()
  const palco = useRef<Palco | null>(null)
  const [visibile, setVisibile] = useState(visibileSalvato)
  const primaPagina = useRef(true)
  // il saluto si calcola una volta, all'apertura
  const saluto = useRef(salutoDelGiorno(compiti, adesso))

  useEffect(() => {
    const stretto = innerWidth < 760
    const p = createStage({
      altezza: stretto ? 140 : 190,
      saluto: saluto.current,
      visibile: visibileSalvato(),
      voceUrl,
      suoni: SUONI,
      onVisibile: (v) => {
        setVisibile(v)
        try {
          localStorage.setItem(CHIAVE, v ? 'qui' : 'via')
        } catch {
          /* resta per questa visita */
        }
      },
    })
    palco.current = p
    // il server prepara in anticipo la voce di tutte le battute (poi restano su disco)
    fetch('/api/sbrigo/scalda', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([saluto.current, ...tutteLeFrasi()]),
    }).catch(() => {})
    const festa = () => palco.current?.festa()
    addEventListener('studio-app:compito-fatto', festa)
    return () => {
      removeEventListener('studio-app:compito-fatto', festa)
      p.destroy()
      palco.current = null
    }
  }, [])

  useEffect(() => {
    if (primaPagina.current) {
      primaPagina.current = false
      return
    }
    palco.current?.presenta(pagina)
  }, [pagina])

  return (
    <button
      className="bottone-colori bottone-sbrigo"
      onClick={() => (visibile ? palco.current?.vattene() : palco.current?.torna())}
      title={visibile ? 'Manda via Sbrigo' : 'Richiama Sbrigo'}
    >
      <b aria-hidden="true">{visibile ? '👋' : '👻'}</b> <span>{visibile ? 'Via Sbrigo' : 'Chiama Sbrigo'}</span>
    </button>
  )
}
