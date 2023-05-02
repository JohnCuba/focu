<script setup lang="ts">
import {watch} from 'vue'
import { useScrollLock } from '@vueuse/core'

const props = defineProps<{
	isOpen?: boolean
}>()

const emit = defineEmits<{
	(e: 'click:background'): void
}>()

const isLocked = useScrollLock(document.body)

const handleClickBackground = () => {
	emit('click:background')
}

watch(
	() => props.isOpen,
	(isModalOpen) => {
		isLocked.value = isModalOpen
	}
)
</script>

<template>
	<Transition name="modal">
		<div v-if="isOpen" class="fixed top-0 left-0 w-full h-full z-30 flex justify-center items-center">
			<div class="bg-neutral/[.4] w-full h-full" @click.self="handleClickBackground" />
			<div class="absolute card lg:w-96 w-11/12 bg-base-100 shadow-xl">
				<slot />
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
