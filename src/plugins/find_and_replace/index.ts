import { CN_TEMP_ELE_HIGHLIGHT } from '../../contants'
import { exsied } from '../../core'
import { DomUtils } from '../../core/dom_utils'
import { Commands, ExsiedPlugin } from '../../core/plugin'
import { CN_ICON_FIND, CN_ICON_REPLACE, PLUGIN_CONF, PLUGIN_NAME, POPUP_ID } from './base'
import { onClickFind, onClickReplace, reset } from './event_handlers'
import './styles.scss'

export const FIND_NAME = 'find'
export const REPLACE_NAME = 'replace'
const commands: Commands = {}
commands[FIND_NAME] = onClickFind
commands[REPLACE_NAME] = onClickReplace

const plugin: ExsiedPlugin = {
	name: PLUGIN_NAME,
	conf: PLUGIN_CONF,
	commands,

	toolBarControl: [
		{
			name: FIND_NAME,
			tooltipText: 'Find',
			addToBubble: PLUGIN_CONF.addToBubble,

			eleType: 'button',
			iconClassName: CN_ICON_FIND,
			clickCallBack: commands[FIND_NAME],
		},
		{
			name: REPLACE_NAME,
			tooltipText: 'Replace',
			addToBubble: PLUGIN_CONF.addToBubble,

			eleType: 'button',
			iconClassName: CN_ICON_REPLACE,
			clickCallBack: commands[REPLACE_NAME],
		},
	],

	addHhandler: () => {},
	removeHhandler: () => {},
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

export default plugin
