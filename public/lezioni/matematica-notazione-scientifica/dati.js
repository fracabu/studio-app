/* Lezione di matematica: la notazione scientifica e l'ordine di grandezza, per i compiti del 23/11
 * ("Studiare pag. 206, esercizi pag. 207").
 * Fonte: Tutto chiaro! Aritmetica 1 (De Agostini), U3 lezione 3 "Applicare" (scienze), pag. 206;
 * pag. 207 "Mettiamo in pratica", esercizi 1-7. Nel lettore HUB Young: page = pagina stampata + 12.
 * Teoria riscritta con parole nostre; esercizi, quiz e domande nostri, con numeri diversi da quelli
 * del libro (mai le soluzioni degli esercizi di pag. 207).
 * Lo legge la pagina (window.LEZIONE) e scripts/lezione-audio.mjs per gli MP3. */
window.LEZIONE = {
  id: 'matematica-notazione-scientifica',
  materia: 'Matematica',
  titolo: 'Notazione scientifica e ordine di grandezza',
  argomento: 'come si scrivono i numeri molto grandi con le potenze di 10 e come si trova il loro ordine di grandezza',
  pagine: '206–207',
  sezioni: ['scheda', 'esercizi', 'quiz', 'interroga'],
  /* niente ascolto delle schede: con esponenti e numeri lunghi la voce non aiuta. L'interrogazione resta a voce. */
  audio: false,

  schede: [
    {
      id: 's1', titolo: 'Numeri con tanti zeri', pag: '206',
      html: `<p>Prova a leggere al volo <b>45.000.000.000</b>: bisogna contare gli zeri, e ci si sbaglia facilmente. Con le <b>potenze di 10</b> lo scrivi più corto:</p>
<div class="formula">45.000.000.000 = 45 × 10<sup>9</sup></div>
<p>Come si fa: tieni le cifre <b>prima degli zeri finali</b> (45) e moltiplica per 10 elevato al <b>numero di zeri finali</b> (sono 9).</p>
<ul><li>3.000.000 = 3 × 10<sup>6</sup> (6 zeri)</li>
<li>120.000 = 12 × 10<sup>4</sup> (4 zeri)</li>
<li>5.030.000 = 503 × 10<sup>4</sup> (contano solo gli zeri <b>in fondo</b>: lo zero in mezzo resta nel 503)</li></ul>
<p>Questa scrittura si chiama <span class="evid">notazione esponenziale</span>: un numero moltiplicato per una potenza di 10.</p>`,
    },
    {
      id: 's2', titolo: 'La notazione scientifica', pag: '206',
      html: `<p>Gli scienziati usano una notazione esponenziale con una regola in più: prima della virgola c'è <b>una sola cifra</b>, e non può essere zero.</p>
<div class="formula">45.000.000.000 = 4,5 × 10<sup>10</sup></div>
<p><b>Come si fa, in tre passi:</b></p>
<ol><li>metti la virgola <b>dopo la prima cifra</b>: 4,5;</li>
<li>conta <b>quante cifre</b> c'erano dopo la prima: in 45.000.000.000 sono 10;</li>
<li>quel numero è l'<b>esponente</b> di 10: 4,5 × 10<sup>10</sup>.</li></ol>
<ul><li>380.000 = 3,8 × 10<sup>5</sup></li>
<li>7.000.000 = 7 × 10<sup>6</sup> (dopo il 7 non resta niente: la virgola non serve)</li></ul>
<div class="attento">⚠️ 45 × 10<sup>9</sup> è giusto come valore, ma <b>non</b> è notazione scientifica: prima della virgola ci sono due cifre. Neanche 0,45 × 10<sup>11</sup> lo è: la prima cifra non può essere zero.</div>`,
    },
    {
      id: 's3', titolo: 'Dalla notazione scientifica al numero intero', pag: '206',
      html: `<p>Si fa il contrario: sposti la virgola <b>verso destra</b> di tanti posti quanto dice l'esponente. Dove mancano cifre, aggiungi <b>zeri</b>.</p>
<div class="formula">3,2 × 10<sup>5</sup> = 320.000</div>
<p class="nota">La virgola parte dopo il 3: un posto lo occupa il 2, gli altri 4 posti diventano zeri.</p>
<ul><li>6 × 10<sup>4</sup> = 60.000</li>
<li>1,25 × 10<sup>6</sup> = 1.250.000</li></ul>
<div class="attento">⚠️ 5,3 × 10<sup>4</sup> <b>non</b> è 53 con quattro zeri (530.000): le cifre dopo la virgola usano già dei posti. È 53.000.</div>
<p><b>Controllo veloce:</b> il numero intero ha sempre <b>una cifra in più dell'esponente</b>. 3,2 × 10<sup>5</sup> → 320.000 ha 6 cifre.</p>`,
    },
    {
      id: 's4', titolo: "L'ordine di grandezza", pag: '206',
      html: `<p>L'<span class="evid">ordine di grandezza</span> di un numero è la <b>potenza di 10 più vicina</b> a quel numero. Serve per dire in breve "quanto è grande, più o meno".</p>
<p><b>Come si trova:</b></p>
<ol><li>cerca le due potenze di 10 tra cui sta il numero: 8.200 sta tra 10<sup>3</sup> = 1.000 e 10<sup>4</sup> = 10.000, e si scrive 10<sup>3</sup> &lt; 8.200 &lt; 10<sup>4</sup>;</li>
<li>guarda a quale è <b>più vicino</b>: da 8.200 a 10.000 mancano 1.800, da 1.000 a 8.200 ce ne sono 7.200;</li>
<li>la più vicina è l'ordine di grandezza: <b>10<sup>4</sup></b>.</li></ol>
<p>Invece 2.300 è più vicino a 1.000 (1.300 di distanza) che a 10.000 (7.700): il suo ordine di grandezza è 10<sup>3</sup>.</p>
<p class="nota">Trucco: tra 1.000 e 10.000 la metà esatta è 5.500. Sotto 5.500 vince 10<sup>3</sup>, sopra vince 10<sup>4</sup>. Vale per tutte le coppie: tra 100.000 e 1.000.000 la metà è 550.000.</p>
<p>Sulla <b>semiretta</b> si vede bene: segna le due potenze di 10, metti il numero al suo posto e guarda a quale tacca è più vicino.</p>`,
    },
    {
      id: 's5', titolo: 'Quale numero è più grande?', pag: '206',
      html: `<p>Con la notazione scientifica confrontare due numeri enormi è facile:</p>
<ol><li>guarda prima gli <b>esponenti</b>: vince chi ce l'ha più grande. 1,2 × 10<sup>6</sup> è più grande di 9 × 10<sup>5</sup>, anche se 9 è più di 1,2;</li>
<li>se gli esponenti sono <b>uguali</b>, confronta i numeri davanti: 7,1 × 10<sup>8</sup> è più grande di 3,9 × 10<sup>8</sup>.</li></ol>
<p><b>Numeri veri della scienza:</b></p>
<table>
<tr><td>distanza Terra–Luna</td><td>circa 384.000 km = 3,84 × 10<sup>5</sup> km</td></tr>
<tr><td>distanza Terra–Sole</td><td>circa 150.000.000 km = 1,5 × 10<sup>8</sup> km</td></tr>
<tr><td>neuroni nel cervello</td><td>circa 86.000.000.000 = 8,6 × 10<sup>10</sup></td></tr>
</table>`,
    },
  ],

  esercizi: [
    {
      titolo: 'Scrivi in notazione esponenziale',
      testo: 'a) 8.000.000 = ______<br>b) 52.000 = ______<br>c) 130.000.000 = ______<br>d) 4.700.000.000 = ______<br>e) 900 = ______<br>f) 2.050.000 = ______',
      metodo: 'Scheda 1: tieni le cifre prima degli zeri finali e conta solo gli zeri <b>in fondo</b>. Quel numero è l\'esponente di 10.',
      soluzione: 'a) <b>8 × 10<sup>6</sup></b> · b) <b>52 × 10<sup>3</sup></b> · c) <b>13 × 10<sup>7</sup></b> · d) <b>47 × 10<sup>8</sup></b> · e) <b>9 × 10<sup>2</sup></b> · f) <b>205 × 10<sup>4</sup></b>',
    },
    {
      titolo: 'Scrivi in notazione scientifica',
      testo: 'a) 52.000 = ______<br>b) 130.000.000 = ______<br>c) 7.000.000 = ______<br>d) 4.700.000.000 = ______<br>e) 205.000 = ______<br>f) 38.400.000 = ______',
      metodo: 'Scheda 2: virgola dopo la prima cifra, poi conta quante cifre c\'erano dopo la prima. Togli gli zeri finali dopo la virgola: 5,20 si scrive 5,2. Confronta con l\'esercizio 1: quando le due scritture vengono uguali?',
      soluzione: 'a) <b>5,2 × 10<sup>4</sup></b> · b) <b>1,3 × 10<sup>8</sup></b> · c) <b>7 × 10<sup>6</sup></b> · d) <b>4,7 × 10<sup>9</sup></b> · e) <b>2,05 × 10<sup>5</sup></b> · f) <b>3,84 × 10<sup>7</sup></b>',
    },
    {
      titolo: 'Dalla notazione scientifica al numero intero',
      testo: 'a) 4 × 10<sup>5</sup> = ______<br>b) 2,6 × 10<sup>4</sup> = ______<br>c) 7,15 × 10<sup>6</sup> = ______<br>d) 9,9 × 10<sup>3</sup> = ______<br>e) 1,08 × 10<sup>8</sup> = ______<br>f) 3,333 × 10<sup>3</sup> = ______',
      metodo: 'Scheda 3: sposta la virgola a destra di tanti posti quanto è l\'esponente; le cifre dopo la virgola occupano già dei posti, il resto lo riempi di zeri. Controllo: il numero ha una cifra in più dell\'esponente.',
      soluzione: 'a) <b>400.000</b> · b) <b>26.000</b> · c) <b>7.150.000</b> · d) <b>9.900</b> · e) <b>108.000.000</b> · f) <b>3.333</b>',
    },
    {
      titolo: 'Vero o falso?',
      testo: 'a) 64.000 = 6,4 × 10<sup>4</sup><br>b) 25 × 10<sup>3</sup> è scritto in notazione scientifica<br>c) 3,1 × 10<sup>5</sup> = 31.000<br>d) 900.000 = 9 × 10<sup>5</sup><br>e) 0,7 × 10<sup>4</sup> è scritto in notazione scientifica<br>f) 12.000.000 = 1,2 × 10<sup>7</sup>',
      metodo: 'Per ogni uguaglianza riporta il numero alla forma intera e confronta. Per "è in notazione scientifica" controlla: una sola cifra prima della virgola, e non zero (scheda 2).',
      soluzione: 'a) <b>V</b> · b) <b>F</b>, due cifre prima della virgola: 2,5 × 10<sup>4</sup> · c) <b>F</b>, è 310.000 · d) <b>V</b> · e) <b>F</b>, la prima cifra è zero: 7 × 10<sup>3</sup> · f) <b>V</b>',
    },
    {
      titolo: "Trova l'ordine di grandezza",
      testo: 'a) 7.800<br>b) 3.100<br>c) 42.000<br>d) 870.000<br>e) 260<br>f) 6.000.000',
      metodo: 'Scheda 4: scrivi le due potenze di 10 tra cui sta il numero (10<sup>3</sup> &lt; … &lt; 10<sup>4</sup>), poi guarda a quale è più vicino. Trucco della metà: 550, 5.500, 55.000…',
      soluzione: 'a) tra 10<sup>3</sup> e 10<sup>4</sup>, sopra 5.500 → <b>10<sup>4</sup></b> · b) sotto 5.500 → <b>10<sup>3</sup></b> · c) tra 10<sup>4</sup> e 10<sup>5</sup>, sotto 55.000 → <b>10<sup>4</sup></b> · d) tra 10<sup>5</sup> e 10<sup>6</sup>, sopra 550.000 → <b>10<sup>6</sup></b> · e) tra 10<sup>2</sup> e 10<sup>3</sup>, sotto 550 → <b>10<sup>2</sup></b> · f) tra 10<sup>6</sup> e 10<sup>7</sup>, sopra 5.500.000 → <b>10<sup>7</sup></b>',
    },
    {
      titolo: 'I numeri della scienza',
      testo: 'a) La Luna dista dalla Terra circa 384.000 km. Scrivilo in notazione scientifica: ______<br>b) Nel cervello ci sono circa 86.000.000.000 neuroni. In notazione scientifica: ______<br>c) Il Sole dista dalla Terra circa 1,5 × 10<sup>8</sup> km. Scrivilo per intero: ______<br>d) Quale numero è più grande: 9 × 10<sup>5</sup> o 1,2 × 10<sup>6</sup>? ______',
      metodo: 'a) e b) come nella scheda 2; c) come nella scheda 3; d) guarda prima gli esponenti (scheda 5), poi controlla scrivendo i due numeri per intero.',
      soluzione: 'a) <b>3,84 × 10<sup>5</sup> km</b> · b) <b>8,6 × 10<sup>10</sup></b> · c) <b>150.000.000 km</b> · d) <b>1,2 × 10<sup>6</sup></b>: è 1.200.000, mentre 9 × 10<sup>5</sup> è 900.000',
    },
  ],

  quiz: [
    { d: 'Come si scrive 5.000.000 con una potenza di 10?', r: ['5 × 10<sup>6</sup>', '5 × 10<sup>5</sup>', '5 × 10<sup>7</sup>', '5<sup>6</sup>'], s: 'Dopo il 5 ci sono 6 zeri: 5 × 10<sup>6</sup>.' },
    { d: 'Quale di questi è scritto in notazione scientifica?', r: ['3,2 × 10<sup>4</sup>', '32 × 10<sup>3</sup>', '0,32 × 10<sup>5</sup>', '320 × 10<sup>2</sup>'], s: 'Valgono tutti 32.000, ma solo 3,2 ha una sola cifra (non zero) prima della virgola.' },
    { d: '47.000 in notazione scientifica è…', r: ['4,7 × 10<sup>4</sup>', '4,7 × 10<sup>3</sup>', '47 × 10<sup>3</sup>', '0,47 × 10<sup>5</sup>'], s: 'Virgola dopo il 4; dopo il 4 c\'erano 4 cifre. 47 × 10<sup>3</sup> ha il valore giusto, ma due cifre davanti.' },
    { d: '2,5 × 10<sup>3</sup> = ?', r: ['2.500', '25.000', '250', '2.000.500'], s: 'La virgola va avanti di 3 posti: uno lo occupa il 5, poi due zeri.' },
    { d: '6 × 10<sup>4</sup> = ?', r: ['60.000', '6.000', '600.000', '24'], s: '6 seguito da 4 zeri. Non 6 × 4!' },
    { d: 'Nella notazione scientifica, prima della virgola c\'è…', r: ['una sola cifra diversa da zero', 'sempre il numero 1', 'due cifre', 'uno zero'], s: 'Una sola cifra, da 1 a 9.' },
    { d: '380.000.000 = 3,8 × 10<sup>?</sup>', r: ['8', '7', '9', '6'], s: 'Dopo il 3 ci sono 8 cifre: l\'esponente è 8.' },
    { d: "L'ordine di grandezza di 9.000 è…", r: ['10<sup>4</sup>', '10<sup>3</sup>', '10<sup>9</sup>', '9 × 10<sup>3</sup>'], s: '9.000 sta tra 1.000 e 10.000 ed è molto più vicino a 10.000.' },
    { d: "L'ordine di grandezza di 2.000 è…", r: ['10<sup>3</sup>', '10<sup>4</sup>', '10<sup>2</sup>', '2 × 10<sup>3</sup>'], s: '2.000 è più vicino a 1.000 che a 10.000. L\'ordine di grandezza è sempre una potenza di 10, senza numeri davanti.' },
    { d: 'Quale numero è più grande?', r: ['1,9 × 10<sup>5</sup>', '9 × 10<sup>4</sup>', 'Sono uguali', 'Non si può dire'], s: 'Vince l\'esponente più grande: 190.000 contro 90.000.' },
    { d: '7,2 × 10<sup>6</sup> scritto per intero è…', r: ['7.200.000', '72.000.000', '720.000', '7.000.002'], s: 'Il numero ha una cifra in più dell\'esponente: 7 cifre.' },
    { d: 'Quante cifre ha 10<sup>6</sup> scritto per intero?', r: ['7', '6', '10', '16'], s: '1.000.000: un 1 e sei zeri, 7 cifre in tutto.' },
  ],

  /* domande scritte a parole: la voce le legge bene */
  interrogazione: [
    { d: "Che cos'è la notazione esponenziale?", scheda: 's1', minimo: 2,
      concetti: [['prodotto', 'moltiplic', 'per'], ['potenz', 'dieci', '10'], ['zeri', 'zero']],
      risposta: 'È un modo di scrivere i numeri con tanti zeri: il numero diventa il prodotto tra le sue cifre senza gli zeri finali e una potenza di dieci, che ha per esponente il numero degli zeri.' },
    { d: "Che cos'è la notazione scientifica?", scheda: 's2', minimo: 2,
      concetti: [['una sola cifra', 'una cifra', 'solo una cifra', 'un numero solo'], ['virgola'], ['potenz', 'dieci', '10']],
      risposta: 'È una notazione esponenziale in cui prima della virgola c\'è una sola cifra diversa da zero, moltiplicata per una potenza di dieci.' },
    { d: "Come trovi l'esponente quando scrivi un numero in notazione scientifica?", scheda: 's2', minimo: 2,
      concetti: [['virgola'], ['cont'], ['cifre', 'posti', 'numeri']],
      risposta: 'Metto la virgola dopo la prima cifra e conto quante cifre c\'erano dopo: quel numero è l\'esponente di dieci.' },
    { d: 'Come passi dalla notazione scientifica al numero scritto per intero?', scheda: 's3', minimo: 2,
      concetti: [['virgola'], ['destra', 'avanti', 'spost'], ['esponent', 'posti'], ['zeri', 'zero']],
      risposta: 'Sposto la virgola verso destra di tanti posti quanto dice l\'esponente, e dove mancano le cifre aggiungo degli zeri.' },
    { d: "Che cos'è l'ordine di grandezza di un numero e come si trova?", scheda: 's4', minimo: 2,
      concetti: [['potenz', 'dieci', '10'], ['vicin'], ['tra', 'compreso', 'due potenze']],
      risposta: 'È la potenza di dieci più vicina al numero. Si cercano le due potenze di dieci tra cui sta il numero e si sceglie quella più vicina.' },
    { d: 'Come confronti due numeri scritti in notazione scientifica?', scheda: 's5', minimo: 2,
      concetti: [['esponent'], ['grande', 'maggiore', 'vince'], ['uguali', 'stesso', 'davanti', 'numero prima']],
      risposta: 'Guardo prima gli esponenti: è più grande il numero con l\'esponente maggiore. Se gli esponenti sono uguali, confronto i numeri davanti.' },
  ],
}
