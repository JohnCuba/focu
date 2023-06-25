import PouchDB from 'pouchdb-browser'
import PouchDbFind from 'pouchdb-find'
import { DictionaryServiceModel } from './dictionary.service.model'

const DICTIONARY_KEY = 'dictionary'

export class DictionaryServicePouchDB implements DictionaryServiceModel {
	private pouchDBClient!: PouchDB.Database<DictionaryWord>

	constructor() {
		this.init()
	}

	private init = () => {
		if (!this.pouchDBClient) {
			PouchDB.plugin(PouchDbFind)
			this.pouchDBClient = new PouchDB<DictionaryWord>(DICTIONARY_KEY)
		}
	}

	private wordFrom(data: DictionaryWord & PouchDB.Core.IdMeta & PouchDB.Core.GetMeta): DictionaryWord {
		const {
			key,
			value,
			translations,
			createdAt,
		} = data

		return {
			key,
			value,
			translations,
			createdAt,
		}
	}

	private wordDocumentsFrom(data: PouchDB.Core.AllDocsResponse<DictionaryWord>['rows']): DictionaryWord[] {
		return data
			.map((data) => data.doc && this.wordFrom(data.doc))
			.filter((value): value is DictionaryWord => Boolean(value))
	}

	private async findByKey(key: DictionaryWord['key']) {
		const response = await this.pouchDBClient.find({
			selector: {key: {$eq: key}},
		})

		return response.docs[0]
	}

	getAll: DictionaryServiceModel['getAll'] = async () => {
		const data = await this.pouchDBClient.allDocs({include_docs: true})

		return {
			documents: this.wordDocumentsFrom(data.rows),
			total: data.total_rows,
		}
	}

	add: DictionaryServiceModel['add'] = async (data) => {
		const res = await this.pouchDBClient.post(data)

		if (!res.ok) {
			throw Error('Can\'t add document in pouchDB')
		}

		const rawData = await this.pouchDBClient.get(res.id)

		return this.wordFrom(rawData)
	}

	edit: DictionaryServiceModel['edit'] = async (data) => {
		const entry = await this.findByKey(data.key)

		const response = await this.pouchDBClient.put({...entry, ...data})
		const newEntry = await this.pouchDBClient.get(response.id)

		return this.wordFrom(newEntry)
	}

	delete: DictionaryServiceModel['delete'] = async (key) => {
		const entry = await this.findByKey(key)

		await this.pouchDBClient.remove(entry)

		return key
	}
}
