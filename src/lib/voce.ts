// Lettura ad alta voce con la sintesi vocale del browser (gratis, niente server).

function voceItaliana(): SpeechSynthesisVoice | undefined {
  const voci = speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith('it'))
  // le voci "naturali"/online suonano molto meglio di quelle di sistema
  return voci.find((v) => /natural|online|google/i.test(v.name)) ?? voci[0]
}

export const voceDisponibile = typeof window !== 'undefined' && 'speechSynthesis' in window

export function parla(testo: string, quandoFinisce?: () => void): boolean {
  if (!voceDisponibile) return false
  speechSynthesis.cancel()
  const frase = new SpeechSynthesisUtterance(testo)
  frase.lang = 'it-IT'
  frase.rate = 0.95
  const voce = voceItaliana()
  if (voce) frase.voice = voce
  frase.onend = () => quandoFinisce?.()
  frase.onerror = () => quandoFinisce?.()
  speechSynthesis.speak(frase)
  return true
}

export function zitto() {
  if (voceDisponibile) speechSynthesis.cancel()
}
