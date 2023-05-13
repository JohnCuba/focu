import { type InjectionKey, inject, ref } from 'vue'
import {defineStore} from 'pinia'
import { DICTIONARY_STORE_INJECTION } from '~/features/dictionary'

export const EDITOR_STORE_INJECTION: InjectionKey<ReturnType<typeof useEditorStore>> = Symbol('editor-store')

export const useEditorStore = defineStore('editor', () => {
	const dictionaryStore = inject(DICTIONARY_STORE_INJECTION)

	const word = ref('')
	const isLoading = ref(false)

	const submitWord = async () => {
		isLoading.value = true

		if (!word.value) {
			_reset()
			return
		}

		await dictionaryStore?.addWord({
			value: word.value
		})

		_reset()
	}

	const _reset = () => {
		word.value = ''
		isLoading.value = false
	}

	return {
		word,
		isLoading,
		submitWord
	}
})
