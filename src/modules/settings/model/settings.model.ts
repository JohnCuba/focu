import {AuthServiceAppwrite} from '../service'

export class SettingsModel {
	private authService!: AuthServiceAppwrite

	constructor() {
		this.authService = new AuthServiceAppwrite()
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
