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

const {isHidden} = useHideOnScroll({offset: componentHeight})

defineExpose({
	elementRef
})
</script>

<template>
	<div
		ref="elementRef"
		class="root navbar bg-base-100 rounded-xl z-20 fixed -bottom-28 gap-x-2"
		:class="{'bottom-1': !isHidden}"
	>
		<input
			v-model="value"
			type="text"
			class="input input-bordered input-success flex-1"
			placeholder="Type something..."
			:disabled="isLoading"
			@keypress.enter="submitWord"
		/>
		<Speech v-model="value" :disabled="isLoading" />
	</div>
</template>

<style scoped>
.root {
	max-width: inherit;
	/* TODO: replace it with tailwinds's transform */
	transition: bottom 0.6s ease-in-out;
}
</style>
