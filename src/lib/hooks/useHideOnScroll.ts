import { MaybeComputedRef, useScroll } from '@vueuse/core'
import { ref, toRefs, watchEffect, ComputedRef } from 'vue'

export const useHideOnScroll = ({
	scrollElement = document,
	offset,
}: Props = defaultProps) => {
	const {directions, y, arrivedState} = useScroll(scrollElement, {behavior: 'smooth'})
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
	scrollElement: document,
}

type Props = {
	scrollElement?: MaybeComputedRef<Document | HTMLElement | SVGElement | Window | null | undefined>,
	offset?: ComputedRef<number>
}
