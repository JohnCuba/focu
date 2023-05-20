import { type SupportedPairs, SUPPORTED_PAIRS } from '~/config/app/langs'
import { LocalDatabase } from '~/lib/local_database'

export class DictionaryLocalService {
	private dbInstance!: LocalDatabase
	private dbName = 'dictionaries'
	private dbVersion = 1
	private dbStoreKey!: SupportedPairs

	constructor(storeKey: SupportedPairs) {
		this.dbStoreKey = storeKey
		this.dbInstance = new LocalDatabase(
			this.dbName,
			this.dbVersion,
			Object.keys(SUPPORTED_PAIRS)
		)
		this.dbInstance.initDb()
	}

	getDictionary() {
		return this.dbInstance.makeGetAllTransaction<DictionaryWord>(this.dbStoreKey)
	}

	addWord(data: Omit<DictionaryWord, 'id'>) {
		return this.dbInstance.makeAddTransaction<DictionaryWord>(this.dbStoreKey, data)
	}

	deleteWord(id: DictionaryWord['id']) {
		return this.dbInstance.makeDeleteTransaction(this.dbStoreKey, id)
	}

	editWord(data: DictionaryWord) {
		return this.dbInstance.makeEditTransaction(this.dbStoreKey, data)
	}
}