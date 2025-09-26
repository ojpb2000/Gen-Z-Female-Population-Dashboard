import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Cambiado para desarrollo local
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
