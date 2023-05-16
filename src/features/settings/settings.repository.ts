import { GoogleApiService } from './service/google.api.service'

export class SettingsRepository {
	private googleService!: GoogleApiService
	// TODO: Change type GoogleApiService to abstract
	private authProviders!: Record<AuthProviders, GoogleApiService>

	constructor() {
		this.googleService = new GoogleApiService()
		this.authProviders = {
			'google': this.googleService
		}
	}

	checkAuth() {
		let authenticatedProvider: AuthProviders | null = null

		for (const [provider, service] of Object.entries(this.authProviders)) {
			if (service.isLoggedIn) {
				authenticatedProvider = provider as AuthProviders
				break
			}
			continue
		}

		return authenticatedProvider
	}

	login(
		provider: keyof typeof this.authProviders,
		callback?: () => void,
		error_callback?: () => void,
	) {
		return this.authProviders[provider].login(callback, error_callback)
	}

	logout() {
		Object.values(this.authProviders).forEach(({logout}) => logout())
	}

	getUserInfo(provider: keyof typeof this.authProviders) {
		return this.authProviders[provider].getUserInfo()
	}
}
