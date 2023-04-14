<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDictionaryStore } from '../dictionary.store'
import DictionaryTable from './dictionary_table.vue'

const dictionaryStore = useDictionaryStore()
const {words} = storeToRefs(dictionaryStore)
const {removeWord} = dictionaryStore
</script>

<template>
	<DictionaryTable :words="words" />
</template>
