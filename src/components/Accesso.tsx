import { createContext, useContext, useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { Crediti } from './Crediti'

// Il cancello dell'app: si entra solo con un utente creato a mano (scripts/crea-utente.mjs),
// non ci si può iscrivere. Controlla il login e porta i progressi dal database nel browser
// (public/sync.js) PRIMA di montare l'app, perché premi, compiti e zaino leggono localStorage all'avvio.

type StudioSync = {
  avvia: () => Promise<'ok' | 'non-collegato' | 'offline'>
  esci: () => Promise<void>
  haUtente: () => boolean
}
declare global {
  interface Window { studioSync?: StudioSync }
}

export type Profilo = { id: number; nome: string; nomeVisibile: string; immagine: string | null }

/* Copia del profilo nel browser, per mostrare nome e foto anche senza rete.
   Non inizia con "studio-app:", così non finisce tra i progressi. */
const CHIAVE_PROFILO = 'studio-sync:profilo'
function profiloSalvato(): Profilo | null {
  try { return JSON.parse(localStorage.getItem(CHIAVE_PROFILO) ?? 'null') } catch { return null }
}
function salvaProfilo(p: Profilo) {
  try { localStorage.setItem(CHIAVE_PROFILO, JSON.stringify(p)) } catch {}
}

const ProfiloCtx = createContext<{ profilo: Profilo; aggiorna: (p: Profilo) => void } | null>(null)

/** Chi è collegato, e come aggiornarne il profilo dalle impostazioni. */
export function useProfilo() {
  const c = useContext(ProfiloCtx)
  if (!c) throw new Error('useProfilo fuori da <Accesso>')
  return c
}

type Stato = 'controllo' | 'login' | 'dentro'

export function Accesso({ children }: { children: ReactNode }) {
  const [stato, setStato] = useState<Stato>('controllo')
  const [offline, setOffline] = useState(false)
  const [profilo, setProfilo] = useState<Profilo | null>(null)
  const [avviso, setAvviso] = useState('')

  async function entra() {
    const esito = (await window.studioSync?.avvia()) ?? 'offline'
    if (esito === 'non-collegato') return setStato('login')
    if (esito === 'offline') {
      // senza rete si entra solo se da questo browser qualcuno era già collegato: mai dati anonimi
      if (!window.studioSync?.haUtente()) {
        setAvviso('Per entrare serve internet: controlla il collegamento e riprova.')
        return setStato('login')
      }
      setOffline(true)
      setProfilo(profiloSalvato() ?? { id: 0, nome: '', nomeVisibile: 'Ciao!', immagine: null })
      return setStato('dentro')
    }
    try {
      const r = await fetch('/api/io', { credentials: 'same-origin', cache: 'no-store' })
      if (r.status === 401) return setStato('login')
      const p = (await r.json()) as Profilo
      salvaProfilo(p); setProfilo(p)
    } catch {
      setProfilo(profiloSalvato() ?? { id: 0, nome: '', nomeVisibile: 'Ciao!', immagine: null })
    }
    setOffline(false)
    setStato('dentro')
  }

  useEffect(() => { entra() }, [])

  if (stato === 'controllo') return <div className="accesso"><p className="accesso-attesa">Un attimo…</p></div>
  if (stato === 'login') return <Login onEntrato={entra} avviso={avviso} />
  return (
    <ProfiloCtx.Provider value={{ profilo: profilo!, aggiorna: (p) => { salvaProfilo(p); setProfilo(p) } }}>
      {offline && <p className="accesso-offline" role="status">Senza collegamento: i progressi si salvano qui e partono appena torna la rete.</p>}
      {children}
    </ProfiloCtx.Provider>
  )
}

const COSA_CE = [
  { icona: '📅', titolo: 'Oggi e Orario', testo: 'le lezioni del giorno e cosa mettere nello zaino' },
  { icona: '📒', titolo: 'Diario', testo: 'i compiti, anche dettati a voce o presi da uno screen' },
  { icona: '🎬', titolo: 'Lezioni', testo: 'video, schede, esercizi e quiz per prepararti' },
  { icona: '⭐', titolo: 'Personaggi', testo: 'ogni compito fatto vale stelle: sbloccali tutti!' },
]

function Login({ onEntrato, avviso }: { onEntrato: () => void; avviso: string }) {
  const [nome, setNome] = useState('')
  const [password, setPassword] = useState('')
  const [vedi, setVedi] = useState(false)
  const [errore, setErrore] = useState(avviso)
  const [invio, setInvio] = useState(false)

  async function invia(e: FormEvent) {
    e.preventDefault()
    if (!nome.trim() || !password) return setErrore('Scrivi sia il nome sia la password, poi premi Entra.')
    setErrore(''); setInvio(true)
    try {
      const r = await fetch('/api/login', {
        method: 'POST', credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, password }),
      })
      if (r.ok) return onEntrato()
      if (r.status === 401) setErrore('Mmm, nome o password non tornano. Controlla le lettere (maiuscole e minuscole nella password contano) e riprova!')
      else if (r.status === 400) setErrore('Scrivi sia il nome sia la password, poi premi Entra.')
      else setErrore('Il server fa i capricci: riprova tra un attimo.')
    } catch {
      setErrore('Non riesco a collegarmi: controlla internet e riprova.')
    } finally {
      setInvio(false)
    }
  }

  return (
    <div className="accesso accesso-login">
      <main className="accesso-centro">
        <section className="accesso-benvenuto" aria-labelledby="titolo-benvenuto">
          <p className="accesso-sopra">Benvenuti in</p>
          <h1 id="titolo-benvenuto">Il mio studio</h1>
          <p className="accesso-fumetto">
            Un aiuto per studiare, nato per i ragazzi della scuola media. Dentro trovi gli stessi
            contenuti dei tuoi libri di testo, solo in formati diversi: <b>testo, audio, video, quiz
            e interrogazione</b>. 🚀
          </p>
          <ul className="accesso-cosa">
            {COSA_CE.map((c) => (
              <li key={c.titolo}>
                <span className="accesso-icona" aria-hidden="true">{c.icona}</span>
                <span><b>{c.titolo}</b> · {c.testo}</span>
              </li>
            ))}
          </ul>
          <p className="accesso-integra">
            È uno strumento in più per ripassare: non sostituisce i libri e i materiali ufficiali della scuola.
          </p>
        </section>

        <form className="accesso-foglio" onSubmit={invia} noValidate>
          <span className="accesso-etichetta">Entra</span>
          <h2>Ciao! Chi sei?</h2>
          <p className="accesso-spiega">Scrivi il nome e la password che ti hanno dato. Ognuno vede solo i suoi compiti e le sue stelle.</p>
          <label>
            <span>Nome</span>
            <input value={nome} onChange={(e) => setNome(e.target.value)} autoComplete="username" autoCapitalize="none" spellCheck={false} placeholder="il tuo nome" autoFocus />
          </label>
          <label>
            <span>Password</span>
            <span className="accesso-pw">
              <input type={vedi ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" placeholder="la tua password" />
              <button type="button" className="accesso-vedi" onClick={() => setVedi((v) => !v)} aria-pressed={vedi} aria-label={vedi ? 'Nascondi la password' : 'Mostra la password'}>
                {vedi ? '🙈' : '👀'}
              </button>
            </span>
          </label>
          {errore && <p className="accesso-errore" role="alert">{errore}</p>}
          <button className="accesso-entra" disabled={invio}>{invio ? 'Entro…' : 'Entra ▶'}</button>
          <p className="accesso-nota">
            <b>Non hai ancora nome e password?</b> Scrivi un messaggio nella chat del gruppo della classe:
            li prepariamo a mano e te li diamo di persona. Non serve iscriversi online.
          </p>
        </form>
      </main>
      <Crediti />
    </div>
  )
}

/** Pulsante "Esci": salva quello che manca, pulisce il browser e torna al login. */
export async function esci() {
  await window.studioSync?.esci()
  location.reload()
}
