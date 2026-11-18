/* Lezione di inglese: Unit 3 Family & friends, prima parte.
 * Fonte: This is me! Edizione IN, Volume 1 (Deascuola, marchio Black Cat), Unit 3 pag. 57-63:
 * dialogo "I've got three sisters!" (58-59), Vocabulary family e pets (60-61), Grammar have got
 * affermativo, negativo, interrogativo e risposte brevi, plurali irregolari (62-63).
 * Nel lettore HUB Young: page = pagina stampata + 4.
 * Compito per il 19/11: "Prepare a family tree on ex.book" (scheda 2 ed esercizio 9).
 * Regole riscritte con parole nostre; esercizi e quiz nostri, con frasi diverse da quelle del libro
 * (mai le soluzioni degli esercizi delle pagine 58-63). I testi degli esercizi 3 e 9 sono di Sbrigo.
 * L'inglese è marcato <span lang="en">…</span>: dentro gli span niente entità HTML né altri tag,
 * la firma del file audio si calcola sul testo.
 * Niente interrogazione a voce: il riconoscimento del microfono è in italiano. */
window.LEZIONE = {
  id: 'inglese-family-friends',
  materia: 'Inglese',
  titolo: 'Unit 3: family, pets e have got',
  argomento: 'le parole della famiglia, l\'albero genealogico, gli animali domestici, have got, i plurali irregolari',
  pagine: '57–63',
  sezioni: ['scheda', 'esercizi', 'quiz'],

  schede: [
    {
      id: 's1', titolo: 'Family: le parole della famiglia', pag: '60-61',
      html: `<table>
<tr><td><b>maschio</b></td><td><b>femmina</b></td></tr>
<tr><td><span lang="en">dad</span>, papà</td><td><span lang="en">mum</span>, mamma</td></tr>
<tr><td><span lang="en">brother</span>, fratello</td><td><span lang="en">sister</span>, sorella</td></tr>
<tr><td><span lang="en">son</span>, figlio</td><td><span lang="en">daughter</span>, figlia</td></tr>
<tr><td><span lang="en">grandad</span>, nonno</td><td><span lang="en">grandma</span>, nonna</td></tr>
<tr><td><span lang="en">uncle</span>, zio</td><td><span lang="en">aunt</span>, zia</td></tr>
</table>
<p><b>Per tutti e due</b>: <span lang="en">parents</span>, genitori · <span lang="en">grandparents</span>, nonni · <span lang="en">cousin</span>, cugino o cugina · <span lang="en">relatives</span>, parenti.</p>
<p>Il nonno si dice anche <span lang="en">grandpa</span>. Gli amici non sono parenti, ma il libro li mette nella stessa pagina: <span lang="en">my best friend</span>, il mio migliore amico; <span lang="en">my teammates</span>, i compagni di squadra; <span lang="en">my school friends</span>, gli amici di scuola.</p>
<div class="attento">⚠️ Due falsi amici, parole che sembrano italiane ma vogliono dire un'altra cosa: <span lang="en">parents</span> vuol dire <b>genitori</b>, non parenti; i parenti sono <span lang="en">relatives</span>.</div>
<p class="nota"><span lang="en">Cousin</span> vale sia per il cugino sia per la cugina: per capire chi è, guarda <span lang="en">he</span> o <span lang="en">she</span> nella frase.</p>`,
    },
    {
      id: 's2', titolo: 'Come si fa un family tree', pag: '60',
      html: `<p>Il <b><span lang="en">family tree</span></b> è l'albero genealogico: la famiglia disegnata a piani, come a pagina 60.</p>
<ol><li><b>In alto</b> i nonni, una coppia per parte: <span lang="en">my grandma</span> e <span lang="en">my grandad</span>.</li>
<li><b>Al piano di mezzo</b> i loro figli: <span lang="en">my mum</span>, <span lang="en">my dad</span> e, accanto, gli zii, <span lang="en">my uncle</span> e <span lang="en">my aunt</span>.</li>
<li><b>In basso</b> tu, <span lang="en">Me!</span>, con i tuoi fratelli e, sotto gli zii, i cugini, <span lang="en">my cousins</span>.</li>
<li>Collega con una <b>linea</b> chi è sposato e con una <b>freccia</b> i genitori ai figli.</li>
<li>Sotto ogni casella scrivi il <b>nome</b> e la parentela con <span lang="en">my</span>: <span lang="en">My grandma, Rosa</span>. Se vuoi, aggiungi gli animali: <span lang="en">my dog</span>.</li></ol>
<p>Sotto l'albero puoi scrivere qualche frase con <span lang="en">have got</span> (schede 4 e 5): <span lang="en">I've got one brother.</span> <span lang="en">I haven't got a sister.</span> <span lang="en">My mum has got two sisters.</span></p>
<div class="attento">⚠️ Per dire "il figlio di Mick" si mette <b>'s</b> dopo il nome: <span lang="en">Tony is Mick's son.</span> L'ordine è al contrario dell'italiano: prima chi possiede, poi la cosa. Con due nomi la 's va solo sull'ultimo: <span lang="en">Mick and Yvonne's son</span>.</div>`,
    },
    {
      id: 's3', titolo: 'Pets: gli animali di casa', pag: '61',
      html: `<table>
<tr><td><span lang="en">a cat</span></td><td>un gatto</td></tr>
<tr><td><span lang="en">a dog</span></td><td>un cane</td></tr>
<tr><td><span lang="en">a bird</span></td><td>un uccellino</td></tr>
<tr><td><span lang="en">a goldfish</span></td><td>un pesce rosso</td></tr>
<tr><td><span lang="en">a guinea pig</span></td><td>un porcellino d'India</td></tr>
<tr><td><span lang="en">a horse</span></td><td>un cavallo</td></tr>
<tr><td><span lang="en">a mouse</span></td><td>un topolino</td></tr>
<tr><td><span lang="en">a rabbit</span></td><td>un coniglio</td></tr>
<tr><td><span lang="en">a snake</span></td><td>un serpente</td></tr>
<tr><td><span lang="en">a tortoise</span></td><td>una tartaruga di terra</td></tr>
</table>
<p>Animale domestico in inglese si dice <span lang="en">pet</span>: <span lang="en">Have you got a pet?</span></p>
<div class="attento">⚠️ Due plurali strani: un topo, <span lang="en">a mouse</span>, due topi, <span lang="en">two mice</span>; un pesce rosso, <span lang="en">a goldfish</span>, quattro pesci, <span lang="en">four goldfish</span>, senza s.</div>
<p class="nota">Una curiosità del libro: nel Regno Unito circa una famiglia su due ha un animale in casa.</p>`,
    },
    {
      id: 's4', titolo: 'Have got: affermativo', pag: '62',
      html: `<p><b><span lang="en">Have got</span></b> vuol dire <b>avere</b>, quando parli di cose che possiedi o di parenti: <span lang="en">I've got three sisters.</span> Ho tre sorelle.</p>
<table>
<tr><td><b>intera</b></td><td><b>contratta</b></td></tr>
<tr><td><span lang="en">I have got</span></td><td><span lang="en">I've got</span></td></tr>
<tr><td><span lang="en">you have got</span></td><td><span lang="en">you've got</span></td></tr>
<tr><td><span lang="en">he has got, she has got, it has got</span></td><td><span lang="en">he's got, she's got, it's got</span></td></tr>
<tr><td><span lang="en">we have got, they have got</span></td><td><span lang="en">we've got, they've got</span></td></tr>
</table>
<p>La regola in breve: <span class="evid"><b>has</b> con he, she, it e con un nome singolare, <b>have</b> con tutti gli altri</span>. Esempi: <span lang="en">My dad has got a new bike.</span> <span lang="en">My cousins have got a dog.</span></p>
<div class="attento">⚠️ <span lang="en">He's got</span> vuol dire <b>he has got</b>, non he is. Lo capisci dal got che viene dopo: <span lang="en">He's got a cat</span>, ha un gatto; <span lang="en">He's tall</span>, è alto.</div>`,
    },
    {
      id: 's5', titolo: 'Have got: negativo', pag: '62',
      html: `<p>Per la negativa si mette <b>not</b> tra have e got.</p>
<table>
<tr><td><b>intera</b></td><td><b>contratta</b></td></tr>
<tr><td><span lang="en">I have not got</span></td><td><span lang="en">I haven't got</span></td></tr>
<tr><td><span lang="en">you have not got</span></td><td><span lang="en">you haven't got</span></td></tr>
<tr><td><span lang="en">he has not got, she has not got, it has not got</span></td><td><span lang="en">he hasn't got, she hasn't got, it hasn't got</span></td></tr>
<tr><td><span lang="en">we have not got, they have not got</span></td><td><span lang="en">we haven't got, they haven't got</span></td></tr>
</table>
<p>Esempi: <span lang="en">I haven't got a big family.</span> <span lang="en">Sbrigo hasn't got a phone.</span></p>
<div class="attento">⚠️ Il <b>got</b> resta sempre, anche nella negativa: <span lang="en">She hasn't got a pet</span>, mai "She hasn't a pet".</div>`,
    },
    {
      id: 's6', titolo: 'Have got: domande e risposte brevi', pag: '63',
      html: `<p>Come con <span lang="en">be</span>, nella domanda <b>have o has vanno prima</b> del soggetto, e got resta dopo.</p>
<table>
<tr><td><b>frase</b></td><td><b>domanda</b></td></tr>
<tr><td><span lang="en">You have got a pet.</span></td><td><span lang="en">Have you got a pet?</span></td></tr>
<tr><td><span lang="en">Your sister has got a phone.</span></td><td><span lang="en">Has your sister got a phone?</span></td></tr>
</table>
<p>Nella risposta breve <b>got non c'è</b>: solo yes o no, il pronome e have o has.</p>
<table>
<tr><td><b>sì</b></td><td><b>no</b></td></tr>
<tr><td><span lang="en">Yes, I have.</span></td><td><span lang="en">No, I haven't.</span></td></tr>
<tr><td><span lang="en">Yes, she has.</span></td><td><span lang="en">No, he hasn't.</span></td></tr>
<tr><td><span lang="en">Yes, they have.</span></td><td><span lang="en">No, we haven't.</span></td></tr>
</table>
<div class="attento">⚠️ Col sì <b>niente contrazione</b>: <span lang="en">Yes, I have</span>, mai "Yes, I've". E nella risposta va il pronome: <span lang="en">Has Leo got a bike? Yes, he has.</span></div>`,
    },
    {
      id: 's7', titolo: 'Plurali irregolari', pag: '63',
      html: `<p>Alcuni nomi al plurale non prendono la s: <b>cambiano</b> e basta. Vanno imparati a memoria.</p>
<table>
<tr><td><b>singolare, plurale</b></td><td><b>in italiano</b></td></tr>
<tr><td><span lang="en">child, children</span></td><td>bambino, bambini</td></tr>
<tr><td><span lang="en">man, men</span></td><td>uomo, uomini</td></tr>
<tr><td><span lang="en">woman, women</span></td><td>donna, donne</td></tr>
<tr><td><span lang="en">person, people</span></td><td>persona, persone</td></tr>
<tr><td><span lang="en">foot, feet</span></td><td>piede, piedi</td></tr>
<tr><td><span lang="en">tooth, teeth</span></td><td>dente, denti</td></tr>
<tr><td><span lang="en">mouse, mice</span></td><td>topo, topi</td></tr>
<tr><td><span lang="en">fish, fish</span></td><td>pesce, pesci: uguale</td></tr>
</table>
<p class="nota">Un trucco per tre di loro: in <span lang="en">foot, tooth</span> e <span lang="en">goose</span>, l'oca, la doppia o diventa doppia e: <span lang="en">feet, teeth, geese</span>.</p>
<div class="attento">⚠️ <span lang="en">People</span> è già plurale: <span lang="en">six people are here</span>, mai "six peoples".</div>`,
    },
    {
      id: 's8', titolo: 'Frasi da dialogo', pag: '58-59',
      html: `<p>Nel dialogo di pagina 58 Zahra ha tre sorelle e Dan non vuole fare i compiti con gli altri. Ecco le frasi utili per parlare come loro:</p>
<table>
<tr><td><span lang="en">actually</span></td><td>davvero, veramente</td></tr>
<tr><td><span lang="en">It's no big deal.</span></td><td>Non è niente di grave.</td></tr>
<tr><td><span lang="en">Let's meet up!</span></td><td>Vediamoci!</td></tr>
<tr><td><span lang="en">It's not my fault.</span></td><td>Non è colpa mia.</td></tr>
<tr><td><span lang="en">What about you?</span></td><td>E tu?</td></tr>
<tr><td><span lang="en">I'm busy.</span></td><td>Sono impegnato.</td></tr>
</table>
<div class="attento">⚠️ Il proverbio dell'unità, <span lang="en">Friends are the family you choose</span>, vuol dire che gli amici sono la famiglia che ti scegli tu.</div>`,
    },
  ],

  esercizi: [
    {
      titolo: 'Maschio, femmina o tutti e due?',
      testo: `Metti ogni parola nella colonna giusta: maschio, femmina, tutti e due.<br>uncle · daughter · cousin · grandma · son · parents · aunt · brother · relatives · sister · grandad · mum`,
      metodo: `Pensa alla parola italiana: zio è maschio, zia femmina. Se vale per tutti e due, come cugino o cugina, va nella terza colonna. Parents e relatives sono gruppi (scheda 1).`,
      soluzione: `maschio: <span lang="en">uncle, son, brother, grandad</span><br>femmina: <span lang="en">daughter, grandma, aunt, sister, mum</span><br>tutti e due: <span lang="en">cousin, parents, relatives</span>`,
    },
    {
      titolo: 'Chi è?',
      testo: `Completa con la parola della famiglia.<br>a) My mum's mum is my ______.<br>b) My dad's brother is my ______.<br>c) My aunt's daughter is my ______.<br>d) My mum and my dad are my ______.<br>e) My dad's sister is my ______.<br>f) My grandad's wife is my ______.<br>g) For my parents, I'm their ______. (sei un maschio)`,
      metodo: `Leggi la 's al contrario: <b>my mum's mum</b> è la mamma della mia mamma. Poi chiediti che cosa è per te (schede 1 e 2).`,
      soluzione: `a) <span lang="en">grandma</span> · b) <span lang="en">uncle</span> · c) <span lang="en">cousin</span> · d) <span lang="en">parents</span> · e) <span lang="en">aunt</span> · f) <span lang="en">grandma</span> · g) <span lang="en">son</span>`,
    },
    {
      titolo: 'Il family tree di Sbrigo',
      testo: `Leggi e disegna sul quaderno l'albero di Sbrigo, poi rispondi.<br><br><span lang="en">Hi, I'm Sbrigo! I've got a very old family: we're ghosts!</span> <span lang="en">My grandparents are Grandma Nebbia and Grandad Fumo.</span> <span lang="en">They've got two children: my dad, Spiffero, and my aunt, Brina.</span> <span lang="en">My mum is Lucciola. I've got one sister, Scintilla, but I haven't got a brother.</span> <span lang="en">Aunt Brina has got a son, Tuono. He's my cousin and my teammate!</span> <span lang="en">We've got a pet too: a black cat, Ombra.</span><br><br>1) <span lang="en">Who are Sbrigo's grandparents?</span><br>2) <span lang="en">Has Sbrigo got a brother?</span><br>3) <span lang="en">Who is Brina?</span><br>4) <span lang="en">Who is Tuono?</span><br>5) <span lang="en">Have they got a pet?</span>`,
      metodo: `Disegna a tre piani come nella scheda 2: in alto i nonni, in mezzo il papà, la mamma e la zia, in basso Sbrigo, la sorella e il cugino. Alle domande Has…? e Have…? rispondi con la risposta breve (scheda 6).`,
      soluzione: `L'albero: in alto <span lang="en">Grandma Nebbia</span> e <span lang="en">Grandad Fumo</span>; in mezzo <span lang="en">Spiffero</span> con <span lang="en">Lucciola</span>, e <span lang="en">Aunt Brina</span>; in basso <span lang="en">Sbrigo</span> e <span lang="en">Scintilla</span> sotto i genitori, <span lang="en">Tuono</span> sotto Brina; accanto il gatto <span lang="en">Ombra</span>.<br>1) <span lang="en">Grandma Nebbia and Grandad Fumo.</span><br>2) <span lang="en">No, he hasn't.</span><br>3) <span lang="en">She's his aunt.</span><br>4) <span lang="en">He's his cousin and his teammate.</span><br>5) <span lang="en">Yes, they have. It's a black cat.</span>`,
    },
    {
      titolo: 'Che animale è?',
      testo: `Scrivi in inglese, con a o an.<br>a) un coniglio<br>b) un serpente<br>c) una tartaruga di terra<br>d) un porcellino d'India<br>e) un cavallo<br>f) un uccellino<br>g) tre topi<br>h) due pesci rossi`,
      metodo: `Guarda la scheda 3. Attento agli ultimi due: mouse e goldfish hanno un plurale strano.`,
      soluzione: `a) <span lang="en">a rabbit</span> · b) <span lang="en">a snake</span> · c) <span lang="en">a tortoise</span> · d) <span lang="en">a guinea pig</span> · e) <span lang="en">a horse</span> · f) <span lang="en">a bird</span> · g) <span lang="en">three mice</span> · h) <span lang="en">two goldfish</span>`,
    },
    {
      titolo: 'Have o has?',
      testo: `Completa con <b>have got</b> o <b>has got</b>, forma intera.<br>a) My grandma ______ a garden.<br>b) We ______ a new teacher.<br>c) Sbrigo ______ orange trainers.<br>d) I ______ two cousins.<br>e) The cat ______ green eyes.<br>f) My aunt and uncle ______ a horse.`,
      metodo: `Trova il soggetto: <b>he, she, it</b> o un nome singolare vogliono has; tutti gli altri have, anche due persone insieme (scheda 4).`,
      soluzione: `a) <span lang="en">has got</span> · b) <span lang="en">have got</span> · c) <span lang="en">has got</span> · d) <span lang="en">have got</span> · e) <span lang="en">has got</span> · f) <span lang="en">have got</span>`,
    },
    {
      titolo: 'Al negativo',
      testo: `Riscrivi al negativo, in forma contratta.<br>a) I've got a sister.<br>b) My dad has got a beard.<br>c) They've got a big house.<br>d) Sbrigo's got a phone.<br>e) We've got a dog.<br>f) The school has got a gym.`,
      metodo: `Have diventa <b>haven't</b>, has diventa <b>hasn't</b>; got resta. Se trovi 's, chiediti se è has: c'è got dopo? Allora sì (schede 4 e 5).`,
      soluzione: `a) <span lang="en">I haven't got a sister.</span><br>b) <span lang="en">My dad hasn't got a beard.</span><br>c) <span lang="en">They haven't got a big house.</span><br>d) <span lang="en">Sbrigo hasn't got a phone.</span><br>e) <span lang="en">We haven't got a dog.</span><br>f) <span lang="en">The school hasn't got a gym.</span>`,
    },
    {
      titolo: 'Domande e risposte brevi',
      testo: `Scrivi la domanda con <b>have got</b> e rispondi con la risposta breve.<br>a) you / a cousin in England? (✗, parla tu)<br>b) your mum / a car? (✓)<br>c) Sbrigo / a basketball? (✓)<br>d) your grandparents / a dog? (✗)<br>e) your teacher / a cat? (✓, è una prof)<br>f) you and your sister / bikes? (✓)`,
      metodo: `Have o Has prima del soggetto, got dopo. Nella risposta breve niente got, il pronome giusto, e col sì niente contrazione (scheda 6).`,
      soluzione: `a) <span lang="en">Have you got a cousin in England? No, I haven't.</span><br>b) <span lang="en">Has your mum got a car? Yes, she has.</span><br>c) <span lang="en">Has Sbrigo got a basketball? Yes, he has.</span><br>d) <span lang="en">Have your grandparents got a dog? No, they haven't.</span><br>e) <span lang="en">Has your teacher got a cat? Yes, she has.</span><br>f) <span lang="en">Have you and your sister got bikes? Yes, we have.</span>`,
    },
    {
      titolo: 'Plurali irregolari',
      testo: `Completa con il plurale della parola tra parentesi.<br>a) There are twenty ______ in my class. (child)<br>b) My grandad has got thirty-two ______! (tooth)<br>c) Three ______ are in the kitchen. Help! (mouse)<br>d) Two ______ and a woman are at the door. (man)<br>e) My ______ are cold. (foot)<br>f) How many ______ are in your family? (person)<br>g) We've got five ______ in a big bowl. (fish)`,
      metodo: `Sono tutte nella tabella della scheda 7: nessuna prende la s. Fish resta uguale.`,
      soluzione: `a) <span lang="en">children</span> · b) <span lang="en">teeth</span> · c) <span lang="en">mice</span> · d) <span lang="en">men</span> · e) <span lang="en">feet</span> · f) <span lang="en">people</span> · g) <span lang="en">fish</span>`,
    },
    {
      titolo: 'Il tuo family tree',
      testo: `È il compito per il 19/11: prepara sul quaderno il <b>tuo</b> albero genealogico.<br>1) Disegnalo a tre piani, come nella scheda 2, con i nomi veri.<br>2) Sotto, scrivi almeno <b>sei frasi</b> in inglese sulla tua famiglia, usando:<br>• due frasi con <b>I've got</b> o <b>I haven't got</b><br>• due frasi con <b>has got</b> o <b>hasn't got</b><br>• una frase con la <b>'s</b> (per esempio: è il figlio di…)<br>• una frase su un animale, se ce l'hai, o su quello che vorresti.`,
      metodo: `Parti dalle parole della scheda 1 e scrivi accanto a ogni casella <b>my</b> più la parentela. Per le frasi guarda le schede 2, 4 e 5. Rileggi: has con he, she e i nomi singolari; got sempre.`,
      soluzione: `Un esempio, l'albero di Sbrigo (il tuo sarà diverso):<br><span lang="en">I've got one sister, Scintilla.</span><br><span lang="en">I haven't got a brother.</span><br><span lang="en">My dad has got a sister, Aunt Brina.</span><br><span lang="en">My grandma hasn't got a car.</span><br><span lang="en">Tuono is Aunt Brina's son.</span><br><span lang="en">We've got a black cat, Ombra.</span>`,
    },
    {
      titolo: 'Traduci in inglese',
      testo: `a) Ho due cugini e una zia.<br>b) Mia sorella non ha un telefono.<br>c) Hai un animale domestico? Sì.<br>d) I miei genitori hanno una casa piccola.<br>e) Luca è il figlio di Marco.<br>f) Il mio migliore amico ha tre conigli.`,
      metodo: `Avere = <b>have got</b>, con has per lui, lei, esso. Genitori = parents. Il figlio di Marco = Marco's son. L'aggettivo va prima del nome.`,
      soluzione: `a) <span lang="en">I've got two cousins and an aunt.</span><br>b) <span lang="en">My sister hasn't got a phone.</span><br>c) <span lang="en">Have you got a pet? Yes, I have.</span><br>d) <span lang="en">My parents have got a small house.</span><br>e) <span lang="en">Luca is Marco's son.</span><br>f) <span lang="en">My best friend has got three rabbits.</span>`,
    },
  ],

  quiz: [
    { d: `<i>Parents</i> vuol dire…`, r: [`genitori`, `parenti`, `nonni`, `cugini`], s: `È un falso amico: parents sono i genitori, i parenti sono relatives.` },
    { d: `La sorella di tua mamma è tua…`, r: [`aunt`, `cousin`, `sister`, `grandma`], s: `La sorella di un genitore è la zia: aunt.` },
    { d: `Il figlio di tuo zio è tuo…`, r: [`cousin`, `uncle`, `brother`, `son`], s: `Il figlio dello zio è il cugino: cousin.` },
    { d: `Il contrario di <i>son</i> è…`, r: [`daughter`, `sister`, `mum`, `aunt`], s: `Son è figlio, daughter è figlia.` },
    { d: `Quale parola vale sia per maschio sia per femmina?`, r: [`cousin`, `uncle`, `grandma`, `brother`], s: `Cousin vale per cugino e per cugina.` },
    { d: `"Il fratello di Anna" si dice…`, r: [`Anna's brother`, `the brother Anna`, `brother's Anna`, `Anna brother's`], s: `Prima chi possiede con la 's, poi la cosa: Anna's brother.` },
    { d: `<i>Tortoise</i> è…`, r: [`una tartaruga di terra`, `un coniglio`, `un serpente`, `un porcellino d'India`], s: `Tortoise è la tartaruga di terra.` },
    { d: `"Due topi" si dice…`, r: [`two mice`, `two mouses`, `two mouse`, `two mices`], s: `Mouse ha il plurale irregolare: mice.` },
    { d: `My brother ___ got a skateboard.`, r: [`has`, `have`, `is`, `are`], s: `My brother è he: has got.` },
    { d: `My grandparents ___ got a farm.`, r: [`have`, `has`, `are`, `is`], s: `I nonni sono they: have got.` },
    { d: `In <i>She's got a dog</i>, la 's vuol dire…`, r: [`has`, `is`, `was`, `does`], s: `Dopo c'è got: è she has got.` },
    { d: `La negativa di <i>I've got a cat</i> è…`, r: [`I haven't got a cat.`, `I haven't a cat.`, `I've not a cat.`, `I don't got a cat.`], s: `Not tra have e got, e got resta: I haven't got.` },
    { d: `Sbrigo ___ a phone. (negativo)`, r: [`hasn't got`, `haven't got`, `isn't got`, `hasn't`], s: `Sbrigo è he: hasn't got.` },
    { d: `Quale domanda è giusta?`, r: [`Have you got a pet?`, `You have got a pet?`, `Have got you a pet?`, `Has you got a pet?`], s: `Have prima del soggetto, got dopo: Have you got…?` },
    { d: `Has your sister got a bike? Yes, …`, r: [`she has.`, `she's got.`, `she has got.`, `she is.`], s: `Nella risposta breve niente got e niente contrazione: Yes, she has.` },
    { d: `Have your cousins got a dog? No, …`, r: [`they haven't.`, `they hasn't.`, `they aren't.`, `they haven't got.`], s: `Cousins sono they: No, they haven't.` },
    { d: `Il plurale di <i>child</i> è…`, r: [`children`, `childs`, `childes`, `childrens`], s: `È irregolare: children.` },
    { d: `Il plurale di <i>tooth</i> è…`, r: [`teeth`, `tooths`, `toothes`, `teeths`], s: `La doppia o diventa doppia e: teeth.` },
    { d: `Six ___ are at the party.`, r: [`people`, `persons`, `peoples`, `person`], s: `Il plurale di person è people, già plurale.` },
    { d: `"Non è colpa mia" si dice…`, r: [`It's not my fault.`, `It's no big deal.`, `Let's meet up.`, `I'm busy.`], s: `It's not my fault, la frase di Dan nel dialogo.` },
  ],

  /* niente interrogazione a voce: il riconoscimento vocale è in italiano */
  interrogazione: [],
}
