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
	'is-primary': !isListening.value,
	'is-warning': isListening.value,
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
		class="button is-large is-rounded is-primary is-light"
		:class="buttonClasses"
		@click="handleClick"
	>
		<span class="icon is-medium">
			<img
				:src="iconSrc"
				alt="toggle speech recognize"
				width="48"
				height="48"
			/>
		</span>
	</button>
</template>
