/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { randomChars } from '../../utils/string'

export const PLUGIN_NAME = 'SourceCode'
export const CN_ICON_BRACES = 'exsied-icon-braces'
export const CN_ICON_XML = 'exsied-icon-xml'
export const CN_ICON_BACK = 'exsied-icon-back'
export const ID_SOURCE_CODE_EDIT_VIEW = 'sourceCodeEditView'

export type PluginConf = {
	addToNormalToolbar: boolean
	addToNormalToolbarInsertMenu?: boolean
	addToBubbleToolbar: boolean
	defaultText: string
	renderDataCb: (ele: HTMLElement) => string
	editDataCb: (ele: HTMLElement, sign: string) => void
	toggleSourceViewCb?: () => void
	toggleSourceViewAferInitCb?: (sourceCodeWorkplaceEle: HTMLElement) => void
	randomCharsCb(): string
}

export const PLUGIN_CONF: PluginConf = {
	addToNormalToolbar: false,
	addToNormalToolbarInsertMenu: true,
	addToBubbleToolbar: false,
	defaultText: '// Source code placeholder',
	renderDataCb: (ele: HTMLElement) => {
		console.warn(`Developer didn't implement the callback: ${PLUGIN_NAME}.conf.renderData`)

		return `
			<pre>
				<p>Source code:</p>
				<code>${ele.innerHTML}</code>
			</pre>`
	},
	editDataCb: (_ele: HTMLElement, _sign: string) => {
		alert(`Developer didn't implement the callback: ${PLUGIN_NAME}.conf.editData`)
	},	
	randomCharsCb: () => {
		return randomChars(28)
	},
}
