import { onMounted, onUnmounted } from 'vue'

export const useMobileFullHeight = () => {
	const setHeight = () => {
		const vh = window.innerHeight * 0.01
		document.documentElement.style.setProperty('--vh', `${vh}px`)
	}

	onMounted(() => {
		setHeight()
		globalThis.window.addEventListener('resize', setHeight)
	})

	onUnmounted(() => {
		globalThis.window.removeEventListener('resize', setHeight)
	})
}
