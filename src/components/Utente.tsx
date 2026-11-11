import { useEffect, useRef, useState, type FormEvent } from 'react'
import { esci, useProfilo, type Profilo } from './Accesso'

/** Foto dell'utente, o l'iniziale del nome su un cerchio colorato. */
export function FotoUtente({ profilo, className }: { profilo: Profilo; className?: string }) {
  const classe = 'foto-utente' + (className ? ` ${className}` : '')
  if (profilo.immagine) return <img className={classe} src={profilo.immagine} alt="" />
  return <span className={classe} aria-hidden="true">{(profilo.nomeVisibile || profilo.nome || '?').charAt(0).toUpperCase()}</span>
}

/** Nella barra: foto e nome di chi è collegato; il menu ha Impostazioni ed Esci. */
export function MenuUtente() {
  const { profilo } = useProfilo()
  const [aperto, setAperto] = useState(false)
  const [impostazioni, setImpostazioni] = useState(false)
  const box = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!aperto) return
    const fuori = (e: PointerEvent) => { if (!box.current?.contains(e.target as Node)) setAperto(false) }
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setAperto(false)
    addEventListener('pointerdown', fuori); addEventListener('keydown', esc)
    return () => { removeEventListener('pointerdown', fuori); removeEventListener('keydown', esc) }
  }, [aperto])

  return (
    <div className="menu-utente" ref={box}>
      <button className="bottone-utente" aria-expanded={aperto} aria-haspopup="menu" onClick={() => setAperto((v) => !v)} title={`Collegato come ${profilo.nomeVisibile}`}>
        <FotoUtente profilo={profilo} />
        <span className="bottone-utente-nome">{profilo.nomeVisibile}</span>
      </button>
      {aperto && (
        <div className="tavolozza menu-utente-tendina" role="menu">
          <p className="menu-utente-ciao">
            <FotoUtente profilo={profilo} className="grande" />
            <span>Ciao, <b>{profilo.nomeVisibile}</b>!<small>{profilo.nome ? `entri come «${profilo.nome}»` : 'senza collegamento'}</small></span>
          </p>
          <button role="menuitem" onClick={() => { setAperto(false); setImpostazioni(true) }} disabled={!profilo.id}>⚙️ Impostazioni</button>
          <button role="menuitem" className="tavolozza-esci" onClick={esci}>Esci ↩</button>
        </div>
      )}
      {impostazioni && <Impostazioni onChiudi={() => setImpostazioni(false)} />}
    </div>
  )
}

/** Rimpicciolisce la foto nel browser: quadrato 256 px, ritagliato al centro. */
async function fotoPiccola(file: File): Promise<string> {
  const url = URL.createObjectURL(file)
  try {
    const img = new Image()
    img.src = url
    await img.decode()
    const lato = Math.min(img.naturalWidth, img.naturalHeight)
    const c = document.createElement('canvas'); c.width = c.height = 256
    const ctx = c.getContext('2d')!
    ctx.drawImage(img, (img.naturalWidth - lato) / 2, (img.naturalHeight - lato) / 2, lato, lato, 0, 0, 256, 256)
    const webp = c.toDataURL('image/webp', 0.85)
    return webp.startsWith('data:image/webp') ? webp : c.toDataURL('image/jpeg', 0.85)
  } finally {
    URL.revokeObjectURL(url)
  }
}

async function chiedi(url: string, metodo: string, corpo: unknown) {
  const r = await fetch(url, {
    method: metodo, credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(corpo),
  })
  const dati = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(dati.errore || 'Qualcosa non è andato: riprova')
  return dati
}

function Impostazioni({ onChiudi }: { onChiudi: () => void }) {
  const { profilo, aggiorna } = useProfilo()
  const [nome, setNome] = useState(profilo.nomeVisibile)
  const [msgProfilo, setMsgProfilo] = useState<{ ok: boolean; testo: string } | null>(null)
  const [vecchia, setVecchia] = useState('')
  const [nuova, setNuova] = useState('')
  const [ripeti, setRipeti] = useState('')
  const [msgPw, setMsgPw] = useState<{ ok: boolean; testo: string } | null>(null)
  const [lavoro, setLavoro] = useState(false)
  const file = useRef<HTMLInputElement>(null)
  const dialogo = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && onChiudi()
    addEventListener('keydown', esc)
    dialogo.current?.focus()
    return () => removeEventListener('keydown', esc)
  }, [onChiudi])

  async function salvaProfilo(cambi: { nomeVisibile?: string; immagine?: string | null }, ok: string) {
    setLavoro(true); setMsgProfilo(null)
    try { aggiorna(await chiedi('/api/profilo', 'PUT', cambi)); setMsgProfilo({ ok: true, testo: ok }) }
    catch (e) { setMsgProfilo({ ok: false, testo: e instanceof Error ? e.message : 'Errore' }) }
    finally { setLavoro(false) }
  }

  async function sceltaFoto(f: File | undefined) {
    if (!f) return
    if (!f.type.startsWith('image/')) return setMsgProfilo({ ok: false, testo: 'Scegli un\'immagine (foto o disegno).' })
    try { await salvaProfilo({ immagine: await fotoPiccola(f) }, 'Foto nuova salvata!') }
    catch { setMsgProfilo({ ok: false, testo: 'Non riesco a leggere questa immagine: provane un\'altra.' }) }
  }

  async function cambiaPassword(e: FormEvent) {
    e.preventDefault(); setMsgPw(null)
    if (nuova.length < 6) return setMsgPw({ ok: false, testo: 'La nuova password deve avere almeno 6 caratteri.' })
    if (nuova !== ripeti) return setMsgPw({ ok: false, testo: 'Le due password nuove non sono uguali.' })
    setLavoro(true)
    try {
      await chiedi('/api/password', 'POST', { vecchia, nuova })
      setVecchia(''); setNuova(''); setRipeti('')
      setMsgPw({ ok: true, testo: 'Password cambiata! Dalla prossima volta usa quella nuova.' })
    } catch (err) { setMsgPw({ ok: false, testo: err instanceof Error ? err.message : 'Errore' }) }
    finally { setLavoro(false) }
  }

  return (
    <div className="velo" onPointerDown={(e) => e.target === e.currentTarget && onChiudi()}>
      <div className="impostazioni" role="dialog" aria-modal="true" aria-labelledby="titolo-impostazioni" tabIndex={-1} ref={dialogo}>
        <span className="impostazioni-etichetta">Impostazioni</span>
        <button className="impostazioni-chiudi" onClick={onChiudi} aria-label="Chiudi">✕</button>
        <h2 id="titolo-impostazioni" className="sr-only">Impostazioni utente</h2>
        <div className="impostazioni-corpo">
          <section className="impostazioni-blocco impostazioni-profilo">
            <FotoUtente profilo={profilo} className="enorme" />
            <div className="impostazioni-foto-azioni">
              <h3>La tua foto</h3>
              <input ref={file} type="file" accept="image/*" hidden onChange={(e) => { sceltaFoto(e.target.files?.[0]); e.target.value = '' }} />
              <button className="bottone-secondario" onClick={() => file.current?.click()} disabled={lavoro}>📷 Scegli un'immagine</button>
              {profilo.immagine && <button className="link-piccolo" onClick={() => salvaProfilo({ immagine: null }, 'Foto tolta.')} disabled={lavoro}>Togli la foto</button>}
            </div>
          </section>

          <form className="impostazioni-blocco" onSubmit={(e) => { e.preventDefault(); salvaProfilo({ nomeVisibile: nome }, 'Nome salvato!') }}>
            <h3>Il tuo nome nell'app</h3>
            <div className="impostazioni-riga">
              <input value={nome} onChange={(e) => setNome(e.target.value)} maxLength={30} aria-label="Nome da mostrare" />
              <button className="bottone-secondario" disabled={lavoro || !nome.trim() || nome.trim() === profilo.nomeVisibile}>Salva</button>
            </div>
            <p className="impostazioni-nota">Per entrare continui a usare «{profilo.nome}».</p>
          </form>
          {msgProfilo && <p className={msgProfilo.ok ? 'messaggio-ok' : 'accesso-errore'} role="status">{msgProfilo.testo}</p>}

          <form className="impostazioni-blocco" onSubmit={cambiaPassword}>
            <h3>Cambia password</h3>
            <input type="password" placeholder="password di adesso" value={vecchia} onChange={(e) => setVecchia(e.target.value)} autoComplete="current-password" aria-label="Password di adesso" />
            <input type="password" placeholder="password nuova (almeno 6 caratteri)" value={nuova} onChange={(e) => setNuova(e.target.value)} autoComplete="new-password" aria-label="Password nuova" />
            <input type="password" placeholder="ripeti la password nuova" value={ripeti} onChange={(e) => setRipeti(e.target.value)} autoComplete="new-password" aria-label="Ripeti la password nuova" />
            <button className="bottone-secondario" disabled={lavoro || !vecchia || !nuova}>Cambia password</button>
            {msgPw && <p className={msgPw.ok ? 'messaggio-ok' : 'accesso-errore'} role="status">{msgPw.testo}</p>}
          </form>
        </div>
      </div>
    </div>
  )
}
