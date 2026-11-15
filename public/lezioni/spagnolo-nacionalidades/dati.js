/* Contenuti della lezione di spagnolo: paesi, nazionalità e le regole che servono per i compiti.
 * Fonte: ¡Venga, vamos! Edición verde 1 (DeA Scuola), unità 2: pag. 46-47 (Los países y las nacionalidades,
 * Para dar y pedir información personal), pag. 59 e 62 (Cuaderno de ejercicios: nazionalità, verbi in -ir,
 * interrogativi, verbi riflessivi). Nel lettore HUB Young: page = pagina stampata + 14.
 * Regole riscritte con parole nostre; esercizi e quiz nostri, con frasi diverse da quelle del libro
 * (mai le soluzioni dei compiti).
 * Lo spagnolo è marcato <span lang="es">…</span>: si tocca e si sente con voce spagnola, e le schede
 * si ascoltano a due voci (node scripts/lezione-audio.mjs spagnolo-nacionalidades). Dentro gli span
 * niente entità HTML: la firma del file audio si calcola sul testo.
 * Niente interrogazione a voce: il riconoscimento del microfono è in italiano. */
window.LEZIONE = {
  id: 'spagnolo-nacionalidades',
  materia: 'Spagnolo',
  titolo: 'Países y nacionalidades',
  argomento: 'paesi, nazionalità, verbi in -ir, interrogativi e verbi riflessivi',
  pagine: '46–47, 59, 62',
  sezioni: ['scheda', 'esercizi', 'quiz'],

  schede: [
    {
      id: 's1', titolo: 'Le nazionalità: maschile e femminile', pag: '46',
      html: `<p>In spagnolo le nazionalità si scrivono con la <b>minuscola</b>, come in italiano: <span lang="es">Soy italiano</span>.</p>
<table>
<tr><td>Finisce in <b>-o</b>: la <b>-o</b> diventa <b>-a</b></td><td><span class="formula"><span lang="es">chino</span> → <span lang="es">china</span></span></td></tr>
<tr><td>Finisce in <b>consonante</b>: aggiungi <b>-a</b></td><td><span class="formula"><span lang="es">español</span> → <span lang="es">española</span></span></td></tr>
<tr><td>Finisce in <b>-e</b>, <b>-a</b> o <b>-í</b>: <b>non cambia</b></td><td><span class="formula"><span lang="es">el canadiense, la canadiense</span> · <span lang="es">el belga, la belga</span> · <span lang="es">el marroquí, la marroquí</span></span></td></tr>
</table>
<div class="attento">⚠️ Quando aggiungi una lettera, l'<b>accento sparisce</b>: <span lang="es">portugués</span> → <span lang="es">portuguesa</span>, <span lang="es">alemán</span> → <span lang="es">alemana</span>.</div>`,
    },
    {
      id: 's2', titolo: 'Le nazionalità al plurale', pag: '46',
      html: `<table>
<tr><td>Finisce in <b>vocale</b>: aggiungi <b>-s</b></td><td><span class="formula"><span lang="es">peruano</span> → <span lang="es">peruanos</span> · <span lang="es">canadiense</span> → <span lang="es">canadienses</span></span></td></tr>
<tr><td>Finisce in <b>consonante</b>: aggiungi <b>-es</b></td><td><span class="formula"><span lang="es">español</span> → <span lang="es">españoles</span></span></td></tr>
<tr><td>Finisce in <b>-í</b>: aggiungi <b>-es</b></td><td><span class="formula"><span lang="es">marroquí</span> → <span lang="es">marroquíes</span></span></td></tr>
</table>
<p>Anche qui l'accento sparisce: <span lang="es">japonés</span> → <span lang="es">japoneses</span>.</p>
<p class="nota">Un gruppo misto, maschi e femmine insieme, va al <b>maschile plurale</b>, come in italiano: <span lang="es">Pablo y Lucía son chilenos</span>.</p>`,
    },
    {
      id: 's3', titolo: 'Di dove sei? Dove vivi?', pag: '47',
      html: `<table>
<tr><td><b><span lang="es">¿De dónde eres?</span></b> Di dove sei?</td><td><span lang="es">Soy de Roma.</span> <span lang="es">Soy italiano.</span></td></tr>
<tr><td><b><span lang="es">¿De dónde es usted?</span></b> Di dov'è Lei?</td><td><span lang="es">Soy de Sevilla.</span></td></tr>
<tr><td><b><span lang="es">¿Dónde vives?</span></b> Dove abiti?</td><td><span lang="es">Vivo en Milán.</span></td></tr>
<tr><td><b><span lang="es">¿Me das tu correo electrónico?</span></b> Mi dai la tua e-mail?</td><td><span lang="es">Sí, es…</span></td></tr>
</table>
<ul><li>Con la <b>città</b> o il <b>paese</b>: <span lang="es">soy de</span>. Con la <b>nazionalità</b>: <span lang="es">soy</span> e basta.</li>
<li><span lang="es">Usted</span> è il "Lei" di cortesia: vuole il verbo alla terza persona, <span lang="es">es</span>, <span lang="es">vive</span>.</li></ul>
<p class="nota">Un indirizzo e-mail si legge così: la chiocciola è <span lang="es">arroba</span>, il punto è <span lang="es">punto</span>, il trattino basso è <span lang="es">guion bajo</span>, il trattino è <span lang="es">guion</span>.</p>`,
    },
    {
      id: 's4', titolo: 'Il presente dei verbi in -ir', pag: '62',
      html: `<p>La terza coniugazione finisce in <b>-ir</b>. Esempio: <b><span lang="es">vivir</span></b>, cioè vivere, abitare.</p>
<table>
<tr><td><span lang="es">yo</span></td><td><b><span lang="es">vivo</span></b></td></tr>
<tr><td><span lang="es">tú</span></td><td><b><span lang="es">vives</span></b></td></tr>
<tr><td><span lang="es">él, ella, usted</span></td><td><b><span lang="es">vive</span></b></td></tr>
<tr><td><span lang="es">nosotros</span></td><td><b><span lang="es">vivimos</span></b></td></tr>
<tr><td><span lang="es">vosotros</span></td><td><b><span lang="es">vivís</span></b></td></tr>
<tr><td><span lang="es">ellos, ellas, ustedes</span></td><td><b><span lang="es">viven</span></b></td></tr>
</table>
<p>Le desinenze sono: <span class="evid"><span lang="es">o, es, e, imos, ís, en</span></span>.</p>
<div class="attento">⚠️ È quasi uguale ai verbi in <b>-er</b>, come <span lang="es">como, comes, come</span>. Cambiano solo <b>nosotros</b>, <span lang="es">comemos</span> ma <span lang="es">vivimos</span>, e <b>vosotros</b>, <span lang="es">coméis</span> ma <span lang="es">vivís</span>.</div>`,
    },
    {
      id: 's5', titolo: 'Le parole per fare domande', pag: '50 e 62',
      html: `<table>
<tr><td><b><span lang="es">¿Qué?</span></b></td><td>che cosa? che?</td></tr>
<tr><td><b><span lang="es">¿Quién?</span> <span lang="es">¿Quiénes?</span></b></td><td>chi? Per una persona o per tante</td></tr>
<tr><td><b><span lang="es">¿Dónde?</span></b></td><td>dove?</td></tr>
<tr><td><b><span lang="es">¿Cuándo?</span></b></td><td>quando?</td></tr>
<tr><td><b><span lang="es">¿Cómo?</span></b></td><td>come?</td></tr>
<tr><td><b><span lang="es">¿Por qué?</span></b></td><td>perché?</td></tr>
<tr><td><b><span lang="es">¿Cuánto? ¿Cuánta? ¿Cuántos? ¿Cuántas?</span></b></td><td>quanto, quanta, quanti, quante? Si accorda con la parola dopo: <span lang="es">¿Cuántas hermanas tienes?</span></td></tr>
</table>
<ul><li>Le parole interrogative hanno <b>sempre l'accento</b>.</li>
<li>La domanda si apre con il punto interrogativo <b>capovolto</b> e si chiude con quello normale.</li>
<li><span lang="es">Quién</span> ha il plurale, in italiano no: <span lang="es">¿Quiénes son esos chicos?</span></li></ul>
<p class="nota">Alla domanda <span lang="es">¿por qué?</span>, staccato e con l'accento, si risponde con <span lang="es">porque</span>, attaccato e senza accento.</p>`,
    },
    {
      id: 's6', titolo: 'I verbi riflessivi', pag: '62',
      html: `<p>Sono i verbi che all'infinito finiscono in <b>-se</b>: <span lang="es">lavarse</span>, lavarsi, e <span lang="es">levantarse</span>, alzarsi. Si coniugano come i verbi normali, ma davanti al verbo va il <b>pronome riflessivo</b>.</p>
<table>
<tr><td><span lang="es">yo</span></td><td><span lang="es">me lavo</span></td></tr>
<tr><td><span lang="es">tú</span></td><td><span lang="es">te lavas</span></td></tr>
<tr><td><span lang="es">él, ella, usted</span></td><td><span lang="es">se lava</span></td></tr>
<tr><td><span lang="es">nosotros</span></td><td><span lang="es">nos lavamos</span></td></tr>
<tr><td><span lang="es">vosotros</span></td><td><span lang="es">os laváis</span></td></tr>
<tr><td><span lang="es">ellos, ellas, ustedes</span></td><td><span lang="es">se lavan</span></td></tr>
</table>
<p>I pronomi sono: <span class="evid"><span lang="es">me, te, se, nos, os, se</span></span>. Attento a <span lang="es">os</span>, per vosotros, che in italiano è "vi".</p>
<p class="nota">Anche "mi chiamo" è un riflessivo: da <span lang="es">llamarse</span> viene <span lang="es">me llamo Sbrigo</span>.</p>`,
    },
  ],

  esercizi: [
    {
      titolo: 'Dal maschile al femminile',
      testo: '<span lang="es">portugués</span> · <span lang="es">chino</span> · <span lang="es">canadiense</span> · <span lang="es">marroquí</span> · <span lang="es">peruano</span> · <span lang="es">inglés</span> · <span lang="es">suizo</span> · <span lang="es">estadounidense</span>',
      metodo: 'Guarda l\'ultima lettera (scheda 1): <b>-o</b> → <b>-a</b>; consonante → aggiungi <b>-a</b> e togli l\'accento; <b>-e</b> e <b>-í</b> non cambiano.',
      soluzione: '<span lang="es">portuguesa</span> · <span lang="es">china</span> · <span lang="es">canadiense</span> · <span lang="es">marroquí</span> · <span lang="es">peruana</span> · <span lang="es">inglesa</span> · <span lang="es">suiza</span> · <span lang="es">estadounidense</span>',
    },
    {
      titolo: 'Al plurale (maschile)',
      testo: '<span lang="es">brasileño</span> · <span lang="es">portugués</span> · <span lang="es">estadounidense</span> · <span lang="es">sueco</span> · <span lang="es">marroquí</span> · <span lang="es">español</span> · <span lang="es">japonés</span>',
      metodo: 'Scheda 2: vocale → <b>-s</b>; consonante o <b>-í</b> → <b>-es</b>. L\'accento sparisce quando la parola si allunga.',
      soluzione: '<span lang="es">brasileños</span> · <span lang="es">portugueses</span> · <span lang="es">estadounidenses</span> · <span lang="es">suecos</span> · <span lang="es">marroquíes</span> · <span lang="es">españoles</span> · <span lang="es">japoneses</span>',
    },
    {
      titolo: 'Completa con la nazionalità',
      testo: 'a) <span lang="es">Cristiano Ronaldo es de Portugal.</span> Es ______.<br>b) <span lang="es">Mis amigas son de Suiza.</span> Son ______.<br>c) <span lang="es">Lionel Messi es de Argentina.</span> Es ______.<br>d) <span lang="es">La señora Chen es de China.</span> Es ______.<br>e) <span lang="es">Mis vecinos son de Canadá.</span> Son ______.<br>f) <span lang="es">Fátima es de Marruecos.</span> Es ______.',
      metodo: 'Prima trova la nazionalità maschile singolare, poi guarda <b>chi</b> è: maschio o femmina? uno o tanti?',
      soluzione: 'a) <b><span lang="es">portugués</span></b> · b) <b><span lang="es">suizas</span></b> · c) <b><span lang="es">argentino</span></b> · d) <b><span lang="es">china</span></b> · e) <b><span lang="es">canadienses</span></b> · f) <b><span lang="es">marroquí</span></b>',
    },
    {
      titolo: 'Verbi in -ir: coniuga al presente',
      testo: 'a) Yo (escribir) ______ un mensaje.<br>b) Nosotros (recibir) ______ muchos regalos.<br>c) ¿Vosotros (subir) ______ al autobús?<br>d) Sbrigo (vivir) ______ en un pueblo pequeño.<br>e) Ellas (describir) ______ su casa.<br>f) Tú (escribir) ______ muy bien.',
      metodo: 'Togli <b>-ir</b> e attacca la desinenza giusta: -o, -es, -e, -imos, -ís, -en (scheda 4). Ricorda l\'accento su <b>-ís</b>.',
      soluzione: 'a) <span lang="es">Yo escribo un mensaje.</span><br>b) <span lang="es">Nosotros recibimos muchos regalos.</span><br>c) <span lang="es">¿Vosotros subís al autobús?</span><br>d) <span lang="es">Sbrigo vive en un pueblo pequeño.</span><br>e) <span lang="es">Ellas describen su casa.</span><br>f) <span lang="es">Tú escribes muy bien.</span>',
    },
    {
      titolo: 'Scegli la parola per la domanda',
      testo: 'a) ¿______ te llamas? — Me llamo Lucía.<br>b) ¿______ vives? — En Valencia.<br>c) ¿______ años tienes? — Doce.<br>d) ¿______ es tu profesor de música? — El señor Gómez.<br>e) ¿______ estudias español? — Porque me gusta.<br>f) ¿______ hermanas tienes? — Dos.<br>g) ¿______ haces el sábado? — Juego al baloncesto.',
      metodo: 'Leggi prima la <b>risposta</b>: dice un nome, un luogo, un numero, un motivo? Per i numeri, <i>cuánto</i> si accorda con la parola dopo (años → <i>cuántos</i>, hermanas → <i>cuántas</i>).',
      soluzione: 'a) <span lang="es">¿Cómo te llamas?</span><br>b) <span lang="es">¿Dónde vives?</span><br>c) <span lang="es">¿Cuántos años tienes?</span><br>d) <span lang="es">¿Quién es tu profesor de música?</span><br>e) <span lang="es">¿Por qué estudias español?</span><br>f) <span lang="es">¿Cuántas hermanas tienes?</span><br>g) <span lang="es">¿Qué haces el sábado?</span>',
    },
    {
      titolo: 'Verbi riflessivi: metti pronome e verbo',
      testo: 'a) Yo (levantarse) ______ a las siete.<br>b) Tú (lavarse) ______ las manos.<br>c) Nosotros (quedarse) ______ en casa.<br>d) Ellas (mirarse) ______ en el espejo.<br>e) Vosotros (cepillarse) ______ los dientes.<br>f) Usted (levantarse) ______ temprano.',
      metodo: 'Prima il <b>pronome</b> (me, te, se, nos, os, se), poi il verbo coniugato senza <i>-se</i> (scheda 6). <i>Usted</i> vuole la 3ª persona.',
      soluzione: 'a) <span lang="es">Yo me levanto a las siete.</span><br>b) <span lang="es">Tú te lavas las manos.</span><br>c) <span lang="es">Nosotros nos quedamos en casa.</span><br>d) <span lang="es">Ellas se miran en el espejo.</span><br>e) <span lang="es">Vosotros os cepilláis los dientes.</span><br>f) <span lang="es">Usted se levanta temprano.</span>',
    },
    {
      titolo: 'Traduci in spagnolo',
      testo: 'a) Di dove sei?<br>b) Dove abita Sbrigo?<br>c) Sono italiana.<br>d) Come si chiama tuo fratello?<br>e) Chi sono quei ragazzi?<br>f) Noi abitiamo a Roma.',
      metodo: 'Usa le domande della scheda 3 e le parole della scheda 5. Ricorda <b>¿</b> all\'inizio della domanda e il pronome riflessivo con <i>llamarse</i>.',
      soluzione: 'a) <span lang="es">¿De dónde eres?</span><br>b) <span lang="es">¿Dónde vive Sbrigo?</span><br>c) <span lang="es">Soy italiana.</span><br>d) <span lang="es">¿Cómo se llama tu hermano?</span><br>e) <span lang="es">¿Quiénes son esos chicos?</span><br>f) <span lang="es">Vivimos en Roma.</span>',
    },
  ],

  quiz: [
    { d: 'Il femminile di <i>chino</i> è…', r: ['china', 'chinesa', 'chino', 'chinas'], s: 'Finisce in -o: la -o diventa -a.' },
    { d: 'Il femminile di <i>portugués</i> è…', r: ['portuguesa', 'portuguésa', 'portugués', 'portuguesia'], s: 'Consonante: aggiungi -a e l\'accento sparisce.' },
    { d: 'Il femminile di <i>canadiense</i> è…', r: ['canadiense', 'canadiensa', 'canadiensi', 'canadiana'], s: 'Le nazionalità in -e non cambiano.' },
    { d: 'Il plurale di <i>inglés</i> è…', r: ['ingleses', 'inglés', 'inglésos', 'inglesas'], s: 'Consonante: aggiungi -es, e l\'accento sparisce.' },
    { d: 'Il plurale di <i>marroquí</i> è…', r: ['marroquíes', 'marroquís', 'marroquí', 'marroquinos'], s: 'Le parole in -í prendono -es.' },
    { d: 'Come si dice "Di dove sei?"', r: ['¿De dónde eres?', '¿Dónde vives?', '¿De donde eres?', '¿Dónde eres de?'], s: 'Ser de + luogo. E "dónde" nella domanda ha sempre l\'accento.' },
    { d: '"Vivo ___ Madrid." Che cosa manca?', r: ['en', 'de', 'a', 'por'], s: 'Con vivir si usa en: vivo en Madrid. Con ser si usa de: soy de Madrid.' },
    { d: 'Nosotros (vivir) …', r: ['vivimos', 'vivemos', 'viven', 'vivís'], s: 'I verbi in -ir con nosotros finiscono in -imos.' },
    { d: 'Vosotros (escribir) …', r: ['escribís', 'escribéis', 'escribes', 'escriben'], s: 'I verbi in -ir con vosotros finiscono in -ís, con l\'accento.' },
    { d: '¿___ chicas hay en tu clase?', r: ['Cuántas', 'Cuántos', 'Cuánto', 'Qué'], s: 'Cuánto si accorda: chicas è femminile plurale, quindi cuántas.' },
    { d: 'Yo ___ levanto a las siete.', r: ['me', 'se', 'te', 'mi'], s: 'Con yo il pronome riflessivo è me.' },
    { d: 'Vosotros ___ laváis las manos.', r: ['os', 'vos', 'se', 'nos'], s: 'Con vosotros il pronome riflessivo è os.' },
  ],

  /* niente interrogazione a voce: il riconoscimento vocale è in italiano */
  interrogazione: [],
}
