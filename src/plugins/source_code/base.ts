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

export const PLUGIN_NAME = 'SourceCode'
export const CN_ICON_BRACES = 'exsied-btn-braces'
export const CN_ICON_XML = 'exsied-btn-xml'
export const CN_ICON_BACK = 'exsied-btn-back'
export const ID_SOURCE_CODE_VIEW = 'SourceCodeView'

export type PluginConf = {
	addToNormalToolbar: boolean
	addToBubbleToolbar: boolean
	defaultText: string
	renderData: (ele: HTMLElement) => string
	editData: (ele: HTMLElement, sign: string) => void
	randomChars(): string
}

export const PLUGIN_CONF: PluginConf = {
	addToNormalToolbar: true,
	addToBubbleToolbar: false,
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
