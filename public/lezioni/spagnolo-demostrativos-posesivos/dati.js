/* Contenuti della lezione di spagnolo: tener, dimostrativi, possessivi e la famiglia.
 * Fonte: ¡Venga, vamos! Edición verde 1 (DeA Scuola), unità 2: pag. 52-53 (Competencia gramatical:
 * tener, los demostrativos, los adjetivos posesivos), pag. 63-64 (Cuaderno de ejercicios: es. 23-26
 * dimostrativi e possessivi, es. 28 la mail di Valentina sulla famiglia). Nel lettore HUB Young:
 * page = pagina stampata + 14.
 * Regole riscritte con parole nostre; esercizi e quiz nostri, con frasi diverse da quelle del libro
 * (mai le soluzioni dei compiti). La mail dell'esercizio 6 è di Sbrigo, non quella del libro.
 * Lo spagnolo è marcato <span lang="es">…</span>: si tocca e si sente con voce spagnola, e le schede
 * si ascoltano a due voci (node scripts/lezione-audio.mjs spagnolo-demostrativos-posesivos). Dentro gli
 * span niente entità HTML: la firma del file audio si calcola sul testo.
 * Niente interrogazione a voce: il riconoscimento del microfono è in italiano. */
window.LEZIONE = {
  id: 'spagnolo-demostrativos-posesivos',
  materia: 'Spagnolo',
  titolo: 'Demostrativos y posesivos',
  argomento: 'il verbo tener, i dimostrativi, i possessivi e la famiglia',
  pagine: '52–53, 63–64',
  sezioni: ['scheda', 'esercizi', 'quiz'],

  schede: [
    {
      id: 's1', titolo: 'Il verbo tener (avere)', pag: '52',
      html: `<p><b><span lang="es">Tener</span></b> vuol dire <b>avere</b>. È irregolare: in quattro persone la <b>e</b> diventa <b>ie</b>, e con yo diventa <b><span lang="es">tengo</span></b>.</p>
<table>
<tr><td><span lang="es">yo</span></td><td><b><span lang="es">tengo</span></b></td></tr>
<tr><td><span lang="es">tú</span></td><td><b><span lang="es">tienes</span></b></td></tr>
<tr><td><span lang="es">él, ella, usted</span></td><td><b><span lang="es">tiene</span></b></td></tr>
<tr><td><span lang="es">nosotros</span></td><td><b><span lang="es">tenemos</span></b></td></tr>
<tr><td><span lang="es">vosotros</span></td><td><b><span lang="es">tenéis</span></b></td></tr>
<tr><td><span lang="es">ellos, ellas, ustedes</span></td><td><b><span lang="es">tienen</span></b></td></tr>
</table>
<p>Nosotros e vosotros restano regolari: <span class="evid"><span lang="es">tenemos, tenéis</span></span>.</p>
<div class="attento">⚠️ L'età si dice con tener, come in italiano: <span lang="es">Tengo once años</span>, ho undici anni. Anche fame e sonno: <span lang="es">Tengo hambre</span>, <span lang="es">Tengo sueño</span>.</div>`,
    },
    {
      id: 's2', titolo: 'I dimostrativi: vicino, a metà, lontano', pag: '52',
      html: `<p>I dimostrativi indicano <b>quanto è lontano</b> qualcosa da chi parla. In italiano abbiamo "questo" e "quello"; lo spagnolo ha <b>tre</b> distanze.</p>
<table>
<tr><td><b><span lang="es">aquí</span></b>, qui vicino a me</td><td><span class="formula"><span lang="es">este, esta, estos, estas</span></span></td></tr>
<tr><td><b><span lang="es">ahí</span></b>, lì, a metà strada</td><td><span class="formula"><span lang="es">ese, esa, esos, esas</span></span></td></tr>
<tr><td><b><span lang="es">allí</span></b>, laggiù, lontano</td><td><span class="formula"><span lang="es">aquel, aquella, aquellos, aquellas</span></span></td></tr>
</table>
<p>Esempi: <span lang="es">Este libro es de Sbrigo</span> (ce l'ho in mano). <span lang="es">Esa mochila es de Ana</span> (è vicino a te). <span lang="es">Aquel edificio es el colegio</span> (è in fondo alla strada).</p>`,
    },
    {
      id: 's3', titolo: 'I dimostrativi si accordano', pag: '52',
      html: `<p>Il dimostrativo prende il <b>genere</b> e il <b>numero</b> della parola che segue, come in italiano.</p>
<table>
<tr><td></td><td><b>maschile</b></td><td><b>femminile</b></td></tr>
<tr><td>vicino, singolare</td><td><span lang="es">este chico</span></td><td><span lang="es">esta chica</span></td></tr>
<tr><td>vicino, plurale</td><td><span lang="es">estos chicos</span></td><td><span lang="es">estas chicas</span></td></tr>
<tr><td>a metà, singolare</td><td><span lang="es">ese perro</span></td><td><span lang="es">esa casa</span></td></tr>
<tr><td>a metà, plurale</td><td><span lang="es">esos perros</span></td><td><span lang="es">esas casas</span></td></tr>
<tr><td>lontano, singolare</td><td><span lang="es">aquel árbol</span></td><td><span lang="es">aquella montaña</span></td></tr>
<tr><td>lontano, plurale</td><td><span lang="es">aquellos árboles</span></td><td><span lang="es">aquellas montañas</span></td></tr>
</table>
<div class="attento">⚠️ Le trappole: il maschile singolare finisce in <b>-e</b> o in <b>-l</b>, non in -o: <span lang="es">este, ese, aquel</span>. Il maschile plurale invece finisce in <b>-os</b>: <span lang="es">estos, esos, aquellos</span>.</div>
<p class="nota">Un aiuto: le parole del lontano hanno la doppia <b>l</b>, <span lang="es">allí, aquella, aquellos, aquellas</span>. Solo <span lang="es">aquel</span> ne ha una.</p>`,
    },
    {
      id: 's4', titolo: 'Gli aggettivi possessivi', pag: '53',
      html: `<table>
<tr><td><b>di chi?</b></td><td><b>una cosa</b></td><td><b>tante cose</b></td></tr>
<tr><td>mio (<span lang="es">yo</span>)</td><td><span lang="es">mi</span></td><td><span lang="es">mis</span></td></tr>
<tr><td>tuo (<span lang="es">tú</span>)</td><td><span lang="es">tu</span></td><td><span lang="es">tus</span></td></tr>
<tr><td>suo, di lui o di lei, e il Suo di cortesia</td><td><span lang="es">su</span></td><td><span lang="es">sus</span></td></tr>
<tr><td>nostro (<span lang="es">nosotros</span>)</td><td><span lang="es">nuestro, nuestra</span></td><td><span lang="es">nuestros, nuestras</span></td></tr>
<tr><td>vostro (<span lang="es">vosotros</span>)</td><td><span lang="es">vuestro, vuestra</span></td><td><span lang="es">vuestros, vuestras</span></td></tr>
<tr><td>loro (<span lang="es">ellos, ellas</span>)</td><td><span lang="es">su</span></td><td><span lang="es">sus</span></td></tr>
</table>
<ul><li>Il possessivo si accorda con la <b>cosa posseduta</b>, non con chi la possiede: <span lang="es">mis hermanos</span>, i miei fratelli, anche se io sono uno solo.</li>
<li>Solo <b>nuestro</b> e <b>vuestro</b> cambiano tra maschile e femminile: <span lang="es">nuestro tío, nuestra tía</span>.</li>
<li><span lang="es">Su</span> vale per lui, per lei, per il Lei di cortesia e per loro. Si capisce dalla frase.</li></ul>`,
    },
    {
      id: 's5', titolo: 'Possessivi: niente articolo, niente accento', pag: '53',
      html: `<p>Due differenze dall'italiano, che nei compiti fanno sbagliare tutti.</p>
<table>
<tr><td><b>Niente articolo</b> davanti al possessivo</td><td><span class="formula">la mia casa → <span lang="es">mi casa</span></span></td></tr>
<tr><td>Il possessivo sta <b>sempre prima</b> della parola</td><td><span class="formula"><span lang="es">nuestro colegio</span>, mai colegio nuestro</span></td></tr>
</table>
<div class="attento">⚠️ Occhio all'accento: <b><span lang="es">tú</span></b> con l'accento è il pronome, "tu" che fai qualcosa; <b><span lang="es">tu</span></b> senza accento è il possessivo, "il tuo". Esempio: <span lang="es">Tú tienes tu libro</span>, tu hai il tuo libro.</div>
<p class="nota">Lo stesso vale per <span lang="es">él</span>, lui, con l'accento, e <span lang="es">el</span>, l'articolo, senza.</p>`,
    },
    {
      id: 's6', titolo: 'La famiglia e come leggere una mail', pag: '64',
      html: `<table>
<tr><td><span lang="es">el padre, la madre</span></td><td>il padre, la madre</td></tr>
<tr><td><span lang="es">los padres</span></td><td>⚠️ i <b>genitori</b>, non "i padri"</td></tr>
<tr><td><span lang="es">el hermano, la hermana</span></td><td>il fratello, la sorella</td></tr>
<tr><td><span lang="es">el abuelo, la abuela</span></td><td>il nonno, la nonna</td></tr>
<tr><td><span lang="es">el tío, la tía</span> · <span lang="es">el primo, la prima</span></td><td>lo zio, la zia · il cugino, la cugina</td></tr>
<tr><td><span lang="es">mayor</span> · <span lang="es">pequeño</span></td><td>più grande · piccolo</td></tr>
<tr><td><span lang="es">los gemelos</span></td><td>i gemelli</td></tr>
</table>
<p>Per rispondere alle domande su un testo:</p>
<ul><li>Leggi prima la <b>domanda</b> e trova la parola che conta: <span lang="es">cuántos</span> vuole un numero, <span lang="es">cómo se llama</span> un nome, <span lang="es">qué familiar</span> un parente.</li>
<li>Cerca quella informazione nel testo e rispondi con una frase intera, usando <b>lo stesso verbo</b> della domanda: <span lang="es">¿Cuántos años tiene?</span> → <span lang="es">Tiene…</span></li></ul>`,
    },
  ],

  esercizi: [
    {
      titolo: 'Scegli il dimostrativo giusto',
      testo: `a) Esta / Esa mochila es nueva. (aquí)<br>b) ¿Ves estos / aquellos árboles? (allí)<br>c) Ese / Este chico es mi primo. (ahí)<br>d) Esas / Aquellas casas son muy antiguas. (allí)<br>e) Estos / Esos zapatos son de Sbrigo. (ahí)<br>f) Este / Aquel señor es mi abuelo. (aquí)`,
      metodo: `Guarda prima la parola tra parentesi: <b>aquí</b> → este, esta; <b>ahí</b> → ese, esa; <b>allí</b> → aquel, aquella (scheda 2).`,
      soluzione: `a) <b><span lang="es">Esta</span></b> · b) <b><span lang="es">aquellos</span></b> · c) <b><span lang="es">Ese</span></b> · d) <b><span lang="es">Aquellas</span></b> · e) <b><span lang="es">Esos</span></b> · f) <b><span lang="es">Este</span></b>`,
    },
    {
      titolo: 'Completa con il dimostrativo',
      testo: `a) ______ libros son de matemáticas. (aquí)<br>b) ______ chica se llama Marta. (allí)<br>c) ______ balón es de Sbrigo. (ahí)<br>d) ______ ventanas son muy grandes. (ahí)<br>e) ______ perro es muy simpático. (allí)<br>f) ______ fotos son de mi familia. (aquí)`,
      metodo: `Due domande, una dopo l'altra: <b>quanto è lontano?</b> (aquí, ahí, allí) e <b>com'è la parola dopo?</b> maschile o femminile, una o tante (scheda 3).`,
      soluzione: `a) <span lang="es">Estos libros son de matemáticas.</span><br>b) <span lang="es">Aquella chica se llama Marta.</span><br>c) <span lang="es">Ese balón es de Sbrigo.</span><br>d) <span lang="es">Esas ventanas son muy grandes.</span><br>e) <span lang="es">Aquel perro es muy simpático.</span><br>f) <span lang="es">Estas fotos son de mi familia.</span>`,
    },
    {
      titolo: 'Scegli il possessivo giusto',
      testo: `a) Mi / Mis hermanas estudian inglés.<br>b) ¿Dónde está tu / tus mochila?<br>c) Señora López, ¿es esta su / sus casa?<br>d) Vosotros tenéis vuestro / vuestros libros aquí.<br>e) Nuestro / Nuestra abuela tiene 80 años.<br>f) Pedro y Ana viven con su / sus padres.<br>g) Me gusta mucho el tu / tu perro.`,
      metodo: `Guarda la <b>cosa posseduta</b>, la parola dopo il possessivo: è una o sono tante? Con nuestro e vuestro guarda anche se è maschile o femminile. E ricorda: <b>niente articolo</b> (scheda 5).`,
      soluzione: `a) <b><span lang="es">Mis</span></b> · b) <b><span lang="es">tu</span></b> · c) <b><span lang="es">su</span></b> · d) <b><span lang="es">vuestros</span></b> · e) <b><span lang="es">Nuestra</span></b> · f) <b><span lang="es">sus</span></b> · g) <b><span lang="es">tu</span></b>`,
    },
    {
      titolo: 'Completa con il possessivo',
      testo: `a) (yo) ______ padre es médico.<br>b) (tú) ¿Cómo se llaman ______ hermanos?<br>c) (ella) ______ prima vive en Sevilla.<br>d) (nosotros) ______ casa es pequeña.<br>e) (vosotros) ¿Son ______ amigos?<br>f) (ellos) ______ abuelos son peruanos.`,
      metodo: `La persona tra parentesi ti dice <b>quale</b> possessivo (mi, tu, su, nuestro, vuestro, su). La parola dopo ti dice se va al <b>plurale</b> e, per nuestro e vuestro, se va al <b>femminile</b> (scheda 4).`,
      soluzione: `a) <span lang="es">Mi padre es médico.</span><br>b) <span lang="es">¿Cómo se llaman tus hermanos?</span><br>c) <span lang="es">Su prima vive en Sevilla.</span><br>d) <span lang="es">Nuestra casa es pequeña.</span><br>e) <span lang="es">¿Son vuestros amigos?</span><br>f) <span lang="es">Sus abuelos son peruanos.</span>`,
    },
    {
      titolo: 'Il verbo tener',
      testo: `a) Yo ______ dos hermanos.<br>b) ¿Cuántos años ______ tú?<br>c) Mi abuela ______ 70 años.<br>d) Nosotros ______ un gato negro.<br>e) ¿Vosotros ______ clase de música hoy?<br>f) Mis primos ______ una casa en la playa.`,
      metodo: `Scheda 1: <b>tengo, tienes, tiene, tenemos, tenéis, tienen</b>. Ricorda che nosotros e vosotros non prendono la <b>i</b>.`,
      soluzione: `a) <span lang="es">Yo tengo dos hermanos.</span><br>b) <span lang="es">¿Cuántos años tienes tú?</span><br>c) <span lang="es">Mi abuela tiene 70 años.</span><br>d) <span lang="es">Nosotros tenemos un gato negro.</span><br>e) <span lang="es">¿Vosotros tenéis clase de música hoy?</span><br>f) <span lang="es">Mis primos tienen una casa en la playa.</span>`,
    },
    {
      titolo: 'La mail di Sbrigo: leggi e rispondi',
      testo: `<span lang="es">Hola. Me llamo Sbrigo y te escribo para presentarte a mi familia.</span> <span lang="es">En casa vivimos cinco: mi padre, mi madre, mi hermana, mi abuelo y yo.</span> <span lang="es">Mi padre se llama Bruno y tiene 45 años. Mi madre se llama Viola y tiene 42 años. Los dos son italianos.</span> <span lang="es">Mi hermana mayor se llama Nebbia y tiene 15 años.</span> <span lang="es">Mi abuelo Tito tiene 80 años y es argentino.</span> <span lang="es">También tenemos un perro, Rayo. ¡Hasta pronto!</span><br><br>1) <span lang="es">¿Cuántas personas viven en casa de Sbrigo?</span><br>2) <span lang="es">¿Cómo se llama la madre de Sbrigo?</span><br>3) <span lang="es">¿Cuántos años tiene su hermana?</span><br>4) <span lang="es">¿De dónde es el abuelo de Sbrigo?</span><br>5) <span lang="es">¿Cómo se llama el perro?</span>`,
      metodo: `Scheda 6: trova la parola chiave della domanda (cuántas, cómo se llama, de dónde), cercala nel testo e rispondi con una frase intera con lo stesso verbo.`,
      soluzione: `1) <span lang="es">En casa de Sbrigo viven cinco personas.</span><br>2) <span lang="es">Se llama Viola.</span><br>3) <span lang="es">Tiene 15 años.</span><br>4) <span lang="es">Es argentino.</span><br>5) <span lang="es">Se llama Rayo.</span>`,
    },
    {
      titolo: 'Traduci in spagnolo',
      testo: `a) Questo è il mio quaderno.<br>b) Quella ragazza laggiù è mia cugina.<br>c) I miei genitori hanno 40 anni.<br>d) Come si chiama il vostro professore?<br>e) Quei libri lì, vicino a te, sono di Marco.<br>f) Nostra nonna è spagnola.`,
      metodo: `Niente articolo davanti al possessivo; per i dimostrativi scegli la distanza (qui, lì, laggiù). "Genitori" si dice <i>padres</i>.`,
      soluzione: `a) <span lang="es">Este es mi cuaderno.</span><br>b) <span lang="es">Aquella chica es mi prima.</span><br>c) <span lang="es">Mis padres tienen 40 años.</span><br>d) <span lang="es">¿Cómo se llama vuestro profesor?</span><br>e) <span lang="es">Esos libros son de Marco.</span><br>f) <span lang="es">Nuestra abuela es española.</span>`,
    },
  ],

  quiz: [
    { d: 'Come si dice "Ho 11 anni"?', r: ['Tengo 11 años.', 'Soy 11 años.', 'Hay 11 años.', 'Tienes 11 años.'], s: 'L\'età si dice con tener, come "avere" in italiano. E con yo è tengo.' },
    { d: 'Nosotros (tener) …', r: ['tenemos', 'tienemos', 'tenimos', 'tienen'], s: 'Con nosotros tener resta regolare: tenemos.' },
    { d: 'Vosotros (tener) …', r: ['tenéis', 'tienéis', 'tenís', 'tienen'], s: 'Con vosotros niente i: tenéis, con l\'accento.' },
    { d: 'Per una cosa vicina a te, qui (<i>aquí</i>), usi…', r: ['este', 'ese', 'aquel', 'el'], s: 'Aquí va con este, esta, estos, estas.' },
    { d: '___ chicas de allí son mis primas.', r: ['Aquellas', 'Esas', 'Estas', 'Aquellos'], s: 'Allí, lontano, vuole aquel; chicas è femminile plurale, quindi aquellas.' },
    { d: '___ balón de ahí es de Juan.', r: ['Ese', 'Este', 'Aquel', 'Esa'], s: 'Ahí, a metà strada, vuole ese; balón è maschile singolare.' },
    { d: 'Il plurale di <i>aquel</i> è…', r: ['aquellos', 'aquels', 'aquelos', 'aquelles'], s: 'Il singolare è aquel, ma il plurale è aquellos, con due l.' },
    { d: '___ hermanos son altos. (i miei)', r: ['Mis', 'Mi', 'Los mis', 'Míos'], s: 'Hermanos è plurale, quindi mis. E niente articolo davanti.' },
    { d: '"Nostra zia" si dice…', r: ['nuestra tía', 'nuestro tía', 'la nuestra tía', 'nuestras tía'], s: 'Nuestro cambia al femminile: nuestra tía. Niente articolo.' },
    { d: '<i>Su madre</i> può voler dire…', r: ['sua madre o la loro madre', 'solo sua madre', 'solo la loro madre', 'tua madre'], s: 'Su vale per lui, lei, il Lei di cortesia e loro: si capisce dalla frase.' },
    { d: 'Quale frase è giusta?', r: ['Tu casa es muy bonita.', 'La tu casa es muy bonita.', 'Tú casa es muy bonita.', 'Casa tu es muy bonita.'], s: 'Possessivo senza articolo, prima della parola e senza accento: tu casa.' },
    { d: '<i>Mis padres</i> vuol dire…', r: ['i miei genitori', 'i miei padri', 'i miei parenti', 'mio padre'], s: 'Padres sono padre e madre insieme: i genitori.' },
  ],

  /* niente interrogazione a voce: il riconoscimento vocale è in italiano */
  interrogazione: [],
}
