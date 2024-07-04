/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { TN_DIV, TN_H1, TN_H2, TN_H3, TN_H4, TN_H5, TN_H6 } from '../../contants'
import { Exsied } from '../../core'
import { FormatTaName } from '../../core/format/tag_name'
import { t } from '../../core/i18n'
import { ExsiedPlugin } from '../../core/plugin'
import { DropdownMenu } from '../../ui/dropdown'
import { ELE_TYPE_SELECT, ToolBarControlIds, ToolBarSelectOption, emptyToolBarControlIds } from '../../ui/toolbar'

export type PluginConf = {
	addToNormalToolbar: boolean
	addToBubbleToolbar: boolean
	headingsOptions: ToolBarSelectOption[]
}

export const NAME_HEADING_1 = 'Heading1'
export const NAME_HEADING_2 = 'Heading2'
export const NAME_HEADING_3 = 'Heading3'
export const NAME_HEADING_4 = 'Heading4'
export const NAME_HEADING_5 = 'Heading5'
export const NAME_HEADING_6 = 'Heading6'
export const OPTION_Paragraph = TN_DIV
export const OPTION_HEADING1 = TN_H1
export const OPTION_HEADING2 = TN_H2
export const OPTION_HEADING3 = TN_H3
export const OPTION_HEADING4 = TN_H4
export const OPTION_HEADING5 = TN_H5
export const OPTION_HEADING6 = TN_H6

export class PluginHeadings implements ExsiedPlugin<Exsied> {
	private exsied: Exsied = new Exsied('')

	private toolbarBtnIds: ToolBarControlIds = emptyToolBarControlIds

	name = 'Headings'
	conf: PluginConf = {
		addToNormalToolbar: true,
		addToBubbleToolbar: true,
		headingsOptions: [
			{
				name: 'Paragraph',
				value: OPTION_Paragraph,
				tooltipText: 'Paragraph',
				iconClassName: 'exsied-icon-paragraph',
			},
			{
				name: NAME_HEADING_1,
				value: OPTION_HEADING1,
				tooltipText: 'Heading1',
				iconClassName: 'exsied-icon-h1',
			},
			{
				name: NAME_HEADING_2,
				value: OPTION_HEADING2,
				tooltipText: 'Heading2',
				iconClassName: 'exsied-icon-h2',
			},
			{
				name: NAME_HEADING_3,
				value: OPTION_HEADING3,
				tooltipText: 'Heading3',
				iconClassName: 'exsied-icon-h3',
			},
			{
				name: NAME_HEADING_4,
				value: OPTION_HEADING4,
				tooltipText: 'Heading4',
				iconClassName: 'exsied-icon-h4',
			},
			{
				name: NAME_HEADING_5,
				value: OPTION_HEADING5,
				tooltipText: 'Heading5',
				iconClassName: 'exsied-icon-h5',
			},
			{
				name: NAME_HEADING_6,
				value: OPTION_HEADING6,
				tooltipText: 'Heading6',
				iconClassName: 'exsied-icon-h6',
			},
		],
	}

	init = (exsied: Exsied): void => {
		this.exsied = exsied
	}

	afterToolbarInit = () => {
		this.toolbarBtnIds = this.exsied.toolbar.genButtonIdStd(this.name, 'index') || emptyToolBarControlIds
	}

	formatParagraph = (event: Event) => {
		FormatTaName.formatSelected(this.exsied, TN_DIV)
	}

	formatH1 = (event: Event) => {
		FormatTaName.formatSelected(this.exsied, TN_H1)
	}

	formatH2 = (event: Event) => {
		FormatTaName.formatSelected(this.exsied, TN_H2)
	}

	formatH3 = (event: Event) => {
		FormatTaName.formatSelected(this.exsied, TN_H3)
	}

	formatH4 = (event: Event) => {
		FormatTaName.formatSelected(this.exsied, TN_H4)
	}

	formatH5 = (event: Event) => {
		FormatTaName.formatSelected(this.exsied, TN_H5)
	}

	formatH6 = (event: Event) => {
		FormatTaName.formatSelected(this.exsied, TN_H6)
	}

	formatHeading = (event: Event) => {
		if (event.target instanceof HTMLSelectElement) {
			const value = event.target.value

			if (value === OPTION_Paragraph) this.formatParagraph(event)
			if (value === OPTION_HEADING1) this.formatH1(event)
			if (value === OPTION_HEADING2) this.formatH2(event)
			if (value === OPTION_HEADING3) this.formatH3(event)
			if (value === OPTION_HEADING4) this.formatH4(event)
			if (value === OPTION_HEADING5) this.formatH5(event)
			if (value === OPTION_HEADING6) this.formatH6(event)
		}
	}

	commands = {
		formatParagraph: this.formatParagraph,
		formatH1: this.formatH1,
		formatH2: this.formatH2,
		formatH3: this.formatH3,
		formatH4: this.formatH4,
		formatH5: this.formatH5,
		formatH6: this.formatH6,
		formatHeading: this.formatHeading,
	}

	getToolBarControl = () => [
		{
			name: 'index',
			tooltipText: 'Headings',
			addToNormalToolbar: this.conf.addToNormalToolbar,
			addToBubbleToolbar: this.conf.addToBubbleToolbar,

			eleType: ELE_TYPE_SELECT,
			changeCallBack: this.commands.formatHeading,
			defaultText: 'Headings',
			options: this.conf.headingsOptions,
		},
	]

	checkHighlight = (event: Event) => {
		const dropdownMenu = new DropdownMenu(this.exsied)
		const dropDownId = dropdownMenu.genDropdownId(this.toolbarBtnIds.normal) || ''
		const triggerClassName = dropdownMenu.genTriggerClassName(this.toolbarBtnIds.normal) || ''

		const dropDownEle = this.exsied.elements.toolbarMain.querySelector(`#${dropDownId}`)
		if (!dropDownEle) return

		let updated = false
		const setDropDownTriggerText = (text: string) => {
			const triggerEle = dropDownEle.querySelector(`.${triggerClassName}`)
			if (triggerEle) {
				triggerEle.innerHTML = t(text)

				updated = true
			}
		}

		const allTagNamesArr = this.exsied.cursorAllParentsTagNamesArr

		if (allTagNamesArr.includes(TN_H1)) setDropDownTriggerText(NAME_HEADING_1)
		if (allTagNamesArr.includes(TN_H2)) setDropDownTriggerText(NAME_HEADING_2)
		if (allTagNamesArr.includes(TN_H3)) setDropDownTriggerText(NAME_HEADING_3)
		if (allTagNamesArr.includes(TN_H4)) setDropDownTriggerText(NAME_HEADING_4)
		if (allTagNamesArr.includes(TN_H5)) setDropDownTriggerText(NAME_HEADING_5)
		if (allTagNamesArr.includes(TN_H6)) setDropDownTriggerText(NAME_HEADING_6)

		if (!updated) {
			setDropDownTriggerText(this.name)
		}
	}
	removeTempEle = (event: Event) => {
		const dropdownMenu = new DropdownMenu(this.exsied)
		const dropDownId = dropdownMenu.genDropdownId(this.toolbarBtnIds.normal) || ''
		this.exsied.toolbar.hideDropdowntList(dropDownId)
	}
}
