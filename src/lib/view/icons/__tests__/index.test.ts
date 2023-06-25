import { describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { DeleteForeverIcon, PersonIcon, SearchIcon, TranslationIcon } from '../'

describe('icons', () => {
	it('DeleteForeverIcon', () => {
		const component = shallowMount(DeleteForeverIcon)

		expect(component.findComponent(DeleteForeverIcon)).toBeTruthy()
	})

	it('PersonIcon', () => {
		const component = shallowMount(PersonIcon)

		expect(component.findComponent(PersonIcon)).toBeTruthy()
	})

	it('SearchIcon', () => {
		const component = shallowMount(SearchIcon)

		expect(component.findComponent(SearchIcon)).toBeTruthy()
	})

	it('TranslationIcon', () => {
		const component = shallowMount(TranslationIcon)

		expect(component.findComponent(TranslationIcon)).toBeTruthy()
	})
})
