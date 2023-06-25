import { describe, expect, it } from 'vitest'
import { THEMES } from '../themes'

describe('themes', () => {
	it('should export themes', () => {
		expect(THEMES).toBeInstanceOf(Array)
	})
})
