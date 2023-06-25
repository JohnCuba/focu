import { describe, expect, it } from 'vitest'
import { getAppwriteClient, getAppwriteAccountClient, getAppwriteAvatarsClient, getAppwriteDatabasesClient } from '../appwrite'
import { Client, Account, Avatars, Databases } from 'appwrite'

describe('appwrite config', () => {
	it('should return instance of Client', () => {
		const instance = getAppwriteClient()

		expect(instance).toBeInstanceOf(Client)
	})

	it('should return instance of Client', () => {
		const firstInstance = getAppwriteClient()
		const secondInstance = getAppwriteClient()

		expect(firstInstance).toStrictEqual(secondInstance)
	})

	it('should return instance of Client', () => {
		const instance = getAppwriteAccountClient()

		expect(instance).toBeInstanceOf(Account)
	})

	it('should return instance of Account', () => {
		const firstInstance = getAppwriteAccountClient()
		const secondInstance = getAppwriteAccountClient()

		expect(firstInstance).toStrictEqual(secondInstance)
	})

	it('should return instance of Avatars', () => {
		const instance = getAppwriteAvatarsClient()

		expect(instance).toBeInstanceOf(Avatars)
	})

	it('should return instance of Avatars', () => {
		const firstInstance = getAppwriteAvatarsClient()
		const secondInstance = getAppwriteAvatarsClient()

		expect(firstInstance).toStrictEqual(secondInstance)
	})

	it('should return instance of Databases', () => {
		const instance = getAppwriteDatabasesClient()

		expect(instance).toBeInstanceOf(Databases)
	})

	it('should return instance of Databases', () => {
		const firstInstance = getAppwriteDatabasesClient()
		const secondInstance = getAppwriteDatabasesClient()

		expect(firstInstance).toStrictEqual(secondInstance)
	})
})
