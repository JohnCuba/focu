type DictionaryWord = {
	key: string
	appwriteId?: string
	indexedDbId?: number

	createdAt: string

	value: string
	translations: string[]
	isLoadTranslation?: boolean
}
