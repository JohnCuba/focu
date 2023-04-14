import { MaybeComputedRef, useScroll } from '@vueuse/core'
import { ref, toRefs, watchEffect, ComputedRef } from 'vue'

export const useHideOnScroll = ({
	element = document,
	offset,
}: Props = defaultProps) => {
	const {directions, y} = useScroll(element, {behavior: 'smooth'})
	const {top: toTop, bottom: toBottom} = toRefs(directions)
	const isHidden = ref(false)

	watchEffect(() => {
		if (toTop.value) {
			isHidden.value = false
		} else if ((y.value > (offset?.value ?? 0)) && toBottom.value) {
			isHidden.value = true
		}
	}, {flush: 'post'})

	return {
		isHidden
	}
}

const defaultProps: Props = {
	element: document,
}

type Props = {
	element?: MaybeComputedRef<Document | HTMLElement | SVGElement | Window | null | undefined>,
	offset?: ComputedRef<number>
}
