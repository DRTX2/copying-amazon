import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  // base: "https://drtx2.github.io/copying-amazon/",
  base: "/copying-amazon/",
  plugins: [react(), tailwindcss()],
})
