<script setup lang="ts">
// TODO: Will be refactored
import { storeToRefs } from 'pinia'
import { useDictionaryStore } from '../dictionary.store'
import ListItem from './list_item.vue'

const dictionaryStore = useDictionaryStore()
const {words} = storeToRefs(dictionaryStore)
const {removeWord} = dictionaryStore
</script>

<template>
	<TransitionGroup name="list" tag="ul" class="root">
		<ListItem
			v-for="word in words"
			:key="word.id"
			:word="word"
			@remove="removeWord"
		/>
	</TransitionGroup>
</template>

<style scoped>
.root {
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
	flex-direction: column;
	row-gap: var(--spacing);
}

.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: opacity 0.5s ease-in-out,
							transform 0.5s ease-in-out;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
