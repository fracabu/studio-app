// Voce di Sbrigo: Edge TTS (gratis) con la voce Diego alzata di tono, come Ripamino ma più
// acuta e veloce. Ogni frase si genera una volta e resta in dati/sbrigo-voce/ (fuori da git:
// i saluti contengono i compiti veri).
//   GET  /api/sbrigo/voce?t=<testo>   → audio/mpeg
//   POST /api/sbrigo/scalda  ["frase", …] → le prepara in sottofondo, una alla volta

import { spawn } from 'node:child_process'
import { createHash } from 'node:crypto'
import { existsSync } from 'node:fs'
import { mkdir, readFile, rename } from 'node:fs/promises'
import type { IncomingMessage, ServerResponse } from 'node:http'
import path from 'node:path'
import type { Plugin } from 'vite'

const VOCE = { nome: 'it-IT-DiegoNeural', rate: '+12%', pitch: '+55Hz' }
const MAX_TESTO = 500
const ATTESA_MASSIMA = 90_000
/** Pausa fra una frase e l'altra quando le prepara in anticipo: Microsoft rallenta chi chiede troppo. */
const PAUSA_CODA = 4_000

/** Quello che si legge ad alta voce: niente puntini di sospensione, niente emoji. */
export function perLaVoce(testo: string): string {
  return testo
    .replace(/…/g, ', ')
    .replace(/[\p{Extended_Pictographic}\u{FE0F}]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, MAX_TESTO)
}

export function sbrigoVoce(cartella: string): Plugin {
  const inCorso = new Map<string, Promise<string>>()
  const coda = new Set<string>()
  let codaAttiva = false

  const fileDi = (testo: string) =>
    path.join(cartella, createHash('sha1').update(`${VOCE.nome}|${VOCE.rate}|${VOCE.pitch}|${testo}`).digest('hex').slice(0, 20) + '.mp3')

  function genera(testo: string): Promise<string> {
    const file = fileDi(testo)
    if (existsSync(file)) return Promise.resolve(file)
    const gia = inCorso.get(file)
    if (gia) return gia
    const lavoro = (async () => {
      await mkdir(cartella, { recursive: true })
      const tmp = `${file}.${process.pid}.tmp.mp3`
      await new Promise<void>((ok, ko) => {
        const p = spawn('edge-tts', ['--voice', VOCE.nome, `--rate=${VOCE.rate}`, `--pitch=${VOCE.pitch}`, '--text', testo, '--write-media', tmp], {
          windowsHide: true,
        })
        // il servizio Microsoft a volte si pianta: meglio rinunciare e riprovare più tardi
        const scadenza = setTimeout(() => p.kill(), ATTESA_MASSIMA)
        let err = ''
        p.stderr.on('data', (d) => (err += d))
        p.on('error', (e) => (clearTimeout(scadenza), ko(e)))
        p.on('close', (code) => {
          clearTimeout(scadenza)
          code === 0 ? ok() : ko(new Error(`edge-tts uscito con ${code}: ${err.slice(0, 300)}`))
        })
      })
      await rename(tmp, file)
      return file
    })()
    inCorso.set(file, lavoro)
    lavoro.finally(() => inCorso.delete(file)).catch(() => {})
    return lavoro
  }

  async function svuotaCoda() {
    if (codaAttiva) return
    codaAttiva = true
    let fatte = 0
    while (coda.size) {
      const testo = coda.values().next().value!
      coda.delete(testo)
      if (existsSync(fileDi(testo))) continue
      try {
        await genera(testo)
        fatte++
      } catch (e) {
        console.warn('[sbrigo] voce non generata:', (e as Error).message)
      }
      await new Promise((r) => setTimeout(r, PAUSA_CODA))
    }
    if (fatte) console.log(`[sbrigo] voce pronta per ${fatte} frasi nuove`)
    codaAttiva = false
  }

  function leggiCorpo(req: IncomingMessage): Promise<string> {
    return new Promise((ok, ko) => {
      let s = ''
      req.on('data', (d) => {
        s += d
        if (s.length > 200_000) req.destroy()
      })
      req.on('end', () => ok(s))
      req.on('error', ko)
    })
  }

  async function gestisci(req: IncomingMessage, res: ServerResponse, next: () => void) {
    const url = new URL(req.url ?? '', 'http://x')
    try {
      if (url.pathname === '/api/sbrigo/voce' && req.method === 'GET') {
        const testo = perLaVoce(url.searchParams.get('t') ?? '')
        if (!testo) return void res.writeHead(400).end()
        const audio = await readFile(await genera(testo))
        res.writeHead(200, { 'Content-Type': 'audio/mpeg', 'Cache-Control': 'private, max-age=31536000', 'Content-Length': audio.length })
        return void res.end(audio)
      }
      if (url.pathname === '/api/sbrigo/scalda' && req.method === 'POST') {
        const frasi: unknown = JSON.parse(await leggiCorpo(req))
        if (Array.isArray(frasi)) {
          for (const f of frasi) if (typeof f === 'string' && perLaVoce(f)) coda.add(perLaVoce(f))
          void svuotaCoda()
        }
        return void res.writeHead(204).end()
      }
    } catch (e) {
      console.warn('[sbrigo]', (e as Error).message)
      return void res.writeHead(500).end()
    }
    next()
  }

  return {
    name: 'sbrigo-voce',
    configureServer(server) {
      server.middlewares.use((req, res, next) => void gestisci(req, res, next))
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => void gestisci(req, res, next))
    },
  }
}
