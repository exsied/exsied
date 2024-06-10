/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License,
 * and if you do not meet the conditions, authorization is required
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { TN_H1, TN_H2, TN_H3, TN_H4, TN_H5, TN_H6 } from '../../contants'
import { exsied } from '../../core'
import { Commands, ExsiedPlugin } from '../../core/plugin'
import { genDropdownId, genTriggerClassName } from '../../ui/dropdown'
import { Toolbar } from '../../ui/toolbar'
import {
	HEADING_NAME_1,
	HEADING_NAME_2,
	HEADING_NAME_3,
	HEADING_NAME_4,
	HEADING_NAME_5,
	HEADING_NAME_6,
	PLUGIN_CONF,
	PLUGIN_NAME,
} from './base'
import { formatDiv, formatH1, formatH2, formatH3, formatH4, formatH5, formatH6, formatHeading } from './event_handlers'
import './styles.scss'

const toolbarBtnIds = Toolbar.genButtonIds(PLUGIN_NAME, PLUGIN_NAME)
const dropDownId = genDropdownId(toolbarBtnIds.normal)
const triggerClassName = genTriggerClassName()
const commands: Commands = {
	formatDiv,
	formatH1,
	formatH2,
	formatH3,
	formatH4,
	formatH5,
	formatH6,
}
commands[PLUGIN_NAME] = formatHeading

export const headings: ExsiedPlugin = {
	name: PLUGIN_NAME,
	conf: PLUGIN_CONF,
	commands,

	toolBarControl: [
		{
			name: PLUGIN_NAME,
			tooltipText: 'Headings',
			addToBubble: PLUGIN_CONF.addToBubble,

			eleType: 'select',
			changeCallBack: commands[PLUGIN_NAME],
			defaultText: 'Headings',
			options: PLUGIN_CONF.headingsOptions,
		},
	],

	addHhandler: () => {},
	removeHhandler: () => {},
	checkHighlight: (_event) => {
		const dropDownEle = exsied.elements.toolbarMain?.querySelector(`#${dropDownId}`)
		if (!dropDownEle) return

		let updated = false
		const setDropDownTriggerText = (text: string) => {
			const triggerEle = dropDownEle.querySelector(`.${triggerClassName}`)
			if (triggerEle) {
				triggerEle.innerHTML = text

				updated = true
			}
		}

		const allTagNamesArr = exsied.cursorAllParentsTagNamesArr
		if (allTagNamesArr.includes(TN_H1)) setDropDownTriggerText(HEADING_NAME_1)
		if (allTagNamesArr.includes(TN_H2)) setDropDownTriggerText(HEADING_NAME_2)
		if (allTagNamesArr.includes(TN_H3)) setDropDownTriggerText(HEADING_NAME_3)
		if (allTagNamesArr.includes(TN_H4)) setDropDownTriggerText(HEADING_NAME_4)
		if (allTagNamesArr.includes(TN_H5)) setDropDownTriggerText(HEADING_NAME_5)
		if (allTagNamesArr.includes(TN_H6)) setDropDownTriggerText(HEADING_NAME_6)

		if (!updated) {
			setDropDownTriggerText(PLUGIN_NAME)
		}
	},
	removeTempEle: (_event) => {
		Toolbar.hideDropdowntList(dropDownId)
	},
}

export default headings
