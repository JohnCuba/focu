import { Fetcher } from '~/lib/fetcher'

export class TranslatorApiService {
	private fetcher!: Fetcher
	private source!: string
	private target!: string

	constructor(source: string, target: string) {
		this.source = source
		this.target = target
		this.fetcher = new Fetcher({
			host: 'https://translate.argosopentech.com/'
		})
	}

	getTranslation(q: string) {
		return this.fetcher.post<{translatedText: string}>(
			'/translate',
			{
				body: {
					q,
					source: this.source,
					target: this.target,
				}
			}
		).then((data) => data.translatedText)
	}
}
