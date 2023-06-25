<script setup lang="ts">
import { computed, ref } from 'vue'
import { useHideOnScroll } from '~/lib/hooks/useHideOnScroll'

const elementRef = ref<HTMLDivElement>()

const componentHeight = computed(() => elementRef.value?.offsetHeight || 0)

const {isHidden} = useHideOnScroll({offset: componentHeight})
</script>

<template>
	<div
		ref="elementRef"
		class="bg-base-100 rounded-xl z-20 fixed -bottom-28 drop-shadow-2xl transition-all duration-500"
		:class="{'bottom-1': !isHidden}"
	>
		<slot />
	</div>
</template>

<style>
:root {
	--page-content-bottom-offset: 4.5rem;
}
</style>
