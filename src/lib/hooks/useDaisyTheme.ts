import { onMounted, onUnmounted, watch, ref } from 'vue'
import {THEMES} from '~/config/app/themes'

type Theme = typeof THEMES[number]

const ATTRIBUTE = 'data-theme'
const MATCH_MEDIA_KEY = '(prefers-color-scheme: dark)'

export const useDaisyTheme = ({isRoot}: Props) => {
	const htmlRef = ref(document.children[0])
	const currentTheme = ref<Theme>(htmlRef.value.getAttribute(ATTRIBUTE) as Theme ?? THEMES[0])

	const setTheme = () => {
		htmlRef.value.setAttribute(ATTRIBUTE, currentTheme.value)
	}

	const changeTheme = (theme: Theme) => {
		currentTheme.value = theme
	}

	const handleEvent = (event: MediaQueryListEvent) => {
		const newColorScheme = event.matches ? THEMES[1] : THEMES[0]

		changeTheme(newColorScheme)

	}

	onMounted(() => {
		if (!isRoot) return

		window
			.matchMedia(MATCH_MEDIA_KEY)
			.addEventListener('change', handleEvent)
	})

	onUnmounted(() => {
		if (!isRoot) return

		window
			.matchMedia(MATCH_MEDIA_KEY)
			.removeEventListener('change', handleEvent)
	})

	watch(currentTheme, setTheme)

	return {
		currentTheme,
		changeTheme,
	}
}

type Props = {
	isRoot?: boolean
}
