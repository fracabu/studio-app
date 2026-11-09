import { useEffect, useState, type FormEvent, type ReactNode } from 'react'

// Il cancello dell'app: controlla il login e porta i progressi dal database nel browser
// (public/sync.js) PRIMA di montare l'app, perché premi, compiti e zaino leggono localStorage all'avvio.

type StudioSync = {
  avvia: () => Promise<'ok' | 'non-collegato' | 'offline'>
  esci: () => Promise<void>
}
declare global {
  interface Window { studioSync?: StudioSync }
}

type Stato = 'controllo' | 'login' | 'dentro'

export function Accesso({ children }: { children: ReactNode }) {
  const [stato, setStato] = useState<Stato>('controllo')
  const [offline, setOffline] = useState(false)

  async function entra() {
    const esito = (await window.studioSync?.avvia()) ?? 'offline'
    if (esito === 'non-collegato') return setStato('login')
    // offline (niente rete o server spento): si usa quello che c'è nel browser, poi si riprova
    setOffline(esito === 'offline')
    setStato('dentro')
  }

  useEffect(() => { entra() }, [])

  if (stato === 'controllo') return <div className="accesso"><p className="accesso-attesa">Un attimo…</p></div>
  if (stato === 'login') return <Login onEntrato={entra} />
  return (
    <>
      {offline && <p className="accesso-offline" role="status">Senza collegamento: i progressi si salvano qui e partono appena torna la rete.</p>}
      {children}
    </>
  )
}

function Login({ onEntrato }: { onEntrato: () => void }) {
  const [nome, setNome] = useState('')
  const [password, setPassword] = useState('')
  const [errore, setErrore] = useState('')
  const [invio, setInvio] = useState(false)

  async function invia(e: FormEvent) {
    e.preventDefault()
    setErrore(''); setInvio(true)
    try {
      const r = await fetch('/api/login', {
        method: 'POST', credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, password }),
      })
      if (r.ok) return onEntrato()
      const { errore: msg } = await r.json().catch(() => ({ errore: '' }))
      setErrore(msg || 'Qualcosa non va: riprova')
    } catch {
      setErrore('Manca il collegamento a internet')
    } finally {
      setInvio(false)
    }
  }

  return (
    <main className="accesso">
      <form className="accesso-foglio" onSubmit={invia}>
        <span className="accesso-etichetta">Il mio studio</span>
        <h1>Ciao! Chi sei?</h1>
        <label>
          <span>Nome</span>
          <input value={nome} onChange={(e) => setNome(e.target.value)} autoComplete="username" autoCapitalize="none" spellCheck={false} required autoFocus />
        </label>
        <label>
          <span>Password</span>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />
        </label>
        {errore && <p className="accesso-errore" role="alert">{errore}</p>}
        <button className="accesso-entra" disabled={invio}>{invio ? 'Entro…' : 'Entra ▶'}</button>
      </form>
    </main>
  )
}

/** Pulsante "Esci": salva quello che manca, pulisce il browser e torna al login. */
export async function esci() {
  await window.studioSync?.esci()
  location.reload()
}
