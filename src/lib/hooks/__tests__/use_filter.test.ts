import { describe, expect, it } from 'vitest'
import { useFilter } from '../use_filter'
import { ref } from 'vue'

type Entity = {id: number, value: string}
const MOCK_COLLECTION: Entity[] = [{id: 1, value: 'first'}, {id:2, value: 'second'}, {id:3, value: 'third'}]

describe('useFilter', () => {
	it('should return all items when filters are clean', () => {
		const collection = ref(MOCK_COLLECTION)
		const {result} = useFilter<Entity>(collection, {})

		expect(result.value).toEqual(MOCK_COLLECTION)
	})

	it('should set filter state and filter collection', () => {
		const collection = ref(MOCK_COLLECTION)
		const {result, setFilterValue} = useFilter<Entity>(collection, {
			id: (entity, value) => entity.id === value
		})
		const expectedResult = MOCK_COLLECTION.filter(({id}) => id === 2)

		setFilterValue('id', 2)

		expect(result.value).toEqual(expectedResult)
	})

	it('should pass invalid filter state without filter collection', () => {
		const collection = ref(MOCK_COLLECTION)
		const {result, setFilterValue} = useFilter<Entity>(collection, {
			id: (entity, value) => entity.id === value
		})

		// @ts-expect-error -- Test for filter's bulletproof
		setFilterValue('invalidKey', 2)

		expect(result.value).toEqual(MOCK_COLLECTION)
	})
})
