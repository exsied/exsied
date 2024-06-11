/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License,
 * and if you do not meet the conditions, authorization is required
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { CN_TEMP_ELE_HIGHLIGHT } from '../../contants'
import { exsied } from '../../core'
import { DomUtils } from '../../core/dom_utils'
import { Commands, ExsiedPlugin } from '../../core/plugin'
import { CN_ICON_FIND, CN_ICON_REPLACE, PLUGIN_CONF, PLUGIN_NAME, POPUP_ID } from './base'
import { onClickFind, onClickReplace, reset } from './event_handlers'
import './styles.scss'

export const NAME_FIND = 'find'
export const NAME_REPLACE = 'replace'
const commands: Commands = {}
commands[NAME_FIND] = onClickFind
commands[NAME_REPLACE] = onClickReplace

export const findAndReplace: ExsiedPlugin = {
	name: PLUGIN_NAME,
	conf: PLUGIN_CONF,
	commands,

	toolBarControl: [
		{
			name: NAME_FIND,
			tooltipText: 'Find',
			addToNormalToolbar: PLUGIN_CONF.addToNormalToolbar.find,
			addToBubbleToolbar: PLUGIN_CONF.addToBubbleToolbar.find,

			eleType: 'button',
			iconClassName: CN_ICON_FIND,
			clickCallBack: commands[NAME_FIND],
		},
		{
			name: NAME_REPLACE,
			tooltipText: 'Replace',
			addToNormalToolbar: PLUGIN_CONF.addToNormalToolbar.replace,
			addToBubbleToolbar: PLUGIN_CONF.addToBubbleToolbar.replace,

			eleType: 'button',
			iconClassName: CN_ICON_REPLACE,
			clickCallBack: commands[NAME_REPLACE],
		},
	],

	addHandler: () => {},
	removeHandler: () => {},
	checkHighlight: (_event) => {},
	removeTempEle: (_event) => {
		DomUtils.removeElementById(POPUP_ID)
		reset()

		// Remove temp elements
		const elements = document.getElementsByClassName(CN_TEMP_ELE_HIGHLIGHT)
		for (let i = elements.length - 1; i >= 0; i--) {
			const element = elements[i]
			while (element.firstChild) {
				element.parentNode?.insertBefore(element.firstChild, element)
			}

			element.parentNode?.removeChild(element)
		}
		if (exsied.elements.workplace) {
			const workplace_ele = exsied.elements.workplace
			DomUtils.mergeAdjacentTextNodes(workplace_ele)
		}
	},
}

export default findAndReplace
