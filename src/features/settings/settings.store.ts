import { type InjectionKey, ref, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { SettingsRepository } from './settings.repository'

export const SETTINGS_STORE_INJECTION: InjectionKey<ReturnType<typeof useSettingsStore>> = Symbol('settings-store')

export const useSettingsStore = defineStore('settings', () => {
	const repository = new SettingsRepository()

	const user = ref<UserInfo | null>(null)

	const handleGetUserInfo = async (provider: AuthProviders) => {
		user.value = await repository.getUserInfo(provider)
	}

	const loginWithGoogle = () => {
		repository.login('google', void handleGetUserInfo('google'))
	}

	const logout = () => {
		repository.logout()
		user.value = null
	}

	const initialAuthCheck = () => {
		const authenticatedProvider = repository.checkAuth()

		if (!authenticatedProvider) {return}

		handleGetUserInfo(authenticatedProvider)
	}

	onMounted(() => {
		initialAuthCheck()
	})

	return {
		user,
		loginWithGoogle,
		logout,
	}
})
