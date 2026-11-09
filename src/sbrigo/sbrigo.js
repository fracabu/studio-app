// Sbrigo, lo spiritello dei compiti: personaggio ORIGINALE costruito in codice (Three.js).
// Spirito da commedia gotica (irriverente, smorfie, occhi a spirale), aspetto tutto nostro:
// pelle lavanda, occhiaie viola, capelli sparati viola-azzurri, orecchie a punta,
// giacca a quadri arancio/viola troppo grande, cravatta storta, scarpe da basket, pallone.
//
// createSbrigo() → THREE.Group (origine ai piedi, faccia verso +z) con
//   userData.parts: body, neck, head, arms[2] (pivot spalla, rest in userData.rest), legs[2], ball
//   userData.api:   update(t, dt), setMouth(0..1), setLids(0..1), setDizzy(bool), setPop(0..1),
//                   look(x, y) (-1..1, sguardo), setHeadSpin(rad)
import * as THREE from 'three';

export const COLORI = {
  pelle: 0xd3cbf2,
  pelleOmbra: 0xb6a9e6,
  occhiaie: 0x4b2f86,
  guance: 0xe58ac8,
  capelliBase: 0x5a2bd0,
  capelli: [0x8b3dff, 0x6a5cff, 0x2fa8ff, 0x19d3c5],
  sopracciglia: 0x24123f,
  iride: 0xffd23f,
  bocca: 0x3a1030,
  lingua: 0xff6f9a,
  denti: 0xfff7e0,
  pantaloni: 0x2a1650,
  camicia: 0xfffaf0,
  cravatta: 0x19d3c5,
  scarpa: 0xff6a13,
  suola: 0xffffff,
  stella: 0xffd23f,
};

export const ALTEZZA = 4.3;    // dai piedi alla punta dei capelli (unità del modello)
export const BARICENTRO = 1.9; // altezza del punto attorno a cui ruota quando vola

const X = new THREE.Vector3(1, 0, 0);
const Y = new THREE.Vector3(0, 1, 0);
const Z = new THREE.Vector3(0, 0, 1);
const ss = THREE.MathUtils.smoothstep;

const mat = (color, opts = {}) =>
  new THREE.MeshPhysicalMaterial({ color, roughness: 0.55, clearcoat: 0.3, clearcoatRoughness: 0.5, ...opts });

// Casuale deterministico: Sbrigo è sempre uguale a se stesso.
let seed = 4242;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

// Testa: ellissoide.
const HEAD_S = new THREE.Vector3(1.08, 0.98, 0.95);

// Punto della sfera unitaria davanti (z > 0) dato x, y.
function unit(x, y) {
  return new THREE.Vector3(x, y, Math.sqrt(Math.max(0, 1 - x * x - y * y)));
}
// Punto sulla superficie della testa + normale vera dell'ellissoide.
function onFace(x, y, push = 0) {
  const u = unit(x, y);
  const n = new THREE.Vector3(u.x / HEAD_S.x, u.y / HEAD_S.y, u.z / HEAD_S.z).normalize();
  return { pos: new THREE.Vector3(u.x * HEAD_S.x, u.y * HEAD_S.y, u.z * HEAD_S.z).addScaledVector(n, push), n };
}

// Mesh piatta "dipinta" sulla faccia: ogni vertice (u, v) viene proiettato sulla testa.
// apply(sy, sx) la ricalcola (serve alla bocca che si apre).
function faceMesh(geo, cx, cy, push, material, rot = 0, sx = 1) {
  const pos = geo.attributes.position;
  const orig = Float32Array.from(pos.array);
  const m = new THREE.Mesh(geo, material);
  const c = Math.cos(rot), s = Math.sin(rot);
  m.userData.apply = (sy = 1) => {
    for (let i = 0; i < pos.count; i++) {
      const u = orig[i * 3] * sx, v = orig[i * 3 + 1] * sy;
      const p = onFace(cx + u * c - v * s, cy + u * s + v * c, push).pos;
      pos.setXYZ(i, p.x, p.y, p.z);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
    geo.computeBoundingSphere();
  };
  m.userData.apply(1);
  return m;
}

// ---------- texture disegnate su canvas ----------
function canvasTex(w, h, draw, repeat = null) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(...repeat); }
  return t;
}

const texQuadri = (repeat) => canvasTex(256, 256, (g) => {
  g.fillStyle = '#ff8a1f'; g.fillRect(0, 0, 256, 256);
  g.globalAlpha = 0.5; g.fillStyle = '#6a2bd9';
  g.fillRect(0, 92, 256, 72); g.fillRect(92, 0, 72, 256);
  g.globalAlpha = 0.85; g.fillStyle = '#2a1650';
  g.fillRect(0, 124, 256, 8); g.fillRect(124, 0, 8, 256);
  g.globalAlpha = 0.45; g.fillStyle = '#ffd23f';
  g.fillRect(0, 26, 256, 7); g.fillRect(26, 0, 7, 256);
}, repeat);

const texPallone = () => canvasTex(512, 256, (g, w, h) => {
  g.fillStyle = '#f07a1a'; g.fillRect(0, 0, w, h);
  g.strokeStyle = '#2a1408'; g.lineWidth = 9;
  g.beginPath(); g.moveTo(0, h / 2); g.lineTo(w, h / 2); g.stroke();          // equatore
  for (const x of [w / 4, (3 * w) / 4]) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, h); g.stroke(); }
  for (const off of [0, w / 2]) {                                              // le due curve
    g.beginPath();
    for (let x = 0; x <= w / 2; x += 4) {
      const y = h / 2 - Math.sin((x / (w / 2)) * Math.PI) * h * 0.36;
      x ? g.lineTo(off + x, y) : g.moveTo(off + x, y);
    }
    g.stroke();
    g.beginPath();
    for (let x = 0; x <= w / 2; x += 4) {
      const y = h / 2 + Math.sin((x / (w / 2)) * Math.PI) * h * 0.36;
      x ? g.lineTo(off + x, y) : g.moveTo(off + x, y);
    }
    g.stroke();
  }
});

const texSpirale = () => canvasTex(128, 128, (g) => {
  g.fillStyle = '#ffffff';
  g.beginPath(); g.arc(64, 64, 62, 0, Math.PI * 2); g.fill();
  g.strokeStyle = '#1d1530'; g.lineWidth = 7; g.lineCap = 'round';
  g.beginPath();
  for (let a = 0; a < Math.PI * 7; a += 0.1) {
    const r = 3 + a * 2.6;
    const x = 64 + Math.cos(a) * r, y = 64 + Math.sin(a) * r;
    a ? g.lineTo(x, y) : g.moveTo(x, y);
  }
  g.stroke();
});

function starGeo(ro = 0.17, ri = 0.075) {
  const s = new THREE.Shape();
  for (let i = 0; i < 10; i++) {
    const r = i % 2 ? ri : ro, a = Math.PI / 2 + (i * Math.PI) / 5;
    i ? s.lineTo(Math.cos(a) * r, Math.sin(a) * r) : s.moveTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  s.closePath();
  const g = new THREE.ExtrudeGeometry(s, { depth: 0.05, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 2 });
  g.center();
  return g;
}

// ---------- testa ----------
const OCCHI = [
  { s: -1, r: 0.25, y: 0.08 },  // occhi diversi: sguardo un po' matto
  { s: 1, r: 0.29, y: 0.13 },
];

function buildSkull() {
  const g = new THREE.SphereGeometry(1, 96, 64);
  const pos = g.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  const base = new THREE.Color(COLORI.pelle), occ = new THREE.Color(COLORI.occhiaie), gu = new THREE.Color(COLORI.guance);
  const centri = OCCHI.map((o) => ({ d: unit(0.37 * o.s, o.y - 0.05), r: o.r }));
  const guance = [-1, 1].map((s) => unit(0.55 * s, -0.3));
  const v = new THREE.Vector3(), c = new THREE.Color();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    c.copy(base);
    for (const e of centri) c.lerp(occ, 0.8 * (1 - ss(v.distanceTo(e.d), e.r * 0.95, e.r * 1.6)));
    for (const g2 of guance) c.lerp(gu, 0.32 * (1 - ss(v.distanceTo(g2), 0.04, 0.3)));
    colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
  }
  g.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  const m = new THREE.Mesh(g, mat(0xffffff, { vertexColors: true, roughness: 0.6 }));
  m.scale.copy(HEAD_S);
  return m;
}

function buildHead() {
  const head = new THREE.Group();
  head.name = 'head';
  const pelle = mat(COLORI.pelle), ombra = mat(COLORI.pelleOmbra);
  head.add(buildSkull());

  // Capelli: calotta inclinata all'indietro (fronte libera) + ciuffi sparati
  const TILT = -0.45;
  const cap = new THREE.Mesh(new THREE.SphereGeometry(1.035, 48, 24, 0, Math.PI * 2, 0, 1.2), mat(COLORI.capelliBase, { roughness: 0.8, clearcoat: 0.1 }));
  cap.scale.copy(HEAD_S);
  cap.rotation.x = TILT;
  head.add(cap);
  const cols = COLORI.capelli.map((c) => mat(c, { roughness: 0.7, clearcoat: 0.15 }));
  const N = 22;
  for (let i = 0; i < N; i++) {
    const az = (i / N) * Math.PI * 2 + rnd() * 0.3;
    const front = Math.cos(az) > 0.55;
    const el = front ? 0.15 + rnd() * 0.3 : 0.35 + rnd() * 0.7;
    const d = new THREE.Vector3(Math.sin(az) * Math.sin(el), Math.cos(el), Math.cos(az) * Math.sin(el)).applyAxisAngle(X, TILT);
    const base = new THREE.Vector3(d.x * HEAD_S.x, d.y * HEAD_S.y, d.z * HEAD_S.z);
    const h = 0.5 + rnd() * 0.5;
    const out = d.clone().add(new THREE.Vector3((rnd() - 0.5) * 0.5, 0.45, (rnd() - 0.5) * 0.3)).normalize();
    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.19 + rnd() * 0.09, h, 12), cols[Math.floor(rnd() * cols.length)]);
    cone.quaternion.setFromUnitVectors(Y, out);
    cone.position.copy(base).addScaledVector(out, h * 0.5 - 0.12);
    head.add(cone);
  }

  // Ciuffi sull'attaccatura davanti: niente "fascetta", la fronte finisce a punte
  for (let i = 0; i < 7; i++) {
    const az = -0.95 + (i / 6) * 1.9 + (rnd() - 0.5) * 0.12;
    const el = 1.12;
    const d = new THREE.Vector3(Math.sin(az) * Math.sin(el), Math.cos(el), Math.cos(az) * Math.sin(el)).applyAxisAngle(X, TILT);
    const base = new THREE.Vector3(d.x * HEAD_S.x, d.y * HEAD_S.y, d.z * HEAD_S.z);
    const h = 0.32 + rnd() * 0.22;
    const out = d.clone().add(new THREE.Vector3((rnd() - 0.5) * 0.4, 0.9, 0.35)).normalize();
    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.15 + rnd() * 0.05, h, 10), cols[i % cols.length]);
    cone.quaternion.setFromUnitVectors(Y, out);
    cone.position.copy(base).addScaledVector(out, h * 0.5 - 0.1);
    head.add(cone);
  }

  // Orecchie a punta
  for (const s of [-1, 1]) {
    const ear = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.8, 16), ombra);
    ear.position.set(s * 1.3, 0.12, -0.05);
    ear.rotation.z = -s * (Math.PI / 2 - 0.55);
    ear.scale.z = 0.45;
    head.add(ear);
  }

  // Occhi (bianco schiacciato, iride gialla, pupilla, luce) + palpebre + sopracciglia
  const irisMat = new THREE.MeshStandardMaterial({ color: COLORI.iride, roughness: 0.4 });
  const spiralMat = new THREE.MeshBasicMaterial({ map: texSpirale(), transparent: true });
  const browMat = mat(COLORI.sopracciglia, { roughness: 0.8, clearcoat: 0 });
  const eyes = [];
  for (const o of OCCHI) {
    const { s, r, y } = o;
    const { pos, n } = onFace(0.37 * s, y, -r * 0.25);
    const eye = new THREE.Group();
    const white = new THREE.Mesh(new THREE.SphereGeometry(r, 32, 24), mat(0xffffff, { roughness: 0.15 }));
    white.scale.set(1, 1, 0.6);
    eye.add(white);
    const fz = r * 0.6;
    const sguardo = new THREE.Group();
    sguardo.position.z = 0;
    const iris = new THREE.Mesh(new THREE.CircleGeometry(r * 0.5, 32), irisMat);
    iris.position.z = fz + 0.003;
    const pupil = new THREE.Mesh(new THREE.CircleGeometry(r * 0.22, 24), new THREE.MeshBasicMaterial({ color: 0x120a1f }));
    pupil.position.z = fz + 0.005;
    const glint = new THREE.Mesh(new THREE.CircleGeometry(r * 0.09, 16), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    glint.position.set(r * 0.12 * s, r * 0.14, fz + 0.007);
    sguardo.add(iris, pupil, glint);
    eye.add(sguardo);

    const lidPivot = new THREE.Group();
    lidPivot.scale.set(1.08, 1.06, 0.66);
    const upper = new THREE.Mesh(new THREE.SphereGeometry(r, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), ombra);
    const lower = new THREE.Mesh(new THREE.SphereGeometry(r, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), ombra);
    lower.rotation.x = 0.75;
    lidPivot.add(upper, lower);
    eye.add(lidPivot);

    eye.position.copy(pos);
    eye.quaternion.setFromUnitVectors(Z, n.clone().lerp(Z, 0.6).normalize());
    head.add(eye);

    // Sopracciglia: il sinistro basso e furbo, il destro alzatissimo
    const brow = new THREE.Mesh(new THREE.CapsuleGeometry(0.055, 0.3, 6, 12), browMat);
    const bp = onFace(0.37 * s, y + r + (s > 0 ? 0.17 : 0.07), 0.05);
    brow.position.copy(bp.pos);
    brow.quaternion.setFromUnitVectors(Z, bp.n);
    brow.rotateZ(Math.PI / 2 + (s > 0 ? -0.25 : 0.3));
    head.add(brow);

    eyes.push({ group: eye, base: pos.clone(), n, r, s, iris, pupil, glint, sguardo, upper, brow, browBase: bp.pos.clone() });
  }

  // Nasone storto
  const np = onFace(0.03, -0.13, 0.02);
  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.17, 24, 16), ombra);
  nose.position.copy(np.pos);
  nose.quaternion.setFromUnitVectors(Z, np.n);
  nose.scale.set(0.8, 0.85, 1.9);
  nose.rotateY(0.25);
  nose.rotateX(0.15);
  head.add(nose);

  // Bocca storta (sorriso a un lato) con dente mancante e lingua. Dipinta sulla faccia.
  const MX = 0.1, MY = -0.45, MR = 0.14;
  const inside = faceMesh(new THREE.CircleGeometry(0.3, 40, Math.PI, Math.PI), MX, MY, 0.012,
    new THREE.MeshStandardMaterial({ color: COLORI.bocca, roughness: 0.8, side: THREE.DoubleSide }), MR, 1.25);
  const lingua = faceMesh(new THREE.CircleGeometry(0.12, 24).translate(0.07, -0.2, 0), MX, MY, 0.016,
    new THREE.MeshStandardMaterial({ color: COLORI.lingua, roughness: 0.6, side: THREE.DoubleSide }), MR, 1.3);
  const dentiMat = new THREE.MeshStandardMaterial({ color: COLORI.denti, emissive: 0x6b6150, roughness: 0.35, side: THREE.DoubleSide });
  const denti = [-0.17, -0.06, 0.16].map((x) =>   // manca quello a x = 0.05
    faceMesh(new THREE.PlaneGeometry(0.1, 0.085, 2, 2).translate(x, -0.042, 0), MX, MY, 0.02, dentiMat, MR, 1));
  head.add(inside, lingua, ...denti);

  head.userData = { eyes, mouth: { inside, lingua }, irisMat, spiralMat };
  return head;
}

// ---------- corpo ----------
function buildBody() {
  const body = new THREE.Group();
  body.name = 'body';
  const giacca = new THREE.MeshPhysicalMaterial({ map: texQuadri([5, 2]), roughness: 0.85, sheen: 0.4, sheenColor: 0xffffff });
  const manica = new THREE.MeshPhysicalMaterial({ map: texQuadri([2, 2]), roughness: 0.85, sheen: 0.4, sheenColor: 0xffffff });
  const pelle = mat(COLORI.pelle);
  const scuro = mat(COLORI.pantaloni, { roughness: 0.9, clearcoat: 0 });

  // Giacca larga: profilo ruotato (si allarga in fondo)
  const prof = [[0, 0.6], [0.62, 0.6], [0.67, 0.68], [0.65, 0.95], [0.6, 1.25], [0.54, 1.45], [0.42, 1.6], [0.2, 1.68], [0, 1.68]];
  const torso = new THREE.Mesh(new THREE.LatheGeometry(prof.map(([x, y]) => new THREE.Vector2(x, y)), 48), giacca);
  torso.scale.z = 0.78;
  body.add(torso);

  // Camicia a V e cravatta storta
  const v = new THREE.Shape();
  v.moveTo(-0.2, 0.225); v.lineTo(0.2, 0.225); v.lineTo(0, -0.225); v.closePath();
  const camicia = new THREE.Mesh(new THREE.ShapeGeometry(v), mat(COLORI.camicia, { roughness: 0.7, side: THREE.DoubleSide }));
  camicia.position.set(0, 1.36, 0.43);
  camicia.rotation.x = -0.22;
  body.add(camicia);
  const k = new THREE.Shape();
  k.moveTo(-0.05, 0.2); k.lineTo(0.05, 0.2); k.lineTo(0.09, -0.16); k.lineTo(0, -0.26); k.lineTo(-0.09, -0.16); k.closePath();
  const cravatta = new THREE.Mesh(new THREE.ExtrudeGeometry(k, { depth: 0.03, bevelEnabled: true, bevelThickness: 0.01, bevelSize: 0.01, bevelSegments: 2 }), mat(COLORI.cravatta));
  cravatta.position.set(0.02, 1.3, 0.43);
  cravatta.rotation.set(-0.22, 0, 0.18);
  body.add(cravatta);
  const nodo = new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 12), mat(COLORI.cravatta));
  nodo.position.set(0, 1.53, 0.4);
  nodo.scale.set(1.2, 0.9, 0.7);
  body.add(nodo);

  // Collo
  const collo = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.18, 0.3, 20), pelle);
  collo.position.y = 1.72;
  body.add(collo);

  // Braccia: pivot alla spalla. La destra (lato +x) è alzata e fa girare il pallone.
  const arms = [];
  let ball = null;
  for (const s of [-1, 1]) {
    const sh = new THREE.Group();
    sh.position.set(s * 0.56, 1.5, 0);
    const sleeve = new THREE.Mesh(new THREE.CapsuleGeometry(0.16, 0.48, 8, 16), manica);
    sleeve.position.y = -0.32;
    const cuff = new THREE.Mesh(new THREE.CylinderGeometry(0.165, 0.165, 0.08, 20), scuro);
    cuff.position.y = -0.62;
    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.15, 24, 16), pelle);
    hand.position.y = -0.73;
    hand.scale.set(1, 1.05, 0.85);
    sh.add(sleeve, cuff, hand);
    sh.userData.rest = s < 0 ? -0.28 : 2.55;
    sh.rotation.z = sh.userData.rest;
    if (s > 0) {
      const dito = new THREE.Mesh(new THREE.CapsuleGeometry(0.04, 0.12, 4, 8), pelle);
      dito.position.y = -0.9;
      ball = new THREE.Mesh(new THREE.SphereGeometry(0.3, 32, 24), new THREE.MeshPhysicalMaterial({ map: texPallone(), roughness: 0.75, clearcoat: 0.15 }));
      ball.position.y = -1.27;
      sh.add(dito, ball);
    }
    body.add(sh);
    arms.push(sh);
  }

  // Gambe con scarpe da basket enormi: pivot all'anca per scalciare
  const legs = [];
  const scarpa = mat(COLORI.scarpa, { roughness: 0.45 });
  const bianco = mat(COLORI.suola, { roughness: 0.5 });
  const stella = mat(COLORI.stella, { roughness: 0.4 });
  const sg = starGeo(0.1, 0.045);
  for (const s of [-1, 1]) {
    const hip = new THREE.Group();
    hip.position.set(s * 0.24, 0.66, 0);
    const leg = new THREE.Mesh(new THREE.CapsuleGeometry(0.13, 0.2, 8, 16), scuro);
    leg.position.y = -0.2;
    hip.add(leg);
    const shoe = new THREE.Group();
    shoe.position.y = -0.66;          // lo zero della scarpa è il pavimento
    const sole = new THREE.Mesh(new THREE.CapsuleGeometry(0.22, 0.36, 6, 16), bianco);
    sole.rotation.x = Math.PI / 2;
    sole.scale.set(1.15, 1, 0.3);
    sole.position.set(0, 0.06, 0.14);
    const upper = new THREE.Mesh(new THREE.SphereGeometry(0.26, 32, 20), scarpa);
    upper.scale.set(1, 0.68, 1.6);
    upper.position.set(0, 0.16, 0.14);
    const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.19, 0.26, 20), scarpa);
    collar.position.y = 0.33;
    const bordo = new THREE.Mesh(new THREE.TorusGeometry(0.17, 0.035, 8, 24), bianco);
    bordo.rotation.x = Math.PI / 2;
    bordo.position.y = 0.46;
    shoe.add(sole, upper, collar, bordo);
    for (const [z, y] of [[0.26, 0.315], [0.36, 0.3], [0.46, 0.27]]) {
      const laccio = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.025, 0.04), bianco);
      laccio.position.set(0, y, z);
      laccio.rotation.x = 0.4;
      shoe.add(laccio);
    }
    const st = new THREE.Mesh(sg, stella);
    st.position.set(s * 0.255, 0.2, 0.08);
    st.rotation.y = s * Math.PI / 2;
    shoe.add(st);
    hip.add(shoe);
    body.add(hip);
    legs.push(hip);
  }

  body.userData = { arms, legs, ball };
  return body;
}

function buildStelle() {
  const g = new THREE.Group();
  g.name = 'stelle';
  const geo = starGeo();
  const m = new THREE.MeshStandardMaterial({ color: COLORI.stella, emissive: 0xffb800, emissiveIntensity: 0.55, roughness: 0.4 });
  for (let i = 0; i < 5; i++) {
    const s = new THREE.Mesh(geo, m);
    s.userData.fase = (i / 5) * Math.PI * 2;
    g.add(s);
  }
  g.visible = false;
  return g;
}

export function createSbrigo() {
  const root = new THREE.Group();
  root.name = 'sbrigo';
  const body = buildBody();
  root.add(body);

  const neck = new THREE.Group();
  neck.position.y = 1.62;
  const head = buildHead();
  head.position.y = 0.95;
  neck.add(head);
  const stelle = buildStelle();
  stelle.position.y = 0.95 + 1.2;
  neck.add(stelle);
  root.add(neck);

  const { eyes, mouth, irisMat, spiralMat } = head.userData;
  const parts = { body, neck, head, stelle, eyes, mouth, arms: body.userData.arms, legs: body.userData.legs, ball: body.userData.ball };

  const blinkAt = (t) => {
    const period = 3.4, k = Math.floor(t / period);
    const start = k * period + ((k * 1.37) % 1.8);
    return t >= start && t < start + 0.13;
  };

  const st = { dizzyOn: false, dz: 0, pop: 0, lookX: 0, lookY: 0, headSpin: 0, lidBase: 0.22, lids: -1, mouth: -1 };

  const api = {
    setMouth(v) {
      const o = 0.4 + 0.9 * THREE.MathUtils.clamp(v, 0, 1);
      if (Math.abs(o - st.mouth) < 0.01) return;
      st.mouth = o;
      mouth.inside.userData.apply(o);
      mouth.lingua.userData.apply(o);
    },
    setLids(v) {
      if (v === st.lids) return;
      st.lids = v;
      for (const e of eyes) e.upper.rotation.x = THREE.MathUtils.lerp(-1.05, 0.5, v);
    },
    setDizzy(on) { st.dizzyOn = !!on; },
    /** livello di stordimento impostato direttamente (0..1): per i video resi fotogramma per fotogramma */
    setDz(v) { st.dz = THREE.MathUtils.clamp(v, 0, 1); st.dizzyOn = v > 0.5; },
    setPop(v) { st.pop = THREE.MathUtils.clamp(v, 0, 1); },
    look(x, y) { st.lookX = THREE.MathUtils.clamp(x, -1, 1); st.lookY = THREE.MathUtils.clamp(y, -1, 1); },
    setHeadSpin(a) { st.headSpin = a; },
    update(t, dt = 1 / 60) {
      st.dz += ((st.dizzyOn ? 1 : 0) - st.dz) * Math.min(1, dt * 5);
      const dz = st.dz;
      body.scale.y = 1 + Math.sin(t * 2.2) * 0.012;
      neck.rotation.z = Math.sin(t * 0.9) * 0.05 + dz * Math.sin(t * 7) * 0.22;
      neck.rotation.x = dz * Math.cos(t * 7) * 0.12;
      neck.rotation.y = Math.sin(t * 0.6) * 0.1 + st.headSpin;
      neck.position.y = 1.62 + Math.sin(t * 2.2) * 0.012;

      api.setLids(dz > 0.5 ? 0.1 : blinkAt(t) ? 1 : st.lidBase - 0.25 * st.pop);

      const spir = dz > 0.5;
      for (const e of eyes) {
        e.iris.material = spir ? spiralMat : irisMat;
        e.iris.scale.setScalar(spir ? 1.5 : 1);
        e.iris.rotation.z = spir ? -t * 9 * e.s : 0;
        e.pupil.visible = e.glint.visible = !spir;
        const p = st.pop;
        e.group.scale.set(1 + 0.35 * p, 1 + 0.35 * p, 1 + 1.2 * p);
        e.group.position.copy(e.base).addScaledVector(e.n, 0.14 * p);
        e.sguardo.position.set(spir ? 0 : st.lookX * e.r * 0.3, spir ? 0 : st.lookY * e.r * 0.22, 0);
        e.brow.position.copy(e.browBase).addScaledVector(Y, 0.1 * p + (e.s > 0 ? 0.03 * Math.sin(t * 1.3) : 0));
      }

      stelle.visible = dz > 0.03;
      stelle.scale.setScalar(Math.max(0.001, dz));
      for (const s of stelle.children) {
        const a = s.userData.fase + t * 3.4;
        s.position.set(Math.cos(a) * 1.25, Math.sin(a * 2) * 0.1, Math.sin(a) * 0.6);
        s.rotation.set(0.3, Math.sin(a) * 0.5, t * 5 + s.userData.fase);
      }
      if (parts.ball) parts.ball.rotation.y = t * 14;
    },
  };
  api.setMouth(0);
  api.update(0);

  root.traverse((o) => { if (o.isMesh) o.frustumCulled = false; });
  root.userData = { parts, api };
  return root;
}
