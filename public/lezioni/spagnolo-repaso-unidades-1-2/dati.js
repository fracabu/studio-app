/* Ripasso delle unità 1 e 2 di spagnolo, per i compiti del 20/11 (pag. 65, 66, 67).
 * Fonte: ¡Venga, vamos! Edición verde 1 (DeA Scuola): pag. 65 ¿Sabes evaluarte? (test di 20 domande),
 * pag. 66 Repasamos juntos 1-2 (giorni, mesi, stagioni, famiglia, nazionalità, articoli, maschile e
 * femminile, plurale, dimostrativi, ser e tener, presente, possessivi), pag. 67 Ampliamos juntos
 * (testo "¡Me llamo Paula!", ascolto sulla famiglia, una famiglia inventata da scrivere).
 * Nel lettore HUB Young: page = pagina stampata + 14.
 * Regole riscritte con parole nostre; esercizi e quiz nostri, con parole e frasi diverse da quelle del
 * libro (mai le soluzioni dei compiti). Il testo da leggere è di Sbrigo, non quello di Paula.
 * Lo spagnolo è marcato <span lang="es">…</span>: si tocca e si sente con voce spagnola, e le schede
 * si ascoltano a due voci (node scripts/lezione-audio.mjs spagnolo-repaso-unidades-1-2). Dentro gli
 * span niente entità HTML: la firma del file audio si calcola sul testo.
 * Niente interrogazione a voce: il riconoscimento del microfono è in italiano. */
window.LEZIONE = {
  id: 'spagnolo-repaso-unidades-1-2',
  materia: 'Spagnolo',
  titolo: 'Repaso: unidades 1 y 2',
  argomento: 'il ripasso delle unità 1 e 2: calendario, articoli, maschile e femminile, plurale, verbi, domande',
  pagine: '65–67',
  sezioni: ['scheda', 'esercizi', 'quiz'],

  schede: [
    {
      id: 's1', titolo: 'Giorni, mesi e stagioni', pag: '66',
      html: `<p><b>I giorni:</b> <span lang="es">lunes, martes, miércoles, jueves, viernes, sábado, domingo</span>.</p>
<p><b>I mesi:</b> <span lang="es">enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre</span>.</p>
<p><b>Le stagioni:</b> <span lang="es">la primavera, el verano, el otoño, el invierno</span>.</p>
<ul><li>Giorni e mesi si scrivono con la <b>minuscola</b>, come in italiano.</li>
<li>I giorni sono tutti <b>maschili</b>: <span lang="es">el lunes</span>, <span lang="es">el domingo</span>. "Lunedì vado a scuola" si dice <span lang="es">El lunes voy al colegio</span>, con l'articolo; "il lunedì", cioè tutti i lunedì, <span lang="es">los lunes</span>.</li>
<li>Il fine settimana è <span lang="es">el fin de semana</span>.</li></ul>
<div class="attento">⚠️ Le trappole: estate è <span lang="es">verano</span>, non "estate"; autunno è <span lang="es">otoño</span>, con la ñ. E <span lang="es">sábado</span>, <span lang="es">miércoles</span> hanno l'accento scritto.</div>`,
    },
    {
      id: 's2', titolo: 'Gli articoli', pag: '66',
      html: `<table>
<tr><td></td><td><b>maschile</b></td><td><b>femminile</b></td></tr>
<tr><td>determinativo, singolare</td><td><span lang="es">el</span></td><td><span lang="es">la</span></td></tr>
<tr><td>determinativo, plurale</td><td><span lang="es">los</span></td><td><span lang="es">las</span></td></tr>
<tr><td>indeterminativo, singolare</td><td><span lang="es">un</span></td><td><span lang="es">una</span></td></tr>
<tr><td>indeterminativo, plurale</td><td><span lang="es">unos</span></td><td><span lang="es">unas</span></td></tr>
</table>
<p>Lo spagnolo è più semplice dell'italiano: niente lo, gli, l'. Davanti a qualsiasi parola maschile c'è <span lang="es">el</span>: <span lang="es">el chico, el zapato, el árbol</span>. Al plurale <span lang="es">los</span>: <span lang="es">los zapatos</span>.</p>
<p><span lang="es">Unos</span> e <span lang="es">unas</span> vogliono dire "dei, delle, alcuni": <span lang="es">unos amigos</span>, degli amici.</p>
<div class="attento">⚠️ Alcune parole ingannano: <span lang="es">el día</span>, <span lang="es">el mapa</span>, <span lang="es">el problema</span> finiscono in -a ma sono <b>maschili</b>; <span lang="es">la mano</span> finisce in -o ma è <b>femminile</b>; <span lang="es">la foto</span> è femminile perché è l'accorciamento di fotografía.</div>`,
    },
    {
      id: 's3', titolo: 'Dal maschile al femminile', pag: '66',
      html: `<table>
<tr><td>finisce in <b>-o</b>: diventa <b>-a</b></td><td><span lang="es">el niño alto, la niña alta</span></td></tr>
<tr><td>finisce in <b>consonante</b>: si aggiunge <b>-a</b></td><td><span lang="es">el pintor, la pintora</span> · <span lang="es">español, española</span></td></tr>
<tr><td>finisce in <b>-e</b> o <b>-ista</b>: <b>non cambia</b>, cambia solo l'articolo</td><td><span lang="es">el estudiante, la estudiante</span> · <span lang="es">el artista, la artista</span> · <span lang="es">inteligente</span></td></tr>
<tr><td>parole <b>diverse</b>: vanno imparate</td><td><span lang="es">el padre, la madre</span> · <span lang="es">el rey, la reina</span> · <span lang="es">el toro, la vaca</span></td></tr>
</table>
<p>Quando cambi una frase, cambiano <b>insieme</b> articolo, nome e aggettivo: <span lang="es">el gato negro</span> diventa <span lang="es">la gata negra</span>.</p>
<div class="attento">⚠️ Quando si aggiunge la -a, l'accento scritto sparisce: <span lang="es">portugués, portuguesa</span>; <span lang="es">japonés, japonesa</span>.</div>`,
    },
    {
      id: 's4', titolo: 'Il plurale', pag: '66',
      html: `<table>
<tr><td>finisce in <b>vocale</b>: + <b>s</b></td><td><span lang="es">el libro, los libros</span> · <span lang="es">el café, los cafés</span></td></tr>
<tr><td>finisce in <b>consonante</b>: + <b>es</b></td><td><span lang="es">la ciudad, las ciudades</span> · <span lang="es">la flor, las flores</span></td></tr>
<tr><td>finisce in <b>-z</b>: diventa <b>-ces</b></td><td><span lang="es">el lápiz, los lápices</span> · <span lang="es">feliz, felices</span></td></tr>
<tr><td>finisce in <b>-s</b> e l'accento non è sull'ultima sillaba: <b>non cambia</b></td><td><span lang="es">el martes, los martes</span> · <span lang="es">la crisis, las crisis</span></td></tr>
</table>
<p>Se la parola finisce in <b>-s</b> con l'accento sull'ultima sillaba, si aggiunge -es: <span lang="es">el autobús, los autobuses</span>.</p>
<div class="attento">⚠️ Con -es la parola ha una sillaba in più e l'accento scritto può sparire o comparire: <span lang="es">la canción, las canciones</span> (sparisce); <span lang="es">el examen, los exámenes</span> (compare). La voce resta sulla stessa sillaba.</div>`,
    },
    {
      id: 's5', titolo: 'Il presente dei verbi regolari', pag: '66',
      html: `<p>Si toglie <b>-ar, -er, -ir</b> e si aggiunge la desinenza.</p>
<table>
<tr><td></td><td><b><span lang="es">estudiar</span></b></td><td><b><span lang="es">beber</span></b></td><td><b><span lang="es">escribir</span></b></td></tr>
<tr><td><span lang="es">yo</span></td><td><span lang="es">estudio</span></td><td><span lang="es">bebo</span></td><td><span lang="es">escribo</span></td></tr>
<tr><td><span lang="es">tú</span></td><td><span lang="es">estudias</span></td><td><span lang="es">bebes</span></td><td><span lang="es">escribes</span></td></tr>
<tr><td><span lang="es">él, ella, usted</span></td><td><span lang="es">estudia</span></td><td><span lang="es">bebe</span></td><td><span lang="es">escribe</span></td></tr>
<tr><td><span lang="es">nosotros</span></td><td><span lang="es">estudiamos</span></td><td><span lang="es">bebemos</span></td><td><span lang="es">escribimos</span></td></tr>
<tr><td><span lang="es">vosotros</span></td><td><span lang="es">estudiáis</span></td><td><span lang="es">bebéis</span></td><td><span lang="es">escribís</span></td></tr>
<tr><td><span lang="es">ellos, ellas, ustedes</span></td><td><span lang="es">estudian</span></td><td><span lang="es">beben</span></td><td><span lang="es">escriben</span></td></tr>
</table>
<p class="nota">Un aiuto: <b>-er</b> e <b>-ir</b> sono uguali tranne con nosotros e vosotros: <span lang="es">bebemos, bebéis</span> ma <span lang="es">escribimos, escribís</span>.</p>
<div class="attento">⚠️ Usted e ustedes, il Lei e il Loro di cortesia, vogliono il verbo della terza persona: <span lang="es">Usted estudia mucho</span>.</div>`,
    },
    {
      id: 's6', titolo: 'I verbi riflessivi', pag: '65',
      html: `<p>Sono i verbi che finiscono in <b>-se</b>, come <span lang="es">llamarse</span> (chiamarsi), <span lang="es">apellidarse</span> (avere come cognome), <span lang="es">levantarse</span> (alzarsi), <span lang="es">lavarse</span> (lavarsi). Davanti al verbo va il pronome, come in italiano "mi chiamo".</p>
<table>
<tr><td><span lang="es">yo</span></td><td><b><span lang="es">me</span></b> <span lang="es">llamo</span></td></tr>
<tr><td><span lang="es">tú</span></td><td><b><span lang="es">te</span></b> <span lang="es">llamas</span></td></tr>
<tr><td><span lang="es">él, ella, usted</span></td><td><b><span lang="es">se</span></b> <span lang="es">llama</span></td></tr>
<tr><td><span lang="es">nosotros</span></td><td><b><span lang="es">nos</span></b> <span lang="es">llamamos</span></td></tr>
<tr><td><span lang="es">vosotros</span></td><td><b><span lang="es">os</span></b> <span lang="es">llamáis</span></td></tr>
<tr><td><span lang="es">ellos, ellas, ustedes</span></td><td><b><span lang="es">se</span></b> <span lang="es">llaman</span></td></tr>
</table>
<div class="attento">⚠️ Il pronome di vosotros è <b><span lang="es">os</span></b>, non "vos" e non "se": <span lang="es">os levantáis</span>, vi alzate. E <span lang="es">se</span> serve sia per lui o lei sia per loro: si capisce dal verbo, <span lang="es">se llama</span> o <span lang="es">se llaman</span>.</div>`,
    },
    {
      id: 's7', titolo: 'Ser o tener?', pag: '66',
      html: `<table>
<tr><td></td><td><b><span lang="es">ser</span></b> (essere)</td><td><b><span lang="es">tener</span></b> (avere)</td></tr>
<tr><td><span lang="es">yo</span></td><td><span lang="es">soy</span></td><td><span lang="es">tengo</span></td></tr>
<tr><td><span lang="es">tú</span></td><td><span lang="es">eres</span></td><td><span lang="es">tienes</span></td></tr>
<tr><td><span lang="es">él, ella, usted</span></td><td><span lang="es">es</span></td><td><span lang="es">tiene</span></td></tr>
<tr><td><span lang="es">nosotros</span></td><td><span lang="es">somos</span></td><td><span lang="es">tenemos</span></td></tr>
<tr><td><span lang="es">vosotros</span></td><td><span lang="es">sois</span></td><td><span lang="es">tenéis</span></td></tr>
<tr><td><span lang="es">ellos, ellas, ustedes</span></td><td><span lang="es">son</span></td><td><span lang="es">tienen</span></td></tr>
</table>
<ul><li><b>Ser</b> dice <b>chi sei e come sei</b>: nome, nazionalità, lavoro, aspetto, carattere. <span lang="es">Soy Sbrigo. Es italiana. Somos altos.</span></li>
<li><b>Tener</b> dice <b>cosa hai</b>: oggetti, parenti, animali, e anche età, fame e sonno. <span lang="es">Tengo dos hermanos. Tienes once años. Tenemos hambre.</span></li></ul>
<div class="attento">⚠️ L'età vuole sempre tener: <span lang="es">Tiene doce años</span>. "Es doce años" è sbagliato.</div>`,
    },
    {
      id: 's8', titolo: 'Le parole per fare domande', pag: '65',
      html: `<table>
<tr><td><span lang="es">¿Qué?</span></td><td>che cosa?</td><td><span lang="es">¿Qué estudias?</span></td></tr>
<tr><td><span lang="es">¿Quién? ¿Quiénes?</span></td><td>chi? (una persona, più persone)</td><td><span lang="es">¿Quiénes son esos chicos?</span></td></tr>
<tr><td><span lang="es">¿Cómo?</span></td><td>come?</td><td><span lang="es">¿Cómo te llamas?</span></td></tr>
<tr><td><span lang="es">¿Dónde? ¿De dónde?</span></td><td>dove? da dove?</td><td><span lang="es">¿Dónde vives?</span></td></tr>
<tr><td><span lang="es">¿Cuándo?</span></td><td>quando?</td><td><span lang="es">¿Cuándo es la fiesta?</span></td></tr>
<tr><td><span lang="es">¿Cuánto? ¿Cuántos? ¿Cuántas?</span></td><td>quanto? quanti? quante?</td><td><span lang="es">¿Cuántas primas tienes?</span></td></tr>
<tr><td><span lang="es">¿Cuál?</span></td><td>quale?</td><td><span lang="es">¿Cuál es tu número?</span></td></tr>
<tr><td><span lang="es">¿Por qué?</span></td><td>perché?</td><td><span lang="es">¿Por qué estudias?</span></td></tr>
</table>
<ul><li>Le parole delle domande hanno <b>sempre l'accento</b>, e la domanda si apre con <b>¿</b> e si chiude con <b>?</b>.</li>
<li><span lang="es">Quién</span> va al plurale (<span lang="es">quiénes</span>) quando le persone sono più di una; <span lang="es">cuánto</span> si accorda con la parola dopo: <span lang="es">cuántos años, cuántas hermanas</span>.</li></ul>
<div class="attento">⚠️ <span lang="es">¿Por qué?</span>, staccato e con l'accento, fa la domanda; <span lang="es">porque</span>, attaccato e senza accento, dà la risposta: <span lang="es">¿Por qué no vienes? Porque estoy cansado.</span></div>`,
    },
    {
      id: 's9', titolo: 'In breve: famiglia, nazionalità, dimostrativi, possessivi', pag: '65-67',
      html: `<p>Questi argomenti hanno già una lezione loro: qui c'è solo il promemoria per il ripasso.</p>
<table>
<tr><td><b>famiglia</b></td><td><span lang="es">el abuelo, la abuela, el tío, la tía, el primo, la prima, el sobrino, la sobrina, el nieto, la nieta</span>; ⚠️ <span lang="es">los padres</span> sono i genitori</td></tr>
<tr><td><b>nazionalità</b></td><td><span lang="es">italiano, italiana</span> · <span lang="es">portugués, portuguesa</span> · <span lang="es">canadiense</span> resta uguale; minuscola, come in italiano</td></tr>
<tr><td><b>dimostrativi</b></td><td><span lang="es">aquí</span> → <span lang="es">este, esta</span> · <span lang="es">ahí</span> → <span lang="es">ese, esa</span> · <span lang="es">allí</span> → <span lang="es">aquel, aquella</span></td></tr>
<tr><td><b>possessivi</b></td><td><span lang="es">mi, tu, su, nuestro, vuestro, su</span> (+ s al plurale), senza articolo</td></tr>
</table>
<p class="nota"><span lang="es">El nieto</span> è il nipote del nonno; <span lang="es">el sobrino</span> è il nipote dello zio. In italiano è la stessa parola, in spagnolo no.</p>
<p>Per leggere un testo e rispondere: trova la parola chiave della domanda (<span lang="es">cuándo, cuál, cuántos</span>), cercala nel testo e rispondi con una frase intera, con lo stesso verbo della domanda.</p>`,
    },
  ],

  esercizi: [
    {
      titolo: 'Indovina il giorno, il mese, la stagione',
      testo: `a) <span lang="es">El día que va después del miércoles.</span><br>b) <span lang="es">El mes que va antes de julio.</span><br>c) <span lang="es">El mes que tiene solo 28 o 29 días.</span><br>d) <span lang="es">La estación de la nieve en Italia.</span><br>e) <span lang="es">El primer día de la semana.</span><br>f) <span lang="es">La estación de las flores.</span><br>g) <span lang="es">El último mes del año.</span>`,
      metodo: `Scheda 1: ripeti l'elenco dei giorni o dei mesi a voce, in ordine, e fermati a quello che ti serve. Con le stagioni metti l'articolo.`,
      soluzione: `a) <span lang="es">jueves</span> · b) <span lang="es">junio</span> · c) <span lang="es">febrero</span> · d) <span lang="es">el invierno</span> · e) <span lang="es">lunes</span> · f) <span lang="es">la primavera</span> · g) <span lang="es">diciembre</span>`,
    },
    {
      titolo: 'Metti l\'articolo: el, la, los, las',
      testo: `a) ______ mapa<br>b) ______ ciudad<br>c) ______ días<br>d) ______ mano<br>e) ______ fotos<br>f) ______ problema<br>g) ______ flores<br>h) ______ árbol`,
      metodo: `Scheda 2: decidi se la parola è maschile o femminile e se è una o tante. Attento alle parole che ingannano: día, mapa, problema, mano, foto.`,
      soluzione: `a) <span lang="es">el mapa</span> · b) <span lang="es">la ciudad</span> · c) <span lang="es">los días</span> · d) <span lang="es">la mano</span> · e) <span lang="es">las fotos</span> · f) <span lang="es">el problema</span> · g) <span lang="es">las flores</span> · h) <span lang="es">el árbol</span>`,
    },
    {
      titolo: 'Volgi al femminile',
      testo: `a) <span lang="es">el niño alto</span><br>b) <span lang="es">el pintor famoso</span><br>c) <span lang="es">el estudiante inteligente</span><br>d) <span lang="es">el rey</span><br>e) <span lang="es">el padre portugués</span><br>f) <span lang="es">el señor español</span>`,
      metodo: `Scheda 3: cambia tutto insieme, articolo, nome e aggettivo. Le parole in -e non cambiano; padre e rey sono parole diverse al femminile.`,
      soluzione: `a) <span lang="es">la niña alta</span><br>b) <span lang="es">la pintora famosa</span><br>c) <span lang="es">la estudiante inteligente</span><br>d) <span lang="es">la reina</span><br>e) <span lang="es">la madre portuguesa</span><br>f) <span lang="es">la señora española</span>`,
    },
    {
      titolo: 'Volgi al plurale',
      testo: `a) <span lang="es">el lápiz</span><br>b) <span lang="es">la ciudad</span><br>c) <span lang="es">el autobús</span><br>d) <span lang="es">el martes</span><br>e) <span lang="es">la canción</span><br>f) <span lang="es">el examen</span><br>g) <span lang="es">la flor roja</span><br>h) <span lang="es">el chico feliz</span>`,
      metodo: `Scheda 4: guarda come finisce la parola. Vocale → s; consonante → es; -z → -ces; -s senza accento sull'ultima sillaba → non cambia. Controlla l'accento scritto.`,
      soluzione: `a) <span lang="es">los lápices</span><br>b) <span lang="es">las ciudades</span><br>c) <span lang="es">los autobuses</span><br>d) <span lang="es">los martes</span><br>e) <span lang="es">las canciones</span><br>f) <span lang="es">los exámenes</span><br>g) <span lang="es">las flores rojas</span><br>h) <span lang="es">los chicos felices</span>`,
    },
    {
      titolo: 'Coniuga al presente',
      testo: `a) Yo (estudiar) ______ español.<br>b) Tú (beber) ______ mucha leche.<br>c) Ella (escribir) ______ una carta.<br>d) Nosotros (cantar) ______ en el coro.<br>e) Vosotros (aprender) ______ muy rápido.<br>f) Ellos (abrir) ______ la puerta.`,
      metodo: `Scheda 5: togli -ar, -er, -ir e aggiungi la desinenza della persona. Con vosotros ci vuole l'accento: -áis, -éis, -ís.`,
      soluzione: `a) <span lang="es">Yo estudio español.</span><br>b) <span lang="es">Tú bebes mucha leche.</span><br>c) <span lang="es">Ella escribe una carta.</span><br>d) <span lang="es">Nosotros cantamos en el coro.</span><br>e) <span lang="es">Vosotros aprendéis muy rápido.</span><br>f) <span lang="es">Ellos abren la puerta.</span>`,
    },
    {
      titolo: 'I verbi riflessivi',
      testo: `a) Yo (llamarse) ______ Sbrigo.<br>b) ¿Cómo (apellidarse) ______ tú?<br>c) Mi hermana (lavarse) ______ las manos.<br>d) Nosotros (levantarse) ______ a las siete.<br>e) Vosotros (ducharse) ______ por la mañana.<br>f) Mis primos (llamarse) ______ Juan y Pablo.`,
      metodo: `Scheda 6: prima il pronome giusto (me, te, se, nos, os, se), poi il verbo coniugato come un verbo regolare in -ar.`,
      soluzione: `a) <span lang="es">Yo me llamo Sbrigo.</span><br>b) <span lang="es">¿Cómo te apellidas tú?</span><br>c) <span lang="es">Mi hermana se lava las manos.</span><br>d) <span lang="es">Nosotros nos levantamos a las siete.</span><br>e) <span lang="es">Vosotros os ducháis por la mañana.</span><br>f) <span lang="es">Mis primos se llaman Juan y Pablo.</span>`,
    },
    {
      titolo: 'Ser o tener?',
      testo: `a) Mi madre ______ médica.<br>b) Yo ______ hambre.<br>c) Vosotros ______ italianos, ¿verdad?<br>d) ¿Cuántos años ______ tu hermano?<br>e) Nosotros ______ un perro y dos gatos.<br>f) Sbrigo ______ muy alto y simpático.<br>g) Tú ______ mi mejor amigo.`,
      metodo: `Scheda 7: chi sei e come sei → ser; cosa hai, età, fame → tener. Poi scegli la persona giusta.`,
      soluzione: `a) <span lang="es">Mi madre es médica.</span><br>b) <span lang="es">Yo tengo hambre.</span><br>c) <span lang="es">Vosotros sois italianos, ¿verdad?</span><br>d) <span lang="es">¿Cuántos años tiene tu hermano?</span><br>e) <span lang="es">Nosotros tenemos un perro y dos gatos.</span><br>f) <span lang="es">Sbrigo es muy alto y simpático.</span><br>g) <span lang="es">Tú eres mi mejor amigo.</span>`,
    },
    {
      titolo: 'Trova la parola della domanda',
      testo: `a) ¿______ te llamas? — Me llamo Ana.<br>b) ¿______ vives? — Vivo en Roma.<br>c) ¿______ es tu cumpleaños? — Es el 3 de abril.<br>d) ¿______ hermanos tienes? — Tengo dos.<br>e) ¿______ es esa señora? — Es mi tía.<br>f) ¿______ estudias español? — Porque me gusta mucho.<br>g) ¿______ es tu color preferido? — El azul.`,
      metodo: `Scheda 8: guarda la <b>risposta</b>: un nome, un luogo, una data, un numero, una persona, un motivo? Ti dice quale parola serve. Ricorda l'accento.`,
      soluzione: `a) <span lang="es">Cómo</span> · b) <span lang="es">Dónde</span> · c) <span lang="es">Cuándo</span> · d) <span lang="es">Cuántos</span> · e) <span lang="es">Quién</span> · f) <span lang="es">Por qué</span> · g) <span lang="es">Cuál</span>`,
    },
    {
      titolo: 'Sbrigo si presenta: leggi e rispondi',
      testo: `<span lang="es">¡Hola! Me llamo Sbrigo y mis apellidos son Ruidoso Canasta.</span> <span lang="es">Tengo 312 años, pero soy un espíritu muy joven.</span> <span lang="es">Mi cumpleaños es el 31 de octubre, la noche de Halloween.</span> <span lang="es">Vivo en una casa vieja de Roma con mis padres, mi hermana Nebbia y mi abuelo Tito.</span> <span lang="es">Mi color preferido es el violeta.</span> <span lang="es">La estación que más me gusta es el invierno, porque juego al baloncesto en el gimnasio y no hace calor.</span> <span lang="es">El mes que no soporto es agosto: ¡hace demasiado calor para un fantasma!</span> <span lang="es">Los sábados y los domingos toda la familia come en el jardín y después jugamos un partido.</span><br><br>1) <span lang="es">¿Cómo se apellida Sbrigo?</span><br>2) <span lang="es">¿Cuántos años tiene?</span><br>3) <span lang="es">¿Cuándo es su cumpleaños?</span><br>4) <span lang="es">¿Cuál es su color preferido?</span><br>5) <span lang="es">¿Qué estación le gusta más? ¿Por qué?</span><br>6) <span lang="es">¿Qué mes no soporta?</span><br>7) <span lang="es">¿Cuándo come la familia en el jardín?</span>`,
      metodo: `Scheda 9: trova la parola chiave della domanda, cercala nel testo e rispondi con una frase intera. Nella risposta parli di Sbrigo, quindi il verbo va alla terza persona: tengo diventa tiene.`,
      soluzione: `1) <span lang="es">Se apellida Ruidoso Canasta.</span><br>2) <span lang="es">Tiene 312 años.</span><br>3) <span lang="es">Su cumpleaños es el 31 de octubre.</span><br>4) <span lang="es">Su color preferido es el violeta.</span><br>5) <span lang="es">Le gusta más el invierno, porque juega al baloncesto en el gimnasio y no hace calor.</span><br>6) <span lang="es">No soporta agosto.</span><br>7) <span lang="es">Come en el jardín los sábados y los domingos.</span>`,
    },
    {
      titolo: 'Scrivi tu: presenta una famiglia',
      testo: `Presenta una famiglia, vera o inventata, in 6-8 frasi. Usa queste domande come scaletta:<br>· <span lang="es">¿Cómo se llama? ¿Cuántos años tiene? ¿De dónde es?</span><br>· <span lang="es">¿Cuántos hermanos tiene? ¿Cómo se llaman sus padres?</span><br>· <span lang="es">¿Dónde viven sus abuelos?</span><br>· <span lang="es">¿Cuándo se reúne la familia?</span><br>· <span lang="es">¿Cuál es su mes preferido? ¿Por qué?</span>`,
      metodo: `Una frase per domanda. Controlla: tener per età e parenti, ser per nazionalità e lavoro, possessivi senza articolo (<i>su padre</i>), mesi e nazionalità con la minuscola.`,
      soluzione: `Un esempio, non l'unica risposta giusta:<br><span lang="es">Esta es la familia de mi amiga Carla.</span> <span lang="es">Carla tiene once años y es italiana.</span> <span lang="es">Su padre se llama Marco y es profesor; su madre se llama Elena y es médica.</span> <span lang="es">Carla tiene un hermano mayor, Luca, y una hermana pequeña, Sofía.</span> <span lang="es">Sus abuelos viven en Nápoles.</span> <span lang="es">Los domingos toda la familia come en casa de los abuelos.</span> <span lang="es">Su mes preferido es julio, porque no hay colegio.</span>`,
    },
  ],

  quiz: [
    { d: 'Il giorno dopo <i>jueves</i> è…', r: ['viernes', 'miércoles', 'sábado', 'martes'], s: 'Lunes, martes, miércoles, jueves, viernes: dopo jueves viene viernes.' },
    { d: 'In spagnolo giorni e mesi si scrivono…', r: ['con la minuscola', 'con la maiuscola', 'i giorni minuscoli e i mesi maiuscoli', 'come si vuole'], s: 'Lunes, enero: sempre minuscola, come in italiano.' },
    { d: 'La stagione dopo <i>el verano</i> è…', r: ['el otoño', 'la primavera', 'el invierno', 'la estación'], s: 'Primavera, verano, otoño, invierno.' },
    { d: 'Quale articolo va con <i>día</i>?', r: ['el', 'la', 'los', 'una'], s: 'Día finisce in -a ma è maschile: el día.' },
    { d: '___ mano', r: ['la', 'el', 'los', 'un'], s: 'Mano finisce in -o ma è femminile: la mano.' },
    { d: 'Il femminile di <i>el pintor</i> è…', r: ['la pintora', 'la pintore', 'la pintriz', 'la pintor'], s: 'Finisce in consonante: si aggiunge -a.' },
    { d: 'Il femminile di <i>un chico inteligente</i> è…', r: ['una chica inteligente', 'una chica inteligenta', 'una chico inteligente', 'una chica inteligento'], s: 'Gli aggettivi in -e non cambiano: cambia solo chico in chica.' },
    { d: 'Il plurale di <i>el lápiz</i> è…', r: ['los lápices', 'los lápizes', 'los lápizs', 'los lápiz'], s: 'La -z diventa -ces.' },
    { d: 'Il plurale di <i>el martes</i> è…', r: ['los martes', 'los marteses', 'los martess', 'las martes'], s: 'Finisce in -s e l\'accento non è sull\'ultima sillaba: non cambia, cambia solo l\'articolo.' },
    { d: 'Il plurale di <i>la canción</i> è…', r: ['las canciones', 'las canciónes', 'las cancións', 'los canciones'], s: 'Si aggiunge -es e l\'accento scritto sparisce: canciones.' },
    { d: 'Yo (estudiar) ___ español.', r: ['estudio', 'estudo', 'estudia', 'estudiamos'], s: 'Con yo la desinenza è -o: estudio.' },
    { d: 'Vosotros (beber) ___ agua.', r: ['bebéis', 'bebáis', 'bebís', 'beben'], s: 'I verbi in -er con vosotros fanno -éis.' },
    { d: 'Ellas (escribir) ___ una carta.', r: ['escriben', 'escribon', 'escriban', 'escribís'], s: 'I verbi in -ir con ellos ed ellas fanno -en.' },
    { d: '¿Cómo ___ tú? (llamarse)', r: ['te llamas', 'se llama', 'me llamo', 'tú llamas'], s: 'Con tú il pronome è te: te llamas.' },
    { d: 'Mis hermanos ___ a las siete. (levantarse)', r: ['se levantan', 'se levanta', 'nos levantamos', 'levantan'], s: 'Loro: pronome se e verbo alla terza plurale, se levantan.' },
    { d: 'Vosotros ___ por la mañana. (ducharse)', r: ['os ducháis', 'se ducháis', 'vos ducháis', 'os duchan'], s: 'Il pronome di vosotros è os.' },
    { d: 'Mi padre ___ médico.', r: ['es', 'tiene', 'está', 'hay'], s: 'Il lavoro dice chi sei: ser.' },
    { d: 'Sbrigo ___ 312 años.', r: ['tiene', 'es', 'hay', 'está'], s: 'L\'età vuole sempre tener.' },
    { d: '¿___ es tu cumpleaños? — El 5 de mayo.', r: ['Cuándo', 'Dónde', 'Cuánto', 'Quién'], s: 'La risposta è una data: cuándo.' },
    { d: '¿___ estudias español? — Porque me gusta.', r: ['Por qué', 'Porque', 'Qué', 'Cuál'], s: 'La domanda vuole por qué, staccato e con l\'accento; la risposta porque.' },
    { d: '___ montañas de allí son muy altas.', r: ['Aquellas', 'Esas', 'Estas', 'Aquellos'], s: 'Allí, lontano, vuole aquel; montañas è femminile plurale: aquellas.' },
    { d: '___ abuela es española. (di noi)', r: ['Nuestra', 'Nuestro', 'La nuestra', 'Nuestras'], s: 'Abuela è femminile singolare: nuestra, senza articolo.' },
  ],

  /* niente interrogazione a voce: il riconoscimento vocale è in italiano */
  interrogazione: [],
}
