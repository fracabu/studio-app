// Con `npm run dev` le funzioni di api/ (login, progressi…) girano dentro Vite, come su Vercel:
// stessa logica, stesso database. Le richieste di Node diventano Request/Response standard.
// Gli altri /api/ (leggi-screen, sbrigo) restano ai loro plugin, che vengono prima.

import type { IncomingMessage, ServerResponse } from 'node:http'
import type { Plugin } from 'vite'

const FUNZIONI = new Set(['login', 'logout', 'io', 'progressi', 'profilo', 'password'])

export function apiLocale(): Plugin {
  return {
    name: 'api-locale',
    configureServer(server) {
      server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
        const url = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`)
        const nome = url.pathname.match(/^\/api\/([a-z-]+)\/?$/)?.[1]
        if (!nome || !FUNZIONI.has(nome)) return next()
        try {
          const mod = (await server.ssrLoadModule(`/api/${nome}.ts`)) as Record<string, (r: Request) => Promise<Response>>
          const gestore = mod[req.method ?? 'GET']
          if (!gestore) { res.statusCode = 405; return res.end() }
          const pezzi: Buffer[] = []
          for await (const p of req) pezzi.push(p as Buffer)
          const headers = new Headers()
          for (const [k, v] of Object.entries(req.headers)) if (typeof v === 'string') headers.set(k, v)
          const richiesta = new Request(url, {
            method: req.method,
            headers,
            body: ['GET', 'HEAD'].includes(req.method ?? 'GET') ? undefined : Buffer.concat(pezzi),
          })
          const risposta = await gestore(richiesta)
          res.statusCode = risposta.status
          risposta.headers.forEach((v, k) => res.setHeader(k, v))
          res.end(Buffer.from(await risposta.arrayBuffer()))
        } catch (e) {
          console.error('[api-locale]', nome, e)
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ errore: 'Errore del server' }))
        }
      })
    },
  }
}
