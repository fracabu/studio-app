# Il mio studio

Un'app di studio per la scuola media, pensata per un ragazzo di prima: l'orario della settimana, il diario dei compiti, lo zaino da preparare, le lezioni con video e quiz, e un po' di gioco per tenere alta la motivazione (stelle, personaggi da sbloccare e **Sbrigo**, uno spiritello 3D che presenta le sezioni e spinge a finire i compiti "per andare a basket").

**Online:** [studio-app-omega-five.vercel.app](https://studio-app-omega-five.vercel.app) (serve un account)

## Cosa fa

| Sezione | Contenuto |
|---|---|
| **Oggi** | Lezioni del giorno con l'ora in corso evidenziata, personaggio del giorno, compiti e zaino per il prossimo giorno di scuola (libri delle materie più le cose fisse: cartelline, strumenti, scarpe da ginnastica). |
| **Diario** | Un diario a due pagine che si sfoglia davvero. I compiti si scrivono a mano, si dettano a voce o si ricavano da uno screenshot del registro. |
| **Lezioni** | Una scheda per argomento: video, scheda di ripasso, esercizi e quiz da 12 domande. |
| **Orario**, **Materie** | La settimana e le materie con i loro colori. |
| **Personaggi** | La strada delle stelle e la collezione: si sbloccano facendo compiti, video e quiz. |

### Stelle
Ogni azione utile vale stelle, registrate come eventi con un id unico (così non si contano due volte): compito spuntato 2, video guardato 5, risposta giusta nel quiz 1, quiz perfetto 5. Superata una soglia parte la scena di sblocco del personaggio.

## Come è fatto

- **Frontend:** React 19 + TypeScript, Vite. CSS scritto a mano: fondo a quadretti, cartoncini, pulsanti spessi. Ogni vista sta in un solo schermo (`100dvh`), anche sul telefono.
- **Sbrigo:** modello Three.js costruito nel codice (`src/sbrigo/`), con fisica (si prende, si lancia, sbatte sui bordi), fumetti e voce.
- **Lezioni:** pagine statiche in `public/lezioni/<materia-argomento>/`, con lo stesso stile dell'app. I video sono fatti col codice (animazioni in JavaScript renderizzate in MP4).
- **Account e progressi:** funzioni serverless su Vercel (`api/`) con un database Postgres su [Neon](https://neon.tech) (regione UE).
  - Le password sono salvate solo come hash **scrypt**.
  - La sessione è un cookie `HttpOnly` firmato con HMAC e dura 60 giorni.
  - `public/sync.js` copia sul database tutto quello che l'app salva nel browser (le chiavi `studio-app:*`): a ogni modifica e quando si chiude la pagina. Così compiti e stelle sono gli stessi su PC, tablet e telefono.

```
api/            funzioni Vercel: login, logout, io, progressi (+ _lib.ts comune)
public/         sync.js, pagine delle lezioni, suoni di Sbrigo
server/         plugin di Vite usati solo sul PC di casa (vedi sotto)
src/            app React: components/, data/ (orario, materie, personaggi…), lib/, sbrigo/
scripts/        crea-utente.mjs, generazione dei suoni
```

## Sul PC di casa

```bash
npm install
npx vercel env pull .env.local   # DATABASE_URL e SESSION_SECRET
npm run dev                      # http://localhost:5190, anche dalla rete di casa
```

In locale girano anche due funzioni che online non ci sono, perché usano strumenti del PC:

- **Lettura degli screen dei compiti** (`server/leggi-screen.ts`): l'immagine del registro viene letta da Claude Code (`claude -p`) e trasformata in compiti, sempre con una revisione prima di scriverli sul diario.
- **Voce di Sbrigo** (`server/sbrigo-voce.ts`): sintesi vocale Edge TTS, generata una volta per frase e conservata in `dati/`.

Gli screen, le registrazioni e tutto ciò che contiene dati della famiglia stanno in `dati/`, che non entra né in git né nel deploy. Online, dove queste funzioni mancano, Sbrigo mostra solo il fumetto.

### Utenti

```bash
node --env-file=.env.local scripts/crea-utente.mjs <nome> <password>
```

Crea le tabelle se mancano, crea l'utente o gli cambia la password.

## Deploy

```bash
npx vercel deploy --prod
```

`.vercelignore` tiene fuori `dati/`, i file `.env` e i video. I video delle lezioni non stanno nella repo: online la pagina della lezione usa il lettore di Google Drive. Da lì non si sa quando il video finisce, quindi le stelle del video si prendono con un pulsante.

## Licenza e contenuti

Codice per uso personale e familiare. I personaggi, Sbrigo e le illustrazioni sono originali. Esercizi e quiz sono scritti da noi: dai libri di testo non sono copiati né testi né soluzioni.
