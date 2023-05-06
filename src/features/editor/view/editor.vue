<script setup lang="ts">
import { computed, ref } from 'vue'
import {storeToRefs} from 'pinia'
import {useEditorStore} from '../editor.store'
import { useHideOnScroll } from '~/lib/hooks/useHideOnScroll'
import Speech from './speech.vue'

const elementRef = ref<HTMLDivElement>()

const editorStore = useEditorStore()
const {value, isLoading} = storeToRefs(editorStore)
const {submitWord} = editorStore
const componentHeight = computed(() => elementRef.value?.offsetHeight || 0)

const {isHidden} = useHideOnScroll({offset: componentHeight})
</script>

<template>
	<div
		ref="elementRef"
		class="navbar bg-base-100 rounded-xl z-20 fixed -bottom-28 gap-x-2 drop-shadow-2xl"
		:class="{'bottom-1': !isHidden}"
	>
		<input
			v-model="value"
			type="text"
			autocomplete="off"
			class="input input-bordered input-success flex-1 drop-shadow"
			placeholder="Type something..."
			:disabled="isLoading"
			@keypress.enter="submitWord"
		/>
		<Speech v-model="value" :disabled="isLoading" />
	</div>
</template>
