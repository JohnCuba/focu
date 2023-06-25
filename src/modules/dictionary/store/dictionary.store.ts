import { defineStore } from 'pinia'
import { DictionaryModel } from '../model'
import { InjectionKey, ref } from 'vue'

export const DICTIONARY_STORE_INJECTION: InjectionKey<ReturnType<typeof useDictionaryStore>> = Symbol('dictionary-store')

export const useDictionaryStore = defineStore('dictionary-store', () => {
	const dictionaryModel = new DictionaryModel()

	const dictionary = ref<DictionaryWord[]>([])

	const fetchDictionary = async () => {
		const data = await dictionaryModel.getDictionary(true)

		dictionary.value = data.documents
	}

	const addWord = async (data: Pick<DictionaryWord, 'value' | 'translations'>) => {
		const preparedData = dictionaryModel.generateMeta(data)

		dictionary.value = [
			preparedData,
			...dictionary.value
		]

		const newWord = await dictionaryModel.addWord(preparedData)

		dictionary.value = dictionary.value.map(
			(dictionaryWord) => {
				return dictionaryModel.isEqual(dictionaryWord, newWord, true) ? newWord : dictionaryWord
			}
		)
	}

	const removeWord = async (data: DictionaryWord) => {
		dictionary.value = dictionary.value.filter((word) => !dictionaryModel.isEqual(data, word, true))

		await dictionaryModel.removeWord(data.key)
	}

	const editWord = async (data: DictionaryWord) => {
		const wordIndex = dictionary.value.findIndex(({key}) => key === data.key)

		dictionary.value[wordIndex] = data
	}

	const _init = () => {
		fetchDictionary()
	}

	return {
		_init,
		dictionary,
		fetchDictionary,
		addWord,
		removeWord,
		editWord
	}
})
