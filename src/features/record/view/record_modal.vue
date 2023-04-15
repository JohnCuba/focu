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
		<div v-if="word" class="mask" @click.self="handleClickBackground">
			<div class="container">
				<div class="header">
					<h1 class="header__word">
						{{ word.value }}
					</h1>
					<button class="header__button-remove" @click="handleClickRemove">
						<img
							src="/img/icons/delete_forever.svg"
							alt="delete word"
							width="24"
							height="24"
						/>
					</button>
				</div>
				<p>{{ word.translation }}</p>
			</div>
		</div>
	</Transition>
</template>

<style scoped>
.mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-shadow-half);
  display: flex;
  transition: opacity 0.3s ease;
}

.container {
  width: 300px;
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: var(--spacing);
  box-shadow: var(--elevation-3);
  transition: all 0.3s ease;
}

.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.header__word {
	margin: 0;
}

.header__button-remove {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: calc(var(--spacing) * 0.5);
	border-style: none;
	background-color: var(--color-error-container);
	border-radius: var(--spacing);
  box-shadow: var(--elevation-1);
	transition: box-shadow 0.4s ease-in-out,
							background-color 0.4s ease-in-out;
}
.header__button-remove:hover {
  box-shadow: var(--elevation-2);
}

.header__button-remove:active {
  box-shadow: var(--elevation-1);
	background-color: var(--color-tertiary-container);
}

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
