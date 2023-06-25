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
			<span v-if="!word.isLoadTranslation">
				{{ word.translations.join(', ') }}
			</span>
			<progress v-else class="progress" />
		</td>
	</tr>
</template>
