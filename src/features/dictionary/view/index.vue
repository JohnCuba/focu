<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useDictionaryStore } from '../dictionary.store'
import DictionaryTable from './dictionary_table.vue'
import { RecordModal } from '~/features/record'

const dictionaryStore = useDictionaryStore()
const {words} = storeToRefs(dictionaryStore)
const {removeWord, modifyWord, getWordTranslation} = dictionaryStore

const selectedWord = ref<DictionaryWord | undefined>()

const handleSelectWord = (word: DictionaryWord) => {
	selectedWord.value = word
}

const handleCloseModal = () => {
	selectedWord.value = undefined
}

const handleRemoveWord = (word: DictionaryWord) => {
	removeWord(word.id)
	handleCloseModal()
}

const handleSaveWord = (word: DictionaryWord) => {
	modifyWord(word)
	handleCloseModal()
}

const handleUpdateTranslation = (word: DictionaryWord) => {
	if (!selectedWord.value) return

	selectedWord.value = {
		...selectedWord.value,
		isLoadTranslation: true,
	}

	getWordTranslation(word)
		.then((translation) => {
			if (!selectedWord.value) return

			selectedWord.value = {
				...selectedWord.value,
				translation,
				isLoadTranslation: false,
			}
		})
		.finally(() => {
			if (!selectedWord.value) return

			selectedWord.value = {
				...selectedWord.value,
				isLoadTranslation: false,
			}
		})
}
</script>

<template>
	<DictionaryTable :words="words" :selected-word="selectedWord" @click:word="handleSelectWord" />
	<RecordModal
		:word="selectedWord"
		@click:close="handleCloseModal"
		@click:remove="handleRemoveWord"
		@click:save="handleSaveWord"
		@click:update-translation="handleUpdateTranslation"
	/>
</template>
