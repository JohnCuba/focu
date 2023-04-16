import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
    coverage: {
      provider: 'istanbul',
			all: true,
			// TODO: Need to add .vue files
			include: ['src/**/*.ts'],
    },
	}
})
