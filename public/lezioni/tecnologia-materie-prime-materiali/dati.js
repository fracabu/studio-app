/* Lezione di tecnologia: materie prime e materiali, per la verifica del 25/11
 * (compito: studiare pag. 22-25, esercizi 1 e 2 di pag. 27, ripasso di tutto il capitolo 1).
 * Libro: Atlas, capitolo 1 «Materie prime e materiali» (pag. 14-27 circa).
 * ⚠️ Scritta SENZA il libro (ebook non ancora attivato, niente foto delle pagine): contenuti del programma
 * di prima media su questo capitolo, con parole nostre. Per questo le schede non hanno il numero di pagina.
 * Quando arrivano le pagine vere: controllare termini e classificazioni (es. «fossile» come origine a parte
 * o dentro «minerale») e mettere `pag` a ogni scheda.
 * Esercizi, quiz e interrogazione sono nostri (gli esercizi 1 e 2 di pag. 27 si fanno sul libro). */
window.LEZIONE = {
  id: 'tecnologia-materie-prime-materiali',
  materia: 'Tecnologia',
  titolo: 'Materie prime e materiali',
  argomento: 'le materie prime, la loro origine, i materiali e le loro proprietà, il riciclo',
  pagine: '14–27',
  sezioni: ['scheda', 'esercizi', 'quiz', 'interroga'],

  schede: [
    {
      id: 's1', titolo: 'Che cos\'è una materia prima', pag: '',
      html: `<p>Ogni oggetto che usiamo è fatto di qualcosa: il banco di <b>legno</b>, la lattina di <b>alluminio</b>, la maglietta di <b>cotone</b>. All'inizio questi materiali erano in <b>natura</b>.</p>
<p>Si chiama <span class="evid">materia prima</span> una sostanza che si trova in natura e che l'uomo prende per <b>trasformarla</b> in qualcos'altro. Il legno di un albero, il petrolio sotto terra, la lana di una pecora sono materie prime.</p>
<div class="attento">📌 «Prima» vuol dire che è il <b>punto di partenza</b>: non è ancora stata lavorata.</div>
<p>Le materie prime fanno parte delle <b>risorse naturali</b>: tutto ciò che la natura ci dà e che serve all'uomo (anche acqua, aria, suolo, sole, vento).</p>`,
    },
    {
      id: 's2', titolo: 'Da dove vengono: l\'origine delle materie prime', pag: '',
      html: `<p>Le materie prime si dividono secondo la loro <b>origine</b>, cioè da dove vengono:</p>
<table>
<tr><td><b>vegetale</b></td><td>dalle <b>piante</b>: legno, cotone, lino, canapa, sughero, gomma naturale (dal caucciù)</td></tr>
<tr><td><b>animale</b></td><td>dagli <b>animali</b>: lana (pecora), seta (baco da seta), pelle e cuoio, latte</td></tr>
<tr><td><b>minerale</b></td><td>dal <b>sottosuolo</b> e dalle rocce: minerali di ferro, rame, alluminio (dalla bauxite), sabbia, argilla, marmo</td></tr>
<tr><td><b>fossile</b></td><td>resti di piante e animali antichissimi trasformati in milioni di anni: <b>petrolio</b>, <b>carbone</b>, <b>gas naturale</b></td></tr>
</table>
<div class="attento">⚠️ Alcuni libri mettono petrolio e carbone dentro le materie prime <b>minerali</b> (perché si estraggono dal sottosuolo). Controlla come li chiama il tuo libro!</div>
<p class="nota">Trucco per ricordarle: chiediti «chi me l'ha dato?». Una pianta → vegetale. Un animale → animale. La terra → minerale.</p>`,
    },
    {
      id: 's3', titolo: 'Rinnovabili o esauribili?', pag: '',
      html: `<p>Non tutte le materie prime durano per sempre.</p>
<table>
<tr><td><b>rinnovabili</b></td><td>si <b>riformano</b> in tempi brevi, se le usiamo con giudizio: il legno (se ripiantiamo gli alberi), il cotone, la lana</td></tr>
<tr><td><b>non rinnovabili</b> (esauribili)</td><td>per formarsi ci vogliono <b>milioni di anni</b>: quando le abbiamo usate, finiscono. Petrolio, carbone, gas, minerali dei metalli</td></tr>
</table>
<div class="attento">📌 Anche una risorsa rinnovabile può finire se la sfruttiamo troppo: se tagliamo un bosco più in fretta di quanto ricresca, il bosco sparisce.</div>
<p>Per questo si parla di <span class="evid">sviluppo sostenibile</span>: usare le risorse oggi senza togliere a chi verrà dopo la possibilità di usarle.</p>`,
    },
    {
      id: 's4', titolo: 'Dalla materia prima al prodotto finito', pag: '',
      html: `<p>Una materia prima non si usa quasi mai così com'è. Passa per tre tappe:</p>
<table>
<tr><td><b>materia prima</b></td><td>come si trova in natura</td><td>tronco d'albero · cotone in fiocchi · minerale di ferro</td></tr>
<tr><td><b>semilavorato</b></td><td>già lavorato, ma non ancora un oggetto da usare</td><td>tavole di legno · filo e tessuto · lamiere d'acciaio</td></tr>
<tr><td><b>prodotto finito</b></td><td>l'oggetto pronto per chi lo usa</td><td>sedia · maglietta · automobile</td></tr>
</table>
<p>Ogni tappa la fa un <b>settore</b> diverso del lavoro:</p>
<ul><li><b>settore primario</b>: prende le materie prime dalla natura (agricoltura, allevamento, pesca, miniere, boschi);</li>
<li><b>settore secondario</b>: le <b>trasforma</b> nelle fabbriche (industria e artigianato);</li>
<li><b>settore terziario</b>: i <b>servizi</b>, come trasportare e vendere i prodotti.</li></ul>
<div class="attento">⚠️ Il semilavorato di un'industria può essere la «materia prima» di un'altra: il tessuto esce dalla tessitura ed entra nella sartoria.</div>`,
    },
    {
      id: 's5', titolo: 'I materiali: naturali, artificiali, sintetici', pag: '',
      html: `<p>Con le materie prime si ottengono i <span class="evid">materiali</span>, quelli con cui si costruiscono gli oggetti. Si dividono in tre gruppi:</p>
<table>
<tr><td><b>naturali</b></td><td>si usano quasi come si trovano in natura, con lavorazioni semplici (tagliare, lucidare)</td><td>legno, pietra, marmo, lana, cotone, sughero</td></tr>
<tr><td><b>artificiali</b></td><td>si ottengono <b>trasformando</b> materie prime naturali, spesso con il calore</td><td>vetro (dalla sabbia), carta (dal legno), ceramica e mattoni (dall'argilla), acciaio (dal ferro)</td></tr>
<tr><td><b>sintetici</b></td><td>non esistono in natura: si creano in <b>laboratorio</b> con reazioni chimiche, soprattutto dal <b>petrolio</b></td><td>plastica, nylon, poliestere</td></tr>
</table>
<p>I materiali si raggruppano anche in <b>famiglie</b>: legno, carta, fibre tessili, metalli, vetro, ceramica, plastica, materiali da costruzione.</p>`,
    },
    {
      id: 's6', titolo: 'Le proprietà chimico-fisiche', pag: '',
      html: `<p>Per scegliere il materiale giusto bisogna conoscere le sue <b>proprietà</b>, cioè come si comporta. Le proprietà <span class="evid">chimico-fisiche</span> dicono com'è fatto il materiale:</p>
<table>
<tr><td><b>peso specifico</b></td><td>quanto pesa a parità di volume: un cubetto di ferro pesa più di uno di legno uguale</td></tr>
<tr><td><b>conducibilità termica</b></td><td>se lascia passare il <b>calore</b>: i metalli sì (conduttori), legno e plastica poco (isolanti). Per questo i manici delle pentole sono di plastica</td></tr>
<tr><td><b>conducibilità elettrica</b></td><td>se lascia passare la <b>corrente</b>: il rame sì, la plastica no. Infatti i fili elettrici sono di rame coperti di plastica</td></tr>
<tr><td><b>dilatazione termica</b></td><td>con il caldo un materiale si <b>allunga</b> un po', con il freddo si accorcia</td></tr>
<tr><td><b>punto di fusione</b></td><td>la temperatura a cui da solido diventa <b>liquido</b></td></tr>
<tr><td><b>resistenza alla corrosione</b></td><td>se resiste all'aria, all'acqua e agli acidi senza rovinarsi: il ferro arrugginisce, l'acciaio inox no</td></tr>
</table>`,
    },
    {
      id: 's7', titolo: 'Le proprietà meccaniche', pag: '',
      html: `<p>Le proprietà <span class="evid">meccaniche</span> dicono come reagisce un materiale quando lo spingiamo, tiriamo, pieghiamo o colpiamo:</p>
<table>
<tr><td><b>durezza</b></td><td>resiste a essere <b>graffiato</b> o inciso: il diamante è il più duro</td></tr>
<tr><td><b>elasticità</b></td><td>si deforma ma poi <b>torna come prima</b>: un elastico, una molla</td></tr>
<tr><td><b>plasticità</b></td><td>si deforma e <b>resta deformato</b>: la plastilina, l'argilla bagnata</td></tr>
<tr><td><b>resistenza</b></td><td>sopporta le forze senza rompersi: a <b>trazione</b> (tirare), <b>compressione</b> (schiacciare), <b>flessione</b> (piegare), <b>torsione</b> (torcere), <b>taglio</b></td></tr>
<tr><td><b>fragilità</b></td><td>si <b>rompe</b> facilmente con un colpo: il vetro</td></tr>
<tr><td><b>tenacità</b></td><td>il contrario della fragilità: resiste agli urti, come l'acciaio</td></tr>
</table>
<div class="attento">⚠️ <b>Duro</b> non vuol dire <b>resistente agli urti</b>! Il vetro è duro (non si graffia facilmente) ma è fragile (con un colpo si rompe).</div>`,
    },
    {
      id: 's8', titolo: 'Le proprietà tecnologiche', pag: '',
      html: `<p>Le proprietà <span class="evid">tecnologiche</span> dicono come si può <b>lavorare</b> un materiale per dargli una forma:</p>
<table>
<tr><td><b>fusibilità</b></td><td>si può <b>fondere</b> e versare in uno stampo (la fusione)</td></tr>
<tr><td><b>malleabilità</b></td><td>si può ridurre in <b>lamine</b> sottili battendolo o schiacciandolo: la carta stagnola è alluminio</td></tr>
<tr><td><b>duttilità</b></td><td>si può tirare in <b>fili</b> sottili: i fili di rame</td></tr>
<tr><td><b>saldabilità</b></td><td>due pezzi si possono <b>unire</b> scaldandoli (saldatura)</td></tr>
<tr><td><b>lavorabilità</b> (truciolabilità)</td><td>si può lavorare con gli <b>utensili</b> (sega, trapano, lima) togliendo trucioli</td></tr>
</table>
<p class="nota">Trucco: <b>m</b>alleabile = la<b>m</b>ine; <b>d</b>uttile = filo (pensa al <b>d</b>ito che tira un filo). Le proprietà meccaniche dicono come <b>reagisce</b>, quelle tecnologiche come si <b>lavora</b>.</p>`,
    },
    {
      id: 's9', titolo: 'Il ciclo di vita e il riciclo', pag: '',
      html: `<p>Ogni prodotto ha un <span class="evid">ciclo di vita</span>: si <b>progetta</b>, si <b>produce</b> (con materie prime ed energia), si <b>usa</b>, e alla fine si <b>butta</b> e diventa un <b>rifiuto</b>.</p>
<p>I rifiuti sono un problema: occupano spazio nelle discariche e possono inquinare. E le materie prime non rinnovabili finiscono. La soluzione è la regola delle <b>4 R</b>:</p>
<table>
<tr><td><b>Riduzione</b></td><td>produrre e comprare meno rifiuti (meno imballaggi, borraccia invece delle bottigliette)</td></tr>
<tr><td><b>Riuso</b></td><td>usare di nuovo un oggetto, anche per un altro scopo</td></tr>
<tr><td><b>Riciclo</b></td><td>trasformare il rifiuto in materia per nuovi oggetti: carta, vetro, plastica, alluminio</td></tr>
<tr><td><b>Recupero</b></td><td>ricavare <b>energia</b> da ciò che non si può riciclare (termovalorizzatori)</td></tr>
</table>
<p>Per riciclare serve la <b>raccolta differenziata</b>: ogni materiale nel suo contenitore. Quando i rifiuti tornano materia prima si parla di <b>economia circolare</b>.</p>
<div class="attento">📌 Alluminio e vetro si possono riciclare <b>all'infinito</b> senza perdere qualità; riciclare l'alluminio fa risparmiare moltissima energia rispetto a produrlo dalla bauxite.</div>`,
    },
  ],

  esercizi: [
    {
      titolo: 'Che origine ha?',
      testo: `Scrivi accanto a ogni materia prima se è di origine <b>vegetale</b>, <b>animale</b>, <b>minerale</b> o <b>fossile</b>.<br>a) lana ______<br>b) cotone ______<br>c) petrolio ______<br>d) sabbia ______<br>e) seta ______<br>f) sughero ______<br>g) bauxite ______<br>h) carbone ______<br>i) cuoio ______<br>l) argilla ______`,
      metodo: `Chiediti «chi me l'ha dato?»: una pianta, un animale o la terra. Petrolio e carbone vengono da resti antichissimi (scheda 2).`,
      soluzione: `a) animale · b) vegetale · c) fossile (o minerale, dipende dal libro) · d) minerale · e) animale · f) vegetale · g) minerale · h) fossile (o minerale) · i) animale · l) minerale`,
    },
    {
      titolo: 'Rinnovabile o no?',
      testo: `Scrivi R (rinnovabile) o NR (non rinnovabile).<br>a) legno ______<br>b) gas naturale ______<br>c) lana ______<br>d) minerale di rame ______<br>e) cotone ______<br>f) petrolio ______<br>Poi spiega con una frase: perché il petrolio è esauribile?`,
      metodo: `Rinnovabile = si riforma in poco tempo (piante, animali). Non rinnovabile = ci vogliono milioni di anni (scheda 3).`,
      soluzione: `a) R · b) NR · c) R · d) NR · e) R · f) NR<br>Il petrolio è esauribile perché per formarsi ci vogliono milioni di anni: quello che usiamo non si riforma in tempo.`,
    },
    {
      titolo: 'Materia prima, semilavorato o prodotto finito?',
      testo: `Metti in ordine ogni catena e scrivi che cosa è ogni pezzo (MP, SL, PF).<br>a) tavole · albero · armadio<br>b) maglietta · cotone · tessuto<br>c) lamiera d'acciaio · automobile · minerale di ferro<br>d) bottiglia · sabbia · lastra di vetro<br>e) latte · formaggio · cagliata`,
      metodo: `Prima viene quello che si trova in natura, poi quello già lavorato ma non ancora usabile, alla fine l'oggetto pronto (scheda 4).`,
      soluzione: `a) albero (MP) → tavole (SL) → armadio (PF)<br>b) cotone (MP) → tessuto (SL) → maglietta (PF)<br>c) minerale di ferro (MP) → lamiera (SL) → automobile (PF)<br>d) sabbia (MP) → lastra di vetro (SL) → bottiglia (PF)<br>e) latte (MP) → cagliata (SL) → formaggio (PF)`,
    },
    {
      titolo: 'Naturale, artificiale o sintetico?',
      testo: `a) marmo ______<br>b) vetro ______<br>c) nylon ______<br>d) carta ______<br>e) legno ______<br>f) plastica ______<br>g) mattone ______<br>h) lana ______`,
      metodo: `Naturale = quasi come in natura. Artificiale = trasformato da una materia naturale. Sintetico = creato in laboratorio, di solito dal petrolio (scheda 5).`,
      soluzione: `a) naturale · b) artificiale (dalla sabbia) · c) sintetico · d) artificiale (dal legno) · e) naturale · f) sintetico · g) artificiale (dall'argilla) · h) naturale`,
    },
    {
      titolo: 'Che proprietà è?',
      testo: `Scrivi il nome della proprietà.<br>a) Il rame si tira in fili sottilissimi. ______<br>b) La molla torna come prima. ______<br>c) Il manico della pentola non scotta. ______<br>d) L'alluminio diventa carta stagnola. ______<br>e) Il bicchiere cade e si rompe. ______<br>f) Il diamante non si graffia. ______<br>g) Il ferro lasciato sotto la pioggia arrugginisce. ______<br>h) La plastilina resta schiacciata. ______`,
      metodo: `Pensa a cosa succede al materiale: passa il calore? si deforma? torna indietro? diventa filo o lamina? (schede 6, 7, 8)`,
      soluzione: `a) duttilità · b) elasticità · c) bassa conducibilità termica (la plastica è isolante) · d) malleabilità · e) fragilità · f) durezza · g) poca resistenza alla corrosione · h) plasticità`,
    },
    {
      titolo: 'Chimico-fisica, meccanica o tecnologica?',
      testo: `In che gruppo sta ogni proprietà?<br>a) durezza ______<br>b) duttilità ______<br>c) peso specifico ______<br>d) elasticità ______<br>e) fusibilità ______<br>f) conducibilità elettrica ______<br>g) fragilità ______<br>h) malleabilità ______`,
      metodo: `Com'è fatto → chimico-fisica. Come reagisce alle forze → meccanica. Come si lavora → tecnologica.`,
      soluzione: `a) meccanica · b) tecnologica · c) chimico-fisica · d) meccanica · e) tecnologica · f) chimico-fisica · g) meccanica · h) tecnologica`,
    },
    {
      titolo: 'Le 4 R',
      testo: `Quale R è?<br>a) Uso il barattolo della marmellata per tenerci le matite. ______<br>b) Compro la frutta sfusa senza vaschetta di plastica. ______<br>c) Le lattine diventano nuove lattine. ______<br>d) Dai rifiuti che non si riciclano si produce energia elettrica. ______<br>Poi spiega: perché serve la raccolta differenziata?`,
      metodo: `Riduzione = meno rifiuti. Riuso = lo stesso oggetto di nuovo. Riciclo = materia nuova. Recupero = energia (scheda 9).`,
      soluzione: `a) riuso · b) riduzione · c) riciclo · d) recupero<br>Perché per riciclare ogni materiale deve essere separato dagli altri.`,
    },
  ],

  quiz: [
    { d: "Che cos'è una materia prima?", r: ['una sostanza naturale che l’uomo trasforma', 'un oggetto pronto da usare', 'un materiale creato in laboratorio', 'un rifiuto da riciclare'], s: "È il punto di partenza: si trova in natura e non è ancora lavorata." },
    { d: "La lana è una materia prima di origine…", r: ['animale', 'vegetale', 'minerale', 'fossile'], s: "Viene dalla pecora." },
    { d: "Il cotone è una materia prima di origine…", r: ['vegetale', 'animale', 'minerale', 'sintetica'], s: "Viene da una pianta." },
    { d: "Da quale minerale si ricava l'alluminio?", r: ['bauxite', 'argilla', 'marmo', 'carbone'], s: "La bauxite si estrae dal sottosuolo." },
    { d: "Quale di queste materie prime NON è rinnovabile?", r: ['petrolio', 'legno', 'lana', 'cotone'], s: "Per formarsi ci vogliono milioni di anni." },
    { d: "Tavole di legno, tessuto e lamiere sono…", r: ['semilavorati', 'materie prime', 'prodotti finiti', 'rifiuti'], s: "Già lavorati, ma non ancora oggetti da usare." },
    { d: "Quale settore trasforma le materie prime nelle fabbriche?", r: ['secondario', 'primario', 'terziario', 'quaternario'], s: "Il primario le prende dalla natura, il terziario dà servizi." },
    { d: "Il vetro è un materiale…", r: ['artificiale', 'naturale', 'sintetico', 'fossile'], s: "Si ottiene fondendo la sabbia." },
    { d: "La plastica è un materiale sintetico perché…", r: ['si crea in laboratorio, soprattutto dal petrolio', 'si trova in natura così com’è', 'viene dalle piante', 'è trasparente'], s: "Non esiste in natura." },
    { d: "Il rame si usa per i fili elettrici perché…", r: ['conduce bene la corrente', 'è molto duro', 'è fragile', 'è leggerissimo'], s: "Ha una buona conducibilità elettrica (ed è duttile)." },
    { d: "Un materiale che si deforma e poi torna come prima è…", r: ['elastico', 'plastico', 'fragile', 'duttile'], s: "Come una molla. Plastico invece resta deformato." },
    { d: "Il vetro si rompe con un colpo: è…", r: ['fragile', 'tenace', 'elastico', 'malleabile'], s: "Tenace è il contrario: resiste agli urti." },
    { d: "La duttilità è la capacità di…", r: ['essere tirato in fili', 'essere ridotto in lamine', 'tornare alla forma di prima', 'non graffiarsi'], s: "Le lamine sono la malleabilità." },
    { d: "La malleabilità è una proprietà…", r: ['tecnologica', 'meccanica', 'chimico-fisica', 'estetica'], s: "Dice come si lavora il materiale." },
    { d: "La durezza è la resistenza a…", r: ['essere graffiato o inciso', 'essere tirato', 'il calore', 'la corrente elettrica'], s: "Il diamante è il materiale più duro." },
    { d: "Perché il manico delle pentole è di plastica o legno?", r: ['sono isolanti termici', 'sono più duri del metallo', 'sono duttili', 'conducono bene il calore'], s: "Il calore passa poco: non ti scotti." },
    { d: "Usare il barattolo della marmellata come portapenne è…", r: ['riuso', 'riciclo', 'recupero', 'riduzione'], s: "Lo stesso oggetto usato di nuovo." },
    { d: "Ricavare energia dai rifiuti che non si riciclano è…", r: ['recupero', 'riuso', 'riduzione', 'raccolta differenziata'], s: "Si fa nei termovalorizzatori." },
  ],

  interrogazione: [
    { d: "Che cos'è una materia prima? Fammi qualche esempio.", scheda: 's1', minimo: 2,
      concetti: [['natura', 'natural'], ['trasform', 'lavor'], ['legno', 'petrolio', 'lana', 'cotone', 'ferro', 'sabbia']],
      risposta: "Una materia prima è una sostanza che si trova in natura e che l'uomo prende per trasformarla in altri materiali e oggetti. Per esempio il legno, il petrolio, la lana." },
    { d: "Come si classificano le materie prime secondo la loro origine?", scheda: 's2', minimo: 3,
      concetti: [['vegetal', 'piant'], ['animal'], ['mineral', 'sottosuolo'], ['fossil', 'petrolio', 'carbone']],
      risposta: "Secondo l'origine ci sono materie prime vegetali, come legno e cotone; animali, come lana e seta; minerali, come ferro, sabbia e argilla; e fossili, come petrolio, carbone e gas naturale." },
    { d: "Qual è la differenza tra risorse rinnovabili e non rinnovabili?", scheda: 's3', minimo: 2,
      concetti: [['riform', 'rigener', 'tempi brevi', 'ricresc'], ['milioni', 'esaur', 'finisc'], ['legno', 'lana', 'cotone'], ['petrolio', 'carbone', 'gas', 'mineral']],
      risposta: "Le rinnovabili si riformano in tempi brevi, come il legno o la lana, se le usiamo con giudizio. Le non rinnovabili, o esauribili, hanno bisogno di milioni di anni per formarsi: quando le abbiamo usate finiscono, come il petrolio e i minerali." },
    { d: "Che differenza c'è tra materia prima, semilavorato e prodotto finito?", scheda: 's4', minimo: 2,
      concetti: [['natura'], ['semilavorat'], ['prodotto finito', 'pronto', 'usare'], ['tavol', 'tessut', 'lamier', 'sedia', 'magliett']],
      risposta: "La materia prima è come si trova in natura, per esempio il tronco. Il semilavorato è già lavorato ma non ancora un oggetto da usare, come le tavole. Il prodotto finito è l'oggetto pronto, come la sedia." },
    { d: "Quali sono i tre settori del lavoro e che cosa fanno?", scheda: 's4', minimo: 2,
      concetti: [['primario'], ['secondario', 'industri', 'trasform'], ['terziario', 'serviz']],
      risposta: "Il settore primario prende le materie prime dalla natura: agricoltura, allevamento, miniere. Il secondario le trasforma nelle fabbriche. Il terziario dà i servizi, come il trasporto e la vendita." },
    { d: "Che differenza c'è tra materiali naturali, artificiali e sintetici?", scheda: 's5', minimo: 2,
      concetti: [['natural'], ['artificial', 'trasform'], ['sintetic', 'laboratorio', 'petrolio'], ['vetro', 'carta', 'plastic', 'nylon']],
      risposta: "I naturali si usano quasi come sono in natura, come il legno. Gli artificiali si ottengono trasformando materie naturali, come il vetro dalla sabbia o la carta dal legno. I sintetici si creano in laboratorio, soprattutto dal petrolio, come la plastica." },
    { d: "Quali sono le proprietà chimico-fisiche dei materiali?", scheda: 's6', minimo: 2,
      concetti: [['peso specifico'], ['conducibilit', 'conduttor', 'isolant'], ['dilataz'], ['fusione'], ['corrosion', 'ruggin']],
      risposta: "Sono il peso specifico, la conducibilità termica ed elettrica, cioè se lasciano passare calore e corrente, la dilatazione termica, il punto di fusione e la resistenza alla corrosione." },
    { d: "Spiegami le proprietà meccaniche: che differenza c'è tra elastico e plastico, duro e fragile?", scheda: 's7', minimo: 2,
      concetti: [['elastic', 'torna'], ['plastic', 'resta deform'], ['dur', 'graffi'], ['fragil', 'rompe']],
      risposta: "Le proprietà meccaniche dicono come reagisce un materiale alle forze. Elastico vuol dire che si deforma e torna come prima, plastico che resta deformato. Duro vuol dire che non si graffia, fragile che si rompe con un colpo: il vetro è duro ma fragile." },
    { d: "Quali sono le proprietà tecnologiche? Che differenza c'è tra malleabilità e duttilità?", scheda: 's8', minimo: 2,
      concetti: [['lavor'], ['malleab', 'lamin'], ['duttil', 'fil'], ['fusibil', 'saldab']],
      risposta: "Le proprietà tecnologiche dicono come si può lavorare un materiale: fusibilità, malleabilità, duttilità, saldabilità, lavorabilità con gli utensili. Malleabile vuol dire che si riduce in lamine, duttile che si tira in fili." },
    { d: "Che cosa sono il ciclo di vita di un prodotto e la regola delle 4 R?", scheda: 's9', minimo: 3,
      concetti: [['progett', 'produ', 'rifiut'], ['riduz', 'ridurre'], ['riuso', 'riusa'], ['ricicl'], ['recuper', 'energia']],
      risposta: "Ogni prodotto si progetta, si produce, si usa e alla fine diventa un rifiuto. Per avere meno rifiuti e risparmiare materie prime c'è la regola delle 4 R: riduzione, riuso, riciclo e recupero di energia. Per riciclare serve la raccolta differenziata." },
  ],
}
