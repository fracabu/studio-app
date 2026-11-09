import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import './styles.css'

// Compiti, stelle e personaggi stanno in localStorage; audio e screen in IndexedDB.
// Senza questa richiesta il browser può cancellarli da solo quando il disco è pieno.
navigator.storage?.persist?.().catch(() => {})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
