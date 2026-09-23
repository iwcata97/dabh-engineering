import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import pazaruvajFeedPlugin from './vite-plugin-pazaruvaj'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    pazaruvajFeedPlugin({ baseUrl: 'https://tvoy-domein.com' }) // TODO: Смени с реалния домейн
  ],
})
