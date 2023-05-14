import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import { GoogleApiService, UserInfo } from '../service/google.api.service'

export const useGoogleStore = defineStore('google-store', () => {
	const googleApiService = new GoogleApiService()
	const userInfo = ref<UserInfo | null>(null)

	const updateUserInfo = async () => {
		userInfo.value = await googleApiService.getUserInfo()
	}

	onMounted(() => {
		if (!googleApiService.isLoggedIn) return
		updateUserInfo()
	})

	const promptToLogin = () => {
		googleApiService.login(
			updateUserInfo
		)
	}

	const logout = () => {
		googleApiService.logout(
			() => {
				userInfo.value = null
			}
		)
	}

	return {
		userInfo,
		promptToLogin,
		logout,
		getUserInfo: googleApiService.getUserInfo
	}
})
