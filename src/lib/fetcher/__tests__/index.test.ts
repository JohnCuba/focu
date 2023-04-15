import createFetchMock from 'vitest-fetch-mock'
import {describe, it, expect, vi, beforeEach, afterEach, beforeAll, afterAll} from 'vitest'
import { Fetcher } from '..'

const mockFetch = createFetchMock(vi)
const mockHost = 'http://google.com/'

describe('Fetcher', () => {
	beforeAll(() => {
		mockFetch.enableMocks()
	})

	beforeEach(() => {
		mockFetch.doMock()
		mockFetch.mockResponse(JSON.stringify({data: 'test data'}))
	})

	afterEach(() => {
		mockFetch.dontMock()
	})

	afterAll(() => {
		mockFetch.disableMocks()
	})

	it('should create instance with right params', () => {
		const instance = new Fetcher({host: mockHost})

		expect(instance).toBeInstanceOf(Fetcher)
		expect(instance.host).toBe(mockHost)
	})

	it('should make get request and return data', async () => {
		const instance = new Fetcher({host: mockHost})

		const result = await instance.get('/path')

		expect(result).toEqual({data: 'test data'})
	})

	it('should trow error on request error', () => {
		mockFetch.mockResponseOnce('test error', {status: 404})

		const instance = new Fetcher({host: mockHost})

		expect(instance.get('/path')).rejects.toEqual(Error('[Fetcher][http://google.com/path]: test error'))
	})

	it('should make get request and return data', async () => {
		const instance = new Fetcher({host: mockHost})

		const result = await instance.post('/path', {body: {foo: 'bar'}})

		expect(result).toEqual({data: 'test data'})
	})
})
