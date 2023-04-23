<script setup lang="ts">
import {watch} from 'vue'
import { useScrollLock } from '@vueuse/core'

const props = defineProps<{
	word?: DictionaryWord
}>()

const emit = defineEmits<{
	(e: 'click:background'): void
	(e: 'click:remove', value: DictionaryWord): void
}>()

const isLocked = useScrollLock(document.body)

const handleClickBackground = () => {
	emit('click:background')
}

const handleClickRemove = () => {
	if (!props.word) return

	emit('click:remove', props.word)
}

watch(
	() => Boolean(props.word),
	(isModalOpen) => {
		isLocked.value = isModalOpen
	}
)
</script>

<template>
	<Transition name="modal">
		<div v-if="word" class="fixed top-0 left-0 w-full h-full z-30 flex justify-center items-center">
			<div class="bg-neutral/[.4] w-full h-full" @click.self="handleClickBackground" />
			<div class="absolute card lg:w-96 w-11/12 bg-base-100 shadow-xl">
				<div class="card-body">
					<h1 class="card-title">
						{{ word.value }}
					</h1>
					<p>
						{{ word.translation }}
					</p>
					<div class="card-actions justify-end">
						<button class="delete-btn btn btn-xs btn-outline btn-error" @click="handleClickRemove">
							удалить
						</button>
					</div>
				</div>
			</div>
		</div>
	</Transition>
</template>

<style scoped>
.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
