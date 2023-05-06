import { computed, reactive, type Ref } from 'vue'

export const useFilter = <T extends object>(
	collection: Ref<T[]>,
	filters: Partial<Record<keyof T, (entity: T, value: unknown) => boolean>>
) => {
	const filterValues = reactive<Partial<Record<keyof T, unknown>>>({})

	const result = computed(
		() =>  collection.value
			.filter((element) =>{
				return Object
					.entries(filterValues)
					.every(([key, value]) => filters[key as keyof T] ? filters[key as keyof T]?.(element, value) : true)
				})
			)

	const setFilterValue = (key: keyof T, value: unknown) => {
		Object.assign(filterValues, {[key]: value})
	}

	return {
		result,
		filterValues,
		setFilterValue,
	}
}
