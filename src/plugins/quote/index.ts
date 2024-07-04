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
import { ExsiedPlugin } from '../../core/plugin'
import { SelectionUtils } from '../../core/selection_utils'
import { ELE_TYPE_BUTTON, ToolBarControlIds, emptyToolBarControlIds } from '../../ui/toolbar'

export type PluginConf = {
	addToNormalToolbar: boolean
	addToNormalToolbarInsertMenu: boolean
	addToBubbleToolbar: boolean
	defaultInnerHTML: string
}

export const PLUGIN_NAME = 'Quote'
export const CN_ICON = 'exsied-icon-quote'

export class PluginQuote implements ExsiedPlugin<Exsied> {
	private exsied: Exsied = new Exsied('')

	private toolbarBtnIds: ToolBarControlIds = emptyToolBarControlIds
	name = 'Quote'
	conf: PluginConf = {
		addToNormalToolbar: false,
		addToNormalToolbarInsertMenu: true,
		addToBubbleToolbar: false,
		defaultInnerHTML: '> ',
	}

	init = (exsied: Exsied): void => {
		this.exsied = exsied
	}

	afterToolbarInit = () => {
		this.toolbarBtnIds = this.exsied.toolbar.genButtonIdStd(this.name, 'index') || emptyToolBarControlIds
	}

	insertQuote = () => {
		const selectedEles = SelectionUtils.getSelectedEles()

		const ele = document.createElement(TN_Q)
		ele.innerHTML = selectedEles && selectedEles.innerHTML ? selectedEles.innerHTML : this.conf.defaultInnerHTML

		if (this.exsied.elements.workplace)
			this.exsied.selectionUtils.addElementBySelection(this.exsied.elements.workplace, ele)
	}

	commands = {
		insertQuote: this.insertQuote,
	}

	getToolBarControl = () => [
		{
			name: 'index',
			tooltipText: 'Quote',
			addToNormalToolbar: this.conf.addToNormalToolbar,
			addToNormalToolbarInsertMenu: this.conf.addToNormalToolbarInsertMenu,
			addToBubbleToolbar: this.conf.addToBubbleToolbar,

			eleType: ELE_TYPE_BUTTON,
			iconClassName: CN_ICON,
			clickCallBack: this.commands.insertQuote,
		},
	]

	checkHighlight = (_event: Event) => {
		const btnEle = this.exsied.elements.editor.querySelector(`#${this.toolbarBtnIds.normal}`)

		if (btnEle) {
			const allTagNamesArr = this.exsied.cursorAllParentsTagNamesArr
			allTagNamesArr.includes(TN_Q) || allTagNamesArr.includes(TN_BLOCKQUOTE)
				? btnEle.classList.add(CN_ACTIVE)
				: btnEle.classList.remove(CN_ACTIVE)
		}
	}
}
