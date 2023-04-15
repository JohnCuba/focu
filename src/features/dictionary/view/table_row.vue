<script setup lang="ts">

const props = defineProps<{
	word: DictionaryWord,
}>()

const emit = defineEmits<{
	(e: 'click', value: DictionaryWord): void
}>()

const handleClick = () => {
	emit('click', props.word)
}
</script>

<template>
	<tr class="row" @click="handleClick">
		<td class="cell word-cell">
			{{ word.value }}
		</td>
		<td class="cell">
			{{ word.translation }}
		</td>
	</tr>
</template>

<style scoped>
.row {
	background-color: var(--color-surface-variant);
	line-height: 2em;
	transition: background-color 0.2s ease-in-out,
							box-shadow 0.2s ease-in-out;
	border-radius: var(--spacing);
	box-shadow: var(--elevation-1);
}

.row:hover {
	background-color: var(--color-inverse-on-surface);
	box-shadow: var(--elevation-2);
}

.cell:first-child {
	border-top-left-radius: var(--spacing);
	border-bottom-left-radius: var(--spacing);
	padding-left: calc(var(--spacing) * 2);
}

.cell:last-child {
	border-top-right-radius: var(--spacing);
	border-bottom-right-radius: var(--spacing);
	padding-right: calc(var(--spacing) * 2);
}
</style>
