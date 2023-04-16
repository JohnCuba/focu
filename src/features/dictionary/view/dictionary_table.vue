<script setup lang="ts">
import TableRow from './table_row.vue'

defineProps<{
	words: DictionaryWord[]
	selectedWord?: DictionaryWord
}>()

const emit = defineEmits<{
	(e: 'click:word', value: DictionaryWord): void
}>()

const handleClickWord = (value: DictionaryWord) => {
	emit('click:word', value)
}
</script>

<template>
	<table class="table is-fullwidth is-striped is-hoverable">
		<thead>
			<tr class="row">
				<th class="cell">
					Word
				</th>
				<th class="cell">
					Translation
				</th>
			</tr>
		</thead>
		<tbody>
			<TableRow
				v-for="word in words"
				:key="word.id"
				:word="word"
				:is-selected="selectedWord?.id === word.id"
				@click="handleClickWord"
			/>
		</tbody>
	</table>
</template>

<style scoped>
.table {
	padding: calc(var(--spacing) * 2);
	border-collapse: separate;
}
</style>
