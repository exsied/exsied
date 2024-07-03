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
import { Commands, ExsiedPlugin } from '../../core/plugin'
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

export class Quote implements ExsiedPlugin<Exsied> {
	private exsied: Exsied = new Exsied('')
	// private popupId = ''
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
		// this.popupId = this.exsied?.genPopupId(this.name, 'index') || ''
	}

	afterToolbarInit = () => {
		this.toolbarBtnIds = this.exsied.toolbar.genButtonIdStd(this.name, 'index') || emptyToolBarControlIds
	}

	insertQuote = () => {
		const selectedEles = SelectionUtils.getSelectedEles()

		const ele = document.createElement(TN_Q)
		ele.innerHTML = selectedEles && selectedEles.innerHTML ? selectedEles.innerHTML : this.conf.defaultInnerHTML

		if (this.exsied?.elements.workplace) this.exsied.selectionUtils.addElementBySelection(this.exsied.elements.workplace, ele)
	}

	commands: Commands = {
		insertQuote: this.insertQuote,
	}

	toolBarControl = [
		{
			name: PLUGIN_NAME,
			tooltipText: 'Quote',
			addToNormalToolbar: this.conf.addToNormalToolbar,
			addToNormalToolbarInsertMenu: this.conf.addToNormalToolbarInsertMenu,
			addToBubbleToolbar: this.conf.addToBubbleToolbar,

			eleType: ELE_TYPE_BUTTON,
			iconClassName: CN_ICON,
			clickCallBack: this.commands['insertQuote'],
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
