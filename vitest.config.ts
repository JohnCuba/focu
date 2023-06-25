import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [vue()],
	test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      provider: 'istanbul',
			all: true,
			include: ['src/**/*.ts', 'src/**/*.vue'],
    },
	},
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
})
