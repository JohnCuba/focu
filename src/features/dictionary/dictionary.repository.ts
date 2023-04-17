import { SUPPORTED_PAIRS, type SupportedLangPair, type SupportedPairs } from '~/config/app/langs'
import { TranslatorApiService } from './service/translator.api.service'
import { DictionaryLocalService } from './service/dictionary.local.service'

export class DictionaryRepository {
	private localService!: DictionaryLocalService
	private translationService!: TranslatorApiService
	private langPair!: SupportedLangPair

	constructor(key: SupportedPairs = 'en-ru') {
		this.langPair = SUPPORTED_PAIRS[key]
		this.localService = new DictionaryLocalService(key)
		this.translationService = new TranslatorApiService(this.langPair)
	}

	getAll() {
		return this.localService.getDictionary()
	}

	async addWord(word: Omit<DictionaryWord, 'id' | 'translation' | 'dateAdd'>) {
		const translated = await this.translationService.getTranslation(word.value)

		return this.localService.addWord(
			{
				...word,
				translation: translated,
				dateAdd: Date.now()
			}
		)
	}

	deleteWord(id: number) {
		return this.localService.deleteWord(id)
	}
}
