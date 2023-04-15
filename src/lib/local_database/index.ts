import { SUPPORTED_PAIRS } from '~/config/app/langs'

export class LocalDatabase {
	private _database!: IDBDatabase
	get database() {return this._database}

	private name!: string
	private version!: number

	constructor(name: string, version: number) {
		this.name = name
		this.version = version
	}

	initDb() {
		return new Promise((resolve, reject) => {
			if (this.database) return resolve('Local database already initialized')

			const openRequest = globalThis.indexedDB.open(this.name, this.version)

			openRequest.onsuccess = () => {
				this.handleOpen(openRequest)
				resolve('Local database opened')
			}
			openRequest.onupgradeneeded = (event: IDBVersionChangeEvent) => {
				this.handleUpgrade(openRequest, event)
				resolve('Local database upgraded')
			}
			openRequest.onerror = reject
		})
	}

	private handleOpen = (request: IDBOpenDBRequest) => {
		this._database = request.result
	}

	private handleUpgrade = (request: IDBOpenDBRequest, event: IDBVersionChangeEvent) => {
		switch(event.oldVersion) {
			default: {
				this.create(request)
				break
			}
		}
	}

	private create = (request: IDBOpenDBRequest) => {
		if (!this.database) {
			this._database = request.result
		}

		Object.keys(SUPPORTED_PAIRS).forEach((key) => {
			this.database.createObjectStore(key, {keyPath: 'id', autoIncrement: true})
		})
	}

	makeGetAllTransaction = async <T>(storeKey: keyof typeof SUPPORTED_PAIRS): Promise<T[]> => {
		await this.initDb()
		return new Promise((resolve, reject) => {
			const transaction = this.database.transaction(storeKey, 'readonly')
			const wordsStore = transaction.objectStore(storeKey)

			const request: IDBRequest = wordsStore.getAll()

			request.onsuccess = () => resolve(request.result)
			request.onerror = () => reject(`[LocalDatabase][${storeKey}]: Unable to get all`)
		})
	}

	makeAddTransaction = async <T>(
		storeKey: keyof typeof SUPPORTED_PAIRS,
		data: Omit<T, 'id'>,
	): Promise<Omit<T, 'id'> & {id: number}> => {
		await this.initDb()
		return new Promise((resolve, reject) => {
			const transaction = this.database.transaction(storeKey, 'readwrite')
			const store = transaction.objectStore(storeKey)

			const request = store.add(data) as IDBRequest<number>

			request.onsuccess = () => resolve({...data, id: request.result})
			request.onerror = () => reject(`[LocalDatabase][${storeKey}]: Unable to add ${data}`)
		})
	}

	makeDeleteTransaction = async (storeKey: keyof typeof SUPPORTED_PAIRS, recordKey: number): Promise<number> => {
		await this.initDb()
		return new Promise((resolve, reject) => {
			const transaction = this.database.transaction(storeKey, 'readwrite')
			const store = transaction.objectStore(storeKey)

			const request = store.delete(recordKey)

			request.onsuccess = () => resolve(recordKey)
			request.onerror = () => reject(`[LocalDatabase][${storeKey}]: Unable to delete ${recordKey}`)
		})
	}
}