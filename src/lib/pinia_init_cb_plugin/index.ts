import {type PiniaPluginContext} from 'pinia'

const CB_NAME = '_init'

export function piniaInitCbPlugin(context: PiniaPluginContext) {
	if (
		CB_NAME in context.options.actions &&
		typeof context.options.actions[CB_NAME] === 'function'
	) {
		try {
			context.options.actions[CB_NAME]()
		} catch (error) {
			console.error(error)
		}
	}
}
