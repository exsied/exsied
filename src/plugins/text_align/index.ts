/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { CN_ACTIVE, TN_BLOCKQUOTE, TN_Q } from '../../contants'
import { Exsied } from '../../core'
import { FormatStyle } from '../../core/format/style'
import { Commands, ExsiedPlugin } from '../../core/plugin'
import { SelectionUtils } from '../../core/selection_utils'
import { Style } from '../../types'
import { ELE_TYPE_BUTTON, ToolBarControlIds, emptyToolBarControlIds } from '../../ui/toolbar'

export type PluginConf = {
	addToNormalToolbar: {
		center: boolean
		left: boolean
		right: boolean
	}
	addToBubbleToolbar: {
		center: boolean
		left: boolean
		right: boolean
	}
	defaultInnerHTML: string
}

export const CN_ICON_CENTER = 'exsied-icon-center'
export const CN_ICON_LEFT = 'exsied-icon-left'
export const CN_ICON_RIGHT = 'exsied-icon-right'

export class TextAlign implements ExsiedPlugin<Exsied> {
	private exsied: Exsied = new Exsied('')
	// private popupId = ''
	private toolbarBtnIds: ToolBarControlIds = emptyToolBarControlIds

	name = 'TextAlign'

	conf: PluginConf = {
		addToNormalToolbar: {
			center: true,
			left: true,
			right: true,
		},
		addToBubbleToolbar: {
			center: false,
			left: false,
			right: false,
		},
		defaultInnerHTML: `
			<li></li>  
			<li></li>  
			<li></li>  
			`,
	}

	init = (exsied: Exsied): void => {
		this.exsied = exsied
		// this.popupId = this.exsied?.genPopupId(this.name, 'index') || ''
	}

	afterToolbarInit = () => {
		this.toolbarBtnIds = this.exsied.toolbar.genButtonIdStd(this.name, 'index') || emptyToolBarControlIds
	}

	format = (value: string) => {
		const style: Style = {}
		style.textAlign = value
		const cursorEle = SelectionUtils.getCursorNode()
		if (cursorEle) FormatStyle.formatBlockEle(cursorEle as HTMLElement, style as CSSStyleDeclaration)
	}

	formatTextCenter = (_event: Event) => {
		this.format('center')
	}

	formatTextLeft = (_event: Event) => {
		this.format('left')
	}

	formatTextRight = (_event: Event) => {
		this.format('right')
	}

	commands: Commands = {
		formatTextCenter: this.formatTextCenter,
		formatTextLeft: this.formatTextLeft,
		formatTextRight: this.formatTextRight,
	}

	toolBarControl = [
		{
			name: 'Text left',
			tooltipText: 'Text left',
			addToNormalToolbar: this.conf.addToNormalToolbar.left,
			addToBubbleToolbar: this.conf.addToBubbleToolbar.left,

			eleType: ELE_TYPE_BUTTON,
			iconClassName: CN_ICON_LEFT,
			clickCallBack: this.commands['formatTextLeft'],
		},
		{
			name: 'Text center',
			tooltipText: 'Text center',
			addToNormalToolbar: this.conf.addToNormalToolbar.center,
			addToBubbleToolbar: this.conf.addToBubbleToolbar.center,

			eleType: ELE_TYPE_BUTTON,
			iconClassName: CN_ICON_CENTER,
			clickCallBack: this.commands['formatTextCenter'],
		},
		{
			name: 'Text right',
			tooltipText: 'Text right',
			addToNormalToolbar: this.conf.addToNormalToolbar.right,
			addToBubbleToolbar: this.conf.addToBubbleToolbar.right,

			eleType: ELE_TYPE_BUTTON,
			iconClassName: CN_ICON_RIGHT,
			clickCallBack: this.commands['formatTextRight'],
		},
	]

	addHandler = () => {}
	removeHandler = () => {}
	checkHighlight = (_event: any) => {
		const btnEle = this.exsied?.elements.editor.querySelector(`#${this.toolbarBtnIds.normal}`)

		if (btnEle) {
			const allTagNamesArr = this.exsied?.cursorAllParentsTagNamesArr || []
			allTagNamesArr.includes(TN_Q) || allTagNamesArr.includes(TN_BLOCKQUOTE)
				? btnEle.classList.add(CN_ACTIVE)
				: btnEle.classList.remove(CN_ACTIVE)
		}
	}
	removeTempEle = (_event: any) => {}
}
