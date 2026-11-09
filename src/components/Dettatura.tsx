import { useMemo, useState } from 'react'
import { salvaAudio } from '../lib/audio'
import { aggiungiCompiti, capisciCompiti, nuovoId, type Bozza } from '../lib/compiti'
import { chiave } from '../lib/date'
import { trascrizioneDisponibile, useDettatura } from '../lib/dettatura'
import { Revisione } from './Revisione'

interface Props {
  oggi: Date
  onChiudi: () => void
  onSalvato: (primoGiorno: string) => void
}

export function Dettatura({ oggi, onChiudi, onSalvato }: Props) {
  const d = useDettatura()
  // Le correzioni a mano sulle bozze: se il testo cambia, si riparte da quello che ha capito l'app
  const [modifiche, setModifiche] = useState<{ testo: string; bozze: Bozza[] } | null>(null)
  const capite = useMemo(() => capisciCompiti(d.testo, oggi), [d.testo, oggi])
  const bozze = modifiche && modifiche.testo === d.testo ? modifiche.bozze : capite
  const urlAudio = useMemo(() => (d.audio ? URL.createObjectURL(d.audio) : null), [d.audio])

  async function salva() {
    let audioId: string | undefined
    if (d.audio && d.audio.size > 0) {
      audioId = nuovoId()
      try {
        await salvaAudio(audioId, d.audio)
      } catch {
        audioId = undefined
      }
    }
    const creato = new Date().toISOString()
    aggiungiCompiti(bozze.map((b) => ({ ...b, id: nuovoId(), fatto: false, creato, audioId })))
    onSalvato([...bozze].sort((a, b) => a.perIl.localeCompare(b.perIl))[0]?.perIl ?? chiave(oggi))
  }

  return (
    <section className="dettatura" aria-label="Detta i compiti">
      <div className="dettatura-testa">
        <h2>Detta i compiti</h2>
        <button className="link" onClick={onChiudi}>Chiudi</button>
      </div>

      {d.stato === 'pronto' && (
        <>
          <p className="tenue">
            Di’ il giorno, la materia e il compito. Per esempio: “martedì storia esercizi pagina 3, 4
            e 5, poi giovedì italiano pagina 6, 7 e 8”. Se non dici il giorno, il compito va alla
            prossima lezione di quella materia.
          </p>
          <button className="microfono" onClick={d.avvia}>
            <span className="pallino" aria-hidden="true" /> Inizia a dettare
          </button>{' '}
          <button className="link" onClick={d.scrivi}>Scrivili a mano</button>
          {!trascrizioneDisponibile && (
            <p className="avviso">
              Questo browser registra l’audio ma non lo trascrive: usa Chrome o Edge, oppure scrivi
              i compiti a mano.
            </p>
          )}
        </>
      )}

      {d.stato === 'ascolto' && (
        <>
          <div className="in-ascolto" role="status">
            <span className="onda" aria-hidden="true"><i /><i /><i /><i /></span>
            Sto ascoltando…
          </div>
          <p className="trascrizione">
            {d.testo} <span className="tenue">{d.provvisorio}</span>
            {!d.testo && !d.provvisorio && <span className="tenue">Il testo compare qui mentre parli.</span>}
          </p>
          <button className="microfono ferma" onClick={d.ferma}>
            <span className="quadrato" aria-hidden="true" /> Ho finito
          </button>
        </>
      )}

      {d.stato === 'finito' && (
        <>
          <label className="etichetta" htmlFor="testo-dettato">Testo dettato, correggilo se serve</label>
          <textarea
            id="testo-dettato"
            value={d.testo}
            rows={3}
            onChange={(e) => d.setTesto(e.target.value)}
            placeholder="Per esempio: martedì storia studiare pagina 30, giovedì italiano pagina 6"
          />
          {urlAudio && <audio controls src={urlAudio} className="riascolta" />}

          <h3>Ho capito questi compiti</h3>
          <Revisione bozze={bozze} onChange={(b) => setModifiche({ testo: d.testo, bozze: b })} />

          <div className="azioni">
            <button className="primario" disabled={bozze.length === 0} onClick={salva}>
              Scrivi sul diario
            </button>
            <button className="link" onClick={d.ricomincia}>Detta di nuovo</button>
          </div>
        </>
      )}

      {d.errore && <p className="avviso">{d.errore}</p>}
    </section>
  )
}
