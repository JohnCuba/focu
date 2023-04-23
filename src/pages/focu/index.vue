<script setup lang="ts">
import {computed, onMounted, provide, ref} from 'vue'
import {
	Dictionary,
	DICTIONARY_STORE_INJECTION,
	useDictionaryStore
} from '~/features/dictionary'
import {Editor, type EditorViewExpose} from '~/features/editor'

const dictionaryStore = useDictionaryStore()
provide(DICTIONARY_STORE_INJECTION, dictionaryStore)

const editorRef = ref<EditorViewExpose>()
const dictionaryStyle = computed(() => ({
	'padding-bottom': `calc(${editorRef.value?.elementRef.offsetHeight}px + var(--spacing))`
}))

onMounted(() => {
	dictionaryStore.fetchWords()
})
</script>

<template>
	<main class="main min-h-screen bg-base-200">
		<div class="relative container mx-auto">
			<section class="p-2" :style="dictionaryStyle">
				<Dictionary />
			</section>
			<Editor ref="editorRef" />
		</div>
	</main>
</template>

<style scoped>
.main {
	row-gap: calc(var(--spacing) * 2);
}

.dictionary {
	margin-top: 90px;
}
</style>
