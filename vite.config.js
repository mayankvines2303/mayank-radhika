import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' keeps every asset path relative, so the built site works from any
// folder or sub-path (Netlify, GitHub Pages, a sub-directory, etc.).
export default defineConfig({
  base: './',
  plugins: [react()],
})
