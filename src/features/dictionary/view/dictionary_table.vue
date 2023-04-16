<script setup lang="ts">
import dayjs from 'dayjs'
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

const checkIsSameDate = (a: number, b?: number) => {
	if (!b) return false

	return dayjs(a).isSame(dayjs(b), 'day')
}
</script>

<template>
	<table class="table is-fullwidth is-striped is-hoverable">
		<thead>
			<tr>
				<th>Word</th>
				<th>Translation</th>
			</tr>
		</thead>
		<tbody>
			<template v-for="(word, index) in words" :key="word.id">
				<tr v-if="!checkIsSameDate(word.dateAdd, words[index - 1]?.dateAdd)">
					<th>{{ dayjs(word.dateAdd).format('DD.MM.YYYY') }}</th>
					<td></td>
				</tr>
				<TableRow
					:word="word"
					:is-selected="selectedWord?.id === word.id"
					@click="handleClickWord"
				/>
			</template>
		</tbody>
	</table>
</template>

<style scoped>
.table {
	padding: calc(var(--spacing) * 2);
	border-collapse: separate;
}
</style>
