<script setup lang="ts">
// import Speech from './speech.vue'
import BottomSheet from './bottom_sheet.vue'
import { useDictionaryStore } from '../../store'
import { ref } from 'vue'

const VALUE_INPUT_NAME = 'value'
const TRANSLATIONS_INPUT_NAME = 'translations'

const dictionaryStore = useDictionaryStore()
const formRef = ref<HTMLFormElement>()
const translationsInputRef = ref<HTMLInputElement>()

const handlePressValueEnter = () => {
	translationsInputRef.value?.focus()
}

const handlePressTranslationsEnter = () => {
	formRef.value?.requestSubmit()
}

const handleSubmitWord = () => {
	const data = new FormData(formRef.value)

	dictionaryStore.addWord({
		value: String(data.get(VALUE_INPUT_NAME)),
		translations: String(data.get(TRANSLATIONS_INPUT_NAME)).split(', '),
	})
}
</script>

<template>
	<BottomSheet>
		<form
			ref="formRef"
			class="navbar join"
			@submit.prevent="handleSubmitWord"
		>
			<input
				type="text"
				autocomplete="off"
				:name="VALUE_INPUT_NAME"
				class="input input-bordered input-success join-item w-full"
				placeholder="Введите слово ..."
				@keypress.enter="handlePressValueEnter"
			/>
			<input
				ref="translationsInputRef"
				type="text"
				autocomplete="off"
				:name="TRANSLATIONS_INPUT_NAME"
				class="input input-bordered input-info join-item w-full"
				placeholder="... и перевод"
				@keypress.enter="handlePressTranslationsEnter"
			/>
		</form>
		<!-- <Speech v-model="word" :disabled="isLoading" /> -->
	</BottomSheet>
</template>
