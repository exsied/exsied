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
import { SelectionUtils } from '../../core/selection_utils'
import { Style } from '../../types'
import { ELE_TYPE_BUTTON } from '../../ui/toolbar'

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

export class PluginTextAlign implements ExsiedPlugin<Exsied> {
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

	init = (exsied: Exsied): void => {}

	format = (value: string) => {
		const style: Style = {}
		style.textAlign = value
		const cursorEle = SelectionUtils.getCursorNode()
		if (cursorEle) FormatStyle.formatBlockEle(cursorEle as HTMLElement, style as CSSStyleDeclaration)
	}

	formatTextCenter = (event: Event) => {
		this.format('center')
	}

	formatTextLeft = (event: Event) => {
		this.format('left')
	}

	formatTextRight = (event: Event) => {
		this.format('right')
	}

	commands = {
		formatTextCenter: this.formatTextCenter,
		formatTextLeft: this.formatTextLeft,
		formatTextRight: this.formatTextRight,
	}

	getToolBarControl = () => [
		{
			name: 'TextAlignLeft',
			tooltipText: 'Text align left',
			addToNormalToolbar: this.conf.addToNormalToolbar.left,
			addToBubbleToolbar: this.conf.addToBubbleToolbar.left,

			eleType: ELE_TYPE_BUTTON,
			iconClassName: CN_ICON_LEFT,
			clickCallBack: this.commands.formatTextLeft,
		},
		{
			name: 'TextAlignCenter',
			tooltipText: 'Text align center',
			addToNormalToolbar: this.conf.addToNormalToolbar.center,
			addToBubbleToolbar: this.conf.addToBubbleToolbar.center,

			eleType: ELE_TYPE_BUTTON,
			iconClassName: CN_ICON_CENTER,
			clickCallBack: this.commands.formatTextCenter,
		},
		{
			name: 'TextAlignRight',
			tooltipText: 'Text align right',
			addToNormalToolbar: this.conf.addToNormalToolbar.right,
			addToBubbleToolbar: this.conf.addToBubbleToolbar.right,

			eleType: ELE_TYPE_BUTTON,
			iconClassName: CN_ICON_RIGHT,
			clickCallBack: this.commands.formatTextRight,
		},
	]

	checkHighlight = (event: Event) => {
		// const btnEle = this.exsied.elements.editor.querySelector(`#${this.toolbarBtnIds.normal}`)
		// if (btnEle) {
		// 	const allTagNamesArr = this.exsied.cursorAllParentsTagNamesArr
		// 	allTagNamesArr.includes(TN_Q) || allTagNamesArr.includes(TN_BLOCKQUOTE)
		// 		? btnEle.classList.add(CN_ACTIVE)
		// 		: btnEle.classList.remove(CN_ACTIVE)
		// }
	}
	removeTempEle = (event: Event) => {}
}
