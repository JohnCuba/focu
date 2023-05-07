<script setup lang="ts">
import { ref, computed, inject } from 'vue'
import { DICTIONARY_STORE_INJECTION } from '~/features/dictionary'
import { useHideOnScroll } from '~/lib/hooks/useHideOnScroll'

const dictionaryStore = inject(DICTIONARY_STORE_INJECTION)
const searchWord = computed(() => dictionaryStore?.filterValues?.value || '')

const elementRef = ref<HTMLDivElement>()
const componentHeight = computed(() => elementRef.value?.offsetHeight || 0)

const {isHidden} = useHideOnScroll({offset: componentHeight})

const handleSearchWord = ({target}: Event) => {
	dictionaryStore?.setFilterValue('value', (target as HTMLInputElement).value)
}
</script>

<template>
	<header
		ref="elementRef"
		class="navbar bg-base-100 rounded-xl z-20 fixed -top-28 gap-x-2 drop-shadow-xl"
		:class="{'top-1': !isHidden}"
	>
		<div class="navbar-start">
			<h1 class="normal-case font-semibold text-xl select-none">
				focu
			</h1>
		</div>
		<div class="navbar-end">
			<div class="form-control">
				<input
					:value="searchWord"
					type="text"
					placeholder="Search"
					class="input input-bordered"
					@input="handleSearchWord"
					@keypress.enter="handleSearchWord"
				/>
			</div>
		</div>
	</header>
</template>
