<script setup lang="ts">
import { ref, computed } from 'vue'
import { useHideOnScroll } from '~/lib/hooks/useHideOnScroll'

const elementRef = ref<HTMLDivElement>()
const componentHeight = computed(() => elementRef.value?.offsetHeight || 0)

const {isHidden} = useHideOnScroll({offset: componentHeight})
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
	</header>
</template>
