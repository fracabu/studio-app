/* Sincronizzazione dei progressi col database (api/progressi).
 * Un solo file per l'app e per le pagine delle lezioni: si carica con <script src="/sync.js">.
 * Tutto quello che l'app salva in localStorage sotto "studio-app:" viene copiato sul server:
 * a ogni modifica (dopo una breve attesa) e quando si chiude la pagina.
 * All'avvio: se qui c'è qualcosa non ancora mandato vince il browser, altrimenti vince il server.
 * Funziona solo se si è fatto il login (cookie di sessione); senza, i dati restano nel browser
 * e partono al primo avvio col login.
 */
(() => {
  if (window.studioSync) return
  const PREFISSO = 'studio-app:'
  const SPORCO = 'studio-sync:sporco' // "1" = ci sono modifiche non ancora sul server
  const BASE = 'studio-sync:base' // data dell'ultima versione del server che il browser conosce
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
  const raccogli = () => Object.fromEntries(chiaviApp().map((k) => [k, ls.getItem(k)]))

  async function manda(keepalive = false) {
    clearTimeout(timer); timer = null
    try {
      const r = await fetch('/api/progressi', {
        method: 'PUT', keepalive, credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dati: raccogli() }),
      })
      if (!r.ok) return false
      const { aggiornato } = await r.json()
      setOrig.call(ls, SPORCO, '0'); setOrig.call(ls, BASE, aggiornato)
      return true
    } catch { return false }
  }

  function segnaModifica(chiave) {
    if (!attivo || typeof chiave !== 'string' || !chiave.startsWith(PREFISSO)) return
    setOrig.call(ls, SPORCO, '1')
    clearTimeout(timer); timer = setTimeout(() => manda(), ATTESA)
  }

  Storage.prototype.setItem = function (k, v) { setOrig.call(this, k, v); if (this === ls) segnaModifica(k) }
  Storage.prototype.removeItem = function (k) { rmOrig.call(this, k); if (this === ls) segnaModifica(k) }

  // chiudendo la pagina, manda subito quello che è in attesa
  addEventListener('pagehide', () => { if (timer) manda(true) })
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden' && timer) manda(true) })

  /** All'avvio. Risponde 'ok', 'non-collegato' oppure 'offline'. */
  async function avvia() {
    let r
    try { r = await fetch('/api/progressi', { credentials: 'same-origin', cache: 'no-store' }) } catch { return 'offline' }
    if (r.status === 401) return 'non-collegato'
    if (!r.ok) return 'offline'
    const { dati, aggiornato } = await r.json()
    if (ls.getItem(SPORCO) === '1') { await manda(); return 'ok' }
    if (aggiornato && aggiornato !== ls.getItem(BASE)) {
      // il server ha una versione più nuova: rimpiazza quella del browser
      attivo = false
      for (const k of chiaviApp()) rmOrig.call(ls, k)
      for (const [k, v] of Object.entries(dati || {})) if (k.startsWith(PREFISSO) && typeof v === 'string') setOrig.call(ls, k, v)
      setOrig.call(ls, BASE, aggiornato); setOrig.call(ls, SPORCO, '0')
      attivo = true
      return 'ok'
    }
    if (!aggiornato && chiaviApp().length) await manda() // primo login da un browser che aveva già dati
    return 'ok'
  }

  /** Logout: manda quello che manca, poi pulisce il browser (così un altro utente parte da zero). */
  async function esci() {
    if (ls.getItem(SPORCO) === '1') await manda()
    await fetch('/api/logout', { method: 'POST', credentials: 'same-origin' }).catch(() => {})
    attivo = false
    for (const k of chiaviApp()) rmOrig.call(ls, k)
    rmOrig.call(ls, SPORCO); rmOrig.call(ls, BASE)
    attivo = true
  }

  window.studioSync = { avvia, esci, manda }
  // nelle pagine delle lezioni non c'è il login: basta mandare ciò che era rimasto indietro
  if (document.documentElement.dataset.sync === 'lezione') avvia()
})()
