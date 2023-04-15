import { type InjectionKey, inject, ref } from 'vue'
import {defineStore} from 'pinia'
import { DICTIONARY_STORE_INJECTION } from '~/features/dictionary'

export const EDITOR_STORE_INJECTION: InjectionKey<ReturnType<typeof useEditorStore>> = Symbol('editor-store')

export const useEditorStore = defineStore('editor', () => {
	const dictionaryStore = inject(DICTIONARY_STORE_INJECTION)

	const value = ref('')

	function submitWord() {
		const word = value.value

		if (!word) return

		_reset()
		dictionaryStore?.setWord({
			value: word
		})
	}

	function _reset() {
		value.value = ''
	}

	return {
		value,
		submitWord
	}
})
