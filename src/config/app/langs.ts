export type SupportedPairs = 'en-ru'

export type SupportedLangPair = {
	key: SupportedPairs,
	source: string,
	target: string,
}

export const SUPPORTED_PAIRS: Record<SupportedPairs, SupportedLangPair> = {
	'en-ru': {
		key: 'en-ru',
		source: 'en',
		target: 'ru',
	},
} as const
