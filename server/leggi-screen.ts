// Il "motore" sul PC di casa: riceve gli screen dei compiti dall'app, li fa leggere
// a Claude Code (modalità senza interfaccia, con l'abbonamento dell'utente) e
// restituisce i compiti in JSON. Per ora vive dentro il server di Vite.

import { spawn } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import type { IncomingMessage } from 'node:http'
import path from 'node:path'
import type { Plugin } from 'vite'

interface Richiesta {
  immagini: { nome: string; tipo: string; base64: string }[]
  /** orario, materie e data di oggi, preparati dall'app */
  contesto: string
}

const LIMITE = 30 * 1024 * 1024
const ATTESA_MASSIMA = 4 * 60 * 1000

function leggiCorpo(req: IncomingMessage): Promise<string> {
  return new Promise((ok, ko) => {
    const pezzi: Buffer[] = []
    let dimensione = 0
    req.on('data', (p: Buffer) => {
      dimensione += p.length
      if (dimensione > LIMITE) {
        ko(new Error('Immagini troppo grandi (oltre 30 MB in tutto).'))
        req.destroy()
      } else pezzi.push(p)
    })
    req.on('end', () => ok(Buffer.concat(pezzi).toString('utf8')))
    req.on('error', ko)
  })
}

function istruzioni(file: string[], contesto: string): string {
  return `Sei l'assistente del diario scolastico di uno studente di prima media.

Leggi con lo strumento Read queste immagini:
${file.map((f) => `- ${f}`).join('\n')}

Sono screenshot dei compiti assegnati dalla scuola (dal registro elettronico, inoltrati su WhatsApp).
Estrai OGNI compito che vedi. Non inventare niente che non sia scritto.

Rispondi SOLO con un array JSON, senza nessun testo prima o dopo, in questo formato:
[{"materia": "<id>" | null, "testo": "...", "dataScreen": "YYYY-MM-DD" | null, "perIl": "YYYY-MM-DD" | null, "assegnatoIl": "YYYY-MM-DD" | null}]

Regole:
- materia: uno degli id elencati sotto. Se il registro scrive "ITALIANO" con un prefisso (Ant:, Gramm:, Epica:) usa antologia, grammatica o epica; "italiano" solo se non si capisce quale. Se la materia non si capisce, null.
- testo: cosa c'è da fare, breve e chiaro come sul diario (per esempio "Pagina 45 esercizi 1, 2 e 3"). Non ripetere il nome della materia.
- Se per la stessa materia ci sono cose diverse (esercizi e studio), fai un compito per ciascuna.
- dataScreen: la data sotto cui il compito compare nello screen (l'intestazione del gruppo, per esempio "giovedì 29 ottobre 2026"). NON interpretarla: copiala e basta. Se non c'è, null.
- perIl: SOLO se accanto al compito è scritto esplicitamente quando va consegnato ("consegna: 10/11", "per il 12", "per giovedì"). Altrimenti null.
- assegnatoIl: SOLO se è scritto esplicitamente quando è stato assegnato ("assegnato il 06/11"). Altrimenti null.
- Le date senza anno sono dell'anno scolastico in corso.

${contesto}`
}

function chiediAClaude(prompt: string, cartella: string, req: IncomingMessage): Promise<string> {
  return new Promise((ok, ko) => {
    // Avvio leggero (misurato: da ~100 s a ~35 s con l'immagine): niente server MCP, skill,
    // impostazioni utente (hook, plugin), aggiornamenti e traffico non essenziale; solo lo strumento Read.
    const args = [
      '-p', '--output-format', 'json', '--model', 'sonnet',
      '--tools', 'Read', '--allowedTools', 'Read', '--add-dir', `"${cartella}"`,
      '--strict-mcp-config', '--disable-slash-commands', '--no-session-persistence',
      '--setting-sources', 'local',
    ]
    const figlio = spawn('claude', args, {
      cwd: cartella,
      shell: true,
      windowsHide: true,
      env: { ...process.env, CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC: '1', DISABLE_AUTOUPDATER: '1' },
    })
    let uscita = ''
    let errori = ''
    const timer = setTimeout(() => {
      ferma()
      ko(new Error('Claude ci ha messo troppo a leggere lo screen. Riprova.'))
    }, ATTESA_MASSIMA)
    // con shell: true su Windows kill() ferma solo cmd.exe: taskkill /T chiude anche Claude
    const ferma = () => {
      if (figlio.exitCode !== null || !figlio.pid) return
      if (process.platform === 'win32') spawn('taskkill', ['/pid', String(figlio.pid), '/T', '/F'], { windowsHide: true })
      else figlio.kill()
    }
    // se l'app chiude il pannello, si ferma anche Claude
    req.socket.on('close', ferma)
    figlio.stdout.on('data', (d) => (uscita += d))
    figlio.stderr.on('data', (d) => (errori += d))
    figlio.on('error', (e) => {
      clearTimeout(timer)
      ko(new Error(`Non riesco ad avviare Claude Code: ${e.message}`))
    })
    figlio.on('close', (codice) => {
      clearTimeout(timer)
      if (codice !== 0) return ko(new Error(`Claude Code si è fermato (codice ${codice}). ${errori.slice(0, 300)}`))
      try {
        const risposta = JSON.parse(uscita) as { result?: string; is_error?: boolean }
        if (risposta.is_error) return ko(new Error(`Claude non è riuscito: ${risposta.result ?? ''}`.slice(0, 300)))
        ok(risposta.result ?? '')
      } catch {
        ko(new Error('Risposta di Claude Code non leggibile.'))
      }
    })
    figlio.stdin.end(prompt)
  })
}

function estraiArray(testo: string): unknown[] {
  const inizio = testo.indexOf('[')
  const fine = testo.lastIndexOf(']')
  if (inizio < 0 || fine < inizio) throw new Error('Nello screen non ho trovato compiti da leggere.')
  const dati = JSON.parse(testo.slice(inizio, fine + 1))
  if (!Array.isArray(dati)) throw new Error('Risposta di Claude non valida.')
  return dati
}

export function leggiScreen(cartella: string): Plugin {
  return {
    name: 'leggi-screen',
    configureServer(server) {
      server.middlewares.use('/api/leggi-screen', async (req, res) => {
        res.setHeader('content-type', 'application/json; charset=utf-8')
        if (req.method !== 'POST') {
          res.statusCode = 405
          return res.end(JSON.stringify({ errore: 'Usa POST.' }))
        }
        try {
          const corpo = JSON.parse(await leggiCorpo(req)) as Richiesta
          if (!corpo.immagini?.length) throw new Error('Nessuna immagine ricevuta.')
          const giro = path.join(cartella, new Date().toISOString().replace(/[:.]/g, '-'))
          await mkdir(giro, { recursive: true })
          const file: string[] = []
          for (const [i, img] of corpo.immagini.entries()) {
            const estensione = img.tipo.split('/')[1]?.replace('jpeg', 'jpg') ?? 'png'
            const dove = path.join(giro, `screen-${i + 1}.${estensione}`)
            await writeFile(dove, Buffer.from(img.base64, 'base64'))
            file.push(dove)
          }
          const risposta = await chiediAClaude(istruzioni(file, corpo.contesto), giro, req)
          const compiti = estraiArray(risposta)
          await writeFile(path.join(giro, 'compiti.json'), JSON.stringify(compiti, null, 2))
          res.end(JSON.stringify({ compiti }))
        } catch (e) {
          res.statusCode = 500
          res.end(JSON.stringify({ errore: e instanceof Error ? e.message : String(e) }))
        }
      })
    },
  }
}
