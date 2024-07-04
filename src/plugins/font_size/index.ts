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
	fontSizeOptions: ToolBarSelectOption[]
}

export class PluginFontSize implements ExsiedPlugin<Exsied> {
	private exsied: Exsied = new Exsied('')

	private toolbarBtnIds: ToolBarControlIds = emptyToolBarControlIds

	name = 'FontSize'

	conf: PluginConf = {
		addToNormalToolbar: true,
		addToBubbleToolbar: false,
		fontSizeOptions: [
			// {
			// 	name: '8px',
			// 	value: '8px',
			// 	tooltipText: '',
			// 	iconClassName: '',
			// },
		],
	}

	init = (exsied: Exsied): void => {
		this.exsied = exsied
	}

	afterToolbarInit = () => {
		this.toolbarBtnIds = this.exsied.toolbar.genButtonIdStd(this.name, 'index') || emptyToolBarControlIds
	}

	formatFontSize = (event: Event) => {
		const selectEle = event.target as HTMLSelectElement

		const style: Style = {}
		style.fontSize = selectEle.value
		FormatStyle.formatSelected(style as CSSStyleDeclaration)
	}

	commands = {
		formatFontSize: this.formatFontSize,
	}

	getToolBarControl = () => [
		{
			name: 'index',
			tooltipText: 'Font size',
			addToNormalToolbar: this.conf.addToNormalToolbar,
			addToBubbleToolbar: this.conf.addToBubbleToolbar,

			eleType: ELE_TYPE_SELECT,
			changeCallBack: this.commands.formatFontSize,
			defaultText: 'Font size',
			options: this.conf.fontSizeOptions,
		},
	]

	removeTempEle = (_event: Event) => {
		const dropdownMenu = new DropdownMenu(this.exsied)
		const dropDownId = dropdownMenu.genDropdownId(this.toolbarBtnIds.normal) || ''
		this.exsied.toolbar.hideDropdowntList(dropDownId)
	}
}
