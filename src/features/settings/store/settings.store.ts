import { type InjectionKey } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useGoogleStore } from './google.store'

export const SETTINGS_STORE_INJECTION: InjectionKey<ReturnType<typeof useSettingsStore>> = Symbol('settings-store')

export const useSettingsStore = defineStore('settings', () => {
	const googleStore = useGoogleStore()
	const {userInfo} = storeToRefs(googleStore)
	const {
		promptToLogin: promptToLoginWithGoogle,
		logout: logoutFromGoogle,
		getUserInfo: getGoogleUserInfo
	} = googleStore

	return {
		userInfo,
		promptToLoginWithGoogle,
		logoutFromGoogle,
		getGoogleUserInfo
	}
})
