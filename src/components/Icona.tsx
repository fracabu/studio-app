// Icone a tratto, un po' storte come disegnate a pennarello.
const TRATTI: Record<string, string> = {
  oggi: 'M12 7.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zM12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.2 5.3l1.6 1.5M17.3 17.2l1.5 1.6M5.3 18.8l1.5-1.6M17.2 6.8l1.6-1.5',
  diario: 'M5 3.5h11.5a2 2 0 0 1 2 2v14.8H6.8A1.8 1.8 0 0 1 5 18.5zM5 18.5a1.8 1.8 0 0 1 1.8-1.7h11.7M9 7.5h6M9 10.5h4.5',
  lezioni: 'M3.5 5.5h17a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-17a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1zM10 9.2v5.6l4.6-2.8z',
  orario: 'M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM12 7v5.3l3.4 2.1',
  materie: 'M4 4.5h4.2v15H4zM10 4.5h4.2v15H10zM16.2 5.3l3.9-1 3 14.5-3.9.9z',
  personaggi: 'M12 2.8l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.6l-5.4 2.9 1.1-6.1-4.5-4.2 6.1-.8z',
  colori: 'M12 3c5 0 9 3.6 9 8 0 2.6-2.2 3.9-4.4 3.4-1.7-.4-2.9 1.1-2.2 2.6.8 1.8-.3 3.9-2.6 3.9C6.9 20.9 3 17 3 12s4-9 9-9zM7.6 11.3h.1M10.5 7.4h.1M15 7.6h.1',
}

export function Icona({ nome }: { nome: keyof typeof TRATTI | string }) {
  return (
    <svg className="icona" viewBox="0 0 24 24" aria-hidden="true">
      <path d={TRATTI[nome]} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
