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
		return this.localService.addWord(
			{
				...word,
				translation: '',
				dateAdd: Date.now()
			}
		)
	}

	async updateWordTranslation(word: DictionaryWord) {
		const translated = await this.translationService.getTranslation(word.value)

		return this.localService.editWord({
			...word,
			translation: translated
		})
	}

	modifyWord(word: DictionaryWord) {
		return this.localService.editWord(word)
	}

	async deleteWord(id: number) {
		return this.localService.deleteWord(id)
	}
}
