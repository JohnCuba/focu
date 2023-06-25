import path from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
	base: '/focu',
  define: {
    global: 'window',
  },
  plugins: [
		Vue(),
		Pages(),
		VitePWA({
			injectRegister: 'auto',
			registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,svg}']
      },
			devOptions: {
        enabled: true
      },
		}),
	],
})
