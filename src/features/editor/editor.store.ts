import { type InjectionKey, inject, ref } from 'vue'
import {defineStore} from 'pinia'
import { DICTIONARY_STORE_INJECTION } from '~/features/dictionary'

export const EDITOR_STORE_INJECTION: InjectionKey<ReturnType<typeof useEditorStore>> = Symbol('editor-store')

export const useEditorStore = defineStore('editor', () => {
	const dictionaryStore = inject(DICTIONARY_STORE_INJECTION)

	const value = ref('')
	const isLoading = ref(false)

	async function submitWord() {
		isLoading.value = true
		const word = value.value

		if (!word) return

		await dictionaryStore?.addWord({
			value: word
		})
		_reset()
		isLoading.value = false
	}

	function _reset() {
		value.value = ''
	}

	return {
		value,
		isLoading,
		submitWord
	}
})
