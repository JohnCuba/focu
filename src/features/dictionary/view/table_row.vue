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
	<tr class="hover" :class="{'active': isSelected}" @click="handleClick">
		<td>
			{{ word.value }}
		</td>
		<td class="cell">
			<span v-if="!word.isLoadTranslation">
				{{ word.translation }}
			</span>
			<progress v-else class="progress" />
		</td>
	</tr>
</template>
