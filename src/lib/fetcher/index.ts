import { FetcherRequestOptions, type FetcherOptions, FetcherRequestMethod } from './types'

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

	private prepareBody(data?: FetcherRequestOptions['body']) {
		return data ? {body: JSON.stringify(data)} : {}
	}

	private async makeRequest(path: string, method: FetcherRequestMethod, params?: FetcherRequestOptions) {
		const url = new URL(path, this.host)
		const response = await globalThis.fetch(
			url,
			{
				method,
				...this.prepareBody(params?.body),
				headers: {
					...this._headers
				}
			}
		)

		if (response.ok) {
			return await response.json()
		} else {
			const errorMessage = await response.text()
			return Promise.reject(new Error(`[Fetcher][${url.toString()}]: ` + errorMessage))
		}
	}

	get = async <T>(path: string): Promise<T> => {
		return this.makeRequest(path, 'GET')
	}

	post = async <T>(path: string, {body}: FetcherRequestOptions): Promise<T> => {
		return this.makeRequest(path, 'POST', {body})
	}
}
