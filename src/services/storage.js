export function createLocalStorageAdapter(storage = window.localStorage) {
  return {
    get(key, fallback) {
      try {
        const raw = storage.getItem(key)
        if (raw == null) return fallback
        return JSON.parse(raw)
      } catch {
        return fallback
      }
    },
    set(key, value) {
      try {
        storage.setItem(key, JSON.stringify(value))
        return true
      } catch {
        return false
      }
    },
  }
}

export const storage = createLocalStorageAdapter()
