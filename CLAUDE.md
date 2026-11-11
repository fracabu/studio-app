# studio-app

App di studio per uno studente di prima media: orario, diario dei compiti, materie, personaggi da collezionare; poi video lezioni e quiz.

## Avvio
`npm run dev` → http://localhost:5190 (aperta anche alla rete di casa, per tablet e telefono). Serve il PC acceso: il server di Vite fa anche da "motore" (lettura degli screen con Claude Code).

## Viste (barra in alto a linguette)
- **Oggi**: lezioni del giorno (ora in corso evidenziata), personaggio del giorno al centro, compiti e zaino per il prossimo giorno di scuola.
- **Diario**: due pagine affiancate (una su telefono), compiti sulla pagina del giorno di **consegna**. Si sfoglia con frecce, tasti ←/→, angolo piegato in basso, swipe. Il foglio gira davvero sulla spirale (`.foglia`, fronte = pagina che se ne va, retro = pagina che arriva).
- **Lezioni** (`Lezioni.tsx`, elenco in `src/data/lezioni.ts`): una scheda per lezione con copertina del colore della materia, stato (video visto, quiz x/12) e pulsanti Video · Scheda · Esercizi · Quiz. Sui compiti con la stessa materia e lo stesso giorno di consegna (`perIl`) compare **▶ Lezione**, in Oggi e nel Diario.
- **Orario**, **Materie**, **Personaggi** (strada delle stelle + collezione).

## Dati della scuola
- `src/data/orario.ts`: orario lun–ven. `orari` per i giorni con ore non da 60 minuti. Martedì 8–14:45 (Pianoforte 14:00–14:45); mercoledì 8–14, poi rientro 14:50–15:30 per Musica di gruppo. Giovedì 8–14, 6 ore (prima c'erano 8 ore provvisorie fino alle 16).
- `src/data/materie.ts`: materie e colore (tonalità OKLCH). La materia che prima aveva il nome della prof di italiano ora è **Italiano**. `gruppo` di italiano = italiano, grammatica, epica, antologia (per la "prossima lezione" dei compiti).
- `src/data/personaggi.ts`: 8 personaggi originali con rarità, soglia di stelle e abilità per i quiz. Segnaposto disegnati; i file veri (Flow) vanno in `public/personaggi/<id>/` e si indicano in `media`.
- `src/data/palette.ts`: 6 palette provabili dal pulsante "Colori".

## Diario: come entrano i compiti
- **Dettatura** (`src/lib/dettatura.ts`, Web Speech it-IT + audio registrato). Parser `capisciCompiti()` in `src/lib/compiti.ts`: un giorno detto da solo vale per i compiti che seguono; "per lunedì" dopo un compito vale per quel compito; senza giorno → prossima lezione della materia. Microfono solo da localhost o https.
- **Screen** (carica, trascina o Ctrl+V): `server/leggi-screen.ts`, plugin di Vite su `/api/leggi-screen`, lancia `claude -p` (sonnet, solo Read) con avvio leggero, ~11–23 s (le opzioni sono commentate nel file: senza, 100 s). Screen e risposte in `dati/screen/` (fuori da git, dati di famiglia). Claude **copia** la data del gruppo (`dataScreen`); l'app la tratta come **giorno di consegna** (confermato dall'utente sul registro vero, Argo), interruttore "assegnati" nel pannello.
- Gli screen si sovrappongono (lo stesso compito ricompare per giorni): i compiti già sul diario (stesso giorno, stessa materia, ≥80% delle parole) non si riscrivono (`giaSulDiario`, pulsante "Rimettili"). Il registro elenca i giorni dal più lontano al più vicino: i compiti sopra la prima data visibile (intestazione tagliata) vanno alla lezione **dopo** quella data, con avviso.
- Prima di scrivere sul diario c'è sempre la **revisione** (`Revisione.tsx`): materia, testo, data correggibili.
- ▶ su ogni pagina legge i compiti a voce (`src/lib/voce.ts`); "Ascolta" riproduce la dettatura, "Screen" riapre l'immagine.

## Online, login e database
- **Vercel**: progetto `studio-app` (fracabus-projects), https://studio-app-omega-five.vercel.app. Deploy dal PC con `npx vercel deploy --prod`: l'integrazione con GitHub non vede la repo, quindi niente deploy automatico. Repo pubblica `fracabu/studio-app`: **niente nomi di persone né credenziali nei file**.
- **Neon** (Postgres, Francoforte, dall'integrazione Vercel, piano Free): tabelle `utenti` (hash scrypt) e `progressi` (un JSONB con tutte le chiavi `studio-app:*` del browser). Le variabili stanno in `.env.local` (`vercel env pull`), più `SESSION_SECRET` (cookie firmato, 60 giorni).
- `api/` = login, logout, io, progressi (`_lib.ts` comune). In locale le stesse funzioni passano da `server/api-locale.ts`.
- `public/sync.js` (caricato da `index.html` e dalle lezioni) sincronizza localStorage ↔ database. Il database è la fonte di verità, localStorage la copia di lavoro. Si mandano **solo le chiavi cambiate** e il PUT le **unisce** (`dati || nuove - cancellate`): un browser rimasto indietro non può cancellare niente. All'avvio prima partono le modifiche in sospeso, poi ci si allinea al server; al primo login da un browser con dati suoi, quei dati si mandano tutti. Il 9/11 i 24 compiti del PC di casa (localhost:5190) sono stati portati così sul database. Copia: `node --env-file=.env.local scripts/backup-progressi.mjs` → `dati/backup/`. **Le chiavi nuove devono iniziare con `studio-app:`**, altrimenti non si sincronizzano (lo zaino non lo faceva). IndexedDB (audio, screen) resta sul dispositivo.
- `src/components/Accesso.tsx`: l'app si usa **solo da collegati**. Niente iscrizione: gli utenti si creano a mano con `node --env-file=.env.local scripts/crea-utente.mjs <nome> <password>` (lo stesso comando su un nome esistente gli cambia la password). Utenti: `edo` (id 1), `orea` (id 2, creata l'11/11). La pagina di login spiega l'app (contenuti dei libri di testo in altri formati, strumento integrativo, non sostituisce i materiali ufficiali) e come avere l'accesso (messaggio nella chat del gruppo della classe, credenziali date di persona). Senza rete si entra solo se dal browser c'era già qualcuno collegato.
- **Profilo** (`src/components/Utente.tsx`): nella barra foto (o iniziale) e nome di chi è collegato; il menu ha **Impostazioni** (nome da mostrare, foto ritagliata a 256 px nel browser, cambio password con quella vecchia) ed **Esci**. Colonne `utenti.nome_visibile` e `utenti.immagine` (data URL), aggiunte con `scripts/migra-utenti.mjs` (rilanciabile). API: `/api/io` (profilo), `PUT /api/profilo`, `POST /api/password`; in locale passano da `server/api-locale.ts` (elenco `FUNZIONI`).
- **Un browser, più utenti**: `sync.js` ricorda di chi sono i dati (`studio-sync:utente`, dall'`utente` che `/api/progressi` restituisce). Se entra un altro utente, i dati del precedente si tolgono e le sue modifiche non ancora mandate restano da parte (`studio-sync:attesa:<id>`) finché lui rientra. Le pagine delle lezioni senza login rimandano all'app. IndexedDB (audio, screen) resta comunque per dispositivo.
- In fondo a ogni vista e al login: crediti "Sviluppato da codecraft" col logo (`src/components/Crediti.tsx`, copiati dall'app Bradipo), riga sottile dentro il telaio da 100dvh.
- Online non ci sono la lettura degli screen né la voce di Sbrigo (fumetto soltanto). Il video della lezione online arriva da Drive (`DRIVE_ID` nella pagina, cartella «Video lezioni - Scienze» su fracabu, accesso con link).

## Zaino
Materie del prossimo giorno di scuola più le cose fisse in `src/data/zaino.ts`: lunedì cartellina di arte, libro e portalistini di pianoforte, scarpe da ginnastica; mercoledì cartellina di tecnica, ukulele, scarpe da ginnastica.

## Dove si salvano i dati nel browser
- localStorage: compiti (`studio-app:compiti`), stelle/personaggi (`studio-app:premi`), palette, zaino, senso della data degli screen.
- IndexedDB `studio-app`: `audio` (dettature) e `file` (screen).
- All'avvio `navigator.storage.persist()`. Verificato: tutto resta dopo aver chiuso e riaperto il browser. Limite: i dati sono **per browser** (PC e telefono non li condividono).

## Libri e wiki
- `src/data/libri.ts`: i 10 libri adottati (dalla foto dell'elenco dell'8/11; mancano le righe sotto Spagnolo: storia, tecnologia, forse epica).
- **Wiki dei libri**: `C:\Users\user\prima-media-llm-wiki` (stesso schema degli altri wiki; regole nel suo `CLAUDE.md`). Pagine dei libri in `raw/libri/<cartella>/` (fuori da git, testo degli editori); concetti scritti con parole nostre in `wiki/concetti/`. I campi `risposta_breve`, `domande`, `parole_chiave`, `punti_chiave` sono il contratto con l'app: li useranno la chat in solo JavaScript e la correzione delle risposte aperte di Sbrigo.
- Ebook: niente PDF (protetti, si leggono solo nel lettore). **GeoAgenda (Zanichelli) è attivato** e si legge su `https://webreader.zanichelli.it/6.0/zanichelli/#/reader?mode=online`. Gli screen li fa Claude dal Chrome dell'utente, ma il lettore tiene l'accesso **per scheda**: Claude apre la sua scheda (gruppo "Claude"), l'utente ci entra lui (Seleziona utente → Accedi), poi Claude apre il libro → "Indice e segnalibri". Mai fare il login al posto dell'utente. Gli altri 9 ebook sono da attivare (codici dentro i libri, account sui siti degli editori: li fa l'utente).
- **Prossimo passo**: indice completo di GeoAgenda (dall'indice A1 Gli strumenti, A2 Il paesaggio e i fattori che lo modificano, A3 I rilievi, …) → pagina `wiki/libri/geografia-geoagenda.md`; poi il primo capitolo dei compiti nel wiki, la chat in solo JavaScript e il test con Sbrigo.

## Lezioni (prima versione, fuori dal React)
- Pagine statiche in `public/lezioni/<materia-argomento>/index.html`, stesso stile dell'app (palette Rosso fuoco): linguette Video · Scheda · Esercizi · Quiz. Si aprono con l'indirizzo **completo** `…/index.html` (con la sola barra finale Vite rimanda all'app).
- Le stelle scrivono direttamente in `studio-app:premi` (stessi id evento di `premi.ts`: `video:<lezione>` 5, `quiz:<lezione>:<n>` 1, `quiz:<lezione>:perfetto` 5).
- Prima lezione: `scienze-temperatura` (A3 lezione 1, pp. 64–68). Video fatto con js-video in `C:\Users\user\claude-video-gen\videos\temperatura-prima-media` (voce di Sbrigo, stile app, zoom/puntatore/sottolineature) e copiato come `video.mp4`.
- Contenuti dal wiki `prima-media-llm-wiki` (capitolo + concetti); esercizi **nostri**, mai le soluzioni di quelli del libro.

## Sbrigo, il presentatore
Spiritello 3D **originale** (spirito da commedia gotica alla Beetlejuice, aspetto nostro: pelle lavanda, cresta viola-azzurra, giacca a quadri arancio/viola, scarpe da basket, pallone). Sta su ogni vista, la presenta in modo irriverente e spinge a fare i compiti "per andare a basket".
- `src/sbrigo/sbrigo.js` (modello Three.js), `src/sbrigo/palco.js` (canvas trasparente sopra l'app, fisica, fumetto, voce, gag; **tutte le battute in `FRASI`**), `palco.d.ts` (tipi), `src/components/Sbrigo.tsx` (pulsante Via/Chiama nella barra, scelta in localStorage `studio-app:sbrigo`; saluto con i compiti veri del prossimo giorno di scuola).
- Si prende col mouse o col dito, si lancia, sbatte sui bordi (SDENG!), con botte forti resta stordito (occhi a spirale e stelline). Tocco veloce = salto mortale. Compito spuntato → evento `studio-app:compito-fatto` (da `premiaCompito`) → "CANESTRO!". Ogni tanto rutto o scoreggia.
- **Voce: lo stesso metodo di Ripamino**, solo codice: Edge TTS `it-IT-DiegoNeural`, `+12%`, `+55Hz` (`server/sbrigo-voce.ts`, plugin di Vite `/api/sbrigo/voce`). Una volta per frase, poi resta in `dati/sbrigo-voce/`. All'avvio l'app manda tutte le battute a `/api/sbrigo/scalda` e il server le prepara una alla volta con pause, perché Microsoft rallenta chi chiede troppo (visto: da 3 s a 3 minuti a frase). Se la voce non arriva entro 5 s, Sbrigo resta muto e mostra solo il fumetto.
- Effetti sonori (rutti, scoregge, botte) fatti **una volta** con ElevenLabs: `scripts/sbrigo-suoni.mjs --env ../zerohedge-app/.env.local` → `public/sbrigo/suoni/`. La chiave non è copiata nel progetto.
- Prototipo e screenshot di controllo in `C:\Users\user\mini-me-3d` (`sbrigo.html`, `sbrigo-viewer.html`): la versione buona è quella dell'app.

## Premi
Stelle da eventi con id unico (`src/lib/premi.ts`): compito spuntato 2 (tolta la spunta, tornano indietro), poi video 5, quiz 1 a risposta + 5 se perfetto, bonus 10. Superata una soglia parte la scena di sblocco (`Rivelazione.tsx`).

## Stile
Mix "scuola media + gioco", ispirato (senza copiare nulla) a PBS Design Squad Nation per layout e colori e alle meccaniche di collezione tipo Brawl Stars (solo meccaniche, personaggi nostri): fondo a quadretti colorato, linguette di cartoncino con icone a mano, fogli bianchi con etichetta storta, pulsanti spessi con bordo e ombra piena, contatore di stelle. Font: Nunito (testo; **non** Atkinson: lo zero barrato faceva sembrare rotti gli orari), Lilita One (titoli, numeri da gioco), Patrick Hand (etichette e scrittura sul diario). Evidenziatori per materia fissi; il telaio cambia con la palette.

Ogni vista sta in **100dvh**: la pagina non scorre mai, al massimo una lista dentro. Celle dell'orario con container query (bassa → nome e orario su una riga). Verifiche fatte con Playwright a 1280×720, 1440×900, 1280×620, 390×844.

## Prossimi passi (in ordine)
1. Secondo riferimento di stile (l'immagine inviata era arrivata rotta).
2. **Piano di studio** per il giorno dopo, dai compiti del diario.
3. **Sezione Video** stile YouTube (griglia di copertine filtrabile per materia; pagina video con riassunto e "Fai il quiz"). Contenuti: screen delle pagine del libro → stesso motore `claude -p` + skill js-video (`C:\Users\user\claude-video-gen`, già fatti `acqua-prima-media` e `tecno-prima-media-scienza-tecnologia`). Video col codice, Nano Banana per cover e qualche illustrazione. Primi 2–3 video da calibrare in chat.
4. **Quiz** con stelle e abilità dei personaggi (Indizio, Seconda possibilità, Salto, Scudo, Doppie stelle…).
5. Personaggi veri fatti con Flow (immagine + clip fermo/esulta).
6. Dati sul server di casa (sync PC/telefono) e https per il microfono dal telefono.
7. Più avanti: compiti direttamente dal registro elettronico (Argo).
