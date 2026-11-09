import { ELENCO_MATERIE, MATERIE } from '../data/materie'
import { ORARIO } from '../data/orario'
import { chiave } from './date'

const fmt = new Intl.DateTimeFormat('it-IT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

/** Quello che Claude deve sapere per mettere i compiti letti da uno screen sui giorni giusti. */
export function contestoScuola(oggi: Date): string {
  const orario = ORARIO.map((g) => `- ${g.nome}: ${g.ore.map((id) => MATERIE[id].nome).join(', ')}`).join('\n')
  const ids = ELENCO_MATERIE.map((m) => `${m.id} (${m.nome})`).join(', ')
  return `Oggi è ${fmt.format(oggi)} (${chiave(oggi)}).

Orario settimanale della classe:
${orario}

Id delle materie da usare: ${ids}`
}
