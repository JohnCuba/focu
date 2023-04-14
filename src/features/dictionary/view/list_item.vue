<script setup lang="ts">
defineProps<{
	word: DictionaryWord,
}>()

const emit = defineEmits<{
	(e: 'remove', id: number): void
}>()
</script>

<template>
	<li class="list_item">
		<span>{{ word.value }}</span>
		<img
			src="/img/icons/delete_forever.svg"
			alt="delete word"
			width="18"
			height="18"
			@click="emit('remove', word.id)"
		/>
	</li>
</template>

<style scoped>
.list_item {
	background-color: var(--color-surface-variant);
	border-radius: var(--spacing);
	color: var(--color-on-surface);
	font-weight: 500;
	font-size: 1.2em;
	padding: var(--spacing);
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>
