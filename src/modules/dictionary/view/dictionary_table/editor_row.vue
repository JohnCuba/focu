<script setup lang="ts">
import { ref } from 'vue'
import { useDictionaryStore } from '../../store'

const VALUE_INPUT_NAME = 'value'
const TRANSLATIONS_INPUT_NAME = 'translations'

const formRef = ref<HTMLFormElement>()
const valueInputRef = ref<HTMLInputElement>()
const translationsInputRef = ref<HTMLInputElement>()

const dictionaryStore = useDictionaryStore()

const handlePressValueEnter = () => {
	translationsInputRef.value?.focus()
}

const handlePressTranslationsEnter = () => {
	formRef.value?.requestSubmit()

	formRef.value?.reset()
	valueInputRef.value?.focus()
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
	<tr>
		<td>
			<form
				id="editor-row-form"
				ref="formRef"
				@submit.prevent="handleSubmitWord"
			>
				<input
					ref="valueInputRef"
					type="text"
					autocomplete="off"
					:name="VALUE_INPUT_NAME"
					autofocus
					form="editor-row-form"
					class="input input-xs input-success w-1/2"
					placeholder="Введите слово ..."
					@keypress.enter="handlePressValueEnter"
				/>
			</form>
		</td>
		<td>
			<input
				ref="translationsInputRef"
				type="text"
				autocomplete="off"
				:name="TRANSLATIONS_INPUT_NAME"
				form="editor-row-form"
				class="input input-xs input-info w-1/2"
				placeholder="... и перевод"
				@keypress.enter="handlePressTranslationsEnter"
			/>
		</td>
	</tr>
</template>
