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
import { DomUtils } from '../../core/dom_utils'
import { FormatStyle } from '../../core/format/style'
import { Commands, ExsiedPlugin } from '../../core/plugin'
import { SelectionUtils } from '../../core/selection_utils'
import { Style } from '../../types'
import { ColorPicker } from '../../ui/color_picker'
import { ELE_TYPE_BUTTON, ToolBarControlIds, emptyToolBarControlIds } from '../../ui/toolbar'

export type PluginConf = {
	addToNormalToolbar: {
		background: boolean
		text: boolean
	}
	addToBubbleToolbar: {
		background: boolean
		text: boolean
	}
	presetColors: string[] // rgb(1, 2, 3) or #123456 etc.
}

export const NAME_BACKGROUND = 'backgroundColor'
export const NAME_TEXT = 'textColor'
export const CN_ICON_BKG = 'exsied-icon-background-color'
export const CN_ICON_TEXT = 'exsied-icon-text-color'

export class Colors implements ExsiedPlugin<Exsied> {
	private exsied: Exsied | undefined
	private toolbarBtnIdsBkg: ToolBarControlIds = emptyToolBarControlIds
	private toolbarBtnIdsText: ToolBarControlIds = emptyToolBarControlIds
	private popupIdBkg = ''
	private popupIdText = ''

	name = 'Colors'
	conf: PluginConf = {
		addToNormalToolbar: {
			background: true,
			text: true,
		},
		addToBubbleToolbar: {
			background: false,
			text: false,
		},
		presetColors: ['#f00', '#0f0', '#00f'],
	}

	init = (exsied: Exsied): void => {
		this.exsied = exsied
		this.popupIdBkg = this.exsied?.genPopupId(this.name, NAME_BACKGROUND) || ''
		this.popupIdText = this.exsied?.genPopupId(this.name, NAME_TEXT) || ''
	}

	afterExsiedInit = () => {
		this.toolbarBtnIdsBkg = this.exsied?.toolbar?.genButtonIdStd(this.name, NAME_BACKGROUND) || emptyToolBarControlIds
		this.toolbarBtnIdsText = this.exsied?.toolbar?.genButtonIdStd(this.name, NAME_TEXT) || emptyToolBarControlIds
	}

	showColorPickerBkg = (event: Event) => {
		const picker = new ColorPicker(this.popupIdBkg, this.name, this.conf.presetColors, (color: string) => {
			SelectionUtils.restoreSelection()
			if (color) {
				const style: Style = {}
				style.backgroundColor = color
				FormatStyle.formatSelected(style as CSSStyleDeclaration)
			}
		})

		picker.showPopup(event)
	}

	showColorPickerText = (event: Event) => {
		const picker = new ColorPicker(this.popupIdText, this.name, this.conf.presetColors, (color: string) => {
			SelectionUtils.restoreSelection()
			if (color) {
				const style: Style = {}
				style.color = color
				FormatStyle.formatSelected(style as CSSStyleDeclaration)
			}
		})

		picker.showPopup(event)
	}

	commands: Commands = {
		backgroundColor: this.showColorPickerBkg,
		textColor: this.showColorPickerText,
	}

	toolBarControl = [
		{
			name: NAME_BACKGROUND,
			tooltipText: 'Background color',
			addToNormalToolbar: this.conf.addToNormalToolbar.background,
			addToBubbleToolbar: this.conf.addToBubbleToolbar.background,

			eleType: ELE_TYPE_BUTTON,
			iconClassName: CN_ICON_BKG,
			clickCallBack: this.commands[NAME_BACKGROUND],
		},
		{
			name: NAME_TEXT,
			tooltipText: 'Text color',
			addToNormalToolbar: this.conf.addToNormalToolbar.text,
			addToBubbleToolbar: this.conf.addToBubbleToolbar.text,

			eleType: ELE_TYPE_BUTTON,
			iconClassName: CN_ICON_TEXT,
			clickCallBack: this.commands[NAME_TEXT],
		},
	]

	addHandler = () => {
		const btnEleBkg = document.getElementById(this.toolbarBtnIdsBkg?.normal)
		if (btnEleBkg) {
			btnEleBkg.addEventListener('mouseover', () => {
				SelectionUtils.backupSelection()
			})
		}
		const btnEleText = document.getElementById(this.toolbarBtnIdsText.normal)
		if (btnEleText) {
			btnEleText.addEventListener('mouseover', () => {
				SelectionUtils.backupSelection()
			})
		}
	}
	removeHandler = () => {}
	checkHighlight = (event: any) => {
		const btnEleBkg = this.exsied?.elements.editor?.querySelector(`#${this.toolbarBtnIdsBkg.normal}`) as HTMLElement
		if (btnEleBkg) {
			const targetEle = event.target as HTMLElement
			const backgroundColor = DomUtils.getParentsStyleByKey(targetEle, 'background-color')

			DomUtils.setStyleProperty(btnEleBkg, {
				backgroundColor,
			} as unknown as CSSStyleDeclaration)
		}

		const btnEleText = this.exsied?.elements.editor?.querySelector(`#${this.toolbarBtnIdsText.normal}`) as HTMLElement
		if (btnEleText) {
			const targetEle = event.target as HTMLElement
			const color = DomUtils.getParentsStyleByKey(targetEle, 'color')

			DomUtils.setStyleProperty(btnEleText, {
				backgroundColor: color,
			} as unknown as CSSStyleDeclaration)
		}
	}
	removeTempEle = (event: any) => {
		DomUtils.removeElementById(this.popupIdBkg)
		DomUtils.removeElementById(this.popupIdText)
	}
}
