import { TN_H1, TN_H2, TN_H3, TN_H4, TN_H5, TN_H6 } from '../../contants'
import { exsied } from '../../core'
import { ExsiedPlugin } from '../../types'
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
import { formatHeading } from './event_handlers'
import './styles.scss'

const toolbarBtnIds = Toolbar.genButtonIds(PLUGIN_NAME, PLUGIN_NAME)
const dropDownId = genDropdownId(toolbarBtnIds.normal)
const triggerClassName = genTriggerClassName()

const plugin: ExsiedPlugin = {
	name: PLUGIN_NAME,
	conf: PLUGIN_CONF,

	toolBarControl: [
		{
			name: PLUGIN_NAME,
			tooltipText: 'Headings',
			addToBubble: PLUGIN_CONF.addToBubble,

			eleType: 'select',
			changeCallBack: formatHeading,
			defaultText: 'Headings',
			options: PLUGIN_CONF.headingsOptions,
		},
	],

	addHhandler: () => {},
	removeHhandler: () => {},
	checkHighlight: (_event) => {
		const dropDownEle = exsied.elements.toolbar?.querySelector(`#${dropDownId}`)
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

export default plugin
