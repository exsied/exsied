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

const NAME_OL = 'OrderedList'
const NAME_UL = 'UnorderedList'
const toolbarBtnIds = Toolbar.genButtonIdStd(PLUGIN_NAME, PLUGIN_NAME)
const commands: Commands = {}
commands[NAME_OL] = insertOl
commands[NAME_UL] = insertUl

export const lists: ExsiedPlugin = {
	name: PLUGIN_NAME,
	conf: PLUGIN_CONF,
	commands,

	toolBarControl: [
		{
			name: NAME_OL,
			tooltipText: 'Insert ordered list',
			addToNormalToolbar: PLUGIN_CONF.addToNormalToolbar.ol,
			addToNormalToolbarInsertMenu: PLUGIN_CONF.addToNormalToolbarInsertMenu.ol,
			addToBubbleToolbar: PLUGIN_CONF.addToBubbleToolbar.ol,

			eleType: 'button',
			iconClassName: CN_ICON_OL,
			clickCallBack: commands[NAME_OL],
		},
		{
			name: NAME_UL,
			tooltipText: 'Insert unordered list',
			addToNormalToolbar: PLUGIN_CONF.addToNormalToolbar.ul,
			addToNormalToolbarInsertMenu: PLUGIN_CONF.addToNormalToolbarInsertMenu.ul,
			addToBubbleToolbar: PLUGIN_CONF.addToBubbleToolbar.ul,

			eleType: 'button',
			iconClassName: CN_ICON_UL,
			clickCallBack: commands[NAME_UL],
		},
	],

	addHandler: () => {},
	removeHandler: () => {},
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
