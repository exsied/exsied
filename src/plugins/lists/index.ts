/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { CN_ACTIVE, TN_BLOCKQUOTE, TN_OL, TN_Q, TN_UL } from '../../contants'
import { Exsied } from '../../core'
import { Commands, ExsiedPlugin } from '../../core/plugin'
import { SelectionUtils } from '../../core/selection_utils'
import { ELE_TYPE_BUTTON, ToolBarControlIds, Toolbar, emptyToolBarControlIds } from '../../ui/toolbar'

export type PluginConf = {
	addToNormalToolbar: {
		ol: boolean
		ul: boolean
	}
	addToNormalToolbarInsertMenu: {
		ol: boolean
		ul: boolean
	}
	addToBubbleToolbar: {
		ol: boolean
		ul: boolean
	}
	defaultInnerHTML: string
}

export const PLUGIN_NAME = 'Lists'
export const CN_ICON_OL = 'exsied-icon-ol'
export const CN_ICON_UL = 'exsied-icon-ul'

const NAME_OL = 'OrderedList'
const NAME_UL = 'UnorderedList'

export class PluginLists implements ExsiedPlugin<Exsied> {
	private exsied: Exsied = new Exsied('')
	// private popupId = ''
	private toolbarBtnIdsOl: ToolBarControlIds = emptyToolBarControlIds
	private toolbarBtnIdsUl: ToolBarControlIds = emptyToolBarControlIds

	name = 'Lists'
	conf: PluginConf = {
		addToNormalToolbar: {
			ol: false,
			ul: false,
		},
		addToNormalToolbarInsertMenu: {
			ol: true,
			ul: true,
		},
		addToBubbleToolbar: {
			ol: false,
			ul: false,
		},
		defaultInnerHTML: `
			<li></li>  
			<li></li>  
			<li></li>  
			`,
	}

	init = (exsied: Exsied): void => {
		this.exsied = exsied
		// this.popupId = this.exsied.genPopupId(this.name, 'index') || ''
	}

	afterToolbarInit = () => {
		this.toolbarBtnIdsOl = this.exsied.toolbar.genButtonIdStd(this.name, NAME_OL) || emptyToolBarControlIds
		this.toolbarBtnIdsUl = this.exsied.toolbar.genButtonIdStd(this.name, NAME_UL) || emptyToolBarControlIds
	}

	insert = (tagName: typeof TN_OL | typeof TN_UL) => {
		const selectedEles = SelectionUtils.getSelectedEles()

		const ele = document.createElement(tagName)
		ele.innerHTML = selectedEles && selectedEles.innerHTML ? selectedEles.innerHTML : this.conf.defaultInnerHTML

		if (this.exsied.elements.workplace)
			this.exsied.selectionUtils.addElementBySelection(this.exsied.elements.workplace, ele)
	}

	commands: Commands = {
		insertOl: () => {
			this.insert(TN_OL)
		},
		insertUl: () => {
			this.insert(TN_UL)
		},
	}

	toolBarControl = [
		{
			name: NAME_OL,
			tooltipText: 'Ordered list',
			addToNormalToolbar: this.conf.addToNormalToolbar.ol,
			addToNormalToolbarInsertMenu: this.conf.addToNormalToolbarInsertMenu.ol,
			addToBubbleToolbar: this.conf.addToBubbleToolbar.ol,

			eleType: ELE_TYPE_BUTTON,
			iconClassName: CN_ICON_OL,
			clickCallBack: this.commands['insertOl'],
		},
		{
			name: NAME_UL,
			tooltipText: 'Unordered list',
			addToNormalToolbar: this.conf.addToNormalToolbar.ul,
			addToNormalToolbarInsertMenu: this.conf.addToNormalToolbarInsertMenu.ul,
			addToBubbleToolbar: this.conf.addToBubbleToolbar.ul,

			eleType: ELE_TYPE_BUTTON,
			iconClassName: CN_ICON_UL,
			clickCallBack: this.commands['insertUl'],
		},
	]

	addHandler = () => {}
	removeHandler = () => {}
	checkHighlight = (_event: any) => {
		const btnEleOl = this.exsied.elements.editor.querySelector(`#${this.toolbarBtnIdsOl.normal}`)
		if (btnEleOl) {
			const allTagNamesArr = this.exsied.cursorAllParentsTagNamesArr || []
			allTagNamesArr.includes(TN_Q) || allTagNamesArr.includes(TN_BLOCKQUOTE)
				? btnEleOl.classList.add(CN_ACTIVE)
				: btnEleOl.classList.remove(CN_ACTIVE)
		}

		const btnEleUl = this.exsied.elements.editor.querySelector(`#${this.toolbarBtnIdsUl.normal}`)
		if (btnEleUl) {
			const allTagNamesArr = this.exsied.cursorAllParentsTagNamesArr || []
			allTagNamesArr.includes(TN_Q) || allTagNamesArr.includes(TN_BLOCKQUOTE)
				? btnEleUl.classList.add(CN_ACTIVE)
				: btnEleUl.classList.remove(CN_ACTIVE)
		}
	}
	removeTempEle = (_event: any) => {}
}
