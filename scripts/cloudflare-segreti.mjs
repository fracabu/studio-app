// Copia DATABASE_URL e SESSION_SECRET da .env.local nei segreti del progetto Cloudflare Pages,
// senza stamparli: wrangler li legge dallo standard input.
//   node --env-file=.env.local scripts/cloudflare-segreti.mjs

import { spawnSync } from 'node:child_process'

for (const nome of ['DATABASE_URL', 'SESSION_SECRET']) {
  const valore = process.env[nome]
  if (!valore) throw new Error(`Manca ${nome} in .env.local`)
  const r = spawnSync('npx --yes wrangler@4 pages secret put ' + nome + ' --project-name codecraft-prima-media', {
    input: valore,
    shell: true,
    encoding: 'utf8',
  })
  console.log(nome, r.status === 0 ? 'ok' : 'ERRORE\n' + r.stdout + r.stderr)
}
