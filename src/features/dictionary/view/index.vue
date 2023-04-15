<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useDictionaryStore } from '../dictionary.store'
import DictionaryTable from './dictionary_table.vue'
import { RecordModal } from '~/features/record'

const dictionaryStore = useDictionaryStore()
const {words} = storeToRefs(dictionaryStore)
const {removeWord} = dictionaryStore

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
</script>

<template>
	<DictionaryTable :words="words" @click:word="handleSelectWord" />
	<RecordModal :word="selectedWord" @click:background="handleCloseModal" @click:remove="handleRemoveWord" />
</template>
