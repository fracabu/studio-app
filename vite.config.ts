import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { apiLocale } from './server/api-locale'
import { leggiScreen } from './server/leggi-screen'
import { sbrigoVoce } from './server/sbrigo-voce'

export default defineConfig(({ mode }) => {
  // DATABASE_URL e SESSION_SECRET (da .env.local, fuori da git) servono alle funzioni di api/ anche in locale
  Object.assign(process.env, loadEnv(mode, import.meta.dirname, ''))
  return {
    // leggiScreen: gli screen dei compiti finiscono in dati/screen/ (fuori da git) e li legge Claude Code
    // sbrigoVoce: la voce di Sbrigo (Edge TTS), una volta per frase, in dati/sbrigo-voce/
    // apiLocale: login e progressi, le stesse funzioni che su Vercel stanno in api/
    plugins: [
      react(),
      leggiScreen(path.resolve(import.meta.dirname, 'dati', 'screen')),
      sbrigoVoce(path.resolve(import.meta.dirname, 'dati', 'sbrigo-voce')),
      apiLocale(),
    ],
    // host: true così l'app si apre anche dal tablet o dal telefono sulla stessa rete di casa
    server: { host: true, port: 5190, watch: { ignored: ['**/dati/**'] } },
  }
})
