import { defineStore } from 'pinia'
import { type InjectionKey, ref } from 'vue'
import { DictionaryRepository } from './dictionary.repository'

export const DICTIONARY_STORE_INJECTION: InjectionKey<ReturnType<typeof useDictionaryStore>> = Symbol('dictionary-store')

export const useDictionaryStore = defineStore('dictionary', () => {
	const repository = new DictionaryRepository()
	const words = ref<DictionaryWord[]>([])

	const setWord = async ({value}: {value: DictionaryWord['value']}) => {
		const newWordRaw = {
			value,
		}
		const newWord = await repository.addWord(newWordRaw)
		words.value = [newWord, ...words.value]
	}

	const removeWord = async (wordId: number) => {
		const deletedId = await repository.deleteWord(wordId)
		words.value = words.value.filter(({id}) => id !== deletedId)
	}

	const fetchWords = async () => {
		words.value = await repository.getAll().then((dictionary) => dictionary.reverse())
	}

	return {
		words,
		setWord,
		removeWord,
		fetchWords
	}
})
