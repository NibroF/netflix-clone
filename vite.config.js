import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Netflix-clone-2026/", // 👈 THIS LINE LOADS YOUR JS/CSS FILES PROPERLY
})