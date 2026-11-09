import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Expose SPREADSHEET_ID (no VITE_ prefix in .env) to client code alongside VITE_* vars
  envPrefix: ['VITE_', 'SPREADSHEET_'],
})
