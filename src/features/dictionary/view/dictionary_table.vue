<script setup lang="ts">
import TableRow from './table_row.vue'

defineProps<{
	words: DictionaryWord[]
}>()

const emit = defineEmits<{
	(e: 'click:word', value: DictionaryWord): void
}>()

const handleClickWOrd = (value: DictionaryWord) => {
	emit('click:word', value)
}
</script>

<template>
	<table class="table">
		<thead>
			<tr class="row">
				<td class="cell">
					Word
				</td>
				<td class="cell">
					Translation
				</td>
			</tr>
		</thead>
		<tbody>
			<TableRow
				v-for="word in words"
				:key="word.id"
				:word="word"
				@click="handleClickWOrd"
			/>
		</tbody>
	</table>
</template>

<style scoped>
.table {
	width: 100%;
	background-color: var(--color-surface);
	padding: var(--spacing);
	border-radius: var(--spacing);
	border-collapse: separate;
	border-spacing: 0 var(--spacing);
}

.cell {
	border-bottom: 1px solid var(--color-outline);
}

.cell:first-child {
	padding-left: calc(var(--spacing) * 2);
}

.cell:not(:last-child) {
	border-right: 1px solid var(--color-outline);
}
</style>
