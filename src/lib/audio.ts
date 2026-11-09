// Registrazioni delle dettature e screen dei compiti, salvati nel browser (IndexedDB).

type Archivio = 'audio' | 'file'

function apri(): Promise<IDBDatabase> {
  return new Promise((ok, ko) => {
    const r = indexedDB.open('studio-app', 2)
    r.onupgradeneeded = () => {
      for (const nome of ['audio', 'file']) {
        if (!r.result.objectStoreNames.contains(nome)) r.result.createObjectStore(nome)
      }
    }
    r.onsuccess = () => ok(r.result)
    r.onerror = () => ko(r.error)
  })
}

async function salva(archivio: Archivio, id: string, blob: Blob): Promise<void> {
  const db = await apri()
  await new Promise<void>((ok, ko) => {
    const tx = db.transaction(archivio, 'readwrite')
    tx.objectStore(archivio).put(blob, id)
    tx.oncomplete = () => ok()
    tx.onerror = () => ko(tx.error)
  })
}

async function leggi(archivio: Archivio, id: string): Promise<Blob | undefined> {
  const db = await apri()
  return new Promise((ok, ko) => {
    const r = db.transaction(archivio).objectStore(archivio).get(id)
    r.onsuccess = () => ok(r.result as Blob | undefined)
    r.onerror = () => ko(r.error)
  })
}

export const salvaAudio = (id: string, blob: Blob) => salva('audio', id, blob)
export const salvaFile = (id: string, blob: Blob) => salva('file', id, blob)

let inRiproduzione: HTMLAudioElement | null = null

export async function ascolta(id: string): Promise<boolean> {
  const blob = await leggi('audio', id)
  if (!blob) return false
  inRiproduzione?.pause()
  const url = URL.createObjectURL(blob)
  inRiproduzione = new Audio(url)
  inRiproduzione.onended = () => URL.revokeObjectURL(url)
  await inRiproduzione.play()
  return true
}

/** Apre lo screen originale da cui viene un compito. */
export async function apriFile(id: string): Promise<boolean> {
  const blob = await leggi('file', id)
  if (!blob) return false
  window.open(URL.createObjectURL(blob), '_blank', 'noopener')
  return true
}
