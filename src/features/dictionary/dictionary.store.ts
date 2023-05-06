import { defineStore } from 'pinia'
import { type InjectionKey, ref } from 'vue'
import { DictionaryRepository } from './dictionary.repository'

export const DICTIONARY_STORE_INJECTION: InjectionKey<ReturnType<typeof useDictionaryStore>> = Symbol('dictionary-store')

export const useDictionaryStore = defineStore('dictionary', () => {
	const repository = new DictionaryRepository()
	const words = ref<DictionaryWord[]>([])

	const _editWordInStore = (editedWord: DictionaryWord) => {
		words.value = words.value.map((word) => editedWord.id === word.id ? editedWord : word)
	}

	const addWord = async ({value}: {value: DictionaryWord['value']}) => {
		const newWordRaw = {value}

		const newWord = await repository.addWord(newWordRaw)

		words.value = [newWord, ...words.value]

		updateWordTranslation(newWord)
	}

	const updateWordTranslation = async (word: DictionaryWord) => {
		_editWordInStore({ ...word, isLoadTranslation: true})

		let resultWord = word

		try {
			resultWord = await repository.updateWordTranslation(word)
		} finally {
			_editWordInStore({...resultWord, isLoadTranslation: false})
		}
	}

	const removeWord = async (wordId: number) => {
		const deletedId = await repository.deleteWord(wordId)
		words.value = words.value.filter(({id}) => id !== deletedId)
	}

	const modifyWord = async (word: DictionaryWord) => {
		_editWordInStore({ ...word, isLoadTranslation: true})

		let resultWord = word

		try {
			resultWord = await repository.modifyWord(word)
		} finally {
			_editWordInStore({...resultWord, isLoadTranslation: false})
		}
	}

	const fetchWords = async () => {
		words.value = await repository.getAll().then((dictionary) => dictionary.reverse())
	}

	return {
		words,
		addWord,
		removeWord,
		fetchWords,
		updateWordTranslation,
		modifyWord
	}
})
