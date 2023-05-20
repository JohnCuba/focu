import {Account, Avatars, Client, Databases} from 'appwrite'

let appwriteClientInstance!: Client
export const getAppwriteClient = () => {
	if (!appwriteClientInstance) {
		appwriteClientInstance = new Client().setEndpoint('https://cloud.appwrite.io/v1').setProject('64568536a05ca55a3822')
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
