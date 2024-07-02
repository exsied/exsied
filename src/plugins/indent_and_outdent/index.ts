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
import { DomUtils } from '../../core/dom_utils'
import { FormatStyle } from '../../core/format/style'
import { Commands, ExsiedPlugin } from '../../core/plugin'
import { SelectionUtils } from '../../core/selection_utils'
import { Style } from '../../types'
import { ELE_TYPE_BUTTON, ToolBarControlIds, emptyToolBarControlIds } from '../../ui/toolbar'

export type PluginConf = {
	addToNormalToolbar: {
		indent: boolean
		outent: boolean
	}
	addToBubbleToolbar: {
		indent: boolean
		outent: boolean
	}
	stepPx: number
}

export const CN_ICON_INDENT = 'exsied-icon-indent'
export const CN_ICON_OUTDENT = 'exsied-icon-outdent'

const INDENT = 1
const ONTDENT = 2

const NAME_INDENT = 'indent'
const NAME_OUTDENT = 'outdent'

export class IndentAndOutdent implements ExsiedPlugin<Exsied> {
	private exsied: Exsied | undefined
	// private popupId = ''
	private toolbarBtnIds: ToolBarControlIds = emptyToolBarControlIds

	name = 'indentAndOutdent'
	conf: PluginConf = {
		addToNormalToolbar: {
			indent: true,
			outent: true,
		},
		addToBubbleToolbar: {
			indent: false,
			outent: false,
		},
		stepPx: 10,
	}

	init = (exsied: Exsied): void => {
		this.exsied = exsied
		// this.popupId = this.exsied?.genPopupId(this.name, 'index') || ''
	}

	afterExsiedInit = () => {
		this.toolbarBtnIds = this.exsied?.toolbar?.genButtonIdStd(this.name, 'index') || emptyToolBarControlIds
	}

	indent = (direction: typeof INDENT | typeof ONTDENT) => {
		const cursorEle = SelectionUtils.getCursorNode()
		const blockEle = DomUtils.getBlockEle(cursorEle as HTMLElement)
		if (!blockEle) return

		const style: Style = {}
		let paddingInlineStartPx = 0
		if (blockEle.style.paddingInlineStart) paddingInlineStartPx = parseInt(blockEle.style.paddingInlineStart)
		if (direction === INDENT) style.paddingInlineStart = `${paddingInlineStartPx + this.conf.stepPx}px`
		if (direction === ONTDENT) style.paddingInlineStart = `${paddingInlineStartPx - this.conf.stepPx}px`
		if (blockEle) FormatStyle.formatBlockEle(blockEle, style as CSSStyleDeclaration, true)
	}

	formatIndent = (_event: Event) => {
		this.indent(INDENT)
	}

	formatOutdent = (_event: Event) => {
		this.indent(ONTDENT)
	}

	commands: Commands = {
		formatIndent: this.formatIndent,
		formatOutdent: this.formatOutdent,
	}

	toolBarControl = [
		{
			name: NAME_INDENT,
			tooltipText: 'Indent',
			addToNormalToolbar: this.conf.addToNormalToolbar.indent,
			addToBubbleToolbar: this.conf.addToBubbleToolbar.indent,

			eleType: ELE_TYPE_BUTTON,
			iconClassName: CN_ICON_INDENT,
			clickCallBack: this.commands['formatIndent'],
		},
		{
			name: NAME_OUTDENT,
			tooltipText: 'Outdent',
			addToNormalToolbar: this.conf.addToNormalToolbar.outent,
			addToBubbleToolbar: this.conf.addToBubbleToolbar.outent,

			eleType: ELE_TYPE_BUTTON,
			iconClassName: CN_ICON_OUTDENT,
			clickCallBack: this.commands['formatOutdent'],
		},
	]

	addHandler = () => {}
	removeHandler = () => {}
	checkHighlight = (_event: any) => {
		const btnEle = this.exsied?.elements.editor?.querySelector(`#${this.toolbarBtnIds.normal}`)

		if (btnEle) {
			const allTagNamesArr = this.exsied?.cursorAllParentsTagNamesArr || []
			allTagNamesArr.includes(TN_Q) || allTagNamesArr.includes(TN_BLOCKQUOTE)
				? btnEle.classList.add(CN_ACTIVE)
				: btnEle.classList.remove(CN_ACTIVE)
		}
	}
	removeTempEle = (_event: any) => {}
}
