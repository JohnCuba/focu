<script setup lang="ts">

const props = defineProps<{
	word: DictionaryWord,
	isSelected: boolean,
}>()

const emit = defineEmits<{
	(e: 'click', value: DictionaryWord): void
}>()

const handleClick = () => {
	emit('click', props.word)
}
</script>

<template>
	<tr :class="{'is-selected': isSelected}" @click="handleClick">
		<td>
			{{ word.value }}
		</td>
		<td class="cell">
			{{ word.translation }}
		</td>
	</tr>
</template>
