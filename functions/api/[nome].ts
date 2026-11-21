// Cloudflare Pages: un solo indirizzo /api/<nome> che passa la richiesta alle stesse funzioni di api/
// usate da Vercel e da `npm run dev` (server/api-locale.ts). Le funzioni restano Request → Response.
// Serve il flag nodejs_compat (wrangler.toml) per node:crypto (scrypt, HMAC) e Buffer.
// Le variabili del progetto Cloudflare (DATABASE_URL, SESSION_SECRET) arrivano in `env`: _lib.ts le
// legge da process.env, quindi qui si copiano lì prima di chiamare la funzione.

import * as compiti from '../../api/compiti.js'
import * as io from '../../api/io.js'
import * as login from '../../api/login.js'
import * as logout from '../../api/logout.js'
import * as password from '../../api/password.js'
import * as profilo from '../../api/profilo.js'
import * as progressi from '../../api/progressi.js'

type Gestore = (req: Request) => Promise<Response>
const FUNZIONI: Record<string, Record<string, Gestore | undefined>> = { compiti, io, login, logout, password, profilo, progressi }

type Contesto = { request: Request; params: { nome?: string | string[] }; env: Record<string, unknown> }

export async function onRequest({ request, params, env }: Contesto): Promise<Response> {
  for (const [k, v] of Object.entries(env)) if (typeof v === 'string') process.env[k] = v
  const mod = FUNZIONI[String(params.nome ?? '')]
  if (!mod) return new Response('Non trovato', { status: 404 })
  const gestore = mod[request.method]
  if (!gestore) return new Response(null, { status: 405 })
  try {
    return await gestore(request)
  } catch (e) {
    console.error('[api]', params.nome, e)
    return new Response(JSON.stringify({ errore: 'Errore del server' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    })
  }
}
