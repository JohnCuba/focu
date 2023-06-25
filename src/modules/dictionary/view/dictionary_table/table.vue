<script setup lang="ts">
import Row from './row.vue'
import EditorRow from './editor_row.vue'

defineProps<{
	words: Omit<DictionaryWord, 'type'>[]
	selectedWord?: DictionaryWord
	headClass: string
	footClass: string
}>()

const emit = defineEmits<{
	(e: 'click:word', value: Omit<DictionaryWord, 'type'>): void
}>()

const handleClickWord = (value: Omit<DictionaryWord, 'type'>) => {
	emit('click:word', value)
}
</script>

<template>
	<table class="table table-pin-rows w-full p-2">
		<thead :class="headClass">
			<tr>
				<th>Слово</th>
				<th>Перевод</th>
			</tr>
		</thead>
		<tbody>
			<template v-for="(word) in words" :key="word.key">
				<Row
					:word="word"
					:is-selected="selectedWord?.key === word.key"
					@click="handleClickWord"
				/>
			</template>
		</tbody>
		<tfoot :class="footClass">
			<EditorRow />
		</tfoot>
	</table>
</template>
