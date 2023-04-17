import 'fake-indexeddb/auto'
import {describe, it, expect, vi} from 'vitest'
import { LocalDatabase } from '..'

describe('LocalDatabase', () => {
	it('should return instance', () => {
		const instance = new LocalDatabase('test', 1, ['test_store'])

		expect(instance).toBeTruthy()
	})

	it('should init database', async () => {
		const instance = new LocalDatabase('test', 1, ['test_store'])
		const spyOnOpen = vi.spyOn(globalThis.indexedDB, 'open')

		await instance.initDb()

		expect(spyOnOpen).toBeCalledWith('test', 1)
	})

	it('should resolve makeGetAllTransaction', async () => {
		const instance = new LocalDatabase('test', 1, ['test_store'])

		await instance.initDb()

		expect(instance.makeGetAllTransaction('test_store')).resolves.toBeTruthy()
	})

	it('should resolve makeAddTransaction', async () => {
		const instance = new LocalDatabase('test', 1, ['test_store'])

		await instance.initDb()

		expect(instance.makeAddTransaction('test_store', {})).resolves.toBeTruthy()
	})

	it('should resolve makeDeleteTransaction', async () => {
		const instance = new LocalDatabase('test', 1, ['test_store'])

		await instance.initDb()

		expect(instance.makeDeleteTransaction('test_store', 1)).resolves.toBeTruthy()
	})
})
