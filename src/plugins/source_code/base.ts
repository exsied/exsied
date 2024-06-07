import { randomChars } from '../../utils/string'

export const PLUGIN_NAME = 'sourceCode'
export const CN_ICON_BRACES = 'exsied-btn-braces'
export const CN_ICON_XML = 'exsied-btn-xml'

export type PluginConf = {
	addToBubble: boolean
	renderData: (ele: HTMLElement) => string
	editData: (ele: HTMLElement, sign: string) => void
	randomChars(): string
}

export const PLUGIN_CONF: PluginConf = {
	addToBubble: true,
	renderData: (_ele: HTMLElement) => {
		const msg = `Unimplemented callback: ${PLUGIN_NAME}.conf.renderData`
		console.error(msg)
		return msg
	},
	editData: (_ele: HTMLElement, _sign: string) => {
		console.error(`Unimplemented callback: ${PLUGIN_NAME}.conf.editData`)
	},
	randomChars: () => {
		return randomChars(28)
	},
}
