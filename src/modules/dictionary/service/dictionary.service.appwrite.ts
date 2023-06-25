import { getAppwriteDatabasesClient } from '~/config/app/appwrite'
import { DictionaryServiceModel } from './dictionary.service.model'
import { type Models, type Databases, ID } from 'appwrite'

type AppwriteDictionaryWord = Models.Document & DictionaryWord

const DICTIONARY_DB_ID = import.meta.env.VITE_DICTIONARY_DB_ID
const WORDS_COLLECTION_ID = import.meta.env.VITE_WORDS_COLLECTION_ID

export class DictionaryServiceAppwrite implements DictionaryServiceModel {
	private appwriteDatabasesClient!: Databases

	constructor() {
		this.appwriteDatabasesClient = getAppwriteDatabasesClient()
	}

	private wordFrom(data: AppwriteDictionaryWord): DictionaryWord {
		const {
			/* eslint-disable @typescript-eslint/no-unused-vars */
			$databaseId,
			$permissions,
			$collectionId,
			$createdAt,
			$updatedAt,
			/* eslint-enable */
			$id,
			...dictionaryWord
		} = data

		return {
			appwriteId: dictionaryWord.appwriteId || $id,
			...dictionaryWord
		}
	}

	private listDocuments() {
		return this.appwriteDatabasesClient
			.listDocuments<AppwriteDictionaryWord>(
				DICTIONARY_DB_ID,
				WORDS_COLLECTION_ID,
			)
	}

	private async findByKey(searchKey: DictionaryWord['key']) {
		const appwriteData = await this.listDocuments()
		return appwriteData.documents.find(({key}) => key === searchKey)
	}

	getAll: DictionaryServiceModel['getAll'] = async() => {
		const appwriteData = await this.listDocuments()

		return {
			documents: appwriteData.documents.map(this.wordFrom),
			total: appwriteData.total,
		}
	}

	add: DictionaryServiceModel['add'] = async (data) => {
		const rawData = await this.appwriteDatabasesClient.createDocument<AppwriteDictionaryWord>(
			DICTIONARY_DB_ID,
			WORDS_COLLECTION_ID,
			ID.unique(),
			data
		)

		return this.wordFrom(rawData)
	}

	edit: DictionaryServiceModel['edit'] = async (data) => {
		if (!data.appwriteId) {
			throw new Error('Can\t edit word in appwrite')
		}
		const rawData = await this.appwriteDatabasesClient.updateDocument<AppwriteDictionaryWord>(
			DICTIONARY_DB_ID,
			WORDS_COLLECTION_ID,
			data.appwriteId,
			data
		)

		return this.wordFrom(rawData)
	}

	delete: DictionaryServiceModel['delete'] = async (key) => {
		const doc = await this.findByKey(key)
		if (!doc) {
			throw new Error('Can\'t find document with key: ' + key)
		}
		this.appwriteDatabasesClient.deleteDocument(
			DICTIONARY_DB_ID,
			WORDS_COLLECTION_ID,
			doc?.$id,
		)

		return key
	}
}
