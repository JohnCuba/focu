import { Fetcher } from '~/lib/fetcher'

export type UserInfo = {
	picture: string
}

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

export class GoogleApiService {
	private fetcher!: Fetcher
	private tokenStorageKey = 'google-jwt-token'
	private get token(): string | null {
		return globalThis.localStorage.getItem(this.tokenStorageKey)
	}
	private set token(value: string | null) {
		if (!value) {
			globalThis.localStorage.removeItem(this.tokenStorageKey)
			return
		}

		globalThis.localStorage.setItem(this.tokenStorageKey, value)
	}
	get isLoggedIn(): boolean {
		return Boolean(this.token)
	}

	constructor() {
		this.fetcher = new Fetcher({
			host: 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json'
		})
	}

	login = (callback?: () => void, error_callback?: () => void) => {
		globalThis.google.accounts.oauth2.initTokenClient({
			client_id: GOOGLE_CLIENT_ID,
			callback: (tokenResponse) => {
				this.token = tokenResponse.access_token
				callback?.()
			},
			error_callback,
			scope: 'profile'
		}).requestAccessToken()
	}

	logout = (callback?: () => void) => {
		this.token = null
		callback?.()
	}

	getUserInfo = (): Promise<UserInfo> => {
		return this.fetcher.get(
			'',
			{
				headers: {
					'Authorization': `Bearer ${this.token}`
				}
			}
		)
	}
}
