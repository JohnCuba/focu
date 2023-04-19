<script setup lang="ts">
import { useSpeechRecognition } from '@vueuse/core'
import { computed, watchEffect } from 'vue'

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

const iconSrc = computed(() => `/img/icons/${isListening.value ? 'voice_recording' : 'mic'}.svg`)
const buttonClasses = computed(() => ({
	'btn-active': isListening.value,
}))

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
	<button
		v-if="isSupported"
		class="btn btn-success btn-square"
		:class="buttonClasses"
		@click="handleClick"
	>
		<img
			:src="iconSrc"
			alt="toggle speech recognize"
			width="32"
			height="32"
		/>
	</button>
</template>
