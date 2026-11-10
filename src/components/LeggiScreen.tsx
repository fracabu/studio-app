import { useEffect, useState } from 'react'
import { MATERIE, type MateriaId } from '../data/materie'
import { salvaFile } from '../lib/audio'
import { aggiungiCompiti, giaSulDiario, nuovoId, type Bozza } from '../lib/compiti'
import { contestoScuola } from '../lib/contesto'
import { chiave, daChiave, prossimaLezione, spostaGiorniScuola } from '../lib/date'
import { Revisione } from './Revisione'

interface Props {
  immagini: File[]
  oggi: Date
  onChiudi: () => void
  onSalvato: (primoGiorno: string) => void
}

interface Letto {
  materia: string | null
  testo: string
  /** la data sotto cui il compito compare nello screen, non interpretata */
  dataScreen: string | null
  perIl: string | null
  assegnatoIl: string | null
}

/** Cosa vuol dire la data che il registro mette sopra i compiti. */
type SensoData = 'consegna' | 'assegnato'
const CHIAVE_SENSO = 'studio-app:data-screen'
function sensoSalvato(): SensoData {
  try {
    return localStorage.getItem(CHIAVE_SENSO) === 'assegnato' ? 'assegnato' : 'consegna'
  } catch {
    return 'consegna'
  }
}

const aBase64 = (f: File) =>
  new Promise<string>((ok, ko) => {
    const r = new FileReader()
    r.onload = () => ok(String(r.result).split(',')[1] ?? '')
    r.onerror = () => ko(r.error)
    r.readAsDataURL(f)
  })

const eData = (s: string | null): s is string => Boolean(s && /^\d{4}-\d{2}-\d{2}$/.test(s))

/**
 * Da quello che ha letto Claude alle bozze. In ordine:
 * 1. consegna scritta accanto al compito → quella;
 * 2. data di assegnazione scritta → prossima lezione dopo quella data;
 * 3. data del gruppo nello screen → è la consegna, oppure (se impostato) l'assegnazione;
 * 4. niente date → prossima lezione da oggi.
 */
/**
 * Compiti in cima allo screen, sopra la prima data visibile: la loro intestazione è stata tagliata.
 * Il registro mette i giorni dal più lontano al più vicino, quindi quel giorno viene DOPO la prima
 * data visibile. Restituisce quanti sono e quella data (se le date scendono davvero).
 */
function intestazioneTagliata(letti: Letto[]): { quanti: number; primaData: string } | null {
  const datati = letti.map((l) => l.dataScreen).filter(eData)
  const quanti = letti.findIndex((l) => eData(l.dataScreen))
  if (quanti <= 0 || datati.length < 2) return null
  const scendono = datati.every((d, i) => i === 0 || d <= datati[i - 1])
  return scendono && datati[0] !== datati.at(-1) ? { quanti, primaData: datati[0] } : null
}

function aBozze(letti: Letto[], oggi: Date, senso: SensoData): Bozza[] {
  const dopo = (materia: MateriaId | null, base: Date) =>
    (materia && prossimaLezione(materia, base)) ?? spostaGiorniScuola(base, 1)
  const tagliata = intestazioneTagliata(letti)
  return letti
    .map((l, i) => ({ l, tagliato: tagliata !== null && i < tagliata.quanti }))
    .filter(({ l }) => l.testo?.trim())
    .map(({ l, tagliato }) => {
      const materia = l.materia && l.materia in MATERIE ? (l.materia as MateriaId) : null
      let quando: Date
      if (eData(l.perIl)) quando = daChiave(l.perIl)
      else if (eData(l.assegnatoIl)) quando = dopo(materia, daChiave(l.assegnatoIl))
      else if (eData(l.dataScreen)) quando = senso === 'consegna' ? daChiave(l.dataScreen) : dopo(materia, daChiave(l.dataScreen))
      else if (tagliato && tagliata) quando = dopo(materia, daChiave(tagliata.primaData))
      else quando = dopo(materia, oggi)
      return { id: nuovoId(), materia, testo: l.testo.trim(), perIl: chiave(quando) }
    })
}

export function LeggiScreen({ immagini, oggi, onChiudi, onSalvato }: Props) {
  const [stato, setStato] = useState<'lettura' | 'pronto' | 'errore'>('lettura')
  const [letti, setLetti] = useState<Letto[]>([])
  const [senso, setSenso] = useState<SensoData>(sensoSalvato)
  const [bozze, setBozze] = useState<Bozza[]>([])
  const [doppioni, setDoppioni] = useState<Bozza[]>([])

  /** Cambiare il senso della data ricalcola i giorni (le correzioni a mano si perdono). */
  /** Divide le bozze: quelle nuove da rivedere e quelle già scritte sul diario (da altri screen). */
  function preparaBozze(l: Letto[], s: SensoData) {
    const tutte = aBozze(l, oggi, s)
    setBozze(tutte.filter((b) => !giaSulDiario(b)))
    setDoppioni(tutte.filter((b) => giaSulDiario(b)))
  }

  function cambiaSenso(s: SensoData) {
    setSenso(s)
    preparaBozze(letti, s)
    try {
      localStorage.setItem(CHIAVE_SENSO, s)
    } catch {
      /* vale solo per questa volta */
    }
  }
  const tagliata = intestazioneTagliata(letti)
  const ciSonoDateScreen =letti.some((l) => eData(l.dataScreen) && !eData(l.perIl) && !eData(l.assegnatoIl))
  const [errore, setErrore] = useState('')
  const [tentativo, setTentativo] = useState(0)
  const [anteprime, setAnteprime] = useState<string[]>([])

  useEffect(() => {
    const url = immagini.map((f) => URL.createObjectURL(f))
    setAnteprime(url)
    return () => url.forEach((u) => URL.revokeObjectURL(u))
  }, [immagini])

  useEffect(() => {
    let annullato = false
    const interrompi = new AbortController()
    setStato('lettura')
    ;(async () => {
      try {
        const corpo = {
          contesto: contestoScuola(oggi),
          immagini: await Promise.all(
            immagini.map(async (f) => ({ nome: f.name, tipo: f.type || 'image/png', base64: await aBase64(f) })),
          ),
        }
        // se il pannello è già stato chiuso (o React ha rifatto l'effetto) non si disturba Claude
        if (annullato) return
        const r = await fetch('/api/leggi-screen', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(corpo),
          signal: interrompi.signal,
        })
        const dati = await r.json()
        if (!r.ok) throw new Error(dati.errore ?? `Errore ${r.status}`)
        if (annullato) return
        setLetti(dati.compiti as Letto[])
        preparaBozze(dati.compiti as Letto[], senso)
        setStato('pronto')
      } catch (e) {
        if (annullato) return
        setErrore(e instanceof Error ? e.message : String(e))
        setStato('errore')
      }
    })()
    return () => {
      annullato = true
      interrompi.abort()
    }
    // si rilegge solo con "Riprova"
  }, [tentativo])

  async function salva() {
    // lo screen resta salvato: dal diario si può riaprire l'originale
    const fonteId = nuovoId()
    try {
      await salvaFile(fonteId, immagini[0])
      for (const [i, f] of immagini.slice(1).entries()) await salvaFile(`${fonteId}-${i + 2}`, f)
    } catch {
      /* se non si riesce a salvare l'immagine, i compiti si scrivono lo stesso */
    }
    const creato = new Date().toISOString()
    aggiungiCompiti(bozze.map((b) => ({ ...b, id: nuovoId(), fatto: false, creato, fonteId })))
    onSalvato([...bozze].sort((a, b) => a.perIl.localeCompare(b.perIl))[0]?.perIl ?? chiave(oggi))
  }

  return (
    <section className="dettatura" aria-label="Compiti dallo screen">
      <div className="dettatura-testa">
        <h2>Compiti dallo screen</h2>
        <button className="link" onClick={onChiudi}>Chiudi</button>
      </div>
      <div className="anteprime">
        {anteprime.map((u, i) => (
          <img key={u} src={u} alt={`Screen ${i + 1}`} />
        ))}
      </div>

      {stato === 'lettura' && (
        <p className="in-lettura" role="status">
          <span className="onda" aria-hidden="true"><i /><i /><i /><i /></span>
          Sto leggendo lo screen… ci vuole circa mezzo minuto.
        </p>
      )}

      {stato === 'errore' && (
        <>
          <p className="avviso">{errore}</p>
          <button className="primario" onClick={() => setTentativo((t) => t + 1)}>Riprova</button>
        </>
      )}

      {stato === 'pronto' && (
        <>
          {ciSonoDateScreen && (
            <fieldset className="senso-data">
              <legend>Nello screen, la data sopra i compiti è</legend>
              <label>
                <input type="radio" name="senso" checked={senso === 'consegna'} onChange={() => cambiaSenso('consegna')} />
                il giorno in cui vanno <strong>consegnati</strong>
              </label>
              <label>
                <input type="radio" name="senso" checked={senso === 'assegnato'} onChange={() => cambiaSenso('assegnato')} />
                il giorno in cui sono stati <strong>assegnati</strong> (vanno alla lezione dopo)
              </label>
            </fieldset>
          )}
          {tagliata && (
            <p className="avviso">
              {tagliata.quanti === 1 ? 'Il primo compito sta' : `I primi ${tagliata.quanti} compiti stanno`} sotto
              una data tagliata fuori dallo screen: li ho messi alla lezione dopo il{' '}
              {daChiave(tagliata.primaData).toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' })}.
              Controlla il giorno.
            </p>
          )}
          <h3>Ho letto questi compiti</h3>
          <Revisione bozze={bozze} onChange={setBozze} />
          {doppioni.length > 0 && (
            <p className="tenue">
              {doppioni.length === 1 ? '1 compito era già' : `${doppioni.length} compiti erano già`} sul diario
              (da uno screen di prima): non li riscrivo ({doppioni.map((d) => (d.materia ? MATERIE[d.materia].nome : 'senza materia')).join(', ')}).{' '}
              <button
                className="link"
                onClick={() => {
                  setBozze([...bozze, ...doppioni])
                  setDoppioni([])
                }}
              >
                Rimettili
              </button>
            </p>
          )}
          <div className="azioni">
            <button className="primario" disabled={bozze.length === 0} onClick={salva}>
              Scrivi sul diario
            </button>
          </div>
        </>
      )}
    </section>
  )
}
