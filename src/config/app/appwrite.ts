import {Account, Avatars, Client, Databases} from 'appwrite'

const APPWRITE_PROJECT_ID = import.meta.env.VITE_PROJECT_ID
const APPWRITE_ENDPOINT = 'https://cloud.appwrite.io/v1'

let appwriteClientInstance!: Client
export const getAppwriteClient = () => {
	if (!appwriteClientInstance) {
		appwriteClientInstance = new Client().setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT_ID)
	}

	return appwriteClientInstance
}

let appwriteAccountClientInstance!: Account
export const getAppwriteAccountClient = () => {
	if (!appwriteAccountClientInstance) {
		appwriteAccountClientInstance = new Account(getAppwriteClient())
	}

	return appwriteAccountClientInstance
}

let appwriteAvatarClientInstance!: Avatars
export const getAppwriteAvatarsClient = () => {
	if (!appwriteAvatarClientInstance) {
		appwriteAvatarClientInstance = new Avatars(getAppwriteClient())
	}

	return appwriteAvatarClientInstance
}

let appwriteDatabasesClientInstance!: Databases
export const getAppwriteDatabasesClient = () => {
	if (!appwriteDatabasesClientInstance) {
		appwriteDatabasesClientInstance = new Databases(getAppwriteClient())
	}

	return appwriteDatabasesClientInstance
}
