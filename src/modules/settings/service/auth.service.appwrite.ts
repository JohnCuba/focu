import type { Account, Avatars } from 'appwrite'
import { getAppwriteAccountClient, getAppwriteAvatarsClient } from '~/config/app/appwrite'

export class AuthServiceAppwrite {
	private appwriteAccountClient!: Account
	private appwriteAvatarClient!: Avatars

	constructor() {
		this.appwriteAccountClient = getAppwriteAccountClient()
		this.appwriteAvatarClient = getAppwriteAvatarsClient()
	}

	getCurrentSession() {
		return this.appwriteAccountClient.getSession('current')
	}

	loginWithGoogle() {
		this.appwriteAccountClient.createOAuth2Session('google', globalThis.location.href)
	}

	async logout() {
		const currentSession = await this.getCurrentSession()

		this.appwriteAccountClient.deleteSession(currentSession.$id)
	}

	async getUserInfo() {
		return {
			...(await this.appwriteAccountClient.get()),
			avatar_url: this.appwriteAvatarClient.getInitials()
		}
	}
}
