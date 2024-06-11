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

const NAME_CENTER = 'textCenter'
const NAME_LEFT = 'textLeft'
const NAME_RIGHT = 'textRight'
const toolbarBtnIds = Toolbar.genButtonIds(PLUGIN_NAME, PLUGIN_NAME)
const commands: Commands = {}
commands[NAME_CENTER] = formatTextCenter
commands[NAME_LEFT] = formatTextLeft
commands[NAME_RIGHT] = formatTextRight

export const textAlign: ExsiedPlugin = {
	name: PLUGIN_NAME,
	conf: PLUGIN_CONF,
	commands,

	toolBarControl: [
		{
			name: NAME_LEFT,
			tooltipText: 'Text left',
			addToNormal: PLUGIN_CONF.addToNormal.left,
			addToBubble: PLUGIN_CONF.addToBubble.left,

			eleType: 'button',
			iconClassName: CN_ICON_LEFT,
			clickCallBack: commands[NAME_LEFT],
		},
		{
			name: NAME_CENTER,
			tooltipText: 'Text center',
			addToNormal: PLUGIN_CONF.addToNormal.center,
			addToBubble: PLUGIN_CONF.addToBubble.center,

			eleType: 'button',
			iconClassName: CN_ICON_CENTER,
			clickCallBack: commands[NAME_CENTER],
		},
		{
			name: NAME_RIGHT,
			tooltipText: 'Text right',
			addToNormal: PLUGIN_CONF.addToNormal.right,
			addToBubble: PLUGIN_CONF.addToBubble.right,

			eleType: 'button',
			iconClassName: CN_ICON_RIGHT,
			clickCallBack: commands[NAME_RIGHT],
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
