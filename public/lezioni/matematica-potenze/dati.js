/* Contenuti della lezione di matematica: le potenze.
 * Fonte: Tutto chiaro! Aritmetica 1 (De Agostini), U3 lezioni 1-2, pag. 200-205; dal 15/11 anche
 * "Fare pratica" pag. 223-231 (compiti per il 16/11: n. 151, 177, 210, 262, 324, 340): schede 6-8 su
 * riconoscere le potenze, espressioni con le potenze ("Scopro il metodo" di pag. 227), dalle parole
 * all'espressione. Nel lettore HUB Young: page = pagina stampata + 12.
 * Teoria riscritta con parole nostre; esercizi, quiz e domande nostri (mai le soluzioni del libro).
 * Lo legge la pagina (window.LEZIONE) e scripts/lezione-audio.mjs per gli MP3. */
window.LEZIONE = {
  id: 'matematica-potenze',
  materia: 'Matematica',
  titolo: 'Le potenze',
  argomento: 'le potenze, le loro proprietà e le espressioni con le potenze',
  pagine: '200–205, 223–231',
  sezioni: ['video', 'scheda', 'esercizi', 'quiz', 'interroga'],
  driveId: '1VD4Rlo4DQf5Xg8BGbCsoAsyXCpHCE4iR',
  /* niente ascolto delle schede: con esponenti e formule la voce non aiuta. L'interrogazione resta a voce. */
  audio: false,

  schede: [
    {
      id: 's1', titolo: "Che cos'è una potenza", pag: '200',
      html: `<p>Quando moltiplichi <b>sempre lo stesso numero</b>, puoi scriverlo in breve:</p>
<div class="formula">5 × 5 × 5 = 5<sup>3</sup> = 125</div>
<ul><li><span class="evid">base</span> = il numero che si ripete (5)</li>
<li><span class="evid">esponente</span> = quante volte si ripete (3)</li>
<li><span class="evid">valore</span> = il risultato (125)</li></ul>
<p>Si legge "cinque alla terza" o "cinque al cubo". Con esponente 2: "al quadrato".</p>
<div class="attento">⚠️ 5<sup>3</sup> <b>non</b> è 5 × 3 = 15! È 5 × 5 × 5 = 125.</div>`,
    },
    {
      id: 's2', titolo: 'Potenze speciali', pag: '200',
      html: `<ul>
<li>Esponente <b>1</b> → resta il numero: 9<sup>1</sup> = 9</li>
<li>Base <b>1</b> → sempre 1: 1<sup>50</sup> = 1</li>
<li>Base <b>0</b> → sempre 0: 0<sup>4</sup> = 0</li>
<li>Esponente <b>0</b> → sempre 1: 7<sup>0</sup> = 1</li>
<li><b>0<sup>0</sup></b> non ha significato.</li>
<li>Base <b>10</b> → 1 seguito da tanti zeri quanto dice l'esponente: 10<sup>5</sup> = 100.000</li>
</ul>
<p class="nota">Con i decimali: 0,4<sup>2</sup> = 0,4 × 0,4 = 0,16 (calcoli 4 × 4 = 16 e metti due cifre dopo la virgola).</p>`,
    },
    {
      id: 's3', titolo: 'Stessa base', pag: '202',
      html: `<p>Se la <b>base è uguale</b>, la tieni e lavori sugli <b>esponenti</b>:</p>
<table>
<tr><td>Prodotto → <b>sommi</b> gli esponenti</td><td><span class="formula">3<sup>2</sup> × 3<sup>4</sup> = 3<sup>6</sup></span></td></tr>
<tr><td>Quoziente → <b>sottrai</b> gli esponenti</td><td><span class="formula">6<sup>7</sup> : 6<sup>3</sup> = 6<sup>4</sup></span></td></tr>
<tr><td>Potenza di potenza → <b>moltiplichi</b> gli esponenti</td><td><span class="formula">(2<sup>3</sup>)<sup>4</sup> = 2<sup>12</sup></span></td></tr>
</table>
<p class="nota">Ecco perché a<sup>0</sup> = 1: 4<sup>3</sup> : 4<sup>3</sup> = 4<sup>0</sup>, ma un numero diviso per sé stesso fa 1.</p>`,
    },
    {
      id: 's4', titolo: 'Stesso esponente', pag: '204',
      html: `<p>Se l'<b>esponente è uguale</b>, lo tieni e lavori sulle <b>basi</b>:</p>
<table>
<tr><td>Prodotto → <b>moltiplichi</b> le basi</td><td><span class="formula">2<sup>3</sup> × 5<sup>3</sup> = 10<sup>3</sup></span></td></tr>
<tr><td>Quoziente → <b>dividi</b> le basi</td><td><span class="formula">12<sup>2</sup> : 4<sup>2</sup> = 3<sup>2</sup></span></td></tr>
</table>
<p>Trucco: così i conti diventano più facili. 2<sup>3</sup> × 5<sup>3</sup> = 10<sup>3</sup> = 1000, senza calcolare 8 × 125.</p>`,
    },
    {
      id: 's5', titolo: 'Con + e − le proprietà non valgono', pag: '202 e 204',
      html: `<p>Le proprietà funzionano <b>solo con la moltiplicazione (×) e la divisione (:)</b>. Con l'addizione e la sottrazione calcoli <b>prima ogni potenza</b>, poi fai il conto.</p>
<div class="formula">2<sup>3</sup> + 2<sup>2</sup> = 8 + 4 = 12</div> <span class="nota">e non 2<sup>5</sup> = 32!</span><br>
<div class="formula">4<sup>2</sup> − 3<sup>2</sup> = 16 − 9 = 7</div> <span class="nota">e non 1<sup>2</sup> = 1!</span>
<p><b>Per ricordarlo:</b> stessa <span class="evid">base</span> → lavori sugli esponenti · stesso <span class="evid">esponente</span> → lavori sulle basi · c'è un + o un − → calcoli e basta.</p>`,
    },
    {
      id: 's6', titolo: 'Riconoscere le potenze', pag: '225',
      html: `<p>Tanti numeri sono potenze "travestite". Conviene saperli riconoscere al volo:</p>
<ul><li><b>Quadrati:</b> 4 = 2<sup>2</sup> · 9 = 3<sup>2</sup> · 16 = 4<sup>2</sup> · 25 = 5<sup>2</sup> · 36 = 6<sup>2</sup> · 49 = 7<sup>2</sup> · 64 = 8<sup>2</sup> · 81 = 9<sup>2</sup> · 100 = 10<sup>2</sup> · 121 = 11<sup>2</sup> · 144 = 12<sup>2</sup></li>
<li><b>Cubi:</b> 8 = 2<sup>3</sup> · 27 = 3<sup>3</sup> · 64 = 4<sup>3</sup> · 125 = 5<sup>3</sup> · 216 = 6<sup>3</sup> · 1000 = 10<sup>3</sup></li>
<li><b>Potenze di 2:</b> 2 · 4 · 8 · 16 · 32 · 64 · 128 · 256 · 512 · 1024 (da 2<sup>1</sup> a 2<sup>10</sup>)</li></ul>
<p><b>Il trucco:</b> scrivi i due numeri come potenze con lo <b>stesso esponente</b>, poi usa la scheda 4.</p>
<div class="formula">8 × 125 = 2<sup>3</sup> × 5<sup>3</sup> = (2 × 5)<sup>3</sup> = 10<sup>3</sup></div>
<div class="attento">⚠️ 64 è sia 8<sup>2</sup> sia 4<sup>3</sup>: scegli la forma che ha lo stesso esponente dell'altro numero.</div>`,
    },
    {
      id: 's7', titolo: 'Espressioni con le potenze', pag: '227',
      html: `<p>In un'espressione l'ordine è sempre questo:</p>
<ol><li>le <b>parentesi</b>, dalle più interne: prima le tonde ( ), poi le quadre [ ], poi le graffe { };</li>
<li>dentro ogni parentesi, prima le <b>potenze</b>;</li>
<li>poi <b>×</b> e <b>:</b>, da sinistra verso destra;</li>
<li>infine <b>+</b> e <b>−</b>, da sinistra verso destra.</li></ol>
<div class="formula">2<sup>3</sup> × 3 − 20 : 2<sup>2</sup> + 1 = 8 × 3 − 20 : 4 + 1 = 24 − 5 + 1 = 20</div>
<p><b>Se puoi, usa le proprietà:</b> accorci i conti.</p>
<div class="formula">5<sup>7</sup> : 5<sup>5</sup> + 2<sup>4</sup> × 2 − 3<sup>3</sup> = 5<sup>2</sup> + 2<sup>5</sup> − 27 = 25 + 32 − 27 = 30</div>
<p class="nota">Consiglio: a ogni passaggio riscrivi tutta l'espressione su una riga nuova e sottolinea il pezzo che stai calcolando. Il libro ti dà il risultato tra parentesi quadre: se non ti torna, cerca il passaggio sbagliato.</p>`,
    },
    {
      id: 's8', titolo: 'Dalle parole all\'espressione', pag: '230',
      html: `<table>
<tr><td>il quadrato di 6</td><td><span class="formula">6<sup>2</sup></span></td></tr>
<tr><td>il cubo di 6</td><td><span class="formula">6<sup>3</sup></span></td></tr>
<tr><td>il doppio, il triplo, il quadruplo di 6</td><td><span class="formula">2 × 6 · 3 × 6 · 4 × 6</span></td></tr>
<tr><td>la somma di 6 e 2 · la differenza tra 6 e 2</td><td><span class="formula">(6 + 2) · (6 − 2)</span></td></tr>
<tr><td>togli da 20 il 6 · sottrai da 20 il 6</td><td><span class="formula">20 − 6</span></td></tr>
</table>
<div class="attento">⚠️ Sono diversi: <b>il quadrato della somma</b> di 3 e 4 è (3 + 4)<sup>2</sup> = 49; <b>la somma dei quadrati</b> di 3 e 4 è 3<sup>2</sup> + 4<sup>2</sup> = 25.</div>
<p><b>Come si fa:</b> la frase è fatta a scatole, una dentro l'altra. "Il triplo del quadrato di 6" è il triplo di (il quadrato di 6), cioè 3 × 6<sup>2</sup>: quello che viene dopo <i>di</i>, <i>del</i>, <i>della</i>, <i>dei</i> sta dentro e si calcola prima. Una somma o una differenza che poi va elevata o moltiplicata va tra parentesi. Con "togli da" e "sottrai da", il numero che viene dopo "da" va scritto <b>per primo</b>.</p>`,
    },
  ],

  esercizi: [
    {
      titolo: 'Calcola il valore',
      testo: '<b>3<sup>4</sup></b> · <b>5<sup>3</sup></b> · <b>10<sup>5</sup></b> · <b>1<sup>9</sup></b> · <b>0<sup>6</sup></b> · <b>12<sup>0</sup></b> · <b>0,3<sup>2</sup></b>',
      metodo: 'Scrivi la moltiplicazione per intero: la base ripetuta tante volte quanto dice l\'esponente. Per le potenze speciali guarda la scheda 2.',
      soluzione: '3 × 3 × 3 × 3 = <b>81</b> · 5 × 5 × 5 = <b>125</b> · <b>100.000</b> · <b>1</b> · <b>0</b> · <b>1</b> · 0,3 × 0,3 = <b>0,09</b>',
    },
    {
      titolo: 'Stessa base: scrivi come una sola potenza',
      testo: 'a) 5<sup>3</sup> × 5<sup>4</sup> &nbsp; b) 2 × 2<sup>5</sup> × 2<sup>2</sup> &nbsp; c) 7<sup>9</sup> : 7<sup>5</sup> &nbsp; d) 6<sup>8</sup> : 6<sup>8</sup>',
      metodo: 'Tieni la base. Per × <b>sommi</b> gli esponenti, per : li <b>sottrai</b>. Se l\'esponente non c\'è scritto, vale 1.',
      soluzione: 'a) 5<sup>3+4</sup> = <b>5<sup>7</sup></b> · b) 2<sup>1+5+2</sup> = <b>2<sup>8</sup></b> · c) 7<sup>9−5</sup> = <b>7<sup>4</sup></b> · d) 6<sup>8−8</sup> = 6<sup>0</sup> = <b>1</b>',
    },
    {
      titolo: 'Potenza di potenza',
      testo: 'a) (4<sup>3</sup>)<sup>2</sup> &nbsp; b) (10<sup>2</sup>)<sup>4</sup> &nbsp; c) (9<sup>1</sup>)<sup>5</sup>',
      metodo: 'Tieni la base e <b>moltiplica</b> gli esponenti. Si legge "quattro alla terza, alla seconda".',
      soluzione: 'a) 4<sup>3×2</sup> = <b>4<sup>6</sup></b> · b) 10<sup>2×4</sup> = <b>10<sup>8</sup></b> (1 con 8 zeri) · c) 9<sup>1×5</sup> = <b>9<sup>5</sup></b>',
    },
    {
      titolo: 'Stesso esponente: scrivi come una sola potenza e calcola',
      testo: 'a) 5<sup>3</sup> × 2<sup>3</sup> &nbsp; b) 4<sup>2</sup> × 3<sup>2</sup> &nbsp; c) 20<sup>4</sup> : 5<sup>4</sup> &nbsp; d) 36<sup>2</sup> : 12<sup>2</sup>',
      metodo: 'Tieni l\'esponente. Per × <b>moltiplichi</b> le basi, per : le <b>dividi</b>. Poi calcoli la potenza che viene fuori, che è più facile.',
      soluzione: 'a) (5 × 2)<sup>3</sup> = 10<sup>3</sup> = <b>1000</b> · b) (4 × 3)<sup>2</sup> = 12<sup>2</sup> = <b>144</b> · c) (20 : 5)<sup>4</sup> = 4<sup>4</sup> = <b>256</b> · d) (36 : 12)<sup>2</sup> = 3<sup>2</sup> = <b>9</b>',
    },
    {
      titolo: 'Vero o falso? Correggi le false',
      testo: 'a) 3<sup>2</sup> + 3<sup>3</sup> = 3<sup>5</sup><br>b) 6<sup>4</sup> × 6 = 6<sup>5</sup><br>c) (2<sup>3</sup>)<sup>2</sup> = 2<sup>5</sup><br>d) 9<sup>5</sup> : 9<sup>5</sup> = 1<br>e) 4<sup>3</sup> = 12',
      metodo: 'Prima guarda l\'operazione: con × e : valgono le proprietà; con + e − no, calcoli ogni potenza. Occhio alla potenza di potenza: gli esponenti si <b>moltiplicano</b>.',
      soluzione: 'a) <b>F</b>: 9 + 27 = 36 (3<sup>5</sup> sarebbe 243) · b) <b>V</b> · c) <b>F</b>: fa 2<sup>6</sup> · d) <b>V</b>: 9<sup>0</sup> = 1 · e) <b>F</b>: 4 × 4 × 4 = 64',
    },
    {
      titolo: 'Trova il numero che manca',
      testo: 'a) 2<sup>?</sup> × 2<sup>3</sup> = 2<sup>7</sup> &nbsp; b) 5<sup>4</sup> × ?<sup>4</sup> = 15<sup>4</sup> &nbsp; c) 18<sup>5</sup> : ?<sup>5</sup> = 6<sup>5</sup> &nbsp; d) (3<sup>2</sup>)<sup>?</sup> = 3<sup>8</sup>',
      metodo: 'Chiediti quale regola è in gioco (stessa base o stesso esponente?) e fai il conto al contrario: per esempio "? + 3 = 7".',
      soluzione: 'a) <b>4</b> (4 + 3 = 7) · b) <b>3</b> (5 × 3 = 15) · c) <b>3</b> (18 : 3 = 6) · d) <b>4</b> (2 × 4 = 8)',
    },
    {
      titolo: 'Problemi: scrivi la potenza, poi calcola',
      testo: 'a) Sbrigo manda un messaggio a 3 amici. Ognuno lo gira ad altri 3, e così via. Quante persone lo ricevono al 4° giro?<br>b) Una scatola contiene 4 confezioni; ogni confezione ha 4 bustine; ogni bustina ha 4 figurine. Quante figurine in tutto?<br>c) Un palazzo ha 10 piani, ogni piano ha 10 appartamenti, ogni appartamento ha 10 finestre. Quante finestre?',
      metodo: 'Cerca il numero che <b>si ripete</b>: è la base. Conta <b>quante volte</b> lo moltiplichi: è l\'esponente.',
      soluzione: 'a) 3 × 3 × 3 × 3 = <b>3<sup>4</sup> = 81</b> persone · b) <b>4<sup>3</sup> = 64</b> figurine · c) <b>10<sup>3</sup> = 1000</b> finestre',
    },
    {
      titolo: 'Più passaggi: riduci a una sola potenza',
      testo: 'a) (3<sup>5</sup> × 3<sup>2</sup>) : 3<sup>4</sup><br>b) [(2<sup>3</sup>)<sup>2</sup> × 2<sup>4</sup>] : 2<sup>7</sup><br>c) [(5<sup>6</sup> : 5<sup>2</sup>)<sup>3</sup> : 5<sup>10</sup>]<sup>2</sup><br>d) (4<sup>3</sup> × 4) : (4<sup>2</sup> × 4<sup>2</sup>)',
      metodo: 'Parti dalla parentesi <b>più interna</b> e usa una regola alla volta (scheda 3): × sommi, : sottrai, potenza di potenza moltiplichi. Riscrivi tutto a ogni passaggio.',
      soluzione: 'a) 3<sup>7</sup> : 3<sup>4</sup> = <b>3<sup>3</sup></b><br>b) [2<sup>6</sup> × 2<sup>4</sup>] : 2<sup>7</sup> = 2<sup>10</sup> : 2<sup>7</sup> = <b>2<sup>3</sup></b><br>c) [(5<sup>4</sup>)<sup>3</sup> : 5<sup>10</sup>]<sup>2</sup> = [5<sup>12</sup> : 5<sup>10</sup>]<sup>2</sup> = (5<sup>2</sup>)<sup>2</sup> = <b>5<sup>4</sup></b><br>d) 4<sup>4</sup> : 4<sup>4</sup> = 4<sup>0</sup> = <b>1</b>',
    },
    {
      titolo: 'Scrivi come potenze, poi come una sola potenza',
      testo: 'a) 8 × 125 &nbsp; b) 4 × 49 &nbsp; c) 64 × 27 &nbsp; d) 25 × 9 &nbsp; e) 81 : 9 &nbsp; f) 1000 : 125',
      metodo: 'Riconosci i numeri (scheda 6) e scrivili con lo <b>stesso esponente</b>. Poi tieni l\'esponente e moltiplica (o dividi) le basi.',
      soluzione: 'a) 2<sup>3</sup> × 5<sup>3</sup> = <b>10<sup>3</sup></b> · b) 2<sup>2</sup> × 7<sup>2</sup> = <b>14<sup>2</sup></b> · c) 4<sup>3</sup> × 3<sup>3</sup> = <b>12<sup>3</sup></b> · d) 5<sup>2</sup> × 3<sup>2</sup> = <b>15<sup>2</sup></b> · e) 9<sup>2</sup> : 3<sup>2</sup> = <b>3<sup>2</sup></b> · f) 10<sup>3</sup> : 5<sup>3</sup> = <b>2<sup>3</sup></b>',
    },
    {
      titolo: 'Espressioni con le potenze',
      testo: 'a) 4<sup>2</sup> − 3 × 2<sup>2</sup> + 10<br>b) 2<sup>5</sup> : 2<sup>3</sup> + 3<sup>2</sup> × 2<br>c) (6 − 2<sup>2</sup>)<sup>3</sup> + 5<sup>0</sup><br>d) 10<sup>2</sup> − (3<sup>2</sup> + 1) × 2<sup>3</sup><br>e) 7<sup>8</sup> : 7<sup>6</sup> − (2 × 3)<sup>2</sup> : 4<br>f) [3<sup>3</sup> − (2<sup>4</sup> − 4)] : 5 + 1<sup>2</sup>',
      metodo: 'Scheda 7: parentesi dalle più interne; dentro, prima le potenze, poi × e :, poi + e −. Dove c\'è la stessa base con × o :, usa le proprietà.',
      soluzione: 'a) 16 − 3 × 4 + 10 = 16 − 12 + 10 = <b>14</b><br>b) 2<sup>2</sup> + 9 × 2 = 4 + 18 = <b>22</b><br>c) (6 − 4)<sup>3</sup> + 1 = 2<sup>3</sup> + 1 = 8 + 1 = <b>9</b><br>d) 100 − (9 + 1) × 8 = 100 − 80 = <b>20</b><br>e) 7<sup>2</sup> − 6<sup>2</sup> : 4 = 49 − 36 : 4 = 49 − 9 = <b>40</b><br>f) [27 − (16 − 4)] : 5 + 1 = [27 − 12] : 5 + 1 = 15 : 5 + 1 = 3 + 1 = <b>4</b>',
    },
    {
      titolo: 'Dalle parole all\'espressione: scrivi e calcola',
      testo: 'a) Il quadrato di 5 aumentato di 3.<br>b) Il quadrato della somma di 2 e 3.<br>c) La somma dei quadrati di 2 e 3.<br>d) Togli dal cubo di 4 il doppio di 10.<br>e) Il triplo del quadrato di 6.<br>f) Dividi per 3 il cubo della differenza tra 5 e 2.',
      metodo: 'Scheda 8: trasforma un pezzo alla volta (quadrato → <sup>2</sup>, cubo → <sup>3</sup>, doppio → 2 ×, triplo → 3 ×). Somme e differenze da elevare vanno tra parentesi. Con "togli da", scrivi prima il numero dopo "da".',
      soluzione: 'a) 5<sup>2</sup> + 3 = <b>28</b><br>b) (2 + 3)<sup>2</sup> = 5<sup>2</sup> = <b>25</b><br>c) 2<sup>2</sup> + 3<sup>2</sup> = 4 + 9 = <b>13</b><br>d) 4<sup>3</sup> − 2 × 10 = 64 − 20 = <b>44</b><br>e) 3 × 6<sup>2</sup> = 3 × 36 = <b>108</b><br>f) (5 − 2)<sup>3</sup> : 3 = 27 : 3 = <b>9</b>',
    },
    {
      titolo: 'Problemi con le proprietà',
      testo: 'a) Un negozio riceve 2<sup>4</sup> scatole e in ogni scatola ci sono 2<sup>3</sup> palloni da basket. Quanti palloni arrivano? Scrivi il risultato come una sola potenza, poi calcolalo.<br>b) Sbrigo ha 3<sup>5</sup> figurine e le divide in 3<sup>2</sup> buste uguali. Quante figurine in ogni busta?<br>c) Compri 2<sup>2</sup> biglietti per la partita e ognuno costa 5<sup>2</sup> euro. Quanto spendi?',
      metodo: 'Scrivi l\'operazione con le potenze (× se raggruppi, : se dividi in parti uguali). Poi guarda: stessa base o stesso esponente? Usa la regola giusta (schede 3 e 4).',
      soluzione: 'a) 2<sup>4</sup> × 2<sup>3</sup> = <b>2<sup>7</sup> = 128</b> palloni · b) 3<sup>5</sup> : 3<sup>2</sup> = <b>3<sup>3</sup> = 27</b> figurine · c) 2<sup>2</sup> × 5<sup>2</sup> = <b>10<sup>2</sup> = 100</b> euro',
    },
  ],

  quiz: [
    { d: 'In 7<sup>3</sup>, come si chiama il 7?', r: ['La base', 'L\'esponente', 'Il valore', 'Il quoziente'], s: 'La base è il numero che si ripete; l\'esponente (3) dice quante volte.' },
    { d: 'Quanto vale 2<sup>5</sup>?', r: ['32', '10', '25', '7'], s: '2 × 2 × 2 × 2 × 2 = 32. Non 2 × 5!' },
    { d: 'Quanto vale 9<sup>0</sup>?', r: ['1', '0', '9', 'Non ha significato'], s: 'Qualsiasi numero (tranne 0) elevato a zero fa 1.' },
    { d: 'Quanto vale 10<sup>6</sup>?', r: ['1.000.000', '60', '100.000', '10.000.000'], s: '1 seguito da 6 zeri.' },
    { d: '4<sup>3</sup> × 4<sup>5</sup> = ?', r: ['4<sup>8</sup>', '4<sup>15</sup>', '16<sup>8</sup>', '4<sup>2</sup>'], s: 'Stessa base, prodotto: si sommano gli esponenti, 3 + 5 = 8.' },
    { d: '8<sup>7</sup> : 8<sup>3</sup> = ?', r: ['8<sup>4</sup>', '8<sup>10</sup>', '8<sup>21</sup>', '1<sup>4</sup>'], s: 'Stessa base, quoziente: si sottraggono gli esponenti, 7 − 3 = 4.' },
    { d: '(5<sup>2</sup>)<sup>3</sup> = ?', r: ['5<sup>6</sup>', '5<sup>5</sup>', '5<sup>9</sup>', '10<sup>3</sup>'], s: 'Potenza di potenza: si moltiplicano gli esponenti, 2 × 3 = 6.' },
    { d: '3<sup>4</sup> × 2<sup>4</sup> = ?', r: ['6<sup>4</sup>', '6<sup>8</sup>', '5<sup>4</sup>', '3<sup>8</sup>'], s: 'Stesso esponente, prodotto: si moltiplicano le basi, 3 × 2 = 6.' },
    { d: '30<sup>2</sup> : 6<sup>2</sup> = ?', r: ['5<sup>2</sup>', '5<sup>0</sup>', '24<sup>2</sup>', '30<sup>0</sup>'], s: 'Stesso esponente, quoziente: si dividono le basi, 30 : 6 = 5.' },
    { d: 'Quanto fa 2<sup>3</sup> + 2<sup>4</sup>?', r: ['24', '2<sup>7</sup>', '128', '2<sup>12</sup>'], s: 'Con il + le proprietà non valgono: 8 + 16 = 24.' },
    { d: 'Quanto vale 0<sup>5</sup>?', r: ['0', '1', '5', 'Non ha significato'], s: 'Zero moltiplicato per sé stesso resta zero. Solo 0<sup>0</sup> non ha significato.' },
    { d: 'Quanto vale 1<sup>20</sup>?', r: ['1', '20', '0', '21'], s: '1 × 1 × 1… fa sempre 1.' },
    { d: '8 × 125 scritto come una sola potenza è…', r: ['10<sup>3</sup>', '1000<sup>3</sup>', '10<sup>6</sup>', '40<sup>3</sup>'], s: '8 = 2<sup>3</sup> e 125 = 5<sup>3</sup>: stesso esponente, moltiplichi le basi, 2 × 5 = 10.' },
    { d: 'In 3 + 2<sup>2</sup> × 5, che cosa calcoli per prima?', r: ['La potenza 2<sup>2</sup>', 'La somma 3 + 2', 'La moltiplicazione 2 × 5', 'Si va da sinistra a destra'], s: 'Prima le potenze, poi × e :, poi + e −.' },
    { d: 'Quanto fa 3 + 2<sup>2</sup> × 5?', r: ['23', '35', '125', '103'], s: '2<sup>2</sup> = 4, poi 4 × 5 = 20, poi 3 + 20 = 23.' },
    { d: '"Il quadrato della somma di 4 e 1" si scrive…', r: ['(4 + 1)<sup>2</sup>', '4<sup>2</sup> + 1<sup>2</sup>', '4 + 1<sup>2</sup>', '4<sup>2</sup> + 1'], s: 'Prima la somma, poi il quadrato: la somma va tra parentesi. Vale 25.' },
  ],

  /* domande scritte a parole: la voce le legge bene */
  interrogazione: [
    { d: "Che cos'è una potenza?", scheda: 's1', minimo: 2,
      concetti: [['moltiplicazion', 'moltiplic', 'per'], ['stesso numero', 'uguali', 'si ripete', 'ripetut'], ['base'], ['esponent']],
      risposta: 'È una moltiplicazione in cui il fattore è sempre lo stesso numero. Si scrive in breve con la base e, in alto, l\'esponente.' },
    { d: 'Che cosa indicano la base e l\'esponente?', scheda: 's1', minimo: 3,
      concetti: [['base'], ['si ripete', 'ripetut', 'stesso numero', 'moltiplic'], ['esponent'], ['quante volte', 'volte']],
      risposta: 'La base è il numero che si ripete nella moltiplicazione; l\'esponente dice quante volte si ripete.' },
    { d: 'Quanto fa un numero elevato a zero? E un numero elevato a uno?', scheda: 's2', minimo: 2,
      concetti: [['uno', '1'], ['stesso numero', 'numero stesso', 'resta', 'se stesso', 'rimane', 'uguale al numero']],
      risposta: 'Un numero elevato a zero fa sempre uno (tranne zero alla zero, che non ha significato). Elevato a uno resta il numero stesso.' },
    { d: 'Come si scrive una potenza di dieci, per esempio dieci alla quinta?', scheda: 's2', minimo: 2,
      concetti: [['uno', '1'], ['zeri', 'zero'], ['esponent', 'cinque', '5', 'quanti']],
      risposta: 'Si scrive uno seguito da tanti zeri quanti ne indica l\'esponente: dieci alla quinta è uno con cinque zeri, centomila.' },
    { d: 'Come si moltiplicano due potenze con la stessa base?', scheda: 's3', minimo: 3,
      concetti: [['base'], ['somm', 'addizion', 'piu', 'aggiung'], ['esponent']],
      risposta: 'Si tiene la stessa base e si sommano gli esponenti.' },
    { d: 'Come si dividono due potenze con la stessa base?', scheda: 's3', minimo: 3,
      concetti: [['base'], ['sottra', 'differenz', 'meno', 'togli'], ['esponent']],
      risposta: 'Si tiene la stessa base e si sottraggono gli esponenti.' },
    { d: 'Che cos\'è una potenza di potenza e come si calcola?', scheda: 's3', minimo: 2,
      concetti: [['esponent'], ['moltiplic', 'prodotto', 'per']],
      risposta: 'È una potenza elevata a sua volta a un esponente: si tiene la base e si moltiplicano gli esponenti.' },
    { d: 'Che cosa si fa con due potenze che hanno lo stesso esponente?', scheda: 's4', minimo: 3,
      concetti: [['esponent'], ['basi', 'base'], ['moltiplic', 'dividi', 'divid', 'prodotto', 'quoziente']],
      risposta: 'Si tiene l\'esponente e si lavora sulle basi: nel prodotto si moltiplicano le basi, nel quoziente si dividono.' },
    { d: 'Le proprietà delle potenze valgono anche con l\'addizione e la sottrazione?', scheda: 's5', minimo: 2,
      concetti: [['no', 'non'], ['moltiplicazion', 'divisione', 'solo'], ['calcol', 'prima', 'ogni potenza']],
      risposta: 'No: valgono solo con la moltiplicazione e la divisione. Con il più e il meno si calcola prima ogni potenza e poi si fa il conto.' },
    { d: 'In un\'espressione con le potenze, in che ordine si fanno le operazioni?', scheda: 's7', minimo: 3,
      concetti: [['parentes'], ['potenz'], ['moltiplic', 'divis', 'per', 'diviso'], ['addizion', 'sottraz', 'piu', 'meno', 'somm']],
      risposta: 'Prima le parentesi, dalle più interne. Dentro le parentesi prima le potenze, poi le moltiplicazioni e le divisioni, infine le addizioni e le sottrazioni, da sinistra verso destra.' },
  ],
}
