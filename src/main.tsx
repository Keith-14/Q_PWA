import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// vite-plugin-pwa: auto-registers and updates the service worker in production
import { registerSW } from 'virtual:pwa-register'

createRoot(document.getElementById("root")!).render(<App />);

// Register SW with autoUpdate — silently refreshes when a new version is available
registerSW({ immediate: true });

