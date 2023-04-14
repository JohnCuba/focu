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
	'margin-top': `calc(${editorRef.value?.elementRef.offsetHeight}px + var(--spacing))`
}))

onMounted(() => {
	dictionaryStore.fetchWords()
})
</script>

<template>
	<main class="main">
		<Editor ref="editorRef" />
		<section :style="dictionaryStyle">
			<Dictionary />
		</section>
	</main>
</template>

<style scoped>
.main {
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	row-gap: calc(var(--spacing) * 2);
}

.dictionary {
	margin-top: 90px;
}
</style>
