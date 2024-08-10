import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://drtx2.github.io/copying-amazon/",
  plugins: [react()],
})
