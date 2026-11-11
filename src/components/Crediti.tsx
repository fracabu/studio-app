/** Crediti in fondo a ogni pagina, come nell'app Bradipo: logo e link al sito di codecraft. */
export function Crediti() {
  return (
    <footer className="crediti">
      <a href="https://www.codecraft.it/" target="_blank" rel="noopener">
        Sviluppato da
        <svg viewBox="6 14 88 78" aria-hidden="true">
          <path d="M8 44V30Q40 18 74 16V30H92V44Z M8 90V50H92V90Z M13 90V68A10 10 0 0 1 33 68V90Z M40 90V68A10 10 0 0 1 60 68V90Z" fill="currentColor" fillRule="evenodd" />
          <path d="M67 90V68A10 10 0 0 1 87 68V90Z" fill="#FF7511" />
        </svg>
        <b><span>code</span>craft</b>
      </a>
    </footer>
  )
}
