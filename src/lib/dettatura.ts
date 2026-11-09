import { useEffect, useRef, useState } from 'react'

/* Riconoscimento vocale del browser (Chrome, Edge, Safari) + registrazione dell'audio. */

// Tipi minimi: la Web Speech API non è ancora nei tipi standard di TypeScript.
interface RisultatoVoce { isFinal: boolean; 0: { transcript: string } }
interface EventoVoce { resultIndex: number; results: ArrayLike<RisultatoVoce> }
interface Riconoscitore {
  lang: string
  continuous: boolean
  interimResults: boolean
  onresult: ((e: EventoVoce) => void) | null
  onerror: ((e: { error: string }) => void) | null
  onend: (() => void) | null
  start(): void
  stop(): void
}

const Costruttore = (globalThis as unknown as {
  SpeechRecognition?: new () => Riconoscitore
  webkitSpeechRecognition?: new () => Riconoscitore
}).SpeechRecognition ?? (globalThis as unknown as { webkitSpeechRecognition?: new () => Riconoscitore }).webkitSpeechRecognition

export const trascrizioneDisponibile = Boolean(Costruttore)

export type StatoDettatura = 'pronto' | 'ascolto' | 'finito'

export function useDettatura() {
  const [stato, setStato] = useState<StatoDettatura>('pronto')
  const [testo, setTesto] = useState('')
  const [provvisorio, setProvvisorio] = useState('')
  const [audio, setAudio] = useState<Blob | null>(null)
  const [errore, setErrore] = useState<string | null>(null)

  const riconoscitore = useRef<Riconoscitore | null>(null)
  const registratore = useRef<MediaRecorder | null>(null)
  const attivo = useRef(false)

  async function avvia() {
    setErrore(null)
    setTesto('')
    setProvvisorio('')
    setAudio(null)
    if (!window.isSecureContext || !navigator.mediaDevices) {
      setErrore('Il microfono si attiva solo se l’app è aperta da questo computer (localhost) o in https.')
      return
    }
    let flusso: MediaStream
    try {
      flusso = await navigator.mediaDevices.getUserMedia({ audio: true })
    } catch {
      setErrore('Il browser non ha il permesso di usare il microfono. Consentilo dall’icona accanto all’indirizzo.')
      return
    }

    const pezzi: Blob[] = []
    const mr = new MediaRecorder(flusso)
    mr.ondataavailable = (e) => e.data.size && pezzi.push(e.data)
    mr.onstop = () => {
      setAudio(new Blob(pezzi, { type: mr.mimeType }))
      flusso.getTracks().forEach((t) => t.stop())
    }
    mr.start()
    registratore.current = mr
    attivo.current = true

    if (Costruttore) {
      const r = new Costruttore()
      r.lang = 'it-IT'
      r.continuous = true
      r.interimResults = true
      r.onresult = (e) => {
        let definitivo = ''
        let parziale = ''
        for (let i = e.resultIndex; i < e.results.length; i++) {
          const t = e.results[i][0].transcript
          if (e.results[i].isFinal) definitivo += t
          else parziale += t
        }
        if (definitivo) setTesto((p) => `${p} ${definitivo}`.trim())
        setProvvisorio(parziale)
      }
      r.onerror = (e) => {
        if (e.error !== 'no-speech' && e.error !== 'aborted') {
          setErrore(`La trascrizione si è fermata (${e.error}). L’audio continua a registrare.`)
        }
      }
      // Chrome chiude il riconoscimento dopo qualche secondo di silenzio: lo riapro finché si detta
      r.onend = () => {
        if (attivo.current) {
          try { r.start() } catch { /* già avviato */ }
        }
      }
      r.start()
      riconoscitore.current = r
    }
    setStato('ascolto')
  }

  function ferma() {
    attivo.current = false
    riconoscitore.current?.stop()
    registratore.current?.state === 'recording' && registratore.current.stop()
    setProvvisorio('')
    setStato('finito')
  }

  function ricomincia() {
    ferma()
    setTesto('')
    setAudio(null)
    setErrore(null)
    setStato('pronto')
  }

  /** Senza microfono: si passa direttamente a scrivere il testo. */
  function scrivi() {
    setErrore(null)
    setStato('finito')
  }

  useEffect(() => () => {
    attivo.current = false
    riconoscitore.current?.stop()
    registratore.current?.state === 'recording' && registratore.current.stop()
  }, [])

  return { stato, testo, setTesto, provvisorio, audio, errore, avvia, ferma, ricomincia, scrivi }
}
