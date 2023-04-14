<script setup lang="ts">

defineProps<{
	word: DictionaryWord,
}>()
</script>

<template>
	<tr class="row">
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
}

.row:hover {
	background-color: var(--color-inverse-on-surface);
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
