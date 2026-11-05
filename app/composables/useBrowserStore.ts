export type StoreError = 'unavailable' | 'invalid' | 'quota'

export type StoreResult<T> =
  | { ok: true; value: T }
  | { ok: false; error: StoreError }

function unavailable<T>(): StoreResult<T> {
  return { ok: false, error: 'unavailable' }
}

export function readBrowserStore<T>(key: string, fallback: T): StoreResult<T> {
  if (!import.meta.client) return { ok: true, value: fallback }
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return { ok: true, value: fallback }
    return { ok: true, value: JSON.parse(raw) as T }
  } catch (error) {
    return {
      ok: false,
      error: error instanceof SyntaxError ? 'invalid' : 'unavailable',
    }
  }
}

export function writeBrowserStore<T>(key: string, value: T): StoreResult<T> {
  if (!import.meta.client) return unavailable()
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
    return { ok: true, value }
  } catch (error) {
    const quota =
      error instanceof DOMException &&
      (error.name === 'QuotaExceededError' ||
        error.name === 'NS_ERROR_DOM_QUOTA_REACHED')
    return { ok: false, error: quota ? 'quota' : 'unavailable' }
  }
}

export function removeBrowserStore(key: string): StoreResult<null> {
  if (!import.meta.client) return unavailable()
  try {
    window.localStorage.removeItem(key)
    return { ok: true, value: null }
  } catch {
    return { ok: false, error: 'unavailable' }
  }
}
