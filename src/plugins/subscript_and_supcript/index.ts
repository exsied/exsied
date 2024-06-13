/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { CN_ACTIVE } from '../../contants'
import { exsied } from '../../core'
import { Commands, ExsiedPlugin } from '../../core/plugin'
import { Toolbar } from '../../ui/toolbar'
import { CN_ICON_SUB, CN_ICON_SUP, PLUGIN_CONF, PLUGIN_NAME, isHighlightSub, isHighlightSup } from './base'
import { formatTextSub, formatTextSup } from './event_handlers'
import './styles.scss'

export const NAME_SUB = 'Subscript'
export const NAME_SUP = 'Supscript'

const toolbarBtnIdsSub = Toolbar.genButtonIdStd(PLUGIN_NAME, NAME_SUB)
const toolbarBtnIdsSup = Toolbar.genButtonIdStd(PLUGIN_NAME, NAME_SUP)

const commands: Commands = {}
commands[NAME_SUB] = formatTextSub
commands[NAME_SUP] = formatTextSup

export const subscriptAndSupscript: ExsiedPlugin = {
	name: PLUGIN_NAME,
	conf: PLUGIN_CONF,
	commands,

	toolBarControl: [
		{
			name: NAME_SUB,
			tooltipText: 'Subscript',
			addToNormalToolbar: PLUGIN_CONF.addToNormalToolbar.sub,
			addToBubbleToolbar: PLUGIN_CONF.addToBubbleToolbar.sub,

			eleType: 'button',
			iconClassName: CN_ICON_SUB,
			clickCallBack: commands[NAME_SUB],
		},
		{
			name: NAME_SUP,
			tooltipText: 'Supscript',
			addToNormalToolbar: PLUGIN_CONF.addToNormalToolbar.sup,
			addToBubbleToolbar: PLUGIN_CONF.addToBubbleToolbar.sup,

			eleType: 'button',
			iconClassName: CN_ICON_SUP,
			clickCallBack: commands[NAME_SUP],
		},
	],

	addHandler: () => {},
	removeHandler: () => {},
	checkHighlight: (_event) => {
		const btnEleSub = exsied.elements.editor?.querySelector(`#${toolbarBtnIdsSub.normal}`)
		if (btnEleSub) {
			isHighlightSub() ? btnEleSub.classList.add(CN_ACTIVE) : btnEleSub.classList.remove(CN_ACTIVE)
		}

		const btnEleSup = exsied.elements.editor?.querySelector(`#${toolbarBtnIdsSup.normal}`)
		if (btnEleSup) {
			isHighlightSup() ? btnEleSup.classList.add(CN_ACTIVE) : btnEleSup.classList.remove(CN_ACTIVE)
		}
	},
	removeTempEle: (_event) => {},
}

export default subscriptAndSupscript
