<script setup lang="ts">
const props = defineProps<{
	word?: DictionaryWord
}>()

const emit = defineEmits<{
	(e: 'click:background'): void
	(e: 'click:remove', value: DictionaryWord): void
}>()

const handleClickBackground = () => {
	emit('click:background')
}

const handleClickRemove = () => {
	if (!props.word) return

	emit('click:remove', props.word)
}
</script>

<template>
	<Transition name="modal">
		<div v-if="word" class="modal is-active">
			<div class="modal-background" @click.self="handleClickBackground" />
			<div class="modal-content">
				<div class="box">
					<div class="level">
						<div class="level-left">
							<h1 class="level-item title">
								{{ word.value }}
							</h1>
						</div>
						<div class="level-right">
							<button class="level-item button is-danger is-light" @click="handleClickRemove">
								<span class="icon">
									<img
										src="/img/icons/delete_forever.svg"
										alt="delete word"
										width="24"
										height="24"
									/>
								</span>
							</button>
						</div>
					</div>
					<p class="subtitle">
						{{ word.translation }}
					</p>
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
