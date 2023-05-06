<script setup lang="ts">
import {onMounted, provide} from 'vue'
import {
	Dictionary,
	DICTIONARY_STORE_INJECTION,
	useDictionaryStore
} from '~/features/dictionary'
import {Header} from '~/features/header'
import {Editor} from '~/features/editor'

const dictionaryStore = useDictionaryStore()
provide(DICTIONARY_STORE_INJECTION, dictionaryStore)

onMounted(() => {
	dictionaryStore.fetchWords()
})
</script>

<template>
	<main class="main bg-base-200 min-h-screen">
		<div class="relative container mx-auto">
			<Header class="container" />
			<section class="px-2 py-20">
				<Dictionary />
			</section>
			<Editor class="container" />
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
