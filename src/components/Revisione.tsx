import { ELENCO_MATERIE, MATERIE, type MateriaId } from '../data/materie'
import type { Bozza } from '../lib/compiti'
import { coloreMateria } from './Cella'

/** I compiti capiti dall'app, da correggere prima di scriverli sul diario. */
export function Revisione({ bozze, onChange }: { bozze: Bozza[]; onChange: (b: Bozza[]) => void }) {
  const cambia = (id: string, m: Partial<Bozza>) => onChange(bozze.map((b) => (b.id === id ? { ...b, ...m } : b)))
  if (bozze.length === 0) {
    return <p className="tenue">Nessun compito riconosciuto.</p>
  }
  return (
    <ul className="bozze">
      {bozze.map((b) => {
        const m = b.materia ? MATERIE[b.materia] : null
        return (
          <li key={b.id} style={m ? coloreMateria(m.hue, m.chroma) : coloreMateria(0, 0)}>
            <select
              aria-label="Materia"
              value={b.materia ?? ''}
              onChange={(e) => cambia(b.id, { materia: (e.target.value || null) as MateriaId | null })}
            >
              <option value="">Materia?</option>
              {ELENCO_MATERIE.map((x) => (
                <option key={x.id} value={x.id}>{x.nome}</option>
              ))}
            </select>
            <input aria-label="Compito" value={b.testo} onChange={(e) => cambia(b.id, { testo: e.target.value })} />
            <label className="per-il">
              per
              <input
                type="date"
                aria-label="Giorno di consegna"
                value={b.perIl}
                onChange={(e) => e.target.value && cambia(b.id, { perIl: e.target.value })}
              />
            </label>
            <button className="link" onClick={() => onChange(bozze.filter((x) => x.id !== b.id))}>Togli</button>
          </li>
        )
      })}
    </ul>
  )
}
