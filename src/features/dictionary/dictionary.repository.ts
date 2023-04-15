import { SUPPORTED_PAIRS } from '~/config/app/langs'
import { TranslatorApiService } from '~/features/dictionary/service/api/translator.api.service'
import { DictionaryLocalService } from '~/features/dictionary/service/local/dictionary.local.service'

export class DictionaryRepository {
	private localService!: DictionaryLocalService
	private translationService!: TranslatorApiService

	constructor(key: keyof typeof SUPPORTED_PAIRS = 'en-ru') {
		this.localService = new DictionaryLocalService(key)
		this.translationService = new TranslatorApiService('en', 'ru')
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
