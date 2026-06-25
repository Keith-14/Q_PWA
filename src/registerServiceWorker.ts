// vite-plugin-pwa provides the virtual module for service worker registration.
// It handles autoUpdate, cache busting, and proper lifecycle management.
// This file is kept for reference; the actual registration is triggered in main.tsx
// via the virtual:pwa-register import.

export function registerServiceWorker() {
  // Registration is handled by vite-plugin-pwa's virtual module (virtual:pwa-register)
  // which is imported directly in main.tsx. This function is a no-op kept for
  // compatibility with any existing references.
}
