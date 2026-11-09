import { useEffect, useRef, useState, type DragEvent, type ReactNode } from 'react'
import { lezionePerCompito, urlLezione } from '../data/lezioni'
import { MATERIE } from '../data/materie'
import { apriFile, ascolta } from '../lib/audio'
import { aggiornaCompito, eliminaCompito, useCompiti, type Compito } from '../lib/compiti'
import {
  chiave, daChiave, fmtGiorno, fmtMese, giornoScuolaDa, piuGiorni, spostaGiorniScuola,
} from '../lib/date'
import { premiaCompito } from '../lib/premi'
import { parla, voceDisponibile, zitto } from '../lib/voce'
import { coloreMateria } from './Cella'
import { Dettatura } from './Dettatura'
import { LeggiScreen } from './LeggiScreen'

function useStretto() {
  const q = '(max-width: 760px)'
  const [stretto, setStretto] = useState(() => matchMedia(q).matches)
  useEffect(() => {
    const mq = matchMedia(q)
    const f = () => setStretto(mq.matches)
    mq.addEventListener('change', f)
    return () => mq.removeEventListener('change', f)
  }, [])
  return stretto
}

const soloImmagini = (files: FileList | File[] | null | undefined) =>
  Array.from(files ?? []).filter((f) => f.type.startsWith('image/'))

type Pannello = { tipo: 'dettatura' } | { tipo: 'screen'; immagini: File[] } | null

export function Diario({ adesso }: { adesso: Date }) {
  const oggi = piuGiorni(adesso, 0)
  const stretto = useStretto()
  const perVolta = stretto ? 1 : 2
  const [inizio, setInizio] = useState(() => giornoScuolaDa(oggi))
  /** la pagina che sta girando: da quale apertura a quale */
  const [giro, setGiro] = useState<{ verso: 'avanti' | 'indietro'; da: Date; a: Date } | null>(null)
  const [pannello, setPannello] = useState<Pannello>(null)
  const [trascina, setTrascina] = useState(false)
  const [parlando, setParlando] = useState<string | null>(null)
  const scegliFile = useRef<HTMLInputElement>(null)
  const swipe = useRef<{ x: number; y: number } | null>(null)
  const compiti = useCompiti()

  const apertura = (d: Date) => Array.from({ length: perVolta }, (_, i) => spostaGiorniScuola(d, i))
  const pagine = apertura(inizio)
  const giraVerso = (a: Date) => {
    if (giro || chiave(a) === chiave(inizio)) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return setInizio(a)
    setGiro({ verso: a > inizio ? 'avanti' : 'indietro', da: inizio, a })
  }
  const fineGiro = () => {
    if (!giro) return
    setInizio(giro.a)
    setGiro(null)
  }
  const sfoglia = (n: number) => giraVerso(spostaGiorniScuola(inizio, n * perVolta))
  const vaiA = (d: Date) => {
    const g = giornoScuolaDa(d)
    // se il giorno è già aperto, non si sfoglia
    if (pagine.some((p) => chiave(p) === chiave(g))) return
    giraVerso(g)
  }
  const apriScreen = (files: File[]) => files.length > 0 && setPannello({ tipo: 'screen', immagini: files })

  useEffect(() => {
    const tasti = (e: KeyboardEvent) => {
      if (pannello || (e.target as HTMLElement).closest('input, textarea, select')) return
      if (e.key === 'ArrowRight') sfoglia(1)
      if (e.key === 'ArrowLeft') sfoglia(-1)
    }
    // Ctrl+V di uno screen copiato da WhatsApp Web
    const incolla = (e: ClipboardEvent) => {
      if (pannello) return
      const img = soloImmagini(e.clipboardData?.files)
      if (img.length) {
        e.preventDefault()
        apriScreen(img)
      }
    }
    addEventListener('keydown', tasti)
    addEventListener('paste', incolla)
    return () => {
      removeEventListener('keydown', tasti)
      removeEventListener('paste', incolla)
    }
  })

  useEffect(() => () => zitto(), [])

  function leggiGiorno(g: Date, lista: Compito[]) {
    const k = chiave(g)
    if (parlando === k) {
      zitto()
      setParlando(null)
      return
    }
    const intro = `Compiti per ${fmtGiorno.format(g)} ${g.getDate()} ${fmtMese.format(g)}.`
    const corpo = lista.length
      ? lista.map((c) => `${c.materia ? MATERIE[c.materia].nome + '. ' : ''}${c.testo}.`).join(' ')
      : 'Nessun compito per questo giorno.'
    if (parla(`${intro} ${corpo}`, () => setParlando((p) => (p === k ? null : p)))) setParlando(k)
  }

  const suTrascina = (e: DragEvent) => {
    if (!Array.from(e.dataTransfer.items).some((i) => i.kind === 'file')) return
    e.preventDefault()
    setTrascina(true)
  }
  const suLascia = (e: DragEvent) => {
    e.preventDefault()
    setTrascina(false)
    apriScreen(soloImmagini(e.dataTransfer.files))
  }

  /** Una pagina del diario in una certa colonna. */
  const pagina = (g: Date, lato: 'sinistra' | 'destra', colonna?: number, angolo?: 'avanti' | 'indietro') => {
    const lista = compiti.filter((c) => c.perIl === chiave(g))
    return (
      <PaginaDiario
        key={`${chiave(g)}-${lato}`}
        giorno={g}
        oggi={oggi}
        lato={lato}
        compiti={lista}
        parla={parlando === chiave(g)}
        onAscolta={() => leggiGiorno(g, lista)}
        colonna={colonna}
        angolo={angolo}
        onAngolo={angolo ? () => sfoglia(angolo === 'avanti' ? 1 : -1) : undefined}
      />
    )
  }

  /**
   * Il foglio che gira: davanti la pagina che se ne va, dietro quella che arriva.
   * Sotto, intanto, si vedono già le pagine giuste.
   */
  const foglia = (classe: string, colonna: number, davanti: ReactNode, dietro: ReactNode) => (
    <div
      className={`foglia ${classe}`}
      style={{ gridColumn: colonna, gridRow: 1 }}
      aria-hidden="true"
      onAnimationEnd={(e) => e.target === e.currentTarget && fineGiro()}
    >
      <div className="faccia">{davanti}</div>
      <div className="faccia retro">{dietro}</div>
    </div>
  )

  function renderApertura() {
    if (!giro) {
      return perVolta === 2
        ? [pagina(pagine[0], 'sinistra', 1, 'indietro'), pagina(pagine[1], 'destra', 2, 'avanti')]
        : [pagina(pagine[0], 'destra', 1, 'avanti')]
    }
    const da = apertura(giro.da)
    const a = apertura(giro.a)
    if (perVolta === 2) {
      return giro.verso === 'avanti'
        ? [
            pagina(da[0], 'sinistra', 1),
            pagina(a[1], 'destra', 2),
            foglia('gira-avanti', 2, pagina(da[1], 'destra'), pagina(a[0], 'sinistra')),
          ]
        : [
            pagina(a[0], 'sinistra', 1),
            pagina(da[1], 'destra', 2),
            foglia('gira-indietro', 1, pagina(da[0], 'sinistra'), pagina(a[1], 'destra')),
          ]
    }
    // telefono: una pagina sola che si stacca (avanti) o torna giù (indietro)
    return giro.verso === 'avanti'
      ? [pagina(a[0], 'destra', 1), foglia('stacca', 1, pagina(da[0], 'destra'), <article className="foglio-diario retro-bianco" />)]
      : [pagina(da[0], 'destra', 1), foglia('rientra', 1, pagina(a[0], 'destra'), <article className="foglio-diario retro-bianco" />)]
  }

  const suOggi = pagine.some((p) => chiave(p) === chiave(giornoScuolaDa(oggi)))
  const chiudi = () => setPannello(null)
  const salvato = (giorno: string) => {
    setPannello(null)
    vaiA(daChiave(giorno))
  }

  return (
    <section
      className="vista vista-diario"
      onDragOver={suTrascina}
      onDragLeave={(e) => e.currentTarget === e.target && setTrascina(false)}
      onDrop={suLascia}
    >
      <div className="barra-vista">
        <div className="sfoglia">
          <button className="freccia" onClick={() => sfoglia(-1)} aria-label="Pagina precedente">‹</button>
          <button className="freccia" onClick={() => sfoglia(1)} aria-label="Pagina successiva">›</button>
          {!suOggi && <button className="link" onClick={() => vaiA(oggi)}>Torna a oggi</button>}
        </div>
        <div className="azioni-diario">
          <button className="bottone-secondario" onClick={() => scegliFile.current?.click()}>
            Carica screen
          </button>
          <input
            ref={scegliFile}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={(e) => {
              apriScreen(soloImmagini(e.target.files))
              e.target.value = ''
            }}
          />
          <button className="primario" onClick={() => setPannello({ tipo: 'dettatura' })}>
            <span className="pallino" aria-hidden="true" /> Detta i compiti
          </button>
        </div>
      </div>

      <div
        className={'diario' + (perVolta === 2 ? ' doppio' : '') + (giro ? ' in-giro' : '')}
        onPointerDown={(e) => {
          if ((e.target as HTMLElement).closest('button, input, a, label')) return
          swipe.current = { x: e.clientX, y: e.clientY }
        }}
        onPointerUp={(e) => {
          const s = swipe.current
          swipe.current = null
          if (!s) return
          const dx = e.clientX - s.x
          // swipe orizzontale deciso: verso sinistra si va avanti, come girare una pagina vera
          if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(e.clientY - s.y) * 1.5) sfoglia(dx < 0 ? 1 : -1)
        }}
      >
        {renderApertura()}
      </div>

      {trascina && (
        <div className="zona-rilascio" aria-hidden="true">
          <p>Lascia qui lo screen dei compiti</p>
        </div>
      )}

      {pannello?.tipo === 'dettatura' && <Dettatura oggi={oggi} onChiudi={chiudi} onSalvato={salvato} />}
      {pannello?.tipo === 'screen' && (
        <LeggiScreen immagini={pannello.immagini} oggi={oggi} onChiudi={chiudi} onSalvato={salvato} />
      )}
    </section>
  )
}

interface PropsPagina {
  giorno: Date
  oggi: Date
  lato: 'sinistra' | 'destra'
  compiti: Compito[]
  parla: boolean
  onAscolta: () => void
  colonna?: number
  /** angolo piegato in basso, per girare la pagina con un clic */
  angolo?: 'avanti' | 'indietro'
  onAngolo?: () => void
}

function PaginaDiario({
  giorno, oggi, lato, compiti, parla: staParlando, onAscolta, colonna, angolo, onAngolo,
}: PropsPagina) {
  const eOggi = chiave(giorno) === chiave(oggi)
  const eDomani = chiave(giorno) === chiave(piuGiorni(oggi, 1))
  return (
    <article className={`foglio-diario ${lato}`} style={colonna ? { gridColumn: colonna, gridRow: 1 } : undefined}>
      {angolo && onAngolo && (
        <button
          className={`orecchia ${angolo}`}
          onClick={onAngolo}
          aria-label={angolo === 'avanti' ? 'Gira pagina' : 'Torna alla pagina prima'}
          title={angolo === 'avanti' ? 'Gira pagina' : 'Pagina prima'}
        />
      )}
      <header className="data-diario">
        <span className="numero">{giorno.getDate()}</span>
        <span className="giorno-mese">
          <span className="giorno-nome">{fmtGiorno.format(giorno)}</span>
          <span>{fmtMese.format(giorno)}</span>
        </span>
        <span className="data-destra">
        {(eOggi || eDomani) && <span className="quando">{eOggi ? 'oggi' : 'domani'}</span>}
        {voceDisponibile && (
          <button
            className={'play' + (staParlando ? ' attivo' : '')}
            onClick={onAscolta}
            aria-label={staParlando ? 'Ferma la lettura' : `Ascolta i compiti di ${fmtGiorno.format(giorno)}`}
            title={staParlando ? 'Ferma' : 'Ascolta i compiti'}
          >
            {staParlando ? <span className="quadrato" /> : <span className="triangolo" />}
          </button>
        )}
        </span>
      </header>
      <ul className="righe">
        {compiti.map((c) => {
          const m = c.materia ? MATERIE[c.materia] : null
          return (
            <li key={c.id} className={c.fatto ? 'fatto' : undefined}>
              <input
                type="checkbox"
                checked={c.fatto}
                aria-label={c.fatto ? 'Segna da fare' : 'Segna fatto'}
                onChange={() => {
                  aggiornaCompito(c.id, { fatto: !c.fatto })
                  premiaCompito(c.id, !c.fatto)
                }}
              />
              <span className="riga-testo">
                {m && <mark style={coloreMateria(m.hue, m.chroma)}>{m.nome}</mark>} {c.testo}
              </span>
              {lezionePerCompito(c) && (
                <a className="bottone-lezione" href={urlLezione(lezionePerCompito(c)!, 'video')}>▶ Lezione</a>
              )}
              <span className="riga-azioni">
                {c.audioId && (
                  <button className="link" onClick={() => ascolta(c.audioId!)}>Ascolta</button>
                )}
                {c.fonteId && (
                  <button className="link" onClick={() => apriFile(c.fonteId!)}>Screen</button>
                )}
                <button
                  className="link"
                  onClick={() => {
                    eliminaCompito(c.id)
                    premiaCompito(c.id, false)
                  }}
                >
                  Cancella
                </button>
              </span>
            </li>
          )
        })}
      </ul>
    </article>
  )
}
