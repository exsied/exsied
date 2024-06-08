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
	renderData: (ele: HTMLElement) => {
		console.warn(`Unimplemented callback: ${PLUGIN_NAME}.conf.renderData`)

		return `<pre><code>${ele.innerHTML}</code></pre>`
	},
	editData: (_ele: HTMLElement, _sign: string) => {
		alert(`Unimplemented callback: ${PLUGIN_NAME}.conf.editData`)
	},
	randomChars: () => {
		return randomChars(28)
	},
}
