import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { leggiScreen } from './server/leggi-screen'
import { sbrigoVoce } from './server/sbrigo-voce'

export default defineConfig({
  // leggiScreen: gli screen dei compiti finiscono in dati/screen/ (fuori da git) e li legge Claude Code
  // sbrigoVoce: la voce di Sbrigo (Edge TTS), una volta per frase, in dati/sbrigo-voce/
  plugins: [
    react(),
    leggiScreen(path.resolve(import.meta.dirname, 'dati', 'screen')),
    sbrigoVoce(path.resolve(import.meta.dirname, 'dati', 'sbrigo-voce')),
  ],
  // host: true così l'app si apre anche dal tablet o dal telefono sulla stessa rete di casa
  server: { host: true, port: 5190, watch: { ignored: ['**/dati/**'] } },
})
