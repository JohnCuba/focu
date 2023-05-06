import {describe, it, expect, vi} from 'vitest'
import { DictionaryLocalService } from '../dictionary.local.service'

vi.mock('~/lib/local_database', () => {
	const LocalDatabase = vi.fn()
	LocalDatabase.prototype.initDb = vi.fn()
	LocalDatabase.prototype.makeGetAllTransaction = vi.fn()
	LocalDatabase.prototype.makeAddTransaction = vi.fn()
	LocalDatabase.prototype.makeDeleteTransaction = vi.fn()
	LocalDatabase.prototype.makeEditTransaction = vi.fn()

	return {LocalDatabase}
})

describe('DictionaryLocalService', () => {
	it('should create instance', () => {
		const instance = new DictionaryLocalService('en-ru')

		expect(instance).toBeTruthy()
	})

	it('should call database transaction on getDictionary', () => {
		const instance = new DictionaryLocalService('en-ru')
    const spy = vi.spyOn(instance['dbInstance'], 'makeGetAllTransaction')

		instance.getDictionary()

		expect(spy).toHaveBeenCalledTimes(1)
		expect(spy).toBeCalledWith('en-ru')
	})

	it('should call database transaction on addWord', () => {
		const instance = new DictionaryLocalService('en-ru')
    const spy = vi.spyOn(instance['dbInstance'], 'makeAddTransaction')
		const mockWord = { value: 'test_value', translation: 'test_trans', dateAdd: 12345 }

		instance.addWord(mockWord)

		expect(spy).toHaveBeenCalledTimes(1)
		expect(spy).toBeCalledWith('en-ru', mockWord)
	})

	it('should call database transaction on deleteWord', () => {
		const instance = new DictionaryLocalService('en-ru')
    const spy = vi.spyOn(instance['dbInstance'], 'makeDeleteTransaction')
		const mockWordId = 666

		instance.deleteWord(mockWordId)

		expect(spy).toHaveBeenCalledTimes(1)
		expect(spy).toBeCalledWith('en-ru', mockWordId)
	})

	it('should call database transaction on editWord', () => {
		const instance = new DictionaryLocalService('en-ru')
    const spy = vi.spyOn(instance['dbInstance'], 'makeEditTransaction')
		const mockWord = { id: 11, value: 'test_value', translation: 'test_trans', dateAdd: 12345 }

		instance.editWord(mockWord)

		expect(spy).toHaveBeenCalledTimes(1)
		expect(spy).toBeCalledWith('en-ru', mockWord)
	})
})
