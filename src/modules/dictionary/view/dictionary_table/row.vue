<script setup lang="ts">
const props = defineProps<{
	word: Omit<DictionaryWord, 'type'>,
	isSelected: boolean,
}>()

const emit = defineEmits<{
	(e: 'click', value: Omit<DictionaryWord, 'type'>): void
}>()

const handleClick = () => {
	emit('click', props.word)
}
</script>

<template>
	<tr class="hover" :class="{'active': isSelected}" @click="handleClick">
		<td>
			{{ word.value }}
		</td>
		<td class="cell">
			<span>
				{{ word.translations.join(', ') }}
			</span>
		</td>
	</tr>
</template>
