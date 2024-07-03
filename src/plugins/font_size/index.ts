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
	fontSizeOptions: ToolBarSelectOption[]
}

export class FontSize implements ExsiedPlugin<Exsied> {
	private exsied: Exsied = new Exsied('')
	// private popupId = ''
	private toolbarBtnIds: ToolBarControlIds = emptyToolBarControlIds

	name = 'fontFamily'

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
		// this.popupId = this.exsied?.genPopupId(this.name, 'index') || ''
	}

	afterToolbarInit = () => {
		this.toolbarBtnIds = this.exsied.toolbar.genButtonIdStd(this.name, 'index') || emptyToolBarControlIds
	}

	formatFontSize(event: Event) {
		const selectEle = event.target as HTMLSelectElement

		const style: Style = {}
		style.fontSize = selectEle.value
		FormatStyle.formatSelected(style as CSSStyleDeclaration)
	}

	commands: Commands = {
		formatFontSize: this.formatFontSize,
	}

	toolBarControl = [
		{
			name: this.name,
			tooltipText: 'Font size',
			addToNormalToolbar: this.conf.addToNormalToolbar,
			addToBubbleToolbar: this.conf.addToBubbleToolbar,

			eleType: ELE_TYPE_SELECT,
			changeCallBack: this.commands[this.name],
			defaultText: 'Font size',
			options: this.conf.fontSizeOptions,
		},
	]

	addHandler = () => {}
	removeHandler = () => {}
	checkHighlight = (_event: any) => {
		// TODO:
	}
	removeTempEle = (_event: any) => {
		const dropDownId = this.exsied?.dropdownMenu?.genDropdownId(this.toolbarBtnIds.normal) || ''
		this.exsied.toolbar.hideDropdowntList(dropDownId)
	}
}
