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
import { CN_ICON_OL, CN_ICON_UL, PLUGIN_CONF, PLUGIN_NAME } from './base'
import { insertOl, insertUl } from './event_handlers'
import './styles.scss'

const OL_NAME = 'OrderedList'
const UL_NAME = 'UnorderedList'
const toolbarBtnIds = Toolbar.genButtonIds(PLUGIN_NAME, PLUGIN_NAME)
const commands: Commands = {}
commands[OL_NAME] = insertOl
commands[UL_NAME] = insertUl

export const lists: ExsiedPlugin = {
	name: PLUGIN_NAME,
	conf: PLUGIN_CONF,
	commands,

	toolBarControl: [
		{
			name: OL_NAME,
			tooltipText: 'Insert ordered list',
			addToBubble: PLUGIN_CONF.addToBubble,

			eleType: 'button',
			iconClassName: CN_ICON_OL,
			clickCallBack: commands[OL_NAME],
		},
		{
			name: UL_NAME,
			tooltipText: 'Insert unordered list',
			addToBubble: PLUGIN_CONF.addToBubble,

			eleType: 'button',
			iconClassName: CN_ICON_UL,
			clickCallBack: commands[UL_NAME],
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

export default lists
