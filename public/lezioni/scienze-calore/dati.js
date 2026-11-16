/* Lezione di scienze: il calore e la sua propagazione.
 * Fonte: Che meraviglia la scienza! Edizione tematica, Volume A (Garzanti Scuola / DeA), unità A3,
 * Lezione 2, pag. A70-A74 (compito per il 17/11: studiare 70-74 e completare la mappa di pag. 74).
 * Nel lettore HUB Young: viewer/9566638, page = pagina stampata + 18 (c'è il testo liquido).
 * Appunti: prima-media-llm-wiki/raw/libri/scienze-che-meraviglia-la-scienza/A3-p070-074-calore-propagazione.md
 * Testi riscritti con parole nostre; esercizi, quiz e la tabella dell'esercizio 7 sono nostri.
 * La mappa di pag. 74 la completa lui: qui non c'è la soluzione. Segue Lezione 1 = scienze-temperatura. */
window.LEZIONE = {
  id: 'scienze-calore',
  materia: 'Scienze',
  titolo: 'Il calore e come si propaga',
  argomento: 'calore, joule e calorie, equilibrio termico, conduzione, convezione e irraggiamento',
  pagine: 'A70–A74',
  sezioni: ['scheda', 'esercizi', 'quiz', 'interroga'],

  schede: [
    {
      id: 's1', titolo: 'Che cos\'è il calore', pag: 'A70',
      html: `<p>Ricordi la lezione sulla temperatura? Le particelle della materia sono <b>sempre in movimento</b>: è l'agitazione termica. Più si muovono, più la temperatura è alta.</p>
<p>Se sommi l'energia di <b>tutte</b> le particelle di un corpo ottieni la sua <span class="evid">energia termica</span>.</p>
<p>Per scaldare un corpo bisogna far muovere più in fretta le sue particelle, cioè <b>dargli energia</b>. Questa energia si chiama calore.</p>
<div class="attento">📌 Il <b>calore</b> è una forma di <b>energia</b> che fa <b>aumentare la temperatura</b> del corpo che la riceve.</div>
<p class="nota">Esempio: nel bollitore elettrico l'energia elettrica diventa calore, e l'acqua arriva a 100 °C per il tè.</p>
<div class="attento">⚠️ Calore e temperatura <b>non sono la stessa cosa</b>: la temperatura misura quanto si agitano le particelle, il calore è l'energia che passa da un corpo all'altro.</div>`,
    },
    {
      id: 's2', titolo: 'Joule e calorie', pag: 'A70',
      html: `<p>Il calore è energia, quindi si misura come l'energia:</p>
<table>
<tr><td><b>joule (J)</b></td><td>l'unità del Sistema Internazionale</td></tr>
<tr><td><b>caloria (cal)</b></td><td>l'energia che serve per scaldare <b>1 grammo</b> di acqua distillata di <b>1 grado</b>, da 14,5 °C a 15,5 °C</td></tr>
<tr><td><b>chilocaloria (kcal)</b></td><td>1000 calorie: si usa per il cibo e lo sport</td></tr>
</table>
<p>Il ponte tra le due unità: <span class="formula">1 cal = 4,186 J</span></p>
<ul><li>da calorie a joule: <b>moltiplica</b> per 4,186. Esempio: 100 cal × 4,186 = 418,6 J</li>
<li>da joule a calorie: <b>dividi</b> per 4,186. Esempio: 4186 J : 4,186 = 1000 cal = 1 kcal</li></ul>
<p class="nota">Un trucco per non sbagliare: il joule è più "piccolo" della caloria, quindi in joule il numero viene sempre <b>più grande</b>.</p>`,
    },
    {
      id: 's3', titolo: 'Dal più caldo al più freddo', pag: 'A71',
      html: `<p>Se tieni in mano una tazza di tè caldo senti caldo; se tieni un cubetto di ghiaccio senti freddo. In tutti e due i casi il calore viaggia nello <b>stesso verso</b>:</p>
<div class="attento">📌 Il calore passa <b>sempre</b>, da solo, dal corpo <b>più caldo</b> a quello <b>più freddo</b>.</div>
<ul><li>Tè e mano: il calore va dal tè alla mano.</li>
<li>Ghiaccio e mano: il calore va dalla <b>mano</b> al ghiaccio. Il freddo non "entra": è la mano che perde calore.</li></ul>
<p>Quando si ferma? Quando i due corpi arrivano alla <b>stessa temperatura</b>. Questo si chiama <span class="evid">equilibrio termico</span>.</p>
<p>Il calore si può trasmettere in <b>tre modi</b>: conduzione, convezione e irraggiamento.</p>`,
    },
    {
      id: 's4', titolo: 'La conduzione', pag: 'A72',
      html: `<p>Il pigiama appoggiato sul termosifone si scalda. Le particelle del termosifone vibrano più forte e passano il movimento a quelle del pigiama che toccano, e queste alle vicine, <b>una dopo l'altra</b>, fino all'equilibrio termico.</p>
<div class="attento">📌 <b>Conduzione</b>: il calore passa per <b>contatto</b>. Si sposta l'energia, <b>non la materia</b>. È tipica dei <b>solidi</b>.</div>
<table>
<tr><td><b>conduttori termici</b><br>lasciano passare bene il calore</td><td>tutti i <b>metalli</b>: rame, acciaio, alluminio, ferro. Per questo le pentole sono di metallo.</td></tr>
<tr><td><b>isolanti termici</b><br>lo lasciano passare male</td><td><b>lana, legno, ceramica, sughero, polistirolo, plastica</b>. Il sottopentola protegge il tavolo, la vaschetta di polistirolo tiene freddo il gelato.</td></tr>
</table>
<p class="nota">Perché? Negli isolanti le particelle si muovono poco e passano l'agitazione molto lentamente.</p>`,
    },
    {
      id: 's5', titolo: 'La convezione', pag: 'A73',
      html: `<p>Metti una pentola d'acqua sul fuoco.</p>
<ol><li>L'acqua sul <b>fondo</b> si scalda per prima, si dilata, diventa <b>meno densa</b> e <b>sale</b>.</li>
<li>L'acqua fredda in alto è <b>più densa</b> e <b>scende</b> a prendere il suo posto.</li></ol>
<p>Si formano due correnti, una che sale e una che scende: è il <span class="evid">moto convettivo</span>. Succede anche all'aria di una stanza col termosifone acceso.</p>
<div class="attento">📌 <b>Convezione</b>: il calore viaggia insieme alla materia che <b>si sposta</b> e si rimescola. Avviene nei <b>fluidi</b>, cioè liquidi e aeriformi.</div>
<p class="nota">La differenza con la conduzione: nella convezione si spostano le particelle calde, nella conduzione passa solo il movimento.</p>`,
    },
    {
      id: 's6', titolo: 'L\'irraggiamento', pag: 'A73-A74',
      html: `<p>Vicino alle braci di un barbecue senti caldo. Se le spegni con l'acqua il caldo sparisce <b>subito</b>, anche se l'aria intorno è ancora calda: quel calore ti arrivava come <b>radiazione</b>.</p>
<div class="attento">📌 <b>Irraggiamento</b>: il calore viaggia come <b>radiazioni infrarosse</b> emesse dai corpi. Niente contatto, niente materia che si sposta, e funziona <b>anche nel vuoto</b>.</div>
<ul><li>Il calore del <b>Sole</b> arriva sulla Terra così, attraverso lo spazio vuoto.</li>
<li>I colori <b>scuri assorbono</b> gli infrarossi, i colori <b>chiari li riflettono</b>: d'estate una maglietta bianca è più fresca di una nera.</li>
<li>Termoscanner, termometri a infrarossi e visori notturni "vedono" proprio questa radiazione.</li></ul>
<p class="nota">Una vernice bianchissima inventata negli Stati Uniti riflette quasi tutta la luce del Sole e rinfresca i palazzi: meno condizionatori, meno energia sprecata.</p>`,
    },
    {
      id: 's7', titolo: 'Per completare la mappa di pag. 74', pag: 'A74',
      html: `<p>La mappa parte da <b>IL CALORE</b> e ha tre rami. Per ognuno, ecco dove trovare la risposta.</p>
<table>
<tr><td><b>è…</b> e <b>si misura in…</b></td><td>scheda 1 e scheda 2</td></tr>
<tr><td><b>si propaga sempre da… a…</b> e <b>fino al raggiungimento…</b></td><td>scheda 3</td></tr>
<tr><td><b>si trasmette per…</b> (tre caselle) e <b>avviene…</b></td><td>schede 4, 5 e 6: per ognuno chiediti "serve il <b>contatto</b>?" e "si <b>sposta la materia</b>?"</td></tr>
</table>
<p class="nota">Completala sul libro da solo, poi controlla con l'esercizio 7: la tabella dei tre modi ti dice se hai messo le parole giuste.</p>`,
    },
  ],

  esercizi: [
    {
      titolo: 'Da dove a dove va il calore?',
      testo: `Per ogni coppia scrivi da chi a chi passa il calore.<br>a) un ghiacciolo nella tua mano<br>b) il termosifone e l'aria della stanza<br>c) una pentola sul fuoco e la fiamma<br>d) una bottiglia d'acqua tiepida nel frigorifero<br>e) i tuoi piedi e il pavimento freddo<br>f) il Sole e la sabbia della spiaggia`,
      metodo: `Trova quale dei due è <b>più caldo</b>: il calore parte sempre da lì e va verso il più freddo (scheda 3).`,
      soluzione: `a) dalla mano al ghiacciolo · b) dal termosifone all'aria · c) dalla fiamma alla pentola · d) dall'acqua all'aria del frigorifero · e) dai piedi al pavimento · f) dal Sole alla sabbia`,
    },
    {
      titolo: 'Conduzione, convezione o irraggiamento?',
      testo: `a) Il manico di metallo della padella diventa bollente.<br>b) Ti scaldi davanti al camino, senza toccarlo.<br>c) L'acqua della pasta si rimescola mentre si scalda.<br>d) Appoggi le mani su una tazza calda.<br>e) La luce del Sole scalda la tua faccia.<br>f) L'aria calda del condizionatore sale verso il soffitto e quella fredda scende.<br>g) Il cucchiaino lasciato nella tazza di tè si scalda.<br>h) Una macchina nera al sole scotta più di una bianca.`,
      metodo: `Tre domande: c'è <b>contatto</b>? → conduzione. Si <b>muove</b> un liquido o un gas? → convezione. Il calore arriva <b>a distanza</b>, senza toccare? → irraggiamento (schede 4, 5, 6).`,
      soluzione: `a) conduzione · b) irraggiamento · c) convezione · d) conduzione · e) irraggiamento · f) convezione · g) conduzione · h) irraggiamento (il nero assorbe di più gli infrarossi)`,
    },
    {
      titolo: 'Conduttore o isolante?',
      testo: `a) una chiave di ferro<br>b) un maglione di lana<br>c) un tagliere di legno<br>d) una pentola di rame<br>e) una borsa frigo di polistirolo<br>f) una moneta<br>g) un tappo di sughero<br>h) una lattina di alluminio`,
      metodo: `I <b>metalli</b> sono conduttori; lana, legno, sughero, polistirolo, plastica e ceramica sono isolanti (scheda 4).`,
      soluzione: `Conduttori: a) chiave di ferro · d) pentola di rame · f) moneta · h) lattina di alluminio.<br>Isolanti: b) maglione di lana · c) tagliere di legno · e) borsa di polistirolo · g) tappo di sughero.`,
    },
    {
      titolo: 'Calorie e joule',
      testo: `Usa 1 cal = 4,186 J.<br>a) 10 cal = ? J<br>b) 250 cal = ? J<br>c) 3 kcal = ? J<br>d) 837,2 J = ? cal<br>e) 41 860 J = ? kcal`,
      metodo: `Da calorie a joule <b>moltiplica</b> per 4,186; da joule a calorie <b>dividi</b>. Le kcal prima trasformale in calorie (× 1000). Controllo: in joule il numero è sempre più grande (scheda 2).`,
      soluzione: `a) 10 × 4,186 = <b>41,86 J</b><br>b) 250 × 4,186 = <b>1046,5 J</b><br>c) 3 kcal = 3000 cal; 3000 × 4,186 = <b>12 558 J</b><br>d) 837,2 : 4,186 = <b>200 cal</b><br>e) 41 860 : 4,186 = 10 000 cal = <b>10 kcal</b>`,
    },
    {
      titolo: 'Vero o falso?',
      testo: `a) Il calore e la temperatura sono la stessa cosa.<br>b) Il calore può passare da solo da un corpo freddo a uno caldo.<br>c) Quando due corpi hanno la stessa temperatura, il calore smette di passare.<br>d) Nella convezione si sposta la materia.<br>e) L'irraggiamento non funziona nel vuoto.<br>f) Il legno è un buon conduttore termico.<br>g) I colori chiari riflettono le radiazioni infrarosse.`,
      metodo: `Ripassa le frasi nei riquadri 📌 delle schede: sono le regole che servono.`,
      soluzione: `a) F, la temperatura misura l'agitazione, il calore è energia che passa · b) F, sempre dal caldo al freddo · c) V, è l'equilibrio termico · d) V · e) F, il calore del Sole arriva proprio attraverso il vuoto · f) F, è un isolante · g) V`,
    },
    {
      titolo: 'Spiega il perché',
      testo: `a) Perché i mestoli per cucinare hanno spesso il manico di legno o di plastica?<br>b) Perché il termosifone si mette in basso, e non vicino al soffitto?<br>c) Perché d'estate conviene vestirsi di bianco?<br>d) Perché un thermos tiene calda la bevanda per ore?`,
      metodo: `Per ogni domanda chiediti quale dei tre modi di trasmissione c'entra, e se il materiale è conduttore o isolante. Rispondi con una frase intera che usi le parole delle schede.`,
      soluzione: `a) Il legno e la plastica sono <b>isolanti</b>: il calore della pentola non arriva alla mano per conduzione.<br>b) L'aria scaldata in basso <b>sale</b> e quella fredda scende: si crea un <b>moto convettivo</b> che scalda tutta la stanza.<br>c) I colori chiari <b>riflettono</b> le radiazioni infrarosse del Sole, quelli scuri le assorbono (irraggiamento).<br>d) Le sue pareti sono fatte per <b>isolare</b>: il calore passa molto lentamente verso l'esterno, più freddo, e l'equilibrio termico arriva tardi.`,
    },
    {
      titolo: 'La tabella dei tre modi',
      testo: `Copia la tabella sul quaderno e completala con sì o no e con un esempio.<br><br>
<table>
<tr><td></td><td><b>serve il contatto?</b></td><td><b>si sposta la materia?</b></td><td><b>dove avviene</b></td><td><b>un esempio</b></td></tr>
<tr><td><b>conduzione</b></td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td><b>convezione</b></td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
<tr><td><b>irraggiamento</b></td><td>…</td><td>…</td><td>…</td><td>…</td></tr>
</table>`,
      metodo: `Schede 4, 5 e 6, i riquadri 📌. Questa tabella ti serve per controllare le tre caselle in basso della mappa di pag. 74.`,
      soluzione: `<b>conduzione</b>: contatto sì · materia no · soprattutto nei solidi · il pigiama sul termosifone<br><b>convezione</b>: contatto non serve · materia sì, si sposta e si rimescola · nei fluidi, liquidi e aeriformi · l'acqua della pasta, l'aria della stanza<br><b>irraggiamento</b>: contatto no · materia no · ovunque, anche nel vuoto · il Sole che scalda la Terra`,
    },
  ],

  quiz: [
    { d: 'Il calore è…', r: ['una forma di energia', 'una temperatura', 'una sostanza calda', 'un tipo di particella'], s: 'Il calore è energia che fa aumentare la temperatura di chi la riceve.' },
    { d: 'Nel Sistema Internazionale il calore si misura in…', r: ['joule', 'gradi Celsius', 'kelvin', 'calorie'], s: 'Joule (J). La caloria si usa anche, ma non è l\'unità del SI.' },
    { d: '1 caloria corrisponde a…', r: ['4,186 J', '1000 J', '1 J', '0,24 J'], s: '1 cal = 4,186 J.' },
    { d: 'Una chilocaloria (kcal) è uguale a…', r: ['1000 calorie', '100 calorie', '4,186 calorie', '10 calorie'], s: 'Chilo vuol dire mille: 1 kcal = 1000 cal.' },
    { d: 'Per passare da calorie a joule…', r: ['moltiplichi per 4,186', 'dividi per 4,186', 'aggiungi 273', 'moltiplichi per 1000'], s: 'Da calorie a joule si moltiplica; il numero in joule viene più grande.' },
    { d: 'Il calore passa spontaneamente…', r: ['dal corpo più caldo a quello più freddo', 'dal corpo più freddo a quello più caldo', 'dal più grande al più piccolo', 'in una direzione a caso'], s: 'Sempre dal più caldo al più freddo.' },
    { d: 'Quando due corpi arrivano alla stessa temperatura si parla di…', r: ['equilibrio termico', 'dilatazione termica', 'agitazione termica', 'zero assoluto'], s: 'Equilibrio termico: il calore smette di passare.' },
    { d: 'Tieni un cubetto di ghiaccio in mano. Che cosa succede?', r: ['la mano cede calore al ghiaccio', 'il ghiaccio cede freddo alla mano', 'il ghiaccio cede calore alla mano', 'non passa niente'], s: 'Il calore va dalla mano, più calda, al ghiaccio. Il "freddo" non viaggia.' },
    { d: 'Nella conduzione il calore passa…', r: ['per contatto, senza spostamento di materia', 'con correnti che salgono e scendono', 'con radiazioni infrarosse', 'solo nel vuoto'], s: 'Conduzione = contatto; la materia resta ferma, passa solo il movimento.' },
    { d: 'Quale di questi è un buon conduttore termico?', r: ['l\'alluminio', 'il sughero', 'la lana', 'il polistirolo'], s: 'I metalli sono conduttori; gli altri sono isolanti.' },
    { d: 'La convezione avviene…', r: ['nei liquidi e negli aeriformi', 'solo nei solidi', 'solo nel vuoto', 'solo nei metalli'], s: 'Nei fluidi, cioè liquidi e aeriformi: la materia si sposta.' },
    { d: 'Nella pentola sul fuoco l\'acqua calda sale perché…', r: ['è meno densa', 'è più densa', 'è più pesante', 'la spinge il coperchio'], s: 'Scaldandosi si dilata e diventa meno densa, quindi sale.' },
    { d: 'Il calore del Sole arriva sulla Terra per…', r: ['irraggiamento', 'conduzione', 'convezione', 'evaporazione'], s: 'Nello spazio c\'è il vuoto: solo l\'irraggiamento può attraversarlo.' },
    { d: 'D\'estate una maglietta nera è più calda di una bianca perché…', r: ['il nero assorbe di più gli infrarossi', 'il nero è un conduttore', 'il bianco è più denso', 'il nero fa convezione'], s: 'I colori scuri assorbono le radiazioni, quelli chiari le riflettono.' },
  ],

  interrogazione: [
    { d: 'Che cos\'è il calore?', scheda: 's1', minimo: 2,
      concetti: [['energia'], ['temperatura', 'scald'], ['particell', 'agitazion', 'movimento']],
      risposta: 'Il calore è una forma di energia che fa aumentare la temperatura del corpo che la riceve, perché fa muovere più velocemente le sue particelle.' },
    { d: 'In che unità di misura si misura il calore?', scheda: 's2', minimo: 2,
      concetti: [['joule'], ['calori'], ['4,186', '4.186', 'quattro virgola']],
      risposta: 'Nel Sistema Internazionale in joule; si usano anche le calorie e le chilocalorie. Una caloria vale 4,186 joule.' },
    { d: 'In che direzione passa il calore, e fino a quando?', scheda: 's3', minimo: 2,
      concetti: [['più caldo', 'caldo'], ['più freddo', 'freddo'], ['equilibrio', 'stessa temperatura', 'uguale']],
      risposta: 'Il calore passa sempre dal corpo più caldo a quello più freddo, finché i due corpi hanno la stessa temperatura: l\'equilibrio termico.' },
    { d: 'Che cos\'è la conduzione? Fammi un esempio.', scheda: 's4', minimo: 2,
      concetti: [['contatto', 'tocc'], ['solid'], ['senza spostamento', 'non si sposta', 'materia ferma'], ['conduttor', 'metall', 'isolant']],
      risposta: 'È il passaggio di calore per contatto, tipico dei solidi: si trasmette l\'energia senza spostamento di materia. Per esempio il pigiama sul termosifone. I metalli sono buoni conduttori, legno e lana sono isolanti.' },
    { d: 'Che differenza c\'è tra conduzione e convezione?', scheda: 's5', minimo: 2,
      concetti: [['contatto'], ['fluid', 'liquid', 'aeriform', 'gas'], ['spost', 'rimescol', 'correnti', 'moto convettivo']],
      risposta: 'Nella conduzione il calore passa per contatto e la materia resta ferma. Nella convezione, che avviene nei fluidi, la materia si sposta: si formano correnti che salgono e scendono, il moto convettivo.' },
    { d: 'Che cos\'è l\'irraggiamento?', scheda: 's6', minimo: 2,
      concetti: [['radiazion', 'infraross', 'raggi'], ['vuoto'], ['senza contatto', 'a distanza', 'senza materia'], ['sole']],
      risposta: 'È il passaggio di calore attraverso le radiazioni infrarosse, senza contatto e senza spostamento di materia, anche nel vuoto. Così il calore del Sole arriva sulla Terra.' },
  ],
}
