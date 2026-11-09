/* Sincronizzazione dei progressi col database (api/progressi, Neon).
 * Un solo file per l'app e per le pagine delle lezioni: si carica con <script src="/sync.js">.
 *
 * Il database è la fonte di verità; localStorage ("studio-app:*") fa da copia di lavoro nel browser,
 * così l'app resta veloce e funziona anche senza rete.
 * - Ogni modifica segna la chiave come "cambiata"; dopo 1,5 s (o chiudendo la pagina) partono
 *   SOLO le chiavi cambiate (null = cancellata). Il server le unisce a quelle che ha.
 * - All'avvio: prima si mandano le modifiche rimaste in sospeso, poi si prende tutto dal server.
 * - Primo login da un browser che aveva già dati suoi: si mandano tutti (vincono loro), mai cancellati.
 */
(() => {
  if (window.studioSync) return
  const PREFISSO = 'studio-app:'
  const CAMBIATE = 'studio-sync:cambiate' // chiavi modificate e non ancora sul server (JSON)
  const BASE = 'studio-sync:base' // data dell'ultima versione del server allineata qui
  const ATTESA = 1500

  const ls = window.localStorage
  const setOrig = Storage.prototype.setItem
  const rmOrig = Storage.prototype.removeItem
  let timer = null
  let attivo = true

  const chiaviApp = () => {
    const out = []
    for (let i = 0; i < ls.length; i++) { const k = ls.key(i); if (k && k.startsWith(PREFISSO)) out.push(k) }
    return out
  }
  const cambiate = () => { try { return JSON.parse(ls.getItem(CAMBIATE) || '[]') } catch { return [] } }
  const segnaCambiate = (lista) => setOrig.call(ls, CAMBIATE, JSON.stringify([...new Set(lista)]))

  /** Scrive nel browser la versione del server (senza segnarla come modifica). */
  function applica(dati, aggiornato) {
    attivo = false
    const restano = new Set(cambiate()) // modifiche locali arrivate nel frattempo: non toccarle
    for (const k of chiaviApp()) if (!(k in dati) && !restano.has(k)) rmOrig.call(ls, k)
    for (const [k, v] of Object.entries(dati || {})) if (k.startsWith(PREFISSO) && typeof v === 'string' && !restano.has(k)) setOrig.call(ls, k, v)
    setOrig.call(ls, BASE, aggiornato)
    attivo = true
  }

  async function manda(keepalive = false, chiavi = cambiate()) {
    clearTimeout(timer); timer = null
    if (!chiavi.length) return true
    const dati = Object.fromEntries(chiavi.map((k) => [k, ls.getItem(k)])) // null = cancellata
    try {
      const r = await fetch('/api/progressi', {
        method: 'PUT', keepalive, credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dati }),
      })
      if (!r.ok) return false
      const risposta = await r.json()
      // tolte dalla lista solo le chiavi mandate e non cambiate di nuovo intanto
      segnaCambiate(cambiate().filter((k) => !chiavi.includes(k) || ls.getItem(k) !== dati[k]))
      if (!keepalive) applica(risposta.dati, risposta.aggiornato)
      return true
    } catch { return false }
  }

  function segnaModifica(chiave) {
    if (!attivo || typeof chiave !== 'string' || !chiave.startsWith(PREFISSO)) return
    segnaCambiate([...cambiate(), chiave])
    clearTimeout(timer); timer = setTimeout(() => manda(), ATTESA)
  }

  Storage.prototype.setItem = function (k, v) {
    const prima = this === ls ? ls.getItem(k) : null
    setOrig.call(this, k, v)
    if (this === ls && prima !== String(v)) segnaModifica(k) // riscrivere lo stesso valore non è una modifica
  }
  Storage.prototype.removeItem = function (k) {
    const esisteva = this === ls && ls.getItem(k) !== null
    rmOrig.call(this, k)
    if (esisteva) segnaModifica(k)
  }

  addEventListener('pagehide', () => { if (cambiate().length) manda(true) })
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden' && cambiate().length) manda(true) })

  /** All'avvio. Risponde 'ok', 'non-collegato' oppure 'offline'. */
  async function avvia() {
    let r
    try { r = await fetch('/api/progressi', { credentials: 'same-origin', cache: 'no-store' }) } catch { return 'offline' }
    if (r.status === 401) return 'non-collegato'
    if (!r.ok) return 'offline'
    const { dati, aggiornato } = await r.json()
    if (ls.getItem(BASE) === null && chiaviApp().length) {
      // primo login da questo browser, che aveva già dati suoi: li manda tutti (vincono loro)
      segnaCambiate([...cambiate(), ...chiaviApp()])
    }
    if (cambiate().length) { await manda(); return 'ok' } // manda() poi allinea col server
    if (aggiornato) applica(dati, aggiornato)
    return 'ok'
  }

  /** Logout: manda quello che manca, poi pulisce il browser (così un altro utente parte da zero). */
  async function esci() {
    await manda()
    await fetch('/api/logout', { method: 'POST', credentials: 'same-origin' }).catch(() => {})
    attivo = false
    for (const k of chiaviApp()) rmOrig.call(ls, k)
    rmOrig.call(ls, CAMBIATE); rmOrig.call(ls, BASE); rmOrig.call(ls, 'studio-sync:sporco')
    attivo = true
  }

  window.studioSync = { avvia, esci, manda }
  // nelle pagine delle lezioni non c'è il login: si allinea e manda ciò che era rimasto indietro
  if (document.documentElement.dataset.sync === 'lezione') avvia()
})()
