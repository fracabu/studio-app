/* Lezione di grammatica: il verbo (persona, modo, tempo, coniugazioni) e gli ausiliari essere e avere,
 * per i compiti del 23/11: "Studiare pp. 74-75 + 79 + 82, 83, 84" e "Interrogazione + gara dei verbi
 * (essere e avere)".
 * Fonte: Le parole per dirlo, volume unico (Edizioni Scolastiche Bruno Mondadori / Sanoma), Morfologia,
 * unità 2 Il verbo: §3 La persona e il numero e §4 Il modo (M74), §5 Il tempo (M75), §6 La coniugazione
 * (M79), §7 I verbi ausiliari essere e avere (M82), tavole di essere (M83) e avere (M84).
 * Le pagine del libro hanno la lettera M davanti (M74); il compito le chiama 74, 75… Nel lettore Sanoma
 * il libro non ha «Versione accessibile»: si legge a pagina singola, 160%.
 * Teoria riscritta con parole nostre ed esempi nostri; le coniugazioni di essere e avere sono quelle
 * dell'italiano. Esercizi, quiz e interrogazione nostri. */
window.LEZIONE = {
  id: 'grammatica-verbo-essere-avere',
  materia: 'Grammatica',
  titolo: 'Il verbo: modi, tempi ed essere e avere',
  argomento: 'persona, numero, modo e tempo del verbo, le tre coniugazioni e i verbi ausiliari essere e avere',
  pagine: 'M74–75, M79, M82–84',
  sezioni: ['scheda', 'esercizi', 'quiz', 'interroga'],

  schede: [
    {
      id: 's1', titolo: 'La persona e il numero', pag: 'M74',
      html: `<p>La <span class="evid">persona</span> dice <b>chi</b> fa l'azione. Le persone sono <b>sei</b>: tre al <b>singolare</b> e tre al <b>plurale</b> (il <span class="evid">numero</span>).</p>
<table>
<tr><td><b>persona</b></td><td><b>singolare</b></td><td><b>plurale</b></td></tr>
<tr><td>1ª</td><td>io cant<b>o</b></td><td>noi cant<b>iamo</b></td></tr>
<tr><td>2ª</td><td>tu cant<b>i</b></td><td>voi cant<b>ate</b></td></tr>
<tr><td>3ª</td><td>lui, lei cant<b>a</b></td><td>loro cant<b>ano</b></td></tr>
</table>
<p>La parte che cambia alla fine è la <b>desinenza</b>: basta lei per capire la persona.</p>
<div class="attento">📌 Per questo in italiano il pronome soggetto (io, tu, lui…) spesso <b>non si dice</b>: «Cantiamo» vuol dire già «noi cantiamo». In inglese invece serve sempre: <i>we sing</i>.</div>`,
    },
    {
      id: 's2', titolo: 'Il modo', pag: 'M74–75',
      html: `<p>Il <span class="evid">modo</span> dice <b>come</b> chi parla presenta l'azione: come una cosa sicura, possibile, desiderata o come un ordine.</p>
<ul><li><b>fatto certo</b> → indicativo: <i>Sbrigo <b>gioca</b> a basket.</i></li>
<li><b>fatto possibile, sperato o temuto</b> → congiuntivo: <i>Spero che <b>vinca</b>.</i></li>
<li><b>fatto che dipende da una condizione</b> → condizionale: <i>Se avessi tempo, <b>giocherei</b>.</i></li>
<li><b>ordine, invito</b> → imperativo: <i><b>Passa</b> la palla!</i></li></ul>
<p>I modi sono <b>sette</b>:</p>
<table>
<tr><td><b>4 modi finiti</b><br><span class="nota">la desinenza fa capire persona e numero</span></td><td>indicativo · congiuntivo · condizionale · imperativo</td></tr>
<tr><td><b>3 modi indefiniti</b><br><span class="nota">la desinenza non dice chi fa l'azione</span></td><td>infinito (<i>giocare</i>) · gerundio (<i>giocando</i>) · participio (<i>giocato</i>)</td></tr>
</table>
<p class="nota">Infinito e participio possono fare da nome o da aggettivo (<i>il <b>mangiare</b></i>, <i>un vaso <b>rotto</b></i>): per questo si chiamano anche <b>forme nominali</b>.</p>`,
    },
    {
      id: 's3', titolo: 'Il tempo', pag: 'M75',
      html: `<p>Il <span class="evid">tempo</span> dice <b>quando</b> succede l'azione, rispetto al momento in cui parli.</p>
<table>
<tr><td><b>presente</b></td><td>succede adesso</td><td><i>Oggi studio.</i></td></tr>
<tr><td><b>passato</b></td><td>è già successo</td><td><i>Ieri studiavo.</i></td></tr>
<tr><td><b>futuro</b></td><td>succederà dopo</td><td><i>Domani studierò.</i></td></tr>
</table>
<ul><li><b>Tutti</b> i modi hanno il presente.</li>
<li>Tutti, <b>tranne l'imperativo</b>, hanno almeno un passato.</li>
<li>Il futuro (semplice e anteriore) c'è <b>solo nell'indicativo</b>.</li></ul>
<p>Guardando la forma, i tempi sono:</p>
<ul><li><span class="evid">semplici</span>: <b>una sola parola</b> → <i>leggo, leggevi, leggerà</i>;</li>
<li><span class="evid">composti</span>: <b>due parole</b>, cioè l'ausiliare (<i>essere</i> o <i>avere</i>) più il participio passato → <i>ho letto, eravamo usciti, sarai arrivato</i>.</li></ul>`,
    },
    {
      id: 's4', titolo: 'Le tre coniugazioni', pag: 'M79',
      html: `<p>La <span class="evid">coniugazione</span> è l'insieme delle forme di un verbo: alla <b>radice</b> si attaccano desinenze diverse per persona, modo e tempo. I verbi italiani si dividono in <b>tre coniugazioni</b>, secondo come finisce l'infinito:</p>
<table>
<tr><td><b>1ª</b></td><td>in <b>-are</b></td><td>guard-<b>a</b>-re → guard<b>a</b>vo</td></tr>
<tr><td><b>2ª</b></td><td>in <b>-ere</b></td><td>legg-<b>e</b>-re → legg<b>e</b>vo</td></tr>
<tr><td><b>3ª</b></td><td>in <b>-ire</b></td><td>part-<b>i</b>-re → part<b>i</b>vo</td></tr>
</table>
<p>La vocale tra radice e desinenza (<b>a</b>, <b>e</b>, <b>i</b>) si chiama <span class="evid">vocale tematica</span>.</p>
<p><b>Come si trova la coniugazione:</b> porta il verbo all'infinito e guarda la fine. <i>Scrivevamo</i> → scrivere → 2ª.</p>
<p>I verbi che seguono il modello sono <b>regolari</b>. Quelli che lo cambiano sono <b>irregolari</b>; può cambiare:</p>
<ul><li>la <b>radice</b>: uscire → <i>esco</i> ma <i>usciamo</i>;</li>
<li>la <b>desinenza</b>: venire → <i>vengo</i>, non «veno»;</li>
<li><b>tutte e due</b>: venire → <i>venni</i> al passato remoto, non «venii».</li></ul>
<p class="nota">In latino le coniugazioni erano quattro: due finivano in -ere, una con la e lunga e una con la e breve.</p>`,
    },
    {
      id: 's5', titolo: 'Gli ausiliari essere e avere', pag: 'M82',
      html: `<p><i>Essere</i> e <i>avere</i> si chiamano <span class="evid">verbi ausiliari</span> (dal latino <i>auxilium</i>, «aiuto») perché <b>aiutano</b> gli altri verbi a formare i <b>tempi composti</b>.</p>
<table>
<tr><td><b>avere</b> si usa con</td><td>i verbi <b>transitivi</b> attivi (hanno un oggetto): <i>ho letto un libro, avevamo vinto la partita</i><br>alcuni verbi <b>intransitivi</b>: <i>ho camminato, avrai riso</i></td></tr>
<tr><td><b>essere</b> si usa con</td><td>molti verbi <b>intransitivi</b>: <i>sono arrivato, siamo partiti</i><br>i verbi <b>riflessivi</b>: <i>mi sono pettinata</i><br>i verbi <b>pronominali</b>: <i>ci siamo arrabbiati</i><br>i verbi <b>impersonali</b>: <i>è successo</i><br>la <b>forma passiva</b>: <i>il libro è letto da tutti</i></td></tr>
</table>
<div class="attento">📌 Essere e avere <b>non sono</b> di nessuna delle tre coniugazioni: hanno una <b>coniugazione propria</b>, tutta loro. Per questo vanno imparati a memoria.</div>`,
    },
    {
      id: 's6', titolo: 'Essere e avere da soli', pag: 'M82–83',
      html: `<p>Essere e avere possono anche stare <b>da soli</b>, con un significato loro.</p>
<table>
<tr><td><b>avere</b> = possedere</td><td><i>Ho un pallone nuovo.</i></td></tr>
<tr><td><b>avere</b> = ricevere, ottenere</td><td><i>Avrete un bel voto.</i></td></tr>
<tr><td><b>avere</b> = sentire, provare</td><td><i>Ho fame. Aveva paura del buio.</i></td></tr>
<tr><td><b>essere</b> = esserci, esistere</td><td><i>In frigo c'è il latte.</i></td></tr>
<tr><td><b>essere</b> = stare, trovarsi</td><td><i>Marta è in palestra.</i></td></tr>
<tr><td><b>essere</b> = appartenere</td><td><i>Lo zaino è di Luca.</i></td></tr>
<tr><td><b>essere</b> = essere fatto di</td><td><i>Il tavolo è di legno.</i></td></tr>
<tr><td><b>essere</b> = venire da</td><td><i>Mia nonna è di Bari.</i></td></tr>
<tr><td><b>essere</b> = avvenire</td><td><i>Sabato c'è la festa.</i></td></tr>
</table>
<p><b>Essere copula:</b> quando collega il soggetto a un nome o a un aggettivo che dice com'è o che cos'è: <i>Sbrigo <b>è</b> simpatico. Il cielo <b>è</b> grigio.</i></p>
<p><b>Trucco:</b> c'è dopo un participio passato (<i>ho <u>mangiato</u></i>, <i>sono <u>uscito</u></i>)? Allora è ausiliare. Altrimenti ha un significato suo.</p>`,
    },
    {
      id: 's7', titolo: "Essere e avere: l'indicativo", pag: 'M83–84',
      html: `<table>
<tr><td><b>tempo</b></td><td><b>essere</b></td><td><b>avere</b></td></tr>
<tr><td>presente</td><td>io sono, tu sei, lui è, noi siamo, voi siete, loro sono</td><td>io ho, tu hai, lui ha, noi abbiamo, voi avete, loro hanno</td></tr>
<tr><td>imperfetto</td><td>ero, eri, era, eravamo, eravate, erano</td><td>avevo, avevi, aveva, avevamo, avevate, avevano</td></tr>
<tr><td>passato remoto</td><td>fui, fosti, fu, fummo, foste, furono</td><td>ebbi, avesti, ebbe, avemmo, aveste, ebbero</td></tr>
<tr><td>futuro semplice</td><td>sarò, sarai, sarà, saremo, sarete, saranno</td><td>avrò, avrai, avrà, avremo, avrete, avranno</td></tr>
<tr><td>passato prossimo</td><td>sono stato/a, sei stato/a… siamo stati/e</td><td>ho avuto, hai avuto… abbiamo avuto</td></tr>
<tr><td>trapassato prossimo</td><td>ero stato/a, eri stato/a…</td><td>avevo avuto, avevi avuto…</td></tr>
<tr><td>trapassato remoto</td><td>fui stato/a, fosti stato/a…</td><td>ebbi avuto, avesti avuto…</td></tr>
<tr><td>futuro anteriore</td><td>sarò stato/a, sarai stato/a…</td><td>avrò avuto, avrai avuto…</td></tr>
</table>
<p><b>Come sono fatti i composti:</b> essere usa sé stesso come ausiliare (<i>sono <b>stato</b></i>), avere usa sé stesso (<i>ho <b>avuto</b></i>). Il tempo dell'ausiliare decide il nome: presente → passato prossimo, imperfetto → trapassato prossimo, passato remoto → trapassato remoto, futuro → futuro anteriore.</p>
<div class="attento">⚠️ Con essere il participio si accorda: <i>Anna è stata</i>, <i>noi siamo stati</i>. Con avere no: <i>Anna ha avuto</i>.<br>⚠️ Ho, hai, ha, hanno vogliono l'<b>h</b>: senza h sono altre parole (o, ai, a, anno). <b>È</b> verbo ha l'accento; <b>e</b> senza accento vuol dire «e poi».</div>`,
    },
    {
      id: 's8', titolo: 'Congiuntivo, condizionale, imperativo e modi indefiniti', pag: 'M83–84',
      html: `<table>
<tr><td><b>modo e tempo</b></td><td><b>essere</b></td><td><b>avere</b></td></tr>
<tr><td>congiuntivo presente</td><td>che io sia, tu sia, lui sia, noi siamo, voi siate, loro siano</td><td>che io abbia, tu abbia, lui abbia, noi abbiamo, voi abbiate, loro abbiano</td></tr>
<tr><td>congiuntivo imperfetto</td><td>che io fossi, tu fossi, lui fosse, noi fossimo, voi foste, loro fossero</td><td>che io avessi, tu avessi, lui avesse, noi avessimo, voi aveste, loro avessero</td></tr>
<tr><td>congiuntivo passato e trapassato</td><td>che io sia stato/a · che io fossi stato/a</td><td>che io abbia avuto · che io avessi avuto</td></tr>
<tr><td>condizionale presente</td><td>sarei, saresti, sarebbe, saremmo, sareste, sarebbero</td><td>avrei, avresti, avrebbe, avremmo, avreste, avrebbero</td></tr>
<tr><td>condizionale passato</td><td>sarei stato/a, saresti stato/a…</td><td>avrei avuto, avresti avuto…</td></tr>
<tr><td>imperativo</td><td><b>sii</b> tu, sia lui, siamo noi, <b>siate</b> voi, siano loro</td><td><b>abbi</b> tu, abbia lui, abbiamo noi, <b>abbiate</b> voi, abbiano loro</td></tr>
<tr><td>infinito</td><td>essere · essere stato</td><td>avere · avere avuto</td></tr>
<tr><td>participio</td><td>(essente, ente) · stato</td><td>avente · avuto</td></tr>
<tr><td>gerundio</td><td>essendo · essendo stato</td><td>avendo · avendo avuto</td></tr>
</table>
<ul><li>All'imperativo solo <b>sii, siate</b> e <b>abbi, abbiate</b> sono forme vere dell'imperativo; le altre persone prendono in prestito il congiuntivo presente.</li>
<li><i>Essente</i> si usa solo in filosofia; <i>avente</i> quasi solo nelle carte ufficiali. Il trapassato remoto si usa poco.</li></ul>
<div class="attento">⚠️ Errori da gara: «che io <s>abbi</s>» → <b>che io abbia</b> · «se io <s>sarei</s>» → <b>se io fossi</b> · «voi <s>fuste</s>» → <b>voi foste</b> · «noi <s>avessimo</s>» con due s, ma «noi <b>avemmo</b>» con due m.</div>`,
    },
    {
      id: 's9', titolo: 'Come prepararsi alla gara dei verbi', pag: 'M83–84',
      html: `<p>Alla gara la prof dice un modo, un tempo e una persona, e vince chi risponde giusto e veloce. Si prepara così:</p>
<ol><li><b>Sempre lo stesso ordine</b>: io, tu, lui, noi, voi, loro. Ripeti ogni tempo a voce, prima essere e poi avere.</li>
<li><b>Un tempo alla volta</b>: prima l'indicativo (scheda 7), poi congiuntivo, condizionale e imperativo (scheda 8). Copri la tabella e controlla.</li>
<li><b>Salto della persona</b>: allenati a rispondere senza ripartire da «io». Chiediti: passato remoto, voi? → <i>foste</i> (essere), <i>aveste</i> (avere).</li>
<li><b>I composti si costruiscono</b>: ausiliare al tempo giusto + <i>stato</i> o <i>avuto</i>. Se sai i tempi semplici, sai anche i composti.</li>
<li><b>Il «se»</b>: dopo <i>se</i> ci va il congiuntivo imperfetto, mai il condizionale. <i>Se fossi</i>… <i>se avessi</i>…</li></ol>
<p class="nota">Nella sezione Interrogazione ci sono domande a voce su tutta la lezione; negli esercizi 7, 8 e 9 trovi l'allenamento per la gara.</p>`,
    },
  ],

  esercizi: [
    {
      titolo: 'Persona e numero',
      testo: 'Scrivi persona e numero del verbo (il soggetto non c\'è: lo dice la desinenza).<br>a) Leggevamo un fumetto.<br>b) Dormirai da tua nonna?<br>c) Cantano nel coro.<br>d) Ieri scrissi una lettera.<br>e) Partirete alle otto.<br>f) Avete fame?',
      metodo: 'Scheda 1: guarda la fine del verbo e chiediti quale pronome ci va davanti (io, tu, lui, noi, voi, loro).',
      soluzione: 'a) <b>1ª plurale</b> (noi) · b) <b>2ª singolare</b> (tu) · c) <b>3ª plurale</b> (loro) · d) <b>1ª singolare</b> (io) · e) <b>2ª plurale</b> (voi) · f) <b>2ª plurale</b> (voi)',
    },
    {
      titolo: 'Che modo è?',
      testo: 'Sottolinea il verbo e scrivi il modo.<br>a) Domani pioverà.<br>b) Chiudi la finestra!<br>c) Spero che tu stia bene.<br>d) Mi piacerebbe un gelato.<br>e) Studiare la sera è faticoso.<br>f) Sono caduto correndo.<br>g) Il vaso rotto è sul tavolo.',
      metodo: 'Scheda 2: fatto sicuro → indicativo; speranza o dubbio, spesso dopo «che» → congiuntivo; desiderio o condizione → condizionale; ordine → imperativo. Se la forma non dice chi fa l\'azione, è un modo indefinito: -are/-ere/-ire infinito, -ando/-endo gerundio, -ato/-uto/-ito participio.',
      soluzione: 'a) pioverà: <b>indicativo</b> · b) chiudi: <b>imperativo</b> · c) spero: indicativo; stia: <b>congiuntivo</b> · d) piacerebbe: <b>condizionale</b> · e) studiare: <b>infinito</b>; è: indicativo · f) sono caduto: indicativo; correndo: <b>gerundio</b> · g) rotto: <b>participio</b>; è: indicativo',
    },
    {
      titolo: 'Semplice o composto? Che tempo è?',
      testo: 'a) avevamo mangiato<br>b) partirò<br>c) sono uscita<br>d) giocavano<br>e) avrete finito<br>f) lessi',
      metodo: 'Scheda 3: una parola → semplice; due parole (ausiliare + participio) → composto. Per il nome del tempo composto guarda il tempo dell\'ausiliare (scheda 7).',
      soluzione: 'a) <b>composto</b>, trapassato prossimo · b) <b>semplice</b>, futuro semplice · c) <b>composto</b>, passato prossimo · d) <b>semplice</b>, imperfetto · e) <b>composto</b>, futuro anteriore · f) <b>semplice</b>, passato remoto',
    },
    {
      titolo: 'A quale coniugazione?',
      testo: 'Scrivi l\'infinito e la coniugazione.<br>a) temevo<br>b) sentirono<br>c) mangiamo<br>d) prendesti<br>e) finirete<br>f) tornavi',
      metodo: 'Scheda 4: riporta il verbo all\'infinito e guarda la fine: -are 1ª, -ere 2ª, -ire 3ª.',
      soluzione: 'a) temere, <b>2ª</b> · b) sentire, <b>3ª</b> · c) mangiare, <b>1ª</b> · d) prendere, <b>2ª</b> · e) finire, <b>3ª</b> · f) tornare, <b>1ª</b>',
    },
    {
      titolo: 'Essere o avere? Il passato prossimo',
      testo: 'a) Ieri Sbrigo (vincere) ______ la partita.<br>b) Le mie sorelle (arrivare) ______ tardi.<br>c) Io (lavarsi) ______ le mani.<br>d) Noi (leggere) ______ un libro giallo.<br>e) Il gatto (salire) ______ sul tetto.<br>f) Voi (arrabbiarsi) ______ per niente.<br>g) Tu (dormire) ______ bene?',
      metodo: 'Scheda 5: c\'è un oggetto (vincere <i>la partita</i>)? → avere. Verbo di movimento come arrivare o salire, o verbo con mi, ti, si, ci, vi → essere. Con essere accorda il participio con il soggetto.',
      soluzione: 'a) <b>ha vinto</b> · b) <b>sono arrivate</b> · c) <b>mi sono lavato</b> (o lavata) · d) <b>abbiamo letto</b> · e) <b>è salito</b> · f) <b>vi siete arrabbiati</b> · g) <b>hai dormito</b>',
    },
    {
      titolo: 'Ausiliare o significato proprio?',
      testo: 'Per ogni frase scrivi: <b>ausiliare</b>, <b>copula</b> o il <b>significato</b> del verbo.<br>a) Ho una bici nuova.<br>b) Ho mangiato tardi.<br>c) Marta è in palestra.<br>d) Siamo partiti presto.<br>e) Il tavolo è di legno.<br>f) Il cielo è nuvoloso.<br>g) Hai paura del buio?<br>h) C\'è un gatto in giardino.',
      metodo: 'Scheda 6: dopo il verbo c\'è un participio passato? → ausiliare. C\'è un aggettivo o un nome che dice com\'è il soggetto? → copula. Altrimenti prova a sostituire: possedere, provare, trovarsi, essere fatto di, esserci.',
      soluzione: 'a) <b>possedere</b> · b) <b>ausiliare</b> · c) <b>trovarsi</b> · d) <b>ausiliare</b> · e) <b>essere fatto di</b> · f) <b>copula</b> · g) <b>provare</b> · h) <b>esserci, esistere</b>',
    },
    {
      titolo: 'Allenamento per la gara: essere',
      testo: 'a) indicativo passato remoto, noi: ______<br>b) congiuntivo imperfetto, voi: ______<br>c) condizionale presente, loro: ______<br>d) futuro anteriore, tu: ______<br>e) congiuntivo presente, io: ______<br>f) imperativo, voi: ______<br>g) indicativo imperfetto, noi: ______<br>h) gerundio passato: ______',
      metodo: 'Schede 7 e 8. Ripeti a mente il tempo da «io» fino alla persona che serve, poi prova a saltarci direttamente. Per i composti: ausiliare essere al tempo giusto + stato.',
      soluzione: 'a) <b>fummo</b> · b) <b>(che voi) foste</b> · c) <b>sarebbero</b> · d) <b>sarai stato/a</b> · e) <b>(che io) sia</b> · f) <b>siate</b> · g) <b>eravamo</b> · h) <b>essendo stato</b>',
    },
    {
      titolo: 'Allenamento per la gara: avere',
      testo: 'a) indicativo passato remoto, loro: ______<br>b) congiuntivo presente, noi: ______<br>c) condizionale passato, io: ______<br>d) congiuntivo imperfetto, tu: ______<br>e) imperativo, tu: ______<br>f) futuro semplice, voi: ______<br>g) trapassato prossimo, lei: ______<br>h) participio passato: ______',
      metodo: 'Schede 7 e 8. Attenzione al passato remoto, che alterna ebb- e av-: ebbi, avesti, ebbe, avemmo, aveste, ebbero.',
      soluzione: 'a) <b>ebbero</b> · b) <b>(che noi) abbiamo</b> · c) <b>avrei avuto</b> · d) <b>(che tu) avessi</b> · e) <b>abbi</b> · f) <b>avrete</b> · g) <b>aveva avuto</b> · h) <b>avuto</b>',
    },
    {
      titolo: "Trova l'errore",
      testo: 'In ogni frase c\'è un verbo sbagliato: correggilo.<br>a) Penso che io abbi ragione.<br>b) Se io sarei ricco, comprerei un canestro.<br>c) Voi fuste bravissimi alla recita.<br>d) I miei cugini ebbiro un premio.<br>e) Luca, abbiate pazienza!<br>f) Spero che voi siete contenti.<br>g) Il mio amico a vinto la gara.',
      metodo: 'Scheda 8, riquadro degli errori da gara, e scheda 7 per l\'h. Per l\'imperativo guarda a quante persone si parla.',
      soluzione: 'a) <b>abbia</b> · b) <b>fossi</b> · c) <b>foste</b> · d) <b>ebbero</b> · e) <b>abbi</b> (si parla a Luca solo) · f) <b>siate</b> · g) <b>ha</b> vinto',
    },
  ],

  quiz: [
    { d: 'Quante sono le persone del verbo?', r: ['6', '3', '4', '7'], s: 'Tre al singolare (io, tu, lui) e tre al plurale (noi, voi, loro).' },
    { d: 'Quanti sono i modi del verbo?', r: ['7', '4', '3', '6'], s: 'Quattro finiti e tre indefiniti.' },
    { d: 'Quale di questi modi è indefinito?', r: ['Gerundio', 'Congiuntivo', 'Condizionale', 'Imperativo'], s: 'I modi indefiniti sono infinito, gerundio e participio: non dicono chi fa l\'azione.' },
    { d: '«Passa la palla!» è al modo…', r: ['imperativo', 'indicativo', 'congiuntivo', 'infinito'], s: 'È un ordine: imperativo.' },
    { d: 'Il futuro esiste solo nel modo…', r: ['indicativo', 'congiuntivo', 'condizionale', 'imperativo'], s: 'Futuro semplice e futuro anteriore sono solo dell\'indicativo.' },
    { d: '«Avevamo mangiato» è un tempo…', r: ['composto', 'semplice', 'indefinito', 'futuro'], s: 'Due parole: ausiliare + participio passato.' },
    { d: '«Dormire» è della…', r: ['terza coniugazione', 'prima coniugazione', 'seconda coniugazione', 'coniugazione propria'], s: 'Infinito in -ire: terza.' },
    { d: 'La vocale tematica di «temere» è…', r: ['e', 'a', 'i', 'o'], s: 'tem-e-re: è un verbo della seconda.' },
    { d: 'Essere e avere si chiamano ausiliari perché…', r: ['aiutano a formare i tempi composti', 'sono irregolari', 'sono i verbi più usati', 'non hanno il passato'], s: 'Auxilium in latino vuol dire aiuto.' },
    { d: 'Passato prossimo di «arrivare», io (Sbrigo):', r: ['sono arrivato', 'ho arrivato', 'fui arrivato', 'sono arrivare'], s: 'Arrivare è un verbo di movimento intransitivo: vuole essere.' },
    { d: 'Indicativo passato remoto di essere, noi:', r: ['fummo', 'fossimo', 'siamo stati', 'fumo'], s: 'Fui, fosti, fu, fummo, foste, furono.' },
    { d: 'Congiuntivo presente di avere, io:', r: ['che io abbia', 'che io abbi', 'che io avessi', 'che io ho'], s: 'Che io abbia, che tu abbia, che lui abbia. «Abbi» è l\'imperativo.' },
    { d: 'Imperativo di essere, tu:', r: ['sii', 'sia', 'sei', 'siate'], s: 'Sii gentile! Siate è per voi.' },
    { d: 'In «Il gatto è nero», essere è…', r: ['copula', 'ausiliare', 'stare, trovarsi', 'esistere'], s: 'Collega il soggetto (il gatto) a un aggettivo (nero).' },
    { d: 'In «Ho un cane», avere vuol dire…', r: ['possedere', 'è un ausiliare', 'provare', 'ricevere'], s: 'Non c\'è un participio dopo: ha il significato suo, possedere.' },
    { d: 'Condizionale presente di avere, loro:', r: ['avrebbero', 'avessero', 'avranno', 'avrebbero avuto'], s: 'Avrei, avresti, avrebbe, avremmo, avreste, avrebbero.' },
    { d: 'Gerundio passato di essere:', r: ['essendo stato', 'essendo', 'avendo stato', 'stato essendo'], s: 'Gerundio presente essendo + stato.' },
    { d: '«Se io ___ tempo, verrei.»', r: ['avessi', 'avrei', 'abbia', 'ho'], s: 'Dopo «se» ci va il congiuntivo imperfetto, mai il condizionale.' },
  ],

  interrogazione: [
    { d: 'Che cosa sono la persona e il numero del verbo?', scheda: 's1', minimo: 2,
      concetti: [['chi', 'soggetto'], ['sei', '6'], ['singolar'], ['plural']],
      risposta: 'La persona indica chi fa l\'azione. Le persone sono sei: tre al singolare, io, tu, lui, e tre al plurale, noi, voi, loro. Il numero dice se sono singolari o plurali.' },
    { d: 'Che cosa indica il modo del verbo? Quali sono i modi finiti?', scheda: 's2', minimo: 3,
      concetti: [['punto di vista', 'come', 'certo', 'possibil'], ['indicativ'], ['congiuntiv'], ['condizional'], ['imperativ']],
      risposta: 'Il modo indica il punto di vista con cui viene presentata l\'azione: certa, possibile, desiderata o come un ordine. I modi finiti sono indicativo, congiuntivo, condizionale e imperativo.' },
    { d: 'Quali sono i modi indefiniti e perché si chiamano così?', scheda: 's2', minimo: 3,
      concetti: [['infinit'], ['gerundi'], ['participi'], ['persona', 'desinenz', 'chi']],
      risposta: 'Sono infinito, gerundio e participio. Si chiamano indefiniti perché le loro desinenze non fanno capire la persona e il numero.' },
    { d: 'Che cosa indica il tempo del verbo? Quali sono i tempi fondamentali?', scheda: 's3', minimo: 3,
      concetti: [['momento', 'quando'], ['presente'], ['passato'], ['futuro']],
      risposta: 'Il tempo indica il momento in cui avviene l\'azione. I tempi fondamentali sono tre: presente, passato e futuro.' },
    { d: 'Qual è la differenza tra tempi semplici e tempi composti?', scheda: 's3', minimo: 2,
      concetti: [['una parola', 'sola parola', 'una sola'], ['due parole', 'ausiliar', 'essere o avere'], ['participio']],
      risposta: 'I tempi semplici sono fatti da una sola parola. I tempi composti da due: l\'ausiliare essere o avere e il participio passato.' },
    { d: 'Quante sono le coniugazioni e come si riconoscono?', scheda: 's4', minimo: 3,
      concetti: [['tre', '3'], ['are'], ['ere'], ['ire'], ['infinit', 'vocale tematica']],
      risposta: 'Le coniugazioni sono tre e si riconoscono dall\'infinito: la prima in are, la seconda in ere, la terza in ire.' },
    { d: 'Che cosa sono i verbi ausiliari?', scheda: 's5', minimo: 3,
      concetti: [['essere'], ['avere'], ['aiut'], ['compost']],
      risposta: 'Sono essere e avere. Si chiamano ausiliari perché aiutano gli altri verbi a formare i tempi composti.' },
    { d: 'Quando si usa l\'ausiliare avere e quando l\'ausiliare essere?', scheda: 's5', minimo: 2,
      concetti: [['transitiv'], ['intransitiv'], ['riflessiv', 'pronominal'], ['passiv']],
      risposta: 'Avere si usa con i verbi transitivi attivi e con alcuni intransitivi. Essere con molti verbi intransitivi, con i riflessivi, i pronominali, gli impersonali e nella forma passiva.' },
    { d: 'Essere e avere possono stare anche da soli? Fai un esempio.', scheda: 's6', minimo: 2,
      concetti: [['si', 'significato', 'da soli'], ['possed', 'ho un', 'ho una', 'prova', 'ricev'], ['trova', 'stare', 'esist', 'appartien', 'fatto di', 'copula']],
      risposta: 'Sì, con un significato proprio. Avere può voler dire possedere, come in ho un cane. Essere può voler dire trovarsi, come in Marta è in palestra, oppure fare da copula.' },
    { d: 'Dimmi il presente indicativo del verbo essere.', scheda: 's7', minimo: 3,
      concetti: [['sono'], ['sei'], ['siamo'], ['siete']],
      risposta: 'Io sono, tu sei, lui è, noi siamo, voi siete, loro sono.' },
    { d: 'Dimmi il passato remoto del verbo avere.', scheda: 's7', minimo: 4,
      concetti: [['ebbi'], ['avesti'], ['ebbe'], ['avemmo'], ['aveste'], ['ebbero']],
      risposta: 'Io ebbi, tu avesti, lui ebbe, noi avemmo, voi aveste, loro ebbero.' },
    { d: 'Dimmi il congiuntivo imperfetto del verbo essere.', scheda: 's8', minimo: 4,
      concetti: [['fossi'], ['fosse'], ['fossimo'], ['foste'], ['fossero']],
      risposta: 'Che io fossi, che tu fossi, che lui fosse, che noi fossimo, che voi foste, che loro fossero.' },
  ],
}
