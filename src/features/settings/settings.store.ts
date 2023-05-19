import { type InjectionKey, ref, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { SettingsRepository } from './settings.repository'

export const SETTINGS_STORE_INJECTION: InjectionKey<ReturnType<typeof useSettingsStore>> = Symbol('settings-store')

export const useSettingsStore = defineStore('settings', () => {
	const repository = new SettingsRepository()

	const user = ref<Awaited<ReturnType<SettingsRepository['getUserInfo']>>>()

	const getUserInfo = async () => {
		user.value = await repository.getUserInfo()
	}

	const loginWithGoogle = () => {
		repository.login()
	}

	const logout = () => {
		repository.logout()
		user.value = undefined
	}

	const initialAuthCheck = async () => {
		const isLoggedIn = await repository.checkIsLoggedIn()

		if (isLoggedIn) {
			getUserInfo()
		}
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
