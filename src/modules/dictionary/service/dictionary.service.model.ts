export interface DictionaryServiceModel {

	getAll(): Promise<{
		documents: DictionaryWord[];
		total: number;
	}>

	add(data: Pick<DictionaryWord, 'key' | 'value' | 'translations' | 'createdAt'>): Promise<DictionaryWord>

	edit(data: DictionaryWord): Promise<DictionaryWord>

	delete(key: DictionaryWord['key']): Promise<DictionaryWord['key']>
}
