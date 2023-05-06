<script setup lang="ts">
import {useToggle} from '@vueuse/core'
import {Modal} from '~/lib/view/modal'
import {DeleteForeverIcon} from '~/lib/view/icons'

const props = defineProps<{
	word?: DictionaryWord
}>()

const emit = defineEmits<{
	(e: 'click:close'): void
	(e: 'click:remove', value: DictionaryWord): void
	(e: 'click:save', value: DictionaryWord): void
}>()

const [isEditMode, toggleMode] = useToggle(false)

const handleClickBackground = () => {
	toggleMode(false)
	emit('click:close')
}

const handleClickRemove = () => {
	if (!props.word) return

	emit('click:remove', props.word)
}

const handleClickSave = (e: Event) => {
	if (!props.word) return

	const data = new FormData(e.target as HTMLFormElement)
	const editedWord: DictionaryWord = {
		...props.word,
		value: data.get('value')?.toString() ?? '',
		translation: data.get('translation')?.toString() ?? '',
	}

	emit('click:save', editedWord)
	toggleMode(false)
}
</script>

<template>
	<Modal :is-open="Boolean(word)" @click:background="handleClickBackground">
		<!-- VIEW MODE -->
		<div v-if="!isEditMode" class="card-body">
			<h1 class="card-title">
				{{ word?.value }}
			</h1>
			<p>
				{{ word?.translation }}
			</p>
			<div class="card-actions justify-end mt-2">
				<button class="btn btn-sm btn-outline btn-error fill-error hover:fill-info-content" @click="handleClickRemove">
					<DeleteForeverIcon class="w-5 h-5" />
				</button>
				<button class="btn btn-sm btn-outline btn-info" @click="toggleMode(true)">
					редактировать
				</button>
			</div>
		</div>
		<!-- EDIT MODE -->
		<form v-if="isEditMode" class="card-body gap-y-4" @submit.prevent="handleClickSave">
			<input class="input input-sm input-bordered input-info" name="value" :value="word?.value" />
			<input class="input input-sm input-bordered input-info" name="translation" :value="word?.translation" />
			<div class="card-actions justify-end mt-2">
				<button class="btn btn-sm btn-outline btn-error" @click="toggleMode(false)">
					отмена
				</button>
				<button class="btn btn-sm btn-outline btn-success" type="submit">
					сохранить
				</button>
			</div>
		</form>
	</Modal>
</template>
