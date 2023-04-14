import { FetcherRequestOptions, type FetcherOptions } from './types'

// TODO: Make more functionality
export class Fetcher {
	private _host!: string
	private _headers: HeadersInit = {
		'Content-Type': 'application/json'
	}
	get host() {
		return this._host
	}

	constructor({host}: FetcherOptions) {
		this._host = host
	}

	private async makeRequest(path: string, method: string, params?: FetcherRequestOptions) {
		const url = new URL(path, this.host)
		const response = await fetch(
			url,
			{
				method,
				body: JSON.stringify(params?.body ?? ''),
				headers: {
					...this._headers
				}
			}
		)

		if (response.ok) {
			return await response.json()
		} else {
			const errorMessage = await response.text()
			return Promise.reject(new Error(`[Fetcher][${url.toString()}]:` + errorMessage))
		}
	}

	get = async <T>(path: string): Promise<T> => {
		return this.makeRequest(path, 'get')
	}

	post = async <T>(path: string, {body}: FetcherRequestOptions): Promise<T> => {
		return this.makeRequest(path, 'post', {body})
	}
}
