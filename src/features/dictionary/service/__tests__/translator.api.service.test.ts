import {describe, it, expect, vi} from 'vitest'
import { TranslatorApiService } from '../translator.api.service'
import { SUPPORTED_PAIRS } from '~/config/app/langs'

vi.mock('~/lib/fetcher', () => {
	const Fetcher = vi.fn()
	Fetcher.prototype.post = () => Promise.resolve({translatedText: 'translatedText'})

	return {Fetcher}
})

const langPair = SUPPORTED_PAIRS['en-ru']

describe('TranslatorApiService', () => {
	it('should create instance', () => {
		const instance = new TranslatorApiService(langPair)

		expect(instance).toBeTruthy()
	})

	it('should call fetcher with right params', () => {
		const instance = new TranslatorApiService(langPair)
		const spy = vi.spyOn(instance['fetcher'], 'post')

		instance.getTranslation('test')

		expect(spy).toBeCalledWith(
			'/translate',
			{
				body: {
					q: 'test',
					source: langPair.source,
					target: langPair.target
				}
			}
		)
	})

	it('should return result of translation api', async () => {
		const instance = new TranslatorApiService(langPair)

		const result = await instance.getTranslation('test')

		expect(result).toBe('translatedText')
	})
})
