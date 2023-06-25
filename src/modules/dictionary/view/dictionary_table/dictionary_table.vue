<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useDictionaryStore } from '~/modules/dictionary/store'
import Table from './table.vue'
import WordModal from '../word_modal/word_modal.vue'

defineProps<{
	headClass: string
	footClass: string
}>()

const dictionaryStore = useDictionaryStore()
const {dictionary} = storeToRefs(dictionaryStore)
const {removeWord, editWord} = dictionaryStore

const selectedWord = ref<DictionaryWord | undefined>()

const handleSelectWord = (word: DictionaryWord) => {
	selectedWord.value = word
}

const handleCloseModal = () => {
	selectedWord.value = undefined
}

const handleRemoveWord = (word: DictionaryWord) => {
	removeWord(word)
	handleCloseModal()
}

const handleSaveWord = (word: DictionaryWord) => {
	editWord(word)
	handleCloseModal()
}
</script>

<template>
	<Table
		:words="dictionary"
		:selected-word="selectedWord"
		:head-class="headClass"
		:foot-class="footClass"
		@click:word="handleSelectWord"
	/>
	<WordModal
		:word="selectedWord"
		@click:close="handleCloseModal"
		@click:remove="handleRemoveWord"
		@click:save="handleSaveWord"
	/>
</template>
