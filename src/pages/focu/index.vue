<script setup lang="ts">
import {onMounted, provide} from 'vue'
import {
	Dictionary,
	useDictionaryStore,
	DICTIONARY_STORE_INJECTION,
} from '~/features/dictionary'
import {
	Header,
	useSettingsStore,
	SETTINGS_STORE_INJECTION
} from '~/features/settings'
import {Editor} from '~/features/editor'

const dictionaryStore = useDictionaryStore()
provide(DICTIONARY_STORE_INJECTION, dictionaryStore)

const settingsStore = useSettingsStore()
provide(SETTINGS_STORE_INJECTION, settingsStore)

onMounted(() => {
	dictionaryStore.fetchWords()
})
</script>

<template>
	<main class="min-h-full bg-base-200">
		<div class="relative container mx-auto">
			<Header class="container" />
			<section class="px-2 py-20">
				<Dictionary />
			</section>
			<Editor class="container" />
		</div>
	</main>
</template>

