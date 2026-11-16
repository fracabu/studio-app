/* Ripasso per la verifica di inglese: units 1 e 2.
 * Fonte: This is me! Edizione IN, Volume 1 (Deascuola, marchio Black Cat). Unit 1 People & places
 * (pag. 25-38: countries, nationalities, subject pronouns, be affermativo e negativo, possessive
 * adjectives, articoli), Unit 2 My things (pag. 39-52: personal possessions, adjectives, be
 * interrogativo e short answers, question words, plurali regolari, dimostrativi), Grammar Maps
 * pag. 269-270, Workbook pag. 172, 174, 175 (Revision 1-2). Nel lettore HUB Young:
 * page = pagina stampata + 4. Appunti: prima-media-llm-wiki/raw/libri/inglese-this-is-me/.
 * Regole riscritte con parole nostre; esercizi e quiz nostri, con frasi diverse da quelle del libro
 * (mai le soluzioni delle pagine 172-175). Il testo dell'esercizio 10 è di Sbrigo.
 * L'inglese è marcato <span lang="en">…</span>: si tocca e si sente con voce inglese, e le schede
 * si ascoltano a due voci (node scripts/lezione-audio.mjs inglese-units-1-2). Dentro gli span niente
 * entità HTML né altri tag: la firma del file audio si calcola sul testo.
 * Niente interrogazione a voce: il riconoscimento del microfono è in italiano. */
window.LEZIONE = {
  id: 'inglese-units-1-2',
  materia: 'Inglese',
  titolo: 'Units 1-2: ripasso per la verifica',
  argomento: 'nazioni e nazionalità, il verbo be, pronomi e possessivi, articoli, domande, plurali, dimostrativi',
  pagine: '25–52, 172–175',
  sezioni: ['scheda', 'esercizi', 'quiz'],

  schede: [
    {
      id: 's1', titolo: 'Countries and nationalities', pag: '28-29',
      html: `<p>In inglese <b>nazioni e nazionalità hanno sempre la lettera maiuscola</b>: <span lang="en">Italy, Italian</span>. Le nazionalità si raggruppano per finale.</p>
<ul><li><b>finiscono in -an o -ian</b>: <span lang="en">Italy, Italian</span> · <span lang="en">Germany, German</span> · <span lang="en">the USA, American</span> · <span lang="en">Morocco, Moroccan</span> · <span lang="en">India, Indian</span> · <span lang="en">Brazil, Brazilian</span> · <span lang="en">Argentina, Argentinian</span> · <span lang="en">Egypt, Egyptian</span> · <span lang="en">Nigeria, Nigerian</span> · <span lang="en">Albania, Albanian</span> · <span lang="en">Romania, Romanian</span></li>
<li><b>finiscono in -ish</b>: <span lang="en">England, English</span> · <span lang="en">Spain, Spanish</span> · <span lang="en">Ireland, Irish</span> · <span lang="en">Scotland, Scottish</span></li>
<li><b>finisce in -ese</b>: <span lang="en">China, Chinese</span></li>
<li><b>altre forme</b>: <span lang="en">France, French</span> · <span lang="en">Wales, Welsh</span></li></ul>
<p>Per dire da dove vieni: <span lang="en">I'm from Italy. I'm Italian.</span> Dopo <b>from</b> va la <b>nazione</b>, dopo <b>I'm</b> da solo va la <b>nazionalità</b>.</p>
<div class="attento">⚠️ Il Regno Unito, <span lang="en">the UK</span>, è fatto di Inghilterra, Scozia, Galles e Irlanda del Nord. La Gran Bretagna, <span lang="en">Great Britain</span>, solo dei primi tre. Gli abitanti del Regno Unito sono <span lang="en">British</span>. Davanti a <span lang="en">the USA</span> e <span lang="en">the UK</span> c'è sempre <span lang="en">the</span>.</div>`,
    },
    {
      id: 's2', titolo: 'I pronomi soggetto', pag: '30',
      html: `<table>
<tr><td><b>singolare</b></td><td></td><td><b>plurale</b></td><td></td></tr>
<tr><td><span lang="en">I</span></td><td>io</td><td><span lang="en">we</span></td><td>noi</td></tr>
<tr><td><span lang="en">you</span></td><td>tu</td><td><span lang="en">you</span></td><td>voi</td></tr>
<tr><td><span lang="en">he</span></td><td>lui</td><td rowspan="3"><span lang="en">they</span></td><td rowspan="3">loro, per persone, animali e cose</td></tr>
<tr><td><span lang="en">she</span></td><td>lei</td></tr>
<tr><td><span lang="en">it</span></td><td>esso, essa: cose e animali</td></tr>
</table>
<ul><li>In italiano il soggetto si può togliere, "sono italiano". In inglese <b>c'è sempre</b>: <span lang="en">I'm Italian.</span></li>
<li><span lang="en">I</span>, io, si scrive <b>sempre maiuscolo</b>, anche in mezzo alla frase.</li>
<li><span lang="en">You</span> vale per tu, per voi e anche per il Lei di cortesia.</li></ul>
<p class="nota">Un trucco: Marco diventa <span lang="en">he</span>, Giulia <span lang="en">she</span>, la bici <span lang="en">it</span>, Marco e io <span lang="en">we</span>, Marco e Giulia <span lang="en">they</span>.</p>`,
    },
    {
      id: 's3', titolo: 'Il verbo be: forma affermativa', pag: '30',
      html: `<p><b><span lang="en">Be</span></b> vuol dire <b>essere</b>. Ha due forme: quella intera e quella contratta, con l'apostrofo, che si usa quando si parla.</p>
<table>
<tr><td><b>intera</b></td><td><b>contratta</b></td></tr>
<tr><td><span lang="en">I am</span></td><td><span lang="en">I'm</span></td></tr>
<tr><td><span lang="en">you are</span></td><td><span lang="en">you're</span></td></tr>
<tr><td><span lang="en">he is, she is, it is</span></td><td><span lang="en">he's, she's, it's</span></td></tr>
<tr><td><span lang="en">we are</span></td><td><span lang="en">we're</span></td></tr>
<tr><td><span lang="en">you are</span></td><td><span lang="en">you're</span></td></tr>
<tr><td><span lang="en">they are</span></td><td><span lang="en">they're</span></td></tr>
</table>
<p>La regola in breve: <span class="evid"><b>am</b> solo con I, <b>is</b> con he, she, it, <b>are</b> con tutti gli altri</span>.</p>
<div class="attento">⚠️ Con <b>be</b> si dice anche l'età, dove l'italiano usa "avere": <span lang="en">I'm twelve.</span> Ho dodici anni. Mai "I have twelve".</div>`,
    },
    {
      id: 's4', titolo: 'Il verbo be: forma negativa', pag: '31',
      html: `<p>Per la negativa basta mettere <b>not dopo il verbo</b>.</p>
<table>
<tr><td><b>intera</b></td><td><b>contratta</b></td></tr>
<tr><td><span lang="en">I am not</span></td><td><span lang="en">I'm not</span></td></tr>
<tr><td><span lang="en">you are not</span></td><td><span lang="en">you aren't</span></td></tr>
<tr><td><span lang="en">he is not, she is not, it is not</span></td><td><span lang="en">he isn't, she isn't, it isn't</span></td></tr>
<tr><td><span lang="en">we are not, they are not</span></td><td><span lang="en">we aren't, they aren't</span></td></tr>
</table>
<p>Esempi: <span lang="en">Sbrigo isn't Italian.</span> <span lang="en">We aren't late.</span></p>
<div class="attento">⚠️ Con I non esiste "I amn't": si dice solo <span lang="en">I'm not</span>.</div>`,
    },
    {
      id: 's5', titolo: 'Be nelle domande e le risposte brevi', pag: '44',
      html: `<p>Per fare una domanda si <b>scambiano di posto</b> verbo e soggetto: il verbo va <b>prima</b>.</p>
<table>
<tr><td><span lang="en">You are Scottish.</span></td><td>diventa</td><td><span lang="en">Are you Scottish?</span></td></tr>
<tr><td><span lang="en">Her bike is new.</span></td><td>diventa</td><td><span lang="en">Is her bike new?</span></td></tr>
</table>
<p>Alle domande si risponde con una <b>risposta breve</b>: yes o no, il soggetto e il verbo.</p>
<table>
<tr><td><b>sì</b></td><td><b>no</b></td></tr>
<tr><td><span lang="en">Yes, I am.</span></td><td><span lang="en">No, I'm not.</span></td></tr>
<tr><td><span lang="en">Yes, he is.</span></td><td><span lang="en">No, she isn't.</span></td></tr>
<tr><td><span lang="en">Yes, they are.</span></td><td><span lang="en">No, we aren't.</span></td></tr>
</table>
<div class="attento">⚠️ La risposta breve col sì <b>non si contrae mai</b>: si dice <span lang="en">Yes, I am</span>, mai "Yes, I'm". E nella risposta si usa il <b>pronome</b>: <span lang="en">Is Leo English? Yes, he is.</span></div>
<p class="nota">Attento a chi risponde: a <span lang="en">Are you…?</span> si risponde con <span lang="en">I</span> se la domanda è per te, con <span lang="en">we</span> se è per voi.</p>`,
    },
    {
      id: 's6', titolo: 'Gli aggettivi possessivi', pag: '31',
      html: `<table>
<tr><td><span lang="en">I</span></td><td><b><span lang="en">my</span></b></td><td>il mio, la mia</td></tr>
<tr><td><span lang="en">you</span></td><td><b><span lang="en">your</span></b></td><td>il tuo</td></tr>
<tr><td><span lang="en">he</span></td><td><b><span lang="en">his</span></b></td><td>il suo, se è di un maschio</td></tr>
<tr><td><span lang="en">she</span></td><td><b><span lang="en">her</span></b></td><td>il suo, se è di una femmina</td></tr>
<tr><td><span lang="en">it</span></td><td><b><span lang="en">its</span></b></td><td>il suo, di una cosa o di un animale</td></tr>
<tr><td><span lang="en">we</span></td><td><b><span lang="en">our</span></b></td><td>il nostro</td></tr>
<tr><td><span lang="en">you</span></td><td><b><span lang="en">your</span></b></td><td>il vostro</td></tr>
<tr><td><span lang="en">they</span></td><td><b><span lang="en">their</span></b></td><td>il loro</td></tr>
</table>
<ul><li><b>Niente articolo</b> davanti: la mia bici, <span lang="en">my bike</span>.</li>
<li>Non cambia mai: <span lang="en">my brother, my sisters</span>, sempre my.</li></ul>
<div class="attento">⚠️ La trappola di "suo": in inglese conta <b>di chi è</b> la cosa, non la cosa. Il libro di Leo è <span lang="en">his book</span>; la bici di Zahra è <span lang="en">her bike</span>.</div>
<p class="nota">Non confondere <span lang="en">its</span>, il suo, con <span lang="en">it's</span>, che vuol dire it is. E <span lang="en">their</span>, il loro, con <span lang="en">they're</span>, che vuol dire they are.</p>`,
    },
    {
      id: 's7', titolo: 'Gli articoli: the, a, an', pag: '32',
      html: `<table>
<tr><td><b><span lang="en">the</span></b></td><td>il, lo, la, i, gli, le: uguale per tutti</td></tr>
<tr><td><b><span lang="en">a</span></b></td><td>un, uno, una, davanti a un <b>suono di consonante</b>: <span lang="en">a ball, a new student</span></td></tr>
<tr><td><b><span lang="en">an</span></b></td><td>un, uno, una, davanti a un <b>suono di vocale</b>: <span lang="en">an apple, an old car</span></td></tr>
</table>
<ul><li>Conta la parola <b>subito dopo</b>, anche se è un aggettivo: <span lang="en">an orange pen</span>, ma <span lang="en">a red pen</span>.</li>
<li>Per dire un mestiere ci vuole l'articolo: <span lang="en">She's a teacher.</span> In italiano diciamo "è insegnante".</li></ul>
<div class="attento">⚠️ Conta il <b>suono</b>, non la lettera: <span lang="en">an hour</span>, perché l'h non si pronuncia; <span lang="en">a uniform</span>, perché si pronuncia "iu".</div>`,
    },
    {
      id: 's8', titolo: 'Le parole per le domande', pag: '44, 172',
      html: `<table>
<tr><td><b><span lang="en">What?</span></b></td><td>che cosa? quale?</td><td><span lang="en">What's your name?</span></td></tr>
<tr><td><b><span lang="en">Who?</span></b></td><td>chi?</td><td><span lang="en">Who is your best friend?</span></td></tr>
<tr><td><b><span lang="en">Where?</span></b></td><td>dove?</td><td><span lang="en">Where are you from?</span></td></tr>
<tr><td><b><span lang="en">When?</span></b></td><td>quando?</td><td><span lang="en">When's your birthday?</span></td></tr>
<tr><td><b><span lang="en">Why?</span></b></td><td>perché?</td><td><span lang="en">Why are you happy?</span></td></tr>
<tr><td><b><span lang="en">How old?</span></b></td><td>quanti anni?</td><td><span lang="en">How old are you?</span></td></tr>
</table>
<p>A <span lang="en">Why</span> si risponde con <b><span lang="en">Because</span></b>: <span lang="en">Why are you happy? Because it's Saturday!</span></p>
<p>Le domande per presentarsi, e come si risponde:</p>
<table>
<tr><td><span lang="en">What's your phone number?</span></td><td><span lang="en">It's 347 12 34 567.</span></td></tr>
<tr><td><span lang="en">What's your email?</span></td><td><span lang="en">It's sbrigo at mail dot com.</span></td></tr>
<tr><td><span lang="en">How are you?</span></td><td><span lang="en">I'm fine, thanks.</span> oppure <span lang="en">Not bad, thanks.</span></td></tr>
<tr><td><span lang="en">Nice to meet you.</span></td><td><span lang="en">Nice to meet you too.</span></td></tr>
<tr><td><span lang="en">See you later!</span></td><td><span lang="en">Bye!</span></td></tr>
</table>`,
    },
    {
      id: 's9', titolo: 'Il plurale dei nomi', pag: '270',
      html: `<table>
<tr><td>quasi tutti: <b>+ s</b></td><td><span lang="en">book, books</span> · <span lang="en">day, days</span></td></tr>
<tr><td>finiscono in -o, -s, -ss, -sh, -ch, -x, -z: <b>+ es</b></td><td><span lang="en">potato, potatoes</span> · <span lang="en">bus, buses</span> · <span lang="en">class, classes</span> · <span lang="en">brush, brushes</span> · <span lang="en">watch, watches</span> · <span lang="en">box, boxes</span></td></tr>
<tr><td>consonante + y: <b>y diventa ies</b></td><td><span lang="en">baby, babies</span> · <span lang="en">diary, diaries</span></td></tr>
<tr><td>-f o -fe: <b>diventa ves</b></td><td><span lang="en">life, lives</span> · <span lang="en">scarf, scarves</span></td></tr>
</table>
<div class="attento">⚠️ Se prima della y c'è una <b>vocale</b>, si aggiunge solo la s: <span lang="en">day, days</span> · <span lang="en">key, keys</span> · <span lang="en">Monday, Mondays</span>.</div>
<p class="nota">Gli aggettivi invece <b>non hanno il plurale</b>: <span lang="en">a new bag, two new bags</span>.</p>`,
    },
    {
      id: 's10', titolo: 'This, that, these, those', pag: '270',
      html: `<table>
<tr><td></td><td><b>vicino a chi parla</b></td><td><b>lontano da chi parla</b></td></tr>
<tr><td><b>singolare</b></td><td><span lang="en">this</span>, questo, questa</td><td><span lang="en">that</span>, quello, quella</td></tr>
<tr><td><b>plurale</b></td><td><span lang="en">these</span>, questi, queste</td><td><span lang="en">those</span>, quelli, quelle</td></tr>
</table>
<p>Esempi: <span lang="en">This book is interesting.</span> <span lang="en">That skateboard is fast.</span> <span lang="en">These sunglasses are expensive.</span> <span lang="en">Those trainers are old.</span></p>
<ul><li>Due domande per scegliere: è <b>vicino o lontano</b>? È <b>uno o tanti</b>?</li>
<li>Possono stare anche da soli, come pronomi: <span lang="en">Is that your bag?</span></li></ul>
<div class="attento">⚠️ <span lang="en">Sunglasses, trainers, headphones</span> in inglese sono sempre plurali: quindi <span lang="en">these sunglasses</span>, e il verbo va con <span lang="en">are</span>.</div>`,
    },
    {
      id: 's11', titolo: 'My things: oggetti e aggettivi', pag: '42-43',
      html: `<table>
<tr><td><span lang="en">a bike</span></td><td>una bici</td><td><span lang="en">a diary</span></td><td>un diario</td></tr>
<tr><td><span lang="en">headphones</span></td><td>le cuffie</td><td><span lang="en">a keyring</span></td><td>un portachiavi</td></tr>
<tr><td><span lang="en">a phone</span></td><td>un telefono</td><td><span lang="en">a scarf</span></td><td>una sciarpa</td></tr>
<tr><td><span lang="en">a skateboard</span></td><td>uno skateboard</td><td><span lang="en">sunglasses</span></td><td>gli occhiali da sole</td></tr>
<tr><td><span lang="en">trainers</span></td><td>le scarpe da ginnastica</td><td><span lang="en">a water bottle</span></td><td>una borraccia</td></tr>
<tr><td><span lang="en">a wallet</span></td><td>un portafoglio</td><td><span lang="en">a watch</span></td><td>un orologio</td></tr>
</table>
<p>Gli aggettivi si imparano a coppie di contrari:</p>
<table>
<tr><td><span lang="en">nice, not nice</span></td><td>simpatico, carino · antipatico</td></tr>
<tr><td><span lang="en">beautiful, ugly</span></td><td>bello · brutto</td></tr>
<tr><td><span lang="en">big, small</span></td><td>grande · piccolo</td></tr>
<tr><td><span lang="en">cheap, expensive</span></td><td>economico · caro</td></tr>
<tr><td><span lang="en">old, new</span></td><td>vecchio · nuovo</td></tr>
<tr><td><span lang="en">low-tech, high-tech</span></td><td>poco tecnologico · tecnologico</td></tr>
</table>
<div class="attento">⚠️ In inglese l'aggettivo va <b>prima</b> del nome: la bici nuova, <span lang="en">a new bike</span>; una città vecchia, <span lang="en">an old city</span>.</div>`,
    },
  ],

  esercizi: [
    {
      titolo: 'Nazione o nazionalità?',
      testo: `Completa con la nazione o la nazionalità.<br>a) Paella is a famous ______ dish. (Spain)<br>b) My cousin lives in ______. He's German.<br>c) Dublin is the capital of ______. (Irish)<br>d) Pizza is ______ food. (Italy)<br>e) Cardiff is in ______. (Welsh)<br>f) The pyramids are ______. (Egypt)<br>g) Shanghai is a big ______ city. (China)<br>h) Messi is ______. (Argentina)`,
      metodo: `Guarda cosa c'è prima del buco. Dopo <b>in</b>, <b>from</b> o <b>capital of</b> va la <b>nazione</b>; davanti a un nome o dopo is, are va la <b>nazionalità</b> (scheda 1). E sempre la maiuscola.`,
      soluzione: `a) <span lang="en">Spanish</span> · b) <span lang="en">Germany</span> · c) <span lang="en">Ireland</span> · d) <span lang="en">Italian</span> · e) <span lang="en">Wales</span> · f) <span lang="en">Egyptian</span> · g) <span lang="en">Chinese</span> · h) <span lang="en">Argentinian</span>`,
    },
    {
      titolo: 'Il pronome giusto',
      testo: `Scrivi il pronome soggetto al posto delle parole.<br>a) Sbrigo → ______<br>b) my mum → ______<br>c) the skateboard → ______<br>d) Tom and I → ______<br>e) Anna and Luca → ______<br>f) you and your sister → ______<br>g) the dog → ______`,
      metodo: `Chiediti: è una persona o una cosa? Maschio o femmina? Uno o tanti? Se ci sei dentro tu è <b>we</b>; se c'è "you" è <b>you</b> (scheda 2).`,
      soluzione: `a) <span lang="en">he</span> · b) <span lang="en">she</span> · c) <span lang="en">it</span> · d) <span lang="en">we</span> · e) <span lang="en">they</span> · f) <span lang="en">you</span> · g) <span lang="en">it</span>`,
    },
    {
      titolo: 'Be: affermativo e negativo',
      testo: `Completa con la forma contratta di <b>be</b>: ✓ affermativa, ✗ negativa.<br>a) I ______ from Rome. ✓<br>b) My trainers ______ new. ✗<br>c) Sbrigo ______ a basketball fan. ✓<br>d) We ______ in the same class. ✗<br>e) It ______ cold today. ✗<br>f) You ______ my best friend. ✓<br>g) I ______ hungry. ✗<br>h) They ______ Scottish. ✓`,
      metodo: `Prima trova il soggetto: <b>I</b> vuole am, <b>he, she, it</b> o un nome singolare vogliono is, tutto il resto vuole are. Poi contrai: 'm, 's, 're; negativo: 'm not, isn't, aren't (schede 3 e 4).`,
      soluzione: `a) <span lang="en">I'm from Rome.</span><br>b) <span lang="en">My trainers aren't new.</span><br>c) <span lang="en">Sbrigo's a basketball fan.</span><br>d) <span lang="en">We aren't in the same class.</span><br>e) <span lang="en">It isn't cold today.</span><br>f) <span lang="en">You're my best friend.</span><br>g) <span lang="en">I'm not hungry.</span><br>h) <span lang="en">They're Scottish.</span>`,
    },
    {
      titolo: 'Domande e risposte brevi',
      testo: `Trasforma in domanda e rispondi con la risposta breve.<br>a) Your teacher is English. (✗)<br>b) The keyrings are cheap. (✓)<br>c) Sbrigo is tall. (✓)<br>d) You are twelve. (✗, parla tu)<br>e) Your friends are at the park. (✗)<br>f) The film is boring. (✓)`,
      metodo: `Il verbo va <b>prima</b> del soggetto: Is…? Are…? Nella risposta breve usa il <b>pronome</b>, e col sì niente contrazione (scheda 5).`,
      soluzione: `a) <span lang="en">Is your teacher English? No, she isn't.</span> (o he isn't)<br>b) <span lang="en">Are the keyrings cheap? Yes, they are.</span><br>c) <span lang="en">Is Sbrigo tall? Yes, he is.</span><br>d) <span lang="en">Are you twelve? No, I'm not.</span><br>e) <span lang="en">Are your friends at the park? No, they aren't.</span><br>f) <span lang="en">Is the film boring? Yes, it is.</span>`,
    },
    {
      titolo: 'Il possessivo giusto',
      testo: `Completa con il possessivo della persona tra parentesi.<br>a) ______ name is Sbrigo. (he)<br>b) This is ______ new phone. (I)<br>c) Emma and ______ sister are from Wales. (she)<br>d) The cat is in ______ bed. (it)<br>e) We love ______ school. (we)<br>f) Are these ______ headphones? (you)<br>g) The twins are with ______ dad. (they)`,
      metodo: `Guarda di chi è la cosa: <b>he</b> → his, <b>she</b> → her, <b>it</b> → its, <b>they</b> → their. Niente articolo davanti (scheda 6).`,
      soluzione: `a) <span lang="en">His</span> · b) <span lang="en">my</span> · c) <span lang="en">her</span> · d) <span lang="en">its</span> · e) <span lang="en">our</span> · f) <span lang="en">your</span> · g) <span lang="en">their</span>`,
    },
    {
      titolo: 'A, an o the?',
      testo: `a) Sbrigo is ______ basketball player.<br>b) It's ______ old watch.<br>c) I'm ______ only Italian student in my class.<br>d) She's ______ English teacher.<br>e) It's ______ hour from here.<br>f) This is ______ university in London.<br>g) Rome is ______ capital of Italy.<br>h) It's ______ expensive bike.`,
      metodo: `<b>the</b> quando è una cosa sola e precisa (la capitale, l'unico). Se no a o an: ascolta il <b>suono</b> della parola subito dopo (scheda 7).`,
      soluzione: `a) <span lang="en">a</span> · b) <span lang="en">an</span> · c) <span lang="en">the</span> · d) <span lang="en">an</span> · e) <span lang="en">an</span> · f) <span lang="en">a</span>, perché university comincia col suono "iu" · g) <span lang="en">the</span> · h) <span lang="en">an</span>`,
    },
    {
      titolo: 'Le parole delle domande',
      testo: `Completa con What, Who, Where, When, Why, How old.<br>a) ______ is your favourite singer? Taylor Swift.<br>b) ______ is Sbrigo? He's 300 years old!<br>c) ______ is your keyring? It's in my bag.<br>d) ______ is your favourite colour? Blue.<br>e) ______ is the match? It's on Saturday.<br>f) ______ are you sad? Because my team isn't good.`,
      metodo: `Leggi prima la <b>risposta</b>: una persona → Who, un posto → Where, un giorno → When, un'età → How old, because → Why, una cosa → What (scheda 8).`,
      soluzione: `a) <span lang="en">Who</span> · b) <span lang="en">How old</span> · c) <span lang="en">Where</span> · d) <span lang="en">What</span> · e) <span lang="en">When</span> · f) <span lang="en">Why</span>`,
    },
    {
      titolo: 'Al plurale',
      testo: `Scrivi il plurale.<br>a) bag<br>b) bus<br>c) party<br>d) knife<br>e) toy<br>f) dish<br>g) tomato<br>h) wife<br>i) fox<br>j) city`,
      metodo: `Guarda come finisce: -s, -sh, -ch, -x, -o → es; consonante + y → ies; vocale + y → s; -f, -fe → ves; tutto il resto → s (scheda 9).`,
      soluzione: `a) <span lang="en">bags</span> · b) <span lang="en">buses</span> · c) <span lang="en">parties</span> · d) <span lang="en">knives</span> · e) <span lang="en">toys</span> · f) <span lang="en">dishes</span> · g) <span lang="en">tomatoes</span> · h) <span lang="en">wives</span> · i) <span lang="en">foxes</span> · j) <span lang="en">cities</span>`,
    },
    {
      titolo: 'This, that, these o those?',
      testo: `a) ______ ball here is mine. (vicino, uno)<br>b) Look at ______ birds in the sky! (lontano, tanti)<br>c) ______ trainers are new. (vicino, ne ho un paio in mano)<br>d) Is ______ boy over there your brother? (lontano, uno)<br>e) ______ are my comics. (vicino, tanti)<br>f) ______ is a beautiful car! (lontano, una)`,
      metodo: `Due domande: <b>vicino o lontano</b>? <b>uno o tanti</b>? Ricorda che trainers e sunglasses sono plurali (scheda 10).`,
      soluzione: `a) <span lang="en">This</span> · b) <span lang="en">those</span> · c) <span lang="en">These</span> · d) <span lang="en">that</span> · e) <span lang="en">These</span> · f) <span lang="en">That</span>`,
    },
    {
      titolo: 'Sbrigo si presenta: leggi e rispondi',
      testo: `<span lang="en">Hi! My name's Sbrigo. I'm a ghost, but I'm a very nice ghost.</span> <span lang="en">I'm not English, I'm Italian, from Rome. I'm three hundred years old!</span> <span lang="en">My best friend is Nico. He's twelve and he's in my class.</span> <span lang="en">My favourite things are my trainers and my basketball. My trainers are orange and purple. They aren't new, but they're very cool.</span> <span lang="en">Why is basketball my favourite sport? Because it's fast!</span><br><br>1) <span lang="en">Is Sbrigo English?</span><br>2) <span lang="en">How old is Sbrigo?</span><br>3) <span lang="en">Who is his best friend?</span><br>4) <span lang="en">What are his favourite things?</span><br>5) <span lang="en">Are his trainers new?</span><br>6) <span lang="en">Why is basketball his favourite sport?</span>`,
      metodo: `Leggi la domanda e trova la parola chiave (Is…? vuole una risposta breve; How old un'età; Who una persona; Why un because). Cerca l'informazione nel testo e rispondi con lo stesso verbo della domanda.`,
      soluzione: `1) <span lang="en">No, he isn't. He's Italian.</span><br>2) <span lang="en">He's three hundred years old.</span><br>3) <span lang="en">His best friend is Nico.</span><br>4) <span lang="en">His favourite things are his trainers and his basketball.</span><br>5) <span lang="en">No, they aren't.</span><br>6) <span lang="en">Because it's fast.</span>`,
    },
    {
      titolo: 'Traduci in inglese',
      testo: `a) Ho dodici anni e sono italiano.<br>b) Lei non è inglese, è irlandese.<br>c) Quelle scarpe da ginnastica sono nuove?<br>d) Questo è il suo portafoglio. (di Marco)<br>e) Dov'è la tua bici? È a scuola.<br>f) I nostri amici sono in ritardo.`,
      metodo: `L'età con <b>be</b>; il soggetto sempre; niente articolo davanti al possessivo; nelle domande il verbo va prima; l'aggettivo prima del nome.`,
      soluzione: `a) <span lang="en">I'm twelve and I'm Italian.</span><br>b) <span lang="en">She isn't English, she's Irish.</span><br>c) <span lang="en">Are those trainers new?</span><br>d) <span lang="en">This is his wallet.</span><br>e) <span lang="en">Where's your bike? It's at school.</span><br>f) <span lang="en">Our friends are late.</span>`,
    },
  ],

  quiz: [
    { d: `"Sono spagnolo" si dice…`, r: [`I'm Spanish.`, `I'm Spain.`, `I'm spanish.`, `I have Spanish.`], s: `Dopo I'm va la nazionalità, Spanish, con la maiuscola.` },
    { d: `Edinburgh is in…`, r: [`Scotland`, `Scottish`, `Wales`, `Ireland`], s: `Dopo in va la nazione: Scotland. Scottish è la nazionalità.` },
    { d: `La nazionalità di chi viene dalla Francia è…`, r: [`French`, `Francian`, `Frenchese`, `France`], s: `France, French: è tra le "altre forme", come Wales, Welsh.` },
    { d: `Al posto di <i>Lucy and Tom</i> usi…`, r: [`they`, `we`, `he`, `them`], s: `Due persone, e tu non ci sei: they.` },
    { d: `My bike ___ red.`, r: [`is`, `are`, `am`, `be`], s: `My bike è una cosa sola: is, come it.` },
    { d: `"Ho 12 anni" si dice…`, r: [`I'm 12.`, `I have 12.`, `I have 12 years.`, `I'm 12 year.`], s: `L'età in inglese si dice con be: I'm 12.` },
    { d: `La forma negativa di <i>I am</i> è…`, r: [`I'm not`, `I amn't`, `I aren't`, `I isn't`], s: `Con I c'è solo I'm not.` },
    { d: `They ___ at school today. (negativo)`, r: [`aren't`, `isn't`, `not are`, `don't`], s: `They vuole are; al negativo aren't.` },
    { d: `Quale domanda è giusta?`, r: [`Are you from Rome?`, `You are from Rome?`, `Are from Rome you?`, `Is you from Rome?`], s: `Nella domanda il verbo va prima del soggetto: Are you…?` },
    { d: `Is your sister twelve? Yes, …`, r: [`she is.`, `she's.`, `it is.`, `is she.`], s: `Risposta breve col pronome, e col sì niente contrazione: Yes, she is.` },
    { d: `Are you and Luca friends? No, …`, r: [`we aren't.`, `you aren't.`, `they aren't.`, `I'm not.`], s: `La domanda è per voi due: rispondi con we.` },
    { d: `Questo è il cane di Anna: è ___ dog.`, r: [`her`, `his`, `its`, `she`], s: `Il cane è di Anna, una femmina: her.` },
    { d: `"Il loro insegnante" si dice…`, r: [`their teacher`, `they're teacher`, `the their teacher`, `there teacher`], s: `Il possessivo di they è their, senza articolo. They're vuol dire they are.` },
    { d: `It's ___ hour from my house.`, r: [`an`, `a`, `the`, `one`], s: `In hour l'h non si sente: comincia con un suono di vocale, quindi an.` },
    { d: `My dad is ___ engineer.`, r: [`an`, `a`, `the`, `niente`], s: `Per un mestiere ci vuole l'articolo; engineer comincia con una vocale: an.` },
    { d: `___ is your birthday? It's in May.`, r: [`When`, `Where`, `What`, `Who`], s: `La risposta è un periodo: When, quando.` },
    { d: `Why are you late? …`, r: [`Because the bus is slow.`, `Yes, I am.`, `It's in my bag.`, `I'm 12.`], s: `A Why si risponde con Because.` },
    { d: `Il plurale di <i>baby</i> è…`, r: [`babies`, `babys`, `babyes`, `babis`], s: `Consonante più y: la y diventa ies.` },
    { d: `Il plurale di <i>watch</i> è…`, r: [`watches`, `watchs`, `watchies`, `watch`], s: `Le parole in -ch prendono es: watches.` },
    { d: `___ sunglasses here are my mum's.`, r: [`These`, `This`, `That`, `Those`], s: `Sono vicini (here) e sunglasses è plurale: these.` },
  ],

  /* niente interrogazione a voce: il riconoscimento vocale è in italiano */
  interrogazione: [],
}
