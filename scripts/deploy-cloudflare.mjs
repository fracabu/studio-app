// Pubblica l'app su Cloudflare Pages (codecraft-prima-media.pages.dev).
//   npm run deploy
// 1) build (tsc + vite); 2) toglie da dist/ i video .mp4: online arrivano da Drive e Cloudflare
// non accetta file sopra 25 MiB; 3) wrangler pages deploy (carica dist/ e le funzioni di functions/).

import { spawnSync } from 'node:child_process'
import { readdirSync, rmSync, statSync } from 'node:fs'
import path from 'node:path'

const esegui = (cmd) => {
  const r = spawnSync(cmd, { stdio: 'inherit', shell: true })
  if (r.status !== 0) process.exit(r.status ?? 1)
}

esegui('npm run build')

const LIMITE = 25 * 1024 * 1024
const troppoGrandi = []
const giro = (dir) => {
  for (const nome of readdirSync(dir)) {
    const p = path.join(dir, nome)
    const s = statSync(p)
    if (s.isDirectory()) giro(p)
    else if (nome.endsWith('.mp4')) { rmSync(p); console.log('tolto', p) }
    else if (s.size > LIMITE) troppoGrandi.push(p)
  }
}
giro('dist')
if (troppoGrandi.length) {
  console.error('File sopra 25 MiB, Cloudflare non li accetta:', troppoGrandi)
  process.exit(1)
}

esegui('npx --yes wrangler@4 pages deploy dist --project-name codecraft-prima-media --branch main --commit-dirty=true')
