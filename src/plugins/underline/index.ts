/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { CN_ACTIVE, TN_U } from '../../contants'

import { Commands, ExsiedPlugin } from '../../core/plugin'
import { ELE_TYPE_BUTTON, Toolbar } from '../../ui/toolbar'
import { CN_ICON, PLUGIN_CONF, PLUGIN_NAME } from './base'
import { formatUnderline } from './event_handlers'
import './styles.scss'

const toolbarBtnIds = Toolbar.genButtonIdStd(PLUGIN_NAME, PLUGIN_NAME)

const commands: Commands = {}
commands[PLUGIN_NAME] = formatUnderline

export const underline: ExsiedPlugin = {
	name: PLUGIN_NAME,
	conf: PLUGIN_CONF,
	commands,

	toolBarControl: [
		{
			name: PLUGIN_NAME,
			tooltipText: 'Underline',
			addToNormalToolbar: PLUGIN_CONF.addToNormalToolbar,
			addToBubbleToolbar: PLUGIN_CONF.addToBubbleToolbar,

			eleType: ELE_TYPE_BUTTON,
			iconClassName: CN_ICON,
			clickCallBack: commands[PLUGIN_NAME],
		},
	],

	addHandler: () => {},
	removeHandler: () => {},
	checkHighlight: (_event) => {
		const btnEle = exsied.elements.editor?.querySelector(`#${toolbarBtnIds.normal}`)
		if (btnEle) {
			const allTagNamesArr = exsied.cursorAllParentsTagNamesArr
			allTagNamesArr.includes(TN_U) ? btnEle.classList.add(CN_ACTIVE) : btnEle.classList.remove(CN_ACTIVE)
		}
	},
	removeTempEle: (_event) => {},
}

export default underline
