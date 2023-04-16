<script setup lang="ts">
import { computed, ref } from 'vue'
import {storeToRefs} from 'pinia'
import {useEditorStore} from '../editor.store'
import { useHideOnScroll } from '~/lib/hooks/useHideOnScroll'
import Speech from './speech.vue'

export type EditorViewExpose = {
	elementRef: HTMLDivElement
}

const elementRef = ref<HTMLDivElement>()

const editorStore = useEditorStore()
const {value, isLoading} = storeToRefs(editorStore)
const {submitWord} = editorStore
const componentHeight = computed(() => elementRef.value?.offsetHeight || 0)
const controlClasses = computed(() => ({
	'is-loading': isLoading.value,
}))

const {isHidden} = useHideOnScroll({offset: componentHeight})

defineExpose({
	elementRef
})
</script>

<template>
	<div ref="elementRef" class="root" :class="{'root--hidden': isHidden}">
		<div class="input-wrapper control is-large" :class="controlClasses">
			<input
				v-model="value"
				type="text"
				class="input is-large is-rounded is-primary"
				placeholder="Type something..."
				:disabled="isLoading"
				@keypress.enter="submitWord"
			/>
		</div>
		<Speech v-model="value" />
	</div>
</template>

<style scoped>
.root {
	position: fixed;
	top: var(--spacing);
	width: 100%;
	padding: 0 calc(var(--spacing) * 2);
	display: flex;
	align-items: stretch;
	column-gap: calc(var(--spacing) * 2);
	transition: top 0.6s ease-in-out;
}

.root--hidden {
	top: -100px;
}

.input-wrapper {
	width: 100%;
}
.input-wrapper.is-loading::after {
	top: 0.75em;
	right: 0.75em;
}
</style>
