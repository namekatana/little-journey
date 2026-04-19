import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // GitHub Pages serves project sites from /<repo>/.
  // If you deploy to a custom domain or user site, change this to '/'.
  base: '/little-journey/',
  plugins: [tailwindcss(), react()],
})
