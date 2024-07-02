/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { Exsied } from '../../core'
import { FormatStyle } from '../../core/format/style'
import { Commands, ExsiedPlugin } from '../../core/plugin'
import { Style } from '../../types'
import { ELE_TYPE_SELECT, ToolBarControlIds, ToolBarSelectOption, emptyToolBarControlIds } from '../../ui/toolbar'

export type PluginConf = {
	addToNormalToolbar: boolean
	addToBubbleToolbar: boolean
	fontFamilyOptions: ToolBarSelectOption[]
}

export class FontFamily implements ExsiedPlugin<Exsied> {
	private exsied: Exsied | undefined
	// private popupId = ''
	private toolbarBtnIds: ToolBarControlIds = emptyToolBarControlIds

	name = 'fontFamily'
	conf: PluginConf = {
		addToNormalToolbar: true,
		addToBubbleToolbar: false,
		fontFamilyOptions: [
			// {
			// 	name: 'test font family',
			// 	value: 'test font family',
			// 	tooltipText: 'test font family',
			// 	iconClassName: 'exsied-btn-font-family',
			// },
		],
	}

	init = (exsied: Exsied): void => {
		this.exsied = exsied
		// this.popupId = this.exsied?.genPopupId(this.name, 'index') || ''
	}

	afterExsiedInit = () => {
		this.toolbarBtnIds = this.exsied?.toolbar?.genButtonIdStd(this.name, 'index') || emptyToolBarControlIds
	}

	formatFontFamily = (event: Event) => {
		const selectEle = event.target as HTMLSelectElement

		const style: Style = {}
		style.fontFamily = selectEle.value
		FormatStyle.formatSelected(style as CSSStyleDeclaration)
	}

	commands: Commands = {
		formatFontFamily: this.formatFontFamily,
	}

	toolBarControl = [
		{
			name: this.name,
			tooltipText: 'Font family',
			addToNormalToolbar: this.conf.addToNormalToolbar,
			addToBubbleToolbar: this.conf.addToBubbleToolbar,

			eleType: ELE_TYPE_SELECT,
			changeCallBack: this.commands['formatFontFamily'],
			defaultText: 'Font family',
			options: this.conf.fontFamilyOptions,
		},
	]

	addHandler = () => {}
	removeHandler = () => {}
	checkHighlight = (_event: any) => {
		// TODO:
	}
	removeTempEle = (_event: any) => {
		const dropDownId = this.exsied?.dropdownMenu?.genDropdownId(this.toolbarBtnIds.normal) || ''
		this.exsied?.toolbar?.hideDropdowntList(dropDownId)
	}
}
