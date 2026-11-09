// Palco di Sbrigo: canvas trasparente a tutto schermo sopra l'app. Non blocca i clic,
// tranne quando si prende Sbrigo: lo prendi, lo lanci, sbatte sui bordi, resta stordito.
// Fa il presentatore: presenta(vista), dici(testo), festa(), vattene(), torna().
// Voce: file audio dal server (voceUrl) con la bocca che segue il volume; se manca, la
// sintesi del browser. Effetti (rutti, scoregge, botte): file in public/sbrigo/suoni.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { createSbrigo, ALTEZZA, BARICENTRO } from './sbrigo.js';

export const FRASI = {
  saluto: 'Ciao! Oggi purtroppo ci hanno caricato di compiti… ma se vogliamo andare a basket tocca sbrigarsi! Facciamoli bene e organizzati: così ci mettiamo di meno e prendiamo pure un bel voto!',
  viste: {
    oggi: [
      'Questa è la pagina di OGGI: lezioni, compiti e zaino. Si legge, si spunta, si va a basket. Facile, no?',
      'Ecco la giornata! Guarda i compiti per domani: prima li facciamo, prima siamo liberi.',
    ],
    diario: [
      'Il diario! Sembra un libro, ma almeno questo nello zaino non pesa niente.',
      'Qui ci sono i compiti, giorno per giorno. Sfoglia, controlla, spunta. Io tifo.',
    ],
    orario: [
      "L'orario: così sai sempre quale prof sta per arrivare. Io lo uso per sapere quando nascondermi.",
      'Ecco la settimana. Il giovedì è lungo… ma tu sei più lungo del giovedì!',
    ],
    materie: ['Le materie, tutte in fila come in panchina. Chi mandiamo in campo oggi?'],
    personaggi: [
      'La collezione! Ogni compito fatto vale stelle, e con le stelle sblocchi i personaggi. Io sono già sbloccato: ovvio, sono il migliore.',
    ],
  },
  presa: ['Ehi! Giù le mani dal capolavoro!', 'Uuuh, si vola!', 'Attento che soffro il solletico!', 'Mettimi giù… anzi no, più in alto!'],
  botta: [
    "Ahia! Il muro l'hanno messo apposta!",
    "Bel tiro… ma il canestro è dall'altra parte!",
    'Vedo le stelline… e pure le tabelline!',
    'SDENG! Questo lo scrivo sul diario!',
    'Ok, ok, ho capito: prima i compiti!',
  ],
  ripresa: ['Dove eravamo? Ah sì: compiti, poi basket!', 'Sto bene, sto bene… chi ha spento la luce?'],
  tocco: ["Che c'è? Hai finito? Fammi vedere!", 'Toc toc! Chi è? Un compito da fare!', 'Guarda che salto! Ora tocca a te.'],
  noia: [
    'Psst… i compiti non si fanno da soli. Io ci ho provato, non funziona.',
    'Se finiamo presto, a basket ci arriviamo con il fiato!',
    'Io intanto mi alleno col pallone. Tu fai mate?',
  ],
  rutto: ['Ops. Scusate. È stata la merenda.', 'Pardon! Questo vale dieci a educazione fisica.', 'Ehm… era un rutto di concentrazione.'],
  scoreggia: [
    'Non sono stato io! È stato il diario.',
    'Ehm… era il pallone che si sgonfiava.',
    'Uff, la matematica mi fa questo effetto.',
    'Profumo di compiti finiti… quasi.',
  ],
  festa: ['CANESTRO! Uno in meno!', 'Così si fa! Il basket si avvicina!', 'Tiro da tre! Un altro compito fatto!'],
  via: ['Va bene, va bene, me ne vado… ma torno!', 'Offeso. Molto offeso. Ciao!'],
  torna: ['Mi hai richiamato! Lo sapevo che senza di me ti annoiavi.', 'Rieccomi! Hai sentito la mia mancanza, eh?'],
};

/** Tutte le frasi fisse, per farle preparare in anticipo al server. */
export function tutteLeFrasi(frasi = FRASI) {
  const out = [];
  const giu = (v) => (typeof v === 'string' ? out.push(v) : Array.isArray(v) ? v.forEach(giu) : v && Object.values(v).forEach(giu));
  giu(frasi);
  return [...new Set(out)];
}

const CSS = `
.sbrigo-palco { position: fixed; inset: 0; width: 100vw; height: 100dvh; pointer-events: none; }
.sbrigo-fumetto { position: fixed; left: 0; top: 0; max-width: min(300px, 72vw); padding: 10px 14px;
  background: #fff; color: #1d1530; border: 3px solid #1d1530; border-radius: 18px; box-shadow: 4px 4px 0 #1d1530;
  font: 400 19px/1.25 'Patrick Hand', 'Nunito', system-ui, sans-serif; pointer-events: none;
  opacity: 0; transition: opacity .15s; will-change: transform; }
.sbrigo-fumetto.on { opacity: 1; }
.sbrigo-fumetto::after { content: ''; position: absolute; bottom: -10px; left: calc(var(--coda, 50%) - 9px);
  width: 15px; height: 15px; background: #fff; border-right: 3px solid #1d1530; border-bottom: 3px solid #1d1530;
  transform: rotate(45deg); }
.sbrigo-fumetto.sotto::after { bottom: auto; top: -10px; transform: rotate(225deg); }
.sbrigo-boom { position: fixed; translate: -50% -50%; rotate: var(--r, 0deg); pointer-events: none;
  font-family: 'Lilita One', Impact, sans-serif; color: #ffd23f; -webkit-text-stroke: 3px #1d1530; paint-order: stroke fill;
  text-shadow: 4px 4px 0 #1d1530; animation: sbrigo-boom .9s ease-out forwards; white-space: nowrap; }
@keyframes sbrigo-boom { 0% { scale: .2; opacity: 0 } 15% { scale: 1.25; opacity: 1 } 30% { scale: 1 } 80% { opacity: 1 } 100% { scale: 1.1; opacity: 0 } }
`;

const G = 2600;
const REST_MURO = 0.6, REST_PAV = 0.42;
const HW = 1.2, TOP = ALTEZZA - BARICENTRO, BOT = BARICENTRO;
const pick = (a) => a[Math.floor(Math.random() * a.length)];
const clamp = THREE.MathUtils.clamp;
const normA = (a) => Math.atan2(Math.sin(a), Math.cos(a));
const easeBack = (x) => { const c = 1.9; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); };
const casuale = (a, b) => a + Math.random() * (b - a);

export function createStage(opts = {}) {
  const {
    altezza = 200,          // px dai piedi alla punta dei capelli
    frasi = FRASI,
    parent = document.body,
    zIndex = 40,
    margine = 6,            // px dal fondo dello schermo
    saluto = frasi.saluto,
    visibile: visibileIniziale = true,
    onVisibile = () => {},
    voceUrl = null,         // (testo) => url di un mp3; null = sintesi del browser
    suoni = {},             // { rutto: [url…], scoreggia: [url…], botta: [url…] }
  } = opts;

  let morto = false;
  const dopo = (ms, f) => setTimeout(() => { if (!morto) f(); }, ms);

  const style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.NeutralToneMapping;
  const canvas = renderer.domElement;
  canvas.className = 'sbrigo-palco';
  canvas.style.zIndex = zIndex;
  canvas.setAttribute('aria-hidden', 'true');
  parent.appendChild(canvas);

  const fumetto = document.createElement('div');
  fumetto.className = 'sbrigo-fumetto';
  fumetto.style.zIndex = zIndex + 1;
  fumetto.setAttribute('role', 'status');
  parent.appendChild(fumetto);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.35;
  const key = new THREE.DirectionalLight(0xfff3e6, 2.4); key.position.set(0.4, 0.8, 1); scene.add(key);
  const rim = new THREE.DirectionalLight(0xd8c8ff, 1.0); rim.position.set(-1, 0.6, -0.8); scene.add(rim);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x9a8fb8, 0.7));
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 4000);
  camera.position.z = 1500;

  const S = altezza / ALTEZZA;
  const holder = new THREE.Group(), inner = new THREE.Group();
  const sbrigo = createSbrigo();
  sbrigo.position.y = -BARICENTRO;
  inner.add(sbrigo);
  holder.add(inner);
  scene.add(holder);
  const api = sbrigo.userData.api, parts = sbrigo.userData.parts;

  const ombra = new THREE.Mesh(new THREE.CircleGeometry(1, 40),
    new THREE.MeshBasicMaterial({ color: 0x1d1530, transparent: true, opacity: 0.18, depthWrite: false }));
  scene.add(ombra);

  // Sbuffo (fumo per entrate e uscite, nuvoletta verde per le scoregge)
  const puff = new THREE.Group();
  const puffMat = new THREE.MeshBasicMaterial({ color: 0xf1ecff, transparent: true, depthWrite: false });
  const puffDirs = [];
  for (let i = 0; i < 11; i++) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 12), puffMat);
    const a = (i / 11) * Math.PI * 2;
    puffDirs.push(new THREE.Vector3(Math.cos(a) * 1.3, Math.sin(a) * 1.6 + 0.3, 0.3 * Math.sin(a * 3)));
    puff.add(m);
  }
  puff.visible = false;
  scene.add(puff);

  let W = innerWidth, H = innerHeight;
  const pav = () => H - margine;
  function resize() {
    W = innerWidth; H = innerHeight;
    renderer.setSize(W, H);
    camera.left = -W / 2; camera.right = W / 2; camera.top = H / 2; camera.bottom = -H / 2;
    camera.updateProjectionMatrix();
  }
  resize();
  addEventListener('resize', resize);

  // Stato fisico (coordinate dello schermo, px, y in giù; pos = baricentro)
  const st = {
    mode: 'ground', x: W - altezza * 0.55, y: pav() - BOT * S, vx: 0, vy: 0, a: 0, va: 0,
    sq: 0, sqv: 0, sqAxis: 'y', pop: 0, yaw: -0.22,
    dizzyUntil: 0, bonks: 0, lastBonk: -9, salto: false,
    visibile: false, appearT0: -1, spinT0: -9, puffT0: -9, puffX: 0, puffY: 0, puffS: 1,
    boccaFino: -9,
  };
  const ptr = { x: -999, y: -999 }, ptrV = { x: 0, y: 0 };
  let samples = [], grab = { x: 0, y: 0 }, down = null, moved = 0, dettoPresa = false;
  let t = 0, last = performance.now(), raf = 0, suppress = false, cursor = '', pulito = false;
  let ultimaFrase = -99, ultimaReazione = -99, ultimaAttivita = 0, prossimaGag = 18, prossimaPuzza = casuale(40, 70);
  let parla = { testo: '', inizio: -99, fino: -99, voce: false };
  let debugFermo = null;

  function bounds(a) {
    const c = Math.cos(a), s = Math.sin(a);
    let minX = 1e9, maxX = -1e9, minY = 1e9, maxY = -1e9;
    for (const [x, y] of [[-HW, -BOT], [HW, -BOT], [HW, TOP], [-HW, TOP]]) {
      const rx = (x * c - y * s) * S, ry = -(x * s + y * c) * S;
      minX = Math.min(minX, rx); maxX = Math.max(maxX, rx); minY = Math.min(minY, ry); maxY = Math.max(maxY, ry);
    }
    return { minX, maxX, minY, maxY };
  }

  function colpito(px, py) {
    if (!st.visibile || st.mode === 'uscita') return false;
    const dx = px - st.x, dy = st.y - py;
    const c = Math.cos(-st.a), s = Math.sin(-st.a);
    const lx = (dx * c - dy * s) / S, ly = (dx * s + dy * c) / S;
    return Math.abs(lx) < HW && ly > -BOT && ly < TOP - 0.3;
  }

  // ---------- audio: voce e effetti ----------
  let ac = null, analyser = null, buf = null, livello = 0, voceCollegata = false, inAttesaDiGesto = null;
  const voceEl = new Audio();
  voceEl.preload = 'auto';
  const buffers = new Map();

  function caricaBuffer(url) {
    if (buffers.has(url)) return;
    buffers.set(url, null);
    fetch(url).then((r) => r.arrayBuffer()).then((b) => ac.decodeAudioData(b)).then((d) => buffers.set(url, d)).catch(() => buffers.delete(url));
  }
  // Il browser fa suonare solo dopo un gesto: al primo tocco si accende tutto.
  function sbloccaAudio() {
    try {
      if (!ac) {
        ac = new AudioContext();
        analyser = ac.createAnalyser();
        analyser.fftSize = 512;
        buf = new Float32Array(analyser.fftSize);
        analyser.connect(ac.destination);
        for (const lista of Object.values(suoni)) for (const u of lista) caricaBuffer(u);
      }
      if (ac.state === 'suspended') ac.resume();
      if (!voceCollegata) { ac.createMediaElementSource(voceEl).connect(analyser); voceCollegata = true; }
      if (inAttesaDiGesto && inAttesaDiGesto === parla && t < parla.fino) {
        voceEl.currentTime = 0;
        voceEl.play().catch(() => {});
      }
      inAttesaDiGesto = null;
    } catch { /* niente audio: pazienza */ }
  }
  addEventListener('pointerdown', sbloccaAudio, true);
  addEventListener('keydown', sbloccaAudio, true);

  function effetto(nome, volume = 0.9) {
    const lista = suoni[nome];
    if (!lista?.length) return false;
    const url = pick(lista);
    const b = buffers.get(url);
    try {
      if (ac && b) {
        const src = ac.createBufferSource(), g = ac.createGain();
        src.buffer = b; g.gain.value = volume;
        src.connect(g).connect(ac.destination);
        src.start();
      } else {
        const a = new Audio(url);
        a.volume = volume;
        a.play().catch(() => {});
      }
    } catch { return false; }
    return true;
  }

  function sintetico(f, tipo = 'boing') {
    try {
      if (!ac) return;
      const t0 = ac.currentTime, o = ac.createOscillator(), g = ac.createGain();
      if (tipo === 'puff') {
        o.type = 'sine'; o.frequency.setValueAtTime(500, t0); o.frequency.exponentialRampToValueAtTime(1200, t0 + 0.12);
        g.gain.setValueAtTime(0.08, t0); g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.18);
      } else {
        o.type = 'triangle';
        o.frequency.setValueAtTime(240 + 220 * f, t0);
        o.frequency.exponentialRampToValueAtTime(60, t0 + 0.28);
        g.gain.setValueAtTime(0.06 + 0.22 * f, t0); g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.32);
      }
      o.connect(g).connect(ac.destination);
      o.start(t0); o.stop(t0 + 0.35);
    } catch { /* pazienza */ }
  }

  function voceItaliana() {
    const v = speechSynthesis.getVoices().filter((x) => x.lang.toLowerCase().startsWith('it'));
    return v.find((x) => /natural|online|google/i.test(x.name)) ?? v[0];
  }

  // ---------- fumetto e voce ----------
  function dici(testo, { cooldown = 0 } = {}) {
    if (morto || !st.visibile || !testo) return;
    // le reazioni (botta, presa, tocco) interrompono anche un discorso lungo, ma non si accavallano
    if (cooldown) {
      if (t - ultimaReazione < cooldown) return;
      ultimaReazione = t;
    }
    ultimaFrase = t;
    const dura = testo.length / 20 + 2.5;
    const mio = { testo, inizio: t, fino: t + dura, voce: false };
    parla = mio;
    fumetto.textContent = '';
    if (voceUrl) {
      // il fumetto aspetta la voce (al massimo 1,2 s: se il server è lento parte da solo)
      mio.inizio = t + 1.2; mio.fino = mio.inizio + dura;
      voceEl.pause();
      voceEl.src = voceUrl(testo);
      voceEl.onplaying = () => {
        if (parla !== mio) return;
        mio.voce = true;
        if (mio.inizio > t) mio.inizio = t;
        const d = isFinite(voceEl.duration) ? voceEl.duration : 0;
        mio.fino = Math.max(mio.inizio + dura, t + d + 1);
      };
      voceEl.onended = () => { if (parla === mio) { mio.voce = false; mio.fino = t + 1.5; } };
      voceEl.onerror = () => { if (parla === mio) mio.voce = false; };
      voceEl.play().catch((e) => { if (e?.name === 'NotAllowedError') inAttesaDiGesto = mio; });
      // se la voce non è ancora pronta dopo 5 s, niente voce: meglio muto che in ritardo
      dopo(5000, () => {
        if (parla === mio && !mio.voce && inAttesaDiGesto !== mio) { voceEl.pause(); voceEl.removeAttribute('src'); }
      });
    } else if ('speechSynthesis' in window && (navigator.userActivation?.hasBeenActive ?? true)) {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(testo.replace(/…/g, ', '));
      u.lang = 'it-IT'; u.pitch = 1.7; u.rate = 1.12;
      const vv = voceItaliana(); if (vv) u.voice = vv;
      u.onstart = () => { mio.voce = true; };
      u.onend = u.onerror = () => { mio.voce = false; if (parla === mio) parla.fino = Math.min(parla.fino, t + 1.2); };
      speechSynthesis.speak(u);
    }
  }
  function zitto() {
    parla.fino = -99;
    parla.voce = false;
    voceEl.pause();
    if ('speechSynthesis' in window) speechSynthesis.cancel();
  }
  function aggiornaFumetto() {
    if (t > parla.fino || t < parla.inizio || !st.visibile) { fumetto.classList.remove('on'); return; }
    fumetto.classList.add('on');
    const n = Math.min(parla.testo.length, Math.floor((t - parla.inizio) * 24));
    const testo = parla.testo.slice(0, n);
    if (fumetto.textContent !== testo) fumetto.textContent = testo;
    const w = fumetto.offsetWidth, h = fumetto.offsetHeight;
    const hx = st.x - Math.sin(st.a) * TOP * S * 0.8, hy = st.y - Math.cos(st.a) * TOP * S * 0.85;
    const left = clamp(hx - w / 2, 8, W - w - 8);
    let top = hy - h - 16;
    const sotto = top < 8;
    if (sotto) top = clamp(st.y + BOT * S * 0.2, 8, H - h - 8);
    fumetto.classList.toggle('sotto', sotto);
    fumetto.style.transform = `translate(${left}px, ${top}px)`;
    fumetto.style.setProperty('--coda', `${clamp(hx - left, 22, w - 22)}px`);
  }
  function scritta(txt, x, y, f = 0.6) {
    const el = document.createElement('div');
    el.className = 'sbrigo-boom';
    el.textContent = txt;
    el.style.zIndex = zIndex + 2;
    el.style.setProperty('--r', (Math.random() * 30 - 15).toFixed(1) + 'deg');
    el.style.fontSize = Math.round(32 + 30 * f) + 'px';
    parent.appendChild(el);
    // dentro lo schermo, misurata sulla larghezza vera (con margine per la rotazione)
    const mw = el.offsetWidth / 2 + 24, mh = el.offsetHeight / 2 + 24;
    el.style.left = clamp(x, mw, W - mw) + 'px';
    el.style.top = clamp(y, mh, H - mh) + 'px';
    setTimeout(() => el.remove(), 950);
  }
  function sbuffo(x, y, colore = 0xf1ecff, scala = 1) {
    st.puffT0 = t; st.puffX = x; st.puffY = y; st.puffS = scala;
    puffMat.color.set(colore);
  }

  // ---------- gag ----------
  function rutto() {
    if (!effetto('rutto')) return;
    st.boccaFino = t + 0.9;
    st.pop = Math.max(st.pop, 0.5);
    dopo(1000, () => dici(pick(frasi.rutto)));
  }
  function scoreggia() {
    if (!effetto('scoreggia')) return;
    if (st.mode === 'ground') { st.mode = 'air'; st.salto = true; st.vy = -520; st.va = 0; }
    st.pop = Math.max(st.pop, 0.8);
    const dietro = st.x > W / 2 ? 1 : -1;
    sbuffo(st.x + dietro * HW * S * 0.6, st.y + BOT * S * 0.75, 0xb6e86a, 0.6);
    dopo(900, () => dici(pick(frasi.scoreggia)));
  }

  // ---------- urti ----------
  function urto(v, axis, x, y) {
    if (v < 380) return;
    const f = Math.min(1, v / 2000);
    st.sq = 0.35 + 0.65 * f; st.sqv = 0; st.sqAxis = axis;
    st.pop = Math.max(st.pop, 0.6 + 0.4 * f);
    if (!effetto('botta', 0.5 + 0.5 * f)) sintetico(f);
    if (v > 650) scritta(pick(['SDENG!', 'BONK!', 'PATAPUM!', 'STOMP!', 'BOING!']), x, y, f);
    st.bonks = t - st.lastBonk < 2.5 ? st.bonks + 1 : 1;
    st.lastBonk = t;
    if (v > 1100 || st.bonks >= 3) {
      if (!st.dizzyUntil) api.setDizzy(true);
      st.dizzyUntil = t + 3.2;
    }
    if (v > 650) dici(pick(frasi.botta), { cooldown: 1.2 });
  }

  function collidi() {
    const b = bounds(st.a);
    if (st.mode === 'uscita') return;
    if (st.x + b.minX < 0) {
      st.x = -b.minX;
      if (st.vx < 0) { const v = -st.vx; st.vx = v * REST_MURO; st.va = -st.va * 0.5 + (Math.random() - 0.5) * 6; urto(v, 'x', 0, st.y); }
    }
    if (st.x + b.maxX > W) {
      st.x = W - b.maxX;
      if (st.vx > 0) { const v = st.vx; st.vx = -v * REST_MURO; st.va = -st.va * 0.5 + (Math.random() - 0.5) * 6; urto(v, 'x', W, st.y); }
    }
    if (st.y + b.minY < 0) {
      st.y = -b.minY;
      if (st.vy < 0) { const v = -st.vy; st.vy = v * REST_MURO; urto(v, 'y', st.x, 0); }
    }
    if (st.y + b.maxY > pav()) {
      st.y = pav() - b.maxY;
      if (st.vy > 0) {
        const v = st.vy;
        if (!st.salto) {
          urto(v, 'y', st.x, pav());
          if (v > 1200 && Math.random() < 0.2) dopo(350, scoreggia);   // atterraggio pesante
        }
        st.vy = -v * REST_PAV; st.vx *= 0.75; st.va *= 0.5;
        if (Math.abs(st.vy) < 260 || st.salto) {
          st.mode = 'ground'; st.vy = 0; st.a = normA(st.a); st.salto = false;
          if (st.sq < 0.2) { st.sq = 0.25; st.sqv = 0; st.sqAxis = 'y'; }
        }
      }
    }
  }

  // ---------- passo fisico ----------
  function passo(dt) {
    if (st.mode === 'held') {
      const k = Math.min(1, dt * 22);
      st.x += (ptr.x - grab.x - st.x) * k;
      st.y += (ptr.y - grab.y - st.y) * k;
      const target = clamp(-ptrV.x * 0.00045, -0.8, 0.8);
      st.va += ((target - st.a) * 90 - st.va * 9) * dt;
      st.a += st.va * dt;
      const b = bounds(st.a);
      st.x = clamp(st.x, -b.minX, W - b.maxX);
      st.y = clamp(st.y, -b.minY, pav() - b.maxY);
      ptrV.x *= Math.exp(-6 * dt); ptrV.y *= Math.exp(-6 * dt);
      return;
    }
    if (st.mode === 'air' || st.mode === 'uscita') {
      st.vy += G * dt;
      st.x += st.vx * dt; st.y += st.vy * dt; st.a += st.va * dt;
      st.va *= Math.exp(-0.4 * dt);
      collidi();
      if (st.mode === 'uscita' && (st.y - TOP * S > H + 50 || st.x < -300 || st.x > W + 300)) {
        st.visibile = false; st.mode = 'ground';
      }
      return;
    }
    // a terra: si rimette dritto (barcollando se è stordito)
    const wob = st.dizzyUntil ? Math.sin(t * 6) * 0.14 : 0;
    st.va += ((wob - st.a) * 70 - st.va * 9) * dt;
    st.a += st.va * dt;
    st.vx *= Math.exp(-7 * dt);
    st.x += st.vx * dt;
    const b = bounds(st.a);
    st.y = pav() - b.maxY;
    if (st.x + b.minX < 0) { st.x = -b.minX; st.vx = 0; }
    if (st.x + b.maxX > W) { st.x = W - b.maxX; st.vx = 0; }
  }

  // ---------- posa (braccia, gambe, faccia) ----------
  function posa(dt) {
    const agita = (st.mode === 'held' || st.mode === 'air' || st.mode === 'uscita') && !st.salto;
    const stordito = !!st.dizzyUntil;
    parts.arms.forEach((arm, i) => {
      const s = i === 0 ? -1 : 1;
      let target;
      if (agita) target = s * (2.3 + Math.sin(t * 16 + i * 1.7) * 0.45);
      else if (stordito) target = s * (0.5 + Math.sin(t * 5 + i) * 0.3);
      else target = arm.userData.rest + Math.sin(t * 1.6 + i) * 0.05;
      arm.rotation.z += (target - arm.rotation.z) * Math.min(1, dt * 12);
    });
    parts.legs.forEach((leg, i) => {
      const s = i === 0 ? -1 : 1;
      const kx = agita ? Math.sin(t * 14 + i * Math.PI) * 0.6 : 0;
      const kz = agita || st.mode === 'air' ? s * 0.25 : 0;
      leg.rotation.x += (kx - leg.rotation.x) * Math.min(1, dt * 14);
      leg.rotation.z += (kz - leg.rotation.z) * Math.min(1, dt * 10);
    });
    if (parts.ball) parts.ball.visible = !agita && !stordito;

    // bocca: voce vera (volume), oppure parla a scatti, urla in volo, aperta da stordito
    let m = 0;
    if (parla.voce && voceCollegata && analyser) {
      analyser.getFloatTimeDomainData(buf);
      let s = 0;
      for (let i = 0; i < buf.length; i++) s += buf[i] * buf[i];
      const rms = Math.sqrt(s / buf.length);
      livello += (clamp(rms * 7, 0, 1) - livello) * 0.5;
      m = livello;
    } else if (parla.voce || (t >= parla.inizio && t - parla.inizio < parla.testo.length / 24 && t < parla.fino)) {
      m = Math.abs(Math.sin(t * 13)) * 0.8 + Math.abs(Math.sin(t * 7.3)) * 0.2;
    } else if (t < st.boccaFino) m = 1;
    else if (agita) m = 0.85 + Math.sin(t * 20) * 0.1;
    else if (stordito) m = 0.35 + Math.sin(t * 3) * 0.15;
    api.setMouth(m);

    const popTarget = st.mode === 'held' ? 0.45 : 0;
    st.pop += (popTarget - st.pop) * Math.min(1, dt * 3);
    api.setPop(st.pop);

    // guarda il puntatore
    api.look((ptr.x - st.x) / 350, -(ptr.y - (st.y - 1.2 * S)) / 350);

    // si gira verso dove va, o verso il centro dello schermo
    const yawT = Math.abs(st.vx) > 120 ? Math.sign(st.vx) * 0.6 : st.x > W / 2 ? -0.22 : 0.22;
    st.yaw += (yawT - st.yaw) * Math.min(1, dt * 5);

    // giro di testa (gag)
    const sp = (t - st.spinT0) / 0.7;
    api.setHeadSpin(sp >= 0 && sp < 1 ? Math.PI * 2 * (sp * sp * (3 - 2 * sp)) : 0);
  }

  function frame(now) {
    if (morto) return;
    const dt = Math.min(0.033, (now - last) / 1000);
    last = now;
    t += dt;
    if (!debugFermo) passo(dt);
    else debugFermo();

    if (st.dizzyUntil && t > st.dizzyUntil && st.dizzyUntil !== Infinity) {
      st.dizzyUntil = 0;
      api.setDizzy(false);
      if (Math.random() < 0.7) dici(pick(frasi.ripresa), { cooldown: 1.5 });
    }
    // molla della "gelatina" dopo gli urti
    st.sqv += (-st.sq * 300 - st.sqv * 12) * dt;
    st.sq += st.sqv * dt;

    // battute e gag quando nessuno lo tocca (mai mentre parla)
    const libero = st.visibile && st.mode === 'ground' && !st.dizzyUntil && t > parla.fino && !debugFermo;
    if (libero) {
      if (t - ultimaAttivita > 45 && t - ultimaFrase > 45) { dici(pick(frasi.noia)); ultimaAttivita = t; }
      else if (t > prossimaPuzza) { (Math.random() < 0.5 ? rutto : scoreggia)(); prossimaPuzza = t + casuale(50, 100); }
      else if (t > prossimaGag) { st.spinT0 = t; prossimaGag = t + casuale(15, 30); }
    }

    if (!st.visibile && !(t - st.puffT0 < 0.7)) {
      if (!pulito) { renderer.clear(); fumetto.classList.remove('on'); pulito = true; }
      raf = requestAnimationFrame(frame);
      return;
    }
    pulito = false;

    posa(dt);
    api.update(t, dt);

    // comparsa: scala con rimbalzo
    let app = 1;
    if (st.appearT0 >= 0) {
      const p = (t - st.appearT0) / 0.5;
      app = p < 0 ? 0.001 : p >= 1 ? 1 : Math.max(0.001, easeBack(p));
      if (p >= 1) st.appearT0 = -1;
    }
    const sqx = st.sqAxis === 'x' ? 1 - 0.3 * st.sq : 1 + 0.18 * st.sq;
    const sqy = st.sqAxis === 'x' ? 1 + 0.18 * st.sq : 1 - 0.3 * st.sq;
    holder.visible = st.visibile;
    holder.scale.set(S * sqx * app, S * sqy * app, S * app);
    holder.position.set(st.x - W / 2, H / 2 - st.y - (st.mode === 'ground' ? (1 - sqy * app) * BOT * S : 0), 0);
    holder.rotation.z = st.a;
    inner.rotation.y = st.yaw;

    const b = bounds(st.a);
    const alto = pav() - (st.y + b.maxY);
    const k = Math.max(0.15, 1 - alto / 450);
    ombra.visible = st.visibile;
    ombra.position.set(st.x - W / 2, H / 2 - pav() + 3, -1200);
    ombra.scale.set(HW * S * 1.15 * k, HW * S * 0.2 * k, 1);
    ombra.material.opacity = 0.2 * k;

    const pp = (t - st.puffT0) / 0.7;
    puff.visible = pp >= 0 && pp < 1;
    if (puff.visible) {
      puff.position.set(st.puffX - W / 2, H / 2 - st.puffY, 300);
      puff.scale.setScalar(S * st.puffS);
      puff.children.forEach((m, i) => {
        m.position.copy(puffDirs[i]).multiplyScalar(0.4 + 1.2 * pp);
        m.scale.setScalar((0.35 + 0.45 * pp) * (i % 2 ? 0.8 : 1));
      });
      puffMat.opacity = 1 - pp;
    }

    renderer.render(scene, camera);
    aggiornaFumetto();
    raf = requestAnimationFrame(frame);
  }

  // ---------- mouse e dito ----------
  function setCursor(c) {
    if (c === cursor) return;
    cursor = c;
    document.documentElement.style.cursor = c;
  }
  function onDown(e) {
    if (e.button > 0 || !colpito(e.clientX, e.clientY)) return;
    e.preventDefault(); e.stopPropagation();
    ultimaAttivita = t;
    st.mode = 'held'; st.salto = false;
    ptr.x = e.clientX; ptr.y = e.clientY;
    grab = { x: e.clientX - st.x, y: e.clientY - st.y };
    samples = [[performance.now(), ptr.x, ptr.y]];
    down = { x: e.clientX, y: e.clientY, t: performance.now() };
    moved = 0; dettoPresa = false;
    setCursor('grabbing');
    suppress = true;
  }
  function onTouch(e) {
    // sul telefono, toccare Sbrigo non deve far scorrere la pagina sotto
    const p = e.touches[0];
    if (p && colpito(p.clientX, p.clientY)) e.preventDefault();
  }
  function onMove(e) {
    const now = performance.now();
    const dx = e.clientX - ptr.x, dy = e.clientY - ptr.y;
    ptr.x = e.clientX; ptr.y = e.clientY;
    if (st.mode === 'held') {
      e.preventDefault();
      const prev = samples[samples.length - 1];
      const dtm = Math.max(1, now - prev[0]) / 1000;
      ptrV.x += (dx / dtm - ptrV.x) * 0.3;
      ptrV.y += (dy / dtm - ptrV.y) * 0.3;
      samples.push([now, ptr.x, ptr.y]);
      while (samples.length > 2 && now - samples[0][0] > 90) samples.shift();
      moved = Math.max(moved, Math.hypot(ptr.x - down.x, ptr.y - down.y));
      if (moved > 40 && !dettoPresa) { dettoPresa = true; dici(pick(frasi.presa), { cooldown: 4 }); }
    } else if (e.pointerType === 'mouse') {
      setCursor(colpito(ptr.x, ptr.y) ? 'grab' : '');
    }
  }
  function onUp(e) {
    if (st.mode !== 'held') return;
    e.preventDefault(); e.stopPropagation();
    ultimaAttivita = t;
    const now = performance.now();
    if (moved < 8 && now - down.t < 400) {
      // tocco: salto mortale
      st.mode = 'air'; st.salto = true;
      st.vx = 0; st.vy = -950; st.va = (Math.random() < 0.5 ? -1 : 1) * (Math.PI * 2) / 0.72;
      dici(pick(frasi.tocco), { cooldown: 2 });
    } else {
      const a = samples[0], z = samples[samples.length - 1];
      const dts = Math.max(0.016, (z[0] - a[0]) / 1000);
      const fermo = now - z[0] > 120;
      st.mode = 'air';
      st.vx = clamp(fermo ? 0 : (z[1] - a[1]) / dts, -3800, 3800);
      st.vy = clamp(fermo ? 0 : (z[2] - a[2]) / dts, -3800, 3800);
      st.va = -st.vx * 0.004 + (Math.random() - 0.5) * 3;
    }
    setCursor(e.pointerType === 'mouse' && colpito(e.clientX, e.clientY) ? 'grab' : '');
    setTimeout(() => { suppress = false; }, 0);
  }
  function onClick(e) {
    if (!suppress) return;
    e.preventDefault(); e.stopPropagation();
    suppress = false;
  }
  addEventListener('pointerdown', onDown, true);
  addEventListener('pointermove', onMove, true);
  addEventListener('pointerup', onUp, true);
  addEventListener('pointercancel', onUp, true);
  addEventListener('click', onClick, true);
  addEventListener('touchstart', onTouch, { capture: true, passive: false });

  // ---------- comandi da presentatore ----------
  function entra(frase) {
    st.visibile = true;
    st.mode = 'ground'; st.a = 0; st.va = 0; st.vx = 0; st.salto = false;
    st.dizzyUntil = 0; api.setDizzy(false);
    if (!(st.x >= altezza * 0.4 && st.x <= W - altezza * 0.4)) st.x = W - altezza * 0.55;
    st.y = pav() - BOT * S;
    st.appearT0 = t + 0.05;
    st.spinT0 = t + 0.25;
    ultimaAttivita = t;
    sbuffo(st.x, st.y);
    sintetico(0, 'puff');
    onVisibile(true);
    if (frase) dopo(650, () => dici(frase));
  }

  const stage = {
    sbrigo, canvas,
    get visibile() { return st.visibile; },
    dici: (testo) => { ultimaAttivita = t; dici(testo); },
    zitto,
    presenta(vista) {
      const l = frasi.viste?.[vista];
      if (l?.length) dici(pick(l));
    },
    festa(testo) {
      if (!st.visibile || st.mode === 'held') return;
      st.mode = 'air'; st.salto = true;
      st.vy = -1100; st.vx = 0; st.va = (Math.PI * 2) / 0.85;
      scritta('CANESTRO!', st.x, st.y - TOP * S, 0.8);
      dici(testo || pick(frasi.festa));
    },
    rutto, scoreggia,
    vattene() {
      if (!st.visibile || st.mode === 'uscita') return;
      dici(pick(frasi.via));
      dopo(1300, () => {
        zitto();
        sbuffo(st.x, st.y);
        st.mode = 'uscita'; st.salto = false;
        st.vx = st.x > W / 2 ? 1300 : -1300; st.vy = -1300; st.va = st.vx > 0 ? -7 : 7;
        onVisibile(false);
      });
    },
    torna(frase = pick(frasi.torna)) {
      if (st.visibile) return;
      st.x = W - altezza * 0.55;
      entra(frase);
    },
    destroy() {
      morto = true;
      cancelAnimationFrame(raf);
      removeEventListener('resize', resize);
      removeEventListener('pointerdown', onDown, true);
      removeEventListener('pointermove', onMove, true);
      removeEventListener('pointerup', onUp, true);
      removeEventListener('pointercancel', onUp, true);
      removeEventListener('click', onClick, true);
      removeEventListener('touchstart', onTouch, { capture: true });
      removeEventListener('pointerdown', sbloccaAudio, true);
      removeEventListener('keydown', sbloccaAudio, true);
      zitto();
      voceEl.removeAttribute('src');
      ac?.close().catch(() => {});
      setCursor('');
      canvas.remove(); fumetto.remove(); style.remove();
      pmrem.dispose();
      renderer.dispose();
    },
    // Solo per gli screenshot di controllo
    debug(pose) {
      st.visibile = true; st.appearT0 = -1;
      if (pose === 'stordito') { st.dizzyUntil = Infinity; api.setDizzy(true); }
      if (pose === 'preso') {
        st.mode = 'held';
        grab = { x: 0, y: -TOP * S * 0.7 };
        debugFermo = () => {
          ptr.x = W * 0.45 + Math.sin(t * 2) * 60; ptr.y = H * 0.25;
          ptrV.x = Math.cos(t * 2) * 1400;
          passo(1 / 60);
        };
      }
      if (pose === 'parla') dici(saluto);
    },
  };

  raf = requestAnimationFrame(frame);
  if (visibileIniziale) entra(saluto);
  return stage;
}
