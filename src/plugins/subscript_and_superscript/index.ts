/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License,
 * and if you do not meet the conditions, authorization is required
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { CN_ACTIVE } from '../../contants'
import { exsied } from '../../core'
import { Commands, ExsiedPlugin } from '../../core/plugin'
import { Toolbar } from '../../ui/toolbar'
import { CN_ICON_SUB, CN_ICON_SUP, PLUGIN_CONF, PLUGIN_NAME, isHighlightSup } from './base'
import { formatTextSub, formatTextSup } from './event_handlers'
import './styles.scss'

export const SUB_NAME = 'Subscript'
export const SUP_NAME = 'Supscript'

const toolbarBtnIdsSub = Toolbar.genButtonIds(PLUGIN_NAME, SUB_NAME)
const toolbarBtnIdsSup = Toolbar.genButtonIds(PLUGIN_NAME, SUP_NAME)
const commands: Commands = {}
commands[SUB_NAME] = formatTextSub
commands[SUP_NAME] = formatTextSup

export const subscriptAndSuperscript: ExsiedPlugin = {
	name: PLUGIN_NAME,
	conf: PLUGIN_CONF,
	commands,

	toolBarControl: [
		{
			name: SUB_NAME,
			tooltipText: 'Subscript',
			addToNormal:PLUGIN_CONF.addToNormal.sub,
			addToBubble: PLUGIN_CONF.addToBubble.sub,

			eleType: 'button',
			iconClassName: CN_ICON_SUB,
			clickCallBack: commands[SUB_NAME],
		},
		{
			name: SUP_NAME,
			tooltipText: 'Supscript',
			addToNormal:PLUGIN_CONF.addToNormal.sup,
			addToBubble: PLUGIN_CONF.addToBubble.sup,

			eleType: 'button',
			iconClassName: CN_ICON_SUP,
			clickCallBack: commands[SUP_NAME],
		},
	],

	addHhandler: () => {},
	removeHhandler: () => {},
	checkHighlight: (_event) => {
		const btnEleSub = exsied.elements.editor?.querySelector(`#${toolbarBtnIdsSub.normal}`)
		if (btnEleSub) {
			isHighlightSup() ? btnEleSub.classList.add(CN_ACTIVE) : btnEleSub.classList.remove(CN_ACTIVE)
		}

		const btnEleSup = exsied.elements.editor?.querySelector(`#${toolbarBtnIdsSup.normal}`)
		if (btnEleSup) {
			isHighlightSup() ? btnEleSup.classList.add(CN_ACTIVE) : btnEleSup.classList.remove(CN_ACTIVE)
		}
	},
	removeTempEle: (_event) => {},
}

export default subscriptAndSuperscript
