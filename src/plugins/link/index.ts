/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { CN_ACTIVE, TN_A } from '../../contants'
import { exsied } from '../../core'
import { DomUtils } from '../../core/dom_utils'
import { EleClickCallback } from '../../core/events'
import { Commands, ExsiedPlugin } from '../../core/plugin'
import { Toolbar } from '../../ui/toolbar'
import { CN_ICON, PLUGIN_CONF, PLUGIN_NAME, POPUP_ID } from './base'
import { insertLink, onClickLink } from './event_handlers'
import './styles.scss'

const toolbarBtnIds = Toolbar.genButtonIdStd(PLUGIN_NAME, PLUGIN_NAME)

const commands: Commands = {}
commands[PLUGIN_NAME] = insertLink

export const link: ExsiedPlugin = {
	name: PLUGIN_NAME,
	conf: PLUGIN_CONF,
	commands,

	toolBarControl: [
		{
			name: PLUGIN_NAME,
			tooltipText: 'Link',
			addToNormalToolbar: PLUGIN_CONF.addToNormalToolbar,
			addToNormalToolbarInsertMenu: PLUGIN_CONF.addToNormalToolbarInsertMenu,
			addToBubbleToolbar: PLUGIN_CONF.addToBubbleToolbar,

			eleType: 'button',
			iconClassName: CN_ICON,
			clickCallBack: commands[PLUGIN_NAME],
		},
	],

	addHandler: () => {
		EleClickCallback.addByTag(TN_A, onClickLink)
	},
	removeHandler: () => {},
	checkHighlight: (_event) => {
		const btnEle = exsied.elements.editor?.querySelector(`#${toolbarBtnIds.normal}`)

		if (btnEle) {
			const allTagNamesArr = exsied.cursorAllParentsTagNamesArr
			allTagNamesArr.includes(TN_A) ? btnEle.classList.add(CN_ACTIVE) : btnEle.classList.remove(CN_ACTIVE)
		}
	},
	removeTempEle: (_event) => {
		const allTagNamesArr = exsied.cursorAllParentsTagNamesArr
		if (!allTagNamesArr.includes(TN_A)) {
			DomUtils.removeElementById(POPUP_ID)
		}
	},
}

export default link
