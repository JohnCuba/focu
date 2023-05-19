import { AuthApiService } from './service/auth.api.service'

export class SettingsRepository {
	private authService!: AuthApiService

	constructor() {
		this.authService = new AuthApiService()
	}

	async checkIsLoggedIn() {
		return Boolean(await this.authService.getCurrentSession())
	}

	login() {
		this.authService.loginWithGoogle()
	}

	logout() {
		this.authService.logout()
	}

	getUserInfo() {
		return this.authService.getUserInfo()
	}
}
