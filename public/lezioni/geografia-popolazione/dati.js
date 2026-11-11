/* Contenuti della lezione di geografia: la popolazione.
 * Fonte: GeoAgenda 1 (Zanichelli), capitolo 6, pag. B4-B6 (trascrizione in
 * prima-media-llm-wiki/raw/libri/geografia-geoagenda/b6-*). Testi riscritti con parole nostre,
 * esercizi e domande nostri. Lo legge la pagina (window.LEZIONE) e scripts/lezione-audio.mjs per gli MP3. */

/* Piramidi disegnate da noi con dati inventati, solo per far vedere la forma.
   Valori dal basso (0-4 anni) all'alto, da 0 a 10; [maschi, femmine] */
function piramide(dati) {
  const n = dati.length, h = 180 / n, cx = 150, k = 13
  let s = `<svg viewBox="0 0 300 205" role="img" aria-label="piramide della popolazione"><line x1="${cx}" y1="5" x2="${cx}" y2="190" stroke="#3a0d09" stroke-width="2"/>`
  dati.forEach(([m, f], i) => {
    const y = 185 - (i + 1) * h
    s += `<rect x="${cx - m * k}" y="${y + 1}" width="${m * k}" height="${h - 2}" fill="#2b8fe0"/><rect x="${cx}" y="${y + 1}" width="${f * k}" height="${h - 2}" fill="#f07aa6"/>`
  })
  s += `<text x="12" y="16" font-size="14" font-family="Patrick Hand" fill="#3a0d09">maschi</text><text x="288" y="16" font-size="14" font-family="Patrick Hand" fill="#3a0d09" text-anchor="end">femmine</text>`
  s += `<text x="${cx}" y="202" font-size="11" font-family="Nunito" fill="#3a0d09" text-anchor="middle">in alto gli anziani, in basso i bambini</text></svg>`
  return s
}
const GIOVANE = [[10, 10], [9.4, 9.3], [8.7, 8.7], [8, 8], [7.2, 7.3], [6.4, 6.5], [5.5, 5.7], [4.6, 4.9], [3.7, 4], [2.8, 3.2], [2, 2.4], [1.3, 1.7], [0.7, 1.1], [0.3, 0.6]]
const VECCHIA = [[4.6, 4.4], [5, 4.8], [5.4, 5.2], [5.8, 5.6], [6.4, 6.2], [7.2, 7], [8, 7.9], [8.8, 8.8], [9.3, 9.4], [8.8, 9.1], [7.6, 8.2], [6.2, 7.2], [4.4, 5.8], [2.6, 4.6]]

window.LEZIONE = {
  id: 'geografia-popolazione',
  materia: 'Geografia',
  titolo: 'La popolazione',
  argomento: 'la popolazione',
  pagine: 'B4–B6',
  sezioni: ['scheda', 'esercizi', 'quiz', 'interroga'],
  driveId: '',

  /* ── Schede: html per leggere; l'audio si fa dal testo senza tag (le figure svg si saltano) ── */
  schede: [
    {
      id: 's1', titolo: 'Popolazione e demografia', pag: 'B4',
      html: `<p>La <span class="evid">popolazione</span> è l'insieme delle persone che vivono in un certo luogo.</p>
<p>La <span class="evid">demografia</span> è la scienza che la studia raccogliendo e analizzando <b>dati statistici</b>.</p>
<p>Da dove arrivano i dati? Dall'<b>anagrafe del Comune</b>, che registra nascite, morti e matrimoni, e dai <b>censimenti</b>, i grandi conteggi di tutti gli abitanti.</p>
<p class="parola">📖 Demografia viene dal greco: dèmos, popolo, più gràphein, scrivere. Vuol dire "descrizione del popolo". Dèmos più kràtos, potere, dà <b>democrazia</b>: "potere del popolo".</p>`,
    },
    {
      id: 's2', titolo: 'I sei dati della popolazione', pag: 'B4',
      html: `<ul>
<li><b>Grandezza</b>: quanti abitanti ci sono. In Europa più di 720 milioni.</li>
<li><b>Densità</b>: quante persone vivono in media in un chilometro quadrato. In Europa circa 70.</li>
<li><b>Distribuzione</b>: dove si concentrano le persone. In Europa in pianura e sulle coste.</li>
<li><b>Composizione</b>: quanti maschi e femmine, e di che età. In Europa i giovani sono meno degli anziani.</li>
<li><b>Natalità e mortalità</b>: quanti nati e quanti morti ogni mille abitanti. In Europa circa 9 nati e più di 11 morti.</li>
<li><b>Flussi migratori</b>: quante persone arrivano e quante partono. Nell'Unione Europea, nel 2020, ne sono arrivate circa 2 milioni e partite circa 1 milione.</li>
</ul>
<div class="formula">densità = abitanti : km²</div>`,
    },
    {
      id: 's3', titolo: 'A che cosa servono i dati', pag: 'B4',
      html: `<p>Confrontando i dati di oggi con quelli degli anni passati si possono fare <span class="evid">previsioni</span>.</p>
<p>Così chi governa decide meglio: quante <b>scuole</b> e quanti <b>ospedali</b> aprire o chiudere, quanti soldi servono per le <b>pensioni</b>.</p>
<p><b>Immigrato</b> è chi arriva a vivere in un paese. <b>Emigrato</b> è chi parte dal suo paese.</p>`,
    },
    {
      id: 's4', titolo: 'La piramide della popolazione', pag: 'B5',
      html: `<p>È il grafico che mostra la <b>composizione</b> della popolazione: due istogrammi a barre orizzontali, <b>maschi a sinistra</b> e <b>femmine a destra</b>. Ogni barra vale 5 anni di età: in basso i bambini, in alto gli anziani.</p>
<div class="figura">${piramide(GIOVANE)}<b>Base larga</b></div>
<p>Se nascono tanti bambini la base è larga ed è una vera piramide.</p>
<div class="figura">${piramide(VECCHIA)}<b>Base stretta</b></div>
<p>Se nascono pochi bambini la base è stretta, come in <b>Europa</b>. In alto le barre delle donne sono più lunghe: le donne vivono più a lungo.</p>`,
    },
    {
      id: 's5', titolo: 'Dove vive la gente?', pag: 'B6',
      html: `<ul>
<li>Più nelle zone a <b>clima temperato</b> che in quelle troppo fredde o troppo calde.</li>
<li>Dove è più facile costruire: in <b>pianura</b>, lungo i <b>fiumi</b> e sulle <b>coste</b>.</li>
</ul>
<p>In Europa le zone più affollate sono l'Inghilterra, il Belgio e i Paesi Bassi, la Germania occidentale con la Ruhr, la <b>Pianura Padana</b> e i dintorni di Parigi. Quasi vuoto il nord della Scandinavia e della Russia.</p>`,
    },
    {
      id: 's6', titolo: 'Tre grandi cambiamenti di oggi', pag: 'B6',
      html: `<ul>
<li><b>Si va in città.</b> Le campagne si svuotano perché lì non c'è più lavoro per tutti. Le città crescono in fretta e in disordine perché offrono sempre più servizi: è l'<span class="evid">urbanesimo</span>.</li>
<li><b>Si invecchia.</b> Nei paesi più sviluppati ci sono sempre più anziani, perché si vive meglio e più a lungo, e nascono meno bambini.</li>
<li><b>Si migra.</b> Sempre più persone vanno dai paesi poveri a quelli più ricchi.</li>
</ul>`,
    },
  ],

  esercizi: [
    {
      titolo: 'Calcola la densità',
      testo: 'a) Il paese di Montealto ha <b>12.000 abitanti</b> su <b>40 km²</b>.<br>b) L\'isola di Scogliobello ha <b>1.500 abitanti</b> su <b>30 km²</b>.<br>c) Quale dei due posti è più affollato?',
      metodo: 'Usa <b>densità = abitanti : km²</b>. Il risultato si legge "abitanti per km²".',
      soluzione: 'a) 12.000 : 40 = <b>300 ab/km²</b> · b) 1.500 : 30 = <b>50 ab/km²</b> · c) <b>Montealto</b>: in ogni km² ci sono 300 persone invece di 50.',
    },
    {
      titolo: 'Che dato è?',
      testo: 'Di quale dato della popolazione parla ogni frase?<br>a) "Montealto ha 12.000 abitanti."<br>b) "Quasi tutti vivono vicino al lago."<br>c) "Ci sono più nonni che nipoti."<br>d) "Ogni anno nascono 8 bambini ogni 1000 abitanti."<br>e) "Quest\'anno sono arrivate 200 persone da altri paesi."<br>f) "In ogni km² vivono 300 persone."',
      metodo: 'Ripassa la scheda 2: grandezza, densità, distribuzione, composizione, natalità e mortalità, flussi migratori.',
      soluzione: 'a) grandezza · b) distribuzione · c) composizione · d) natalità · e) flussi migratori (immigrati) · f) densità',
    },
    {
      titolo: 'Leggi le due piramidi della scheda 4',
      testo: 'a) In quale nascono più bambini? Come lo capisci?<br>b) In quale ci sono più anziani?<br>c) Quale delle due somiglia di più alla popolazione europea? Perché?',
      metodo: 'In basso ci sono i bambini, in alto gli anziani. Una barra lunga = tante persone di quell\'età.',
      soluzione: 'a) In quella a <b>base larga</b>: la barra più in basso (0-4 anni) è la più lunga. · b) In quella a <b>base stretta</b>: le barre in alto sono più lunghe. · c) Quella a <b>base stretta</b>: in Europa nascono pochi bambini e ci sono più anziani che giovani.',
    },
    {
      titolo: 'Vero o falso? Correggi le false',
      testo: 'a) La demografia studia la popolazione con i dati statistici.<br>b) Un immigrato è una persona che lascia il suo paese.<br>c) L\'urbanesimo è il ritorno delle persone in campagna.<br>d) La gente vive soprattutto in pianura, lungo i fiumi e sulle coste.<br>e) In Europa i giovani sono più degli anziani.',
      metodo: 'Attenzione alle parole simili: im-migrato (entra), e-migrato (esce).',
      soluzione: 'a) <b>V</b> · b) <b>F</b>: chi parte è un <b>emigrato</b>, l\'immigrato è chi arriva · c) <b>F</b>: è lo spostamento verso le <b>città</b> · d) <b>V</b> · e) <b>F</b>: i giovani sono <b>meno</b> degli anziani',
    },
    {
      titolo: 'Spiega con parole tue',
      testo: 'a) Perché al sindaco serve sapere quanti bambini nascono ogni anno?<br>b) Perché nelle pianure vive più gente che in alta montagna?',
      metodo: 'Pensa a che cosa servirà a quei bambini fra qualche anno; e a com\'è costruire case, strade e campi su un terreno piatto o in salita.',
      soluzione: 'a) Per prevedere quante <b>scuole</b>, classi e maestri serviranno fra qualche anno (e quanti asili adesso). · b) In pianura è <b>più facile costruire</b> case e strade, coltivare e spostarsi; il clima è più mite che in alta montagna.',
    },
  ],

  /* la prima risposta è quella giusta: la pagina le mescola */
  quiz: [
    { d: 'Che cos\'è la demografia?', r: ['La scienza che studia la popolazione con i dati statistici', 'Lo studio delle montagne', 'Il governo del popolo', 'Il conteggio delle città'], s: 'Demografia = "descrizione del popolo", fatta con i numeri.' },
    { d: 'Da dove arrivano i dati sulla popolazione?', r: ['Dall\'anagrafe dei Comuni e dai censimenti', 'Dai giornali', 'Dalle carte geografiche', 'Dai social'], s: 'L\'anagrafe registra nascite, morti e matrimoni; il censimento conta tutti gli abitanti.' },
    { d: 'Che cos\'è la densità di popolazione?', r: ['Il numero medio di persone in 1 km²', 'Il numero totale di abitanti', 'Il numero di nati ogni anno', 'La zona dove vive più gente'], s: 'Densità = abitanti : km².' },
    { d: 'Un paese ha 2.000 abitanti su 10 km². Qual è la densità?', r: ['200 ab/km²', '20 ab/km²', '2.010 ab/km²', '20.000 ab/km²'], s: '2.000 : 10 = 200 abitanti per km².' },
    { d: 'La composizione della popolazione dice…', r: ['quanti maschi e femmine ci sono e di che età', 'quanti abitanti ci sono in tutto', 'dove vive la gente', 'quante persone arrivano'], s: 'Composizione = suddivisione per sesso ed età.' },
    { d: 'Chi è un immigrato?', r: ['Chi arriva a vivere in un nuovo paese', 'Chi lascia il proprio paese', 'Chi vive in campagna', 'Un turista in vacanza'], s: 'Im-migrato entra, e-migrato esce.' },
    { d: 'Che cosa mostra la piramide della popolazione?', r: ['Gli abitanti divisi per sesso e fasce di età', 'La densità nelle regioni', 'Le città più grandi', 'Come è cresciuta la popolazione nei secoli'], s: 'Maschi a sinistra, femmine a destra, una barra ogni 5 anni di età.' },
    { d: 'Se la piramide ha la base stretta, vuol dire che…', r: ['nascono pochi bambini', 'nascono tantissimi bambini', 'arrivano molti immigrati', 'ci sono pochi anziani'], s: 'In basso ci sono i bambini da 0 a 4 anni: barra corta = pochi bambini. È il caso dell\'Europa.' },
    { d: 'Dove si concentra di più la popolazione?', r: ['In pianura, lungo i fiumi e sulle coste', 'In alta montagna', 'Nei deserti', 'Vicino ai poli'], s: 'Dove il clima è temperato ed è più facile costruire.' },
    { d: 'Che cos\'è l\'urbanesimo?', r: ['Le persone si spostano in città, che crescono in fretta e in disordine', 'Le persone tornano a vivere in campagna', 'La costruzione di nuove strade', 'L\'aumento delle nascite'], s: 'Le campagne si svuotano e le città si allargano.' },
    { d: 'Perché nei paesi sviluppati la popolazione invecchia?', r: ['Si vive meglio e più a lungo, e nascono meno bambini', 'Nascono più bambini', 'Ci sono più guerre', 'Arrivano solo anziani'], s: 'Più anziani + meno nascite = popolazione che invecchia.' },
    { d: 'Che cosa significa "democrazia"?', r: ['Potere del popolo', 'Descrizione del popolo', 'Popolo numeroso', 'Governo del re'], s: 'Dèmos (popolo) + kràtos (potere). Descrizione del popolo è la demografia!' },
  ],

  /* concetti: gruppi di parole (basta una per gruppo); minimo: quanti gruppi servono per la sufficienza */
  interrogazione: [
    { d: 'Che cos\'è la popolazione e che cosa studia la demografia?', scheda: 's1', minimo: 2,
      concetti: [['insieme', 'persone', 'abitanti', 'gente'], ['luogo', 'posto', 'vivono'], ['scienza', 'studia'], ['dati', 'statistic', 'numeri']],
      risposta: 'La popolazione è l\'insieme delle persone che vivono in un luogo. La demografia è la scienza che la studia con i dati statistici.' },
    { d: 'Da dove si prendono i dati sulla popolazione?', scheda: 's1', minimo: 2,
      concetti: [['anagrafe'], ['comune', 'comuni'], ['censiment', 'conteggio', 'contare'], ['nascit', 'morti', 'matrimoni']],
      risposta: 'Dall\'anagrafe del Comune, che registra nascite, morti e matrimoni, e dai censimenti, che contano tutti gli abitanti.' },
    { d: 'Quali sono i dati che servono a descrivere una popolazione?', scheda: 's2', minimo: 4,
      concetti: [['grandezza', 'quanti abitanti', 'numero di abitanti'], ['densit'], ['distribuzion', 'dove vivono', 'dove si concentr'], ['composizion', 'eta', 'sesso'], ['natalit', 'mortalit', 'nati', 'morti'], ['migra', 'immigrat', 'emigrat', 'arrivano', 'partono']],
      risposta: 'La grandezza, cioè quanti abitanti ci sono; la densità; la distribuzione, cioè dove vivono; la composizione per sesso ed età; la natalità e la mortalità; i flussi migratori.' },
    { d: 'Che cos\'è la densità di popolazione e come si calcola?', scheda: 's2', minimo: 2,
      concetti: [['persone', 'abitanti', 'gente'], ['chilometro quadrato', 'km', 'chilometri quadrati', 'superficie'], ['divid', 'diviso', 'fratto', 'media']],
      risposta: 'È il numero medio di persone che vivono in un chilometro quadrato. Si calcola dividendo gli abitanti per la superficie in chilometri quadrati.' },
    { d: 'A che cosa servono i dati sulla popolazione?', scheda: 's3', minimo: 2,
      concetti: [['prevision', 'prevedere', 'futuro'], ['scuol'], ['ospedal'], ['pension'], ['decid', 'governo', 'sindaco', 'scelte']],
      risposta: 'Confrontando i dati di oggi con quelli passati si fanno previsioni, così si decide quante scuole e ospedali servono e quanti soldi servono per le pensioni.' },
    { d: 'Che cos\'è la piramide della popolazione e com\'è quella europea?', scheda: 's4', minimo: 3,
      concetti: [['grafico', 'istogramm', 'barre'], ['maschi', 'femmine', 'sesso'], ['eta', 'anni', 'fasce'], ['base stretta', 'stretta', 'pochi bambini', 'poche nascite', 'nascono pochi'], ['anzian', 'vecchi']],
      risposta: 'È un grafico a barre orizzontali con i maschi a sinistra e le femmine a destra, diviso per fasce di età di 5 anni. Quella europea ha la base stretta perché nascono pochi bambini, e ci sono tanti anziani.' },
    { d: 'Dove vive la maggior parte della popolazione, e perché?', scheda: 's5', minimo: 2,
      concetti: [['pianur'], ['fium'], ['cost', 'mare'], ['clima', 'temperat'], ['costruire', 'facile']],
      risposta: 'Soprattutto nelle zone a clima temperato, in pianura, lungo i fiumi e sulle coste, perché lì è più facile costruire e vivere.' },
    { d: 'Quali sono i tre grandi cambiamenti della popolazione di oggi?', scheda: 's6', minimo: 3,
      concetti: [['citta', 'urban'], ['campagn', 'rural'], ['invecch', 'anzian', 'vecchi'], ['meno nascite', 'nascono meno', 'meno bambini', 'nascit'], ['migra', 'paesi poveri', 'paesi ricchi', 'immigrat', 'emigrat']],
      risposta: 'L\'urbanesimo, cioè la gente lascia le campagne e va in città; l\'invecchiamento, con più anziani e meno nascite; le migrazioni dai paesi poveri a quelli più ricchi.' },
  ],
}
