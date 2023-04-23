import { MaybeComputedRef, useScroll } from '@vueuse/core'
import { ref, toRefs, watchEffect, ComputedRef } from 'vue'

export const useHideOnScroll = ({
	element = document,
	offset,
}: Props = defaultProps) => {
	const {directions, y, arrivedState} = useScroll(element, {behavior: 'smooth'})
	const {bottom: isBottomArrived, top: isTopArrived} = toRefs(arrivedState)
	const {top: toTop, bottom: toBottom} = toRefs(directions)
	const isHidden = ref(false)

	watchEffect(() => {
		if (toTop.value || isBottomArrived.value || isTopArrived.value) {
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
