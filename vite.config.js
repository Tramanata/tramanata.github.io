import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensure the app works relative to the root
  server: {
    historyApiFallback: true, // This ensures that the app handles all routes via index.html
  },
})
