/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { CN_ACTIVE, TN_SUB, TN_SUP } from '../../contants'
import { Exsied } from '../../core'
import { FormatTaName } from '../../core/format/tag_name'
import { Commands, ExsiedPlugin } from '../../core/plugin'
import { ELE_TYPE_BUTTON, ToolBarControlIds, emptyToolBarControlIds } from '../../ui/toolbar'

export type PluginConf = {
	addToNormalToolbar: {
		sub: boolean
		sup: boolean
	}
	addToBubbleToolbar: {
		sub: boolean
		sup: boolean
	}
}

export const PLUGIN_NAME = 'SubscriptAndSuperscript'
export const CN_ICON_SUB = 'exsied-icon-sub'
export const CN_ICON_SUP = 'exsied-icon-sup'

export class PluginSubscriptAndSupscript implements ExsiedPlugin<Exsied> {
	private exsied: Exsied = new Exsied('')
	// private popupId = ''
	private toolbarBtnIdsSub: ToolBarControlIds = emptyToolBarControlIds
	private toolbarBtnIdsSup: ToolBarControlIds = emptyToolBarControlIds

	name = 'SubscriptAndSupscript'
	conf: PluginConf = {
		addToNormalToolbar: {
			sub: true,
			sup: true,
		},
		addToBubbleToolbar: {
			sub: false,
			sup: false,
		},
	}

	init = (exsied: Exsied): void => {
		this.exsied = exsied
		// this.popupId = this.exsied.genPopupId(this.name, 'index') || ''
	}

	afterToolbarInit = () => {
		this.toolbarBtnIdsSub = this.exsied.toolbar.genButtonIdStd(this.name, 'sub') || emptyToolBarControlIds
		this.toolbarBtnIdsSup = this.exsied.toolbar.genButtonIdStd(this.name, 'sup') || emptyToolBarControlIds
	}

	isHighlightSub = () => {
		const allTagNamesArr = this.exsied.cursorAllParentsTagNamesArr || []
		return allTagNamesArr.includes(TN_SUB)
	}

	isHighlightSup = () => {
		const allTagNamesArr = this.exsied.cursorAllParentsTagNamesArr || []
		return allTagNamesArr.includes(TN_SUP)
	}

	formatTextSub = () => {
		if (this.isHighlightSub()) {
			FormatTaName.unformatSelected(TN_SUB)
		} else {
			FormatTaName.formatSelected(TN_SUB)
		}
	}

	formatTextSup = () => {
		if (this.isHighlightSup()) {
			FormatTaName.unformatSelected(TN_SUP)
		} else {
			FormatTaName.formatSelected(TN_SUP)
		}
	}
	commands: Commands = {
		formatTextSub: this.formatTextSub,
		formatTextSup: this.formatTextSup,
	}

	getToolBarControl = () => [
		{
			name: 'Subscript',
			tooltipText: 'Subscript',
			addToNormalToolbar: this.conf.addToNormalToolbar.sub,
			addToBubbleToolbar: this.conf.addToBubbleToolbar.sub,

			eleType: ELE_TYPE_BUTTON,
			iconClassName: CN_ICON_SUB,
			clickCallBack: this.commands['formatTextSub'],
		},
		{
			name: 'Supscript',
			tooltipText: 'Supscript',
			addToNormalToolbar: this.conf.addToNormalToolbar.sup,
			addToBubbleToolbar: this.conf.addToBubbleToolbar.sup,

			eleType: ELE_TYPE_BUTTON,
			iconClassName: CN_ICON_SUP,
			clickCallBack: this.commands['formatTextSup'],
		},
	]

	addHandler = () => {}
	removeHandler = () => {}
	checkHighlight = (_event: any) => {
		const btnEleSub = this.exsied.elements.editor.querySelector(`#${this.toolbarBtnIdsSub.normal}`)
		if (btnEleSub) {
			this.isHighlightSub() ? btnEleSub.classList.add(CN_ACTIVE) : btnEleSub.classList.remove(CN_ACTIVE)
		}

		const btnEleSup = this.exsied.elements.editor.querySelector(`#${this.toolbarBtnIdsSup.normal}`)
		if (btnEleSup) {
			this.isHighlightSup() ? btnEleSup.classList.add(CN_ACTIVE) : btnEleSup.classList.remove(CN_ACTIVE)
		}
	}
	removeTempEle = (_event: any) => {}
}
