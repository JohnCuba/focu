import { type SupportedLangPair } from '~/config/app/langs'
import { Fetcher } from '~/lib/fetcher'

export class TranslatorApiService {
	private fetcher!: Fetcher
	private langPair!: SupportedLangPair

	constructor(langPair: SupportedLangPair) {
		this.langPair = langPair
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
					source: this.langPair.source,
					target: this.langPair.target,
				}
			}
		).then((data) => data.translatedText)
	}
}
