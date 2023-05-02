<script setup lang="ts">
import {Modal} from '~/lib/view/modal'

const props = defineProps<{
	word?: DictionaryWord
}>()

const emit = defineEmits<{
	(e: 'click:close'): void
	(e: 'click:remove', value: DictionaryWord): void
}>()

const handleClickBackground = () => {
	emit('click:close')
}

const handleClickRemove = () => {
	if (!props.word) return

	emit('click:remove', props.word)
}
</script>

<template>
	<Modal :is-open="Boolean(word)" @click:background="handleClickBackground">
		<div class="card-body">
			<h1 class="card-title">
				{{ word?.value }}
			</h1>
			<p>
				{{ word?.translation }}
			</p>
			<div class="card-actions justify-end">
				<button class="delete-btn btn btn-xs btn-outline btn-error" @click="handleClickRemove">
					удалить
				</button>
			</div>
		</div>
	</Modal>
</template>
