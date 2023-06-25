<script setup lang="ts">
import {provide} from 'vue'
import {
	useDictionaryStore,
	DICTIONARY_STORE_INJECTION,
} from '~/modules/dictionary/store'
import {
	useSettingsStore,
	SETTINGS_STORE_INJECTION
} from '~/modules/settings/store'
import {DictionaryTable, EditorBottomSheet} from '~/modules/dictionary/view'
import {Header} from '~/modules/settings/view'

const dictionaryStore = useDictionaryStore()
provide(DICTIONARY_STORE_INJECTION, dictionaryStore)

const settingsStore = useSettingsStore()
provide(SETTINGS_STORE_INJECTION, settingsStore)
</script>

<template>
	<main class="min-h-full">
		<div class="relative container mx-auto">
			<Header class="container" />
			<section class="page-content">
				<DictionaryTable
					head-class="hidden t:table-header-group"
					foot-class="hidden t:table-header-group"
				/>
			</section>
			<EditorBottomSheet class="container block t:hidden" />
		</div>
	</main>
</template>

<style>
.page-content {
	padding-top: var(--page-content-top-offset, 0px);
	padding-bottom: var(--page-content-bottom-offset, 0px);
}
</style>
