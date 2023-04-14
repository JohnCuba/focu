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
const {value} = storeToRefs(editorStore)
const {submitWord} = editorStore
const componentHeight = computed(() => elementRef.value?.offsetHeight || 0)

const {isHidden} = useHideOnScroll({offset: componentHeight})

defineExpose({
	elementRef
})
</script>

<template>
	<div ref="elementRef" class="root" :class="{'root--hidden': isHidden}">
		<div class="text-input">
			<input
				v-model="value"
				class="control"
				placeholder="Type something..."
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
	width: calc(100vw - var(--spacing) * 2);
	display: flex;
	align-items: stretch;
	column-gap: var(--spacing);
	transition: top 0.6s ease-in-out;
}

.root--hidden {
	top: -100px;
}

.text-input {
	flex: 1;
	background-color: var(--color-primary-container);
	padding: calc(var(--spacing) * 3);
	border-radius: calc(var(--spacing) * 3);
	overflow: hidden;
	transition: transform 0.2s ease-in-out;
	transform: scale(1);
}

.text-input:hover {
	transform: scale(1.002);
}

.control {
	width: 100%;
	background-color: transparent;
	color: var(--color-on-tertiary-container);
	border: none;
	outline: none;
	font-size: 2em;
	font-weight: 600;
}

.control::placeholder {
	color: var(--color-outline);
}
</style>
