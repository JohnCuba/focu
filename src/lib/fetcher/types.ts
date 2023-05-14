export type FetcherRequestMethod = 'GET' | 'POST'

export type FetcherOptions = {
	host: string
}
export type FetcherRequestOptions = {
	body: Record<string, string | number>
	headers?: Record<string, string>
}
