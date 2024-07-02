/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { TN_H1, TN_H2, TN_H3, TN_H4, TN_H5, TN_H6 } from '../../contants'
import { t } from '../../core/i18n'
import { Commands, ExsiedPlugin } from '../../core/plugin'
import { genDropdownId, genTriggerClassName } from '../../ui/dropdown'
import { ELE_TYPE_SELECT, Toolbar } from '../../ui/toolbar'
import {
	NAME_HEADING_1,
	NAME_HEADING_2,
	NAME_HEADING_3,
	NAME_HEADING_4,
	NAME_HEADING_5,
	NAME_HEADING_6,
	PLUGIN_CONF,
	PLUGIN_NAME,
} from './base'
import {
	formatH1,
	formatH2,
	formatH3,
	formatH4,
	formatH5,
	formatH6,
	formatHeading,
	formatParagraph,
} from './event_handlers'
import './styles.scss'

const toolbarBtnIds = Toolbar.genButtonIdStd(PLUGIN_NAME, PLUGIN_NAME)
const dropDownId = genDropdownId(toolbarBtnIds.normal)
const triggerClassName = genTriggerClassName()

const commands: Commands = {
	formatDiv: formatParagraph,
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
			addToNormalToolbar: PLUGIN_CONF.addToNormalToolbar,
			addToBubbleToolbar: PLUGIN_CONF.addToBubbleToolbar,

			eleType: ELE_TYPE_SELECT,
			changeCallBack: commands[PLUGIN_NAME],
			defaultText: 'Headings',
			options: PLUGIN_CONF.headingsOptions,
		},
	],

	addHandler: () => {},
	removeHandler: () => {},
	checkHighlight: (_event) => {
		const dropDownEle = exsied.elements.toolbarMain?.querySelector(`#${dropDownId}`)
		if (!dropDownEle) return

		let updated = false
		const setDropDownTriggerText = (text: string) => {
			const triggerEle = dropDownEle.querySelector(`.${triggerClassName}`)
			if (triggerEle) {
				triggerEle.innerHTML = t(text)

				updated = true
			}
		}

		const allTagNamesArr = exsied.cursorAllParentsTagNamesArr
		if (allTagNamesArr.includes(TN_H1)) setDropDownTriggerText(NAME_HEADING_1)
		if (allTagNamesArr.includes(TN_H2)) setDropDownTriggerText(NAME_HEADING_2)
		if (allTagNamesArr.includes(TN_H3)) setDropDownTriggerText(NAME_HEADING_3)
		if (allTagNamesArr.includes(TN_H4)) setDropDownTriggerText(NAME_HEADING_4)
		if (allTagNamesArr.includes(TN_H5)) setDropDownTriggerText(NAME_HEADING_5)
		if (allTagNamesArr.includes(TN_H6)) setDropDownTriggerText(NAME_HEADING_6)

		if (!updated) {
			setDropDownTriggerText(PLUGIN_NAME)
		}
	},
	removeTempEle: (_event) => {
		Toolbar.hideDropdowntList(dropDownId)
	},
}

export default headings
