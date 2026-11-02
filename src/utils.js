// Resolves a path from config.js against the site's base URL so it works
// wherever the built site is hosted.
export const asset = (path) => `${import.meta.env.BASE_URL}${path}`

export function readSession(key) {
  try {
    return window.sessionStorage.getItem(key)
  } catch {
    return null
  }
}
export function writeSession(key, value) {
  try {
    window.sessionStorage.setItem(key, value)
  } catch {
    /* private mode — selection simply won't persist */
  }
}
