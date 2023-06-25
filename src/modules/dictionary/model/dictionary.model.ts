import dayjs from 'dayjs'
import { DictionaryServiceAppwrite, DictionaryServicePouchDB } from '../service'

export class DictionaryModel {
	private cloudMainService!: DictionaryServiceAppwrite
	private localMainService!: DictionaryServicePouchDB

	constructor() {
		this.cloudMainService = new DictionaryServiceAppwrite()
		this.localMainService = new DictionaryServicePouchDB()
	}

	isEqual(a: DictionaryWord, b: DictionaryWord, bool?: boolean) {
		const isEqual = a.key === b.key

		if (bool) {
			return isEqual
		} else {
			return isEqual ? 1 : -1
		}
	}

	generateMeta(data: Pick<DictionaryWord, 'value' | 'translations'>): DictionaryWord {
		return {
			...data,
			key: globalThis.crypto.randomUUID(),
			createdAt: dayjs().toISOString(),
		}
	}

	async getDictionary(isOffline?: boolean) {
		try {
			if (isOffline) {
				return await this.localMainService.getAll()
			}
			return await this.cloudMainService.getAll()
		} catch (error) {
			// TODO: PUT ERROR NOTIFICATION
			console.log(error)
			return this.localMainService.getAll()
		}
	}

	async addWord(data: Pick<DictionaryWord, 'key' | 'value' | 'translations' | 'createdAt'>): Promise<DictionaryWord> {
		const result = await Promise.race([
			this.localMainService.add(data),
			this.cloudMainService.add(data),
		])

		return result
	}

	async removeWord(key: DictionaryWord['key']) {
		await Promise.race([
			this.localMainService.delete(key),
			this.cloudMainService.delete(key)
		])

		return key
	}

	async editWord(data: DictionaryWord) {
		await Promise.race([
			this.localMainService.edit(data),
			this.cloudMainService.edit(data)
		])
	}
}
