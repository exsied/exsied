/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License,
 * and if you do not meet the conditions, authorization is required
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { CN_ACTIVE, TN_BLOCKQUOTE, TN_Q } from '../../contants'
import { exsied } from '../../core'
import { Commands, ExsiedPlugin } from '../../core/plugin'
import { Toolbar } from '../../ui/toolbar'
import { CN_ICON_CENTER, CN_ICON_LEFT, CN_ICON_RIGHT, PLUGIN_CONF, PLUGIN_NAME } from './base'
import { formatTextCenter, formatTextLeft, formatTextRight } from './event_handlers'
import './styles.scss'

const CENTER_NAME = 'textCenter'
const LEFT_NAME = 'textLeft'
const RIGHT_NAME = 'textRight'
const toolbarBtnIds = Toolbar.genButtonIds(PLUGIN_NAME, PLUGIN_NAME)
const commands: Commands = {}
commands[CENTER_NAME] = formatTextCenter
commands[LEFT_NAME] = formatTextLeft
commands[RIGHT_NAME] = formatTextRight

export const textAlign: ExsiedPlugin = {
	name: PLUGIN_NAME,
	conf: PLUGIN_CONF,
	commands,

	toolBarControl: [
		{
			name: LEFT_NAME,
			tooltipText: 'Text left',
			addToBubble: PLUGIN_CONF.addToBubble,

			eleType: 'button',
			iconClassName: CN_ICON_LEFT,
			clickCallBack: commands[LEFT_NAME],
		},
		{
			name: CENTER_NAME,
			tooltipText: 'Text center',
			addToBubble: PLUGIN_CONF.addToBubble,

			eleType: 'button',
			iconClassName: CN_ICON_CENTER,
			clickCallBack: commands[CENTER_NAME],
		},
		{
			name: RIGHT_NAME,
			tooltipText: 'Text right',
			addToBubble: PLUGIN_CONF.addToBubble,

			eleType: 'button',
			iconClassName: CN_ICON_RIGHT,
			clickCallBack: commands[RIGHT_NAME],
		},
	],

	addHhandler: () => {},
	removeHhandler: () => {},
	checkHighlight: (_event) => {
		const btnEle = exsied.elements.editor?.querySelector(`#${toolbarBtnIds.normal}`)

		if (btnEle) {
			const allTagNamesArr = exsied.cursorAllParentsTagNamesArr
			allTagNamesArr.includes(TN_Q) || allTagNamesArr.includes(TN_BLOCKQUOTE)
				? btnEle.classList.add(CN_ACTIVE)
				: btnEle.classList.remove(CN_ACTIVE)
		}
	},
	removeTempEle: (_event) => {},
}

export default textAlign