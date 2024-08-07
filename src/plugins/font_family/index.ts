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
import { ExsiedPlugin } from '../../core/plugin'
import { Style } from '../../types'
import { DropdownMenu } from '../../ui/dropdown'
import { ELE_TYPE_SELECT, ToolBarControlIds, ToolBarSelectOption, emptyToolBarControlIds } from '../../ui/toolbar'

export type PluginConf = {
	addToNormalToolbar: boolean
	addToBubbleToolbar: boolean
	fontFamilyOptions: ToolBarSelectOption[]
}

export class PluginFontFamily implements ExsiedPlugin<Exsied> {
	private exsied: Exsied = new Exsied('')

	private toolbarBtnIds: ToolBarControlIds = emptyToolBarControlIds

	name = 'FontFamily'
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
	}

	afterToolbarInit = () => {
		this.toolbarBtnIds = this.exsied.toolbar.genButtonIdStd(this.name, 'index') || emptyToolBarControlIds
	}

	formatFontFamily = (event: Event) => {
		const selectEle = event.target as HTMLSelectElement

		const style: Style = {}
		style.fontFamily = selectEle.value
		FormatStyle.formatSelected(style as CSSStyleDeclaration)
	}

	commands = {
		formatFontFamily: this.formatFontFamily,
	}

	getToolBarControl = () => [
		{
			name: 'index',
			tooltipText: 'Font family',
			addToNormalToolbar: this.conf.addToNormalToolbar,
			addToBubbleToolbar: this.conf.addToBubbleToolbar,

			eleType: ELE_TYPE_SELECT,
			changeCallBack: this.commands.formatFontFamily,
			defaultText: 'Font family',
			options: this.conf.fontFamilyOptions,
		},
	]

	removeTempEle = (_event: Event) => {
		const dropdownMenu = new DropdownMenu(this.exsied)
		const dropDownId = dropdownMenu.genDropdownId(this.toolbarBtnIds.normal) || ''
		this.exsied.toolbar.hideDropdowntList(dropDownId)
	}
}
