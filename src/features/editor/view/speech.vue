<script setup lang="ts">
import { useSpeechRecognition } from '@vueuse/core'
import { watchEffect } from 'vue'

const emit = defineEmits<{
	(e: 'update:modelValue', value: string): void
}>()

const {
	isSupported,
	isListening,
	isFinal,
	result,
	start,
	stop,
} = useSpeechRecognition()

const handleClick = () => {
	if (isListening.value) {
		stop()
	} else {
		start()
	}
}

watchEffect(() => {
	if (isFinal.value) {
		emit('update:modelValue', result.value)
		stop()
	}
})
</script>

<template>
	<button v-if="isSupported" class="button" @click="handleClick">
		<img
			src="/img/icons/mic.svg"
			alt="toggle speech recognize"
			width="48"
			height="48"
		/>
	</button>
</template>

<style scoped>
.button {
	background-color: var(--color-secondary-container);
	border-style: none;
	cursor: pointer;
	padding: 0 calc(var(--spacing) * 2.5);
	border-radius: calc(var(--spacing) * 3);
	box-shadow: var(--elevation-2);
	transition: transform 0.2s ease-in-out;
	transform: scale(1);
}

.button:hover {
	transform: scale(1.03);
}
</style>
