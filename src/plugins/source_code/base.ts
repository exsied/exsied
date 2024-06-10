/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License,
 * and if you do not meet the conditions, authorization is required
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { randomChars } from '../../utils/string'

export const PLUGIN_NAME = 'sourceCode'
export const CN_ICON_BRACES = 'exsied-btn-braces'
export const CN_ICON_XML = 'exsied-btn-xml'

export type PluginConf = {
	addToNormal: boolean
	addToBubble: boolean
	defaultText: string
	renderData: (ele: HTMLElement) => string
	editData: (ele: HTMLElement, sign: string) => void
	randomChars(): string
}

export const PLUGIN_CONF: PluginConf = {
	addToNormal:true,
	addToBubble: true,
	defaultText: '// Source code placeholder',
	renderData: (ele: HTMLElement) => {
		console.warn(`Developer didn't implement the callback: ${PLUGIN_NAME}.conf.renderData`)

		return `
			<pre>
				<p>Source code:</p>
				<code>${ele.innerHTML}</code>
			</pre>`
	},
	editData: (_ele: HTMLElement, _sign: string) => {
		alert(`Developer didn't implement the callback: ${PLUGIN_NAME}.conf.editData`)
	},
	randomChars: () => {
		return randomChars(28)
	},
}
