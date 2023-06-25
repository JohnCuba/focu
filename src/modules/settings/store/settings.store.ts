import { type InjectionKey, ref, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { SettingsModel } from '../model/settings.model'

export const SETTINGS_STORE_INJECTION: InjectionKey<ReturnType<typeof useSettingsStore>> = Symbol('settings-store')

export const useSettingsStore = defineStore('settings', () => {
	const model = new SettingsModel()

	const user = ref<Awaited<ReturnType<SettingsModel['getUserInfo']>>>()

	const getUserInfo = async () => {
		user.value = await model.getUserInfo()
	}

	const loginWithGoogle = () => {
		model.login()
	}

	const logout = () => {
		model.logout()
		user.value = undefined
	}

	const initialAuthCheck = async () => {
		const isLoggedIn = await model.checkIsLoggedIn()

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
