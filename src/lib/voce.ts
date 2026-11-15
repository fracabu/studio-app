// Lettura ad alta voce con la sintesi vocale del browser (gratis, niente server).
//
// Le voci "naturali" (Google, Microsoft Online) sono voci di rete: con un testo lungo
// (oltre ~300 caratteri, es. i compiti di un venerdì pieno) vanno in errore o in timeout e
// il browser ripiega da solo sulla voce di sistema, più robotica. Per questo si legge
// una frase alla volta, sempre con la stessa voce.

function voceItaliana(): SpeechSynthesisVoice | undefined {
  const voci = speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith('it'))
  // le voci "naturali"/online suonano molto meglio di quelle di sistema
  return voci.find((v) => /natural|online|google/i.test(v.name)) ?? voci[0]
}

export const voceDisponibile = typeof window !== 'undefined' && 'speechSynthesis' in window

/** Al primo uso l'elenco delle voci può essere ancora vuoto: si aspetta (al massimo 1 s). */
function conLeVoci(fai: () => void) {
  if (speechSynthesis.getVoices().length) return fai()
  let fatto = false
  const una = () => {
    if (fatto) return
    fatto = true
    speechSynthesis.removeEventListener('voiceschanged', una)
    fai()
  }
  speechSynthesis.addEventListener('voiceschanged', una)
  setTimeout(una, 1000)
}

/** Frasi corte: si spezza sui punti, e le frasi ancora lunghe su ; e , */
function aPezzi(testo: string, max = 180): string[] {
  // si taglia solo dove dopo il punto comincia una maiuscola: "pag. 47" resta intero
  const frasi = testo.split(/(?<=[.!?])\s+(?=[A-ZÀ-ÖØ-Ý¡¿])/).map((f) => f.trim()).filter(Boolean)
  const pezzi: string[] = []
  for (const f of frasi) {
    if (f.length <= max) {
      // le frasi brevissime ("pag." o "es.") si attaccano alla precedente
      if (pezzi.length && (f.length < 25 || pezzi[pezzi.length - 1].length < 25) && pezzi[pezzi.length - 1].length + f.length < max) {
        pezzi[pezzi.length - 1] += ' ' + f
      } else pezzi.push(f)
      continue
    }
    let corrente = ''
    for (const parte of f.split(/(?<=[;,])\s+/)) {
      if (corrente && corrente.length + parte.length > max) {
        pezzi.push(corrente)
        corrente = parte
      } else corrente = corrente ? `${corrente} ${parte}` : parte
    }
    if (corrente) pezzi.push(corrente)
  }
  return pezzi
}

/** Abbreviazioni dei compiti lette per intero ("pag. 47" → "pagina 47"). */
function perLaVoce(testo: string): string {
  return testo
    .replace(/\bpagg?\.\s*/gi, (m) => (/^pagg/i.test(m) ? 'pagine ' : 'pagina '))
    .replace(/\bes\.\s*(?=\d)/gi, 'esercizio ')
    .replace(/\bn\.\s*(?=\d)/g, 'numero ')
}

let giro = 0

export function parla(testo: string, quandoFinisce?: () => void): boolean {
  if (!voceDisponibile) return false
  speechSynthesis.cancel()
  const mio = ++giro
  conLeVoci(() => {
    if (mio !== giro) return
    const voce = voceItaliana()
    const pezzi = aPezzi(perLaVoce(testo))
    pezzi.forEach((p, i) => {
      const frase = new SpeechSynthesisUtterance(p)
      frase.lang = 'it-IT'
      frase.rate = 0.95
      if (voce) frase.voice = voce
      if (i === pezzi.length - 1) {
        frase.onend = () => mio === giro && quandoFinisce?.()
        frase.onerror = () => mio === giro && quandoFinisce?.()
      }
      speechSynthesis.speak(frase)
    })
  })
  return true
}

export function zitto() {
  if (!voceDisponibile) return
  giro++
  speechSynthesis.cancel()
}
