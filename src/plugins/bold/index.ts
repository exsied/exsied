/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { CN_ACTIVE } from '../../contants'
import { TN_B, TN_STRONG } from '../../contants'
import { Exsied } from '../../core'
import { FormatTaName } from '../../core/format/tag_name'
import { ExsiedPlugin } from '../../core/plugin'
import { ELE_TYPE_BUTTON, ToolBarControlIds, emptyToolBarControlIds } from '../../ui/toolbar'

export const CN_ICON = 'exsied-icon-blod'

export type PluginConf = {
	addToNormalToolbar: boolean
	addToBubbleToolbar: boolean
	addToNormalToolbarInsertMenu: boolean
}

export class PluginBold implements ExsiedPlugin<Exsied> {
	private exsied: Exsied = new Exsied('')
	private toolbarBtnIds: ToolBarControlIds = emptyToolBarControlIds

	name = 'Bold'
	conf: PluginConf = {
		addToNormalToolbar: true,
		addToNormalToolbarInsertMenu: false,
		addToBubbleToolbar: true,
	}

	init = (exsied: Exsied): void => {
		this.exsied = exsied
	}

	afterToolbarInit = () => {
		this.toolbarBtnIds = this.exsied.toolbar.genButtonIdStd(this.name, 'index') || emptyToolBarControlIds
	}

	isHighlight = () => {
		const allTagNamesArr = this.exsied.cursorAllParentsTagNamesArr
		return allTagNamesArr.includes(TN_B) || allTagNamesArr.includes(TN_STRONG)
	}

	formatTextBold = () => {
		if (this.isHighlight()) {
			FormatTaName.unformatSelected(this.exsied, TN_B)
			FormatTaName.unformatSelected(this.exsied, TN_STRONG)
		} else {
			FormatTaName.formatSelected(this.exsied, TN_B)
		}
	}

	commands = {
		formatBold: this.formatTextBold,
	}

	getToolBarControl = () => [
		{
			name: 'index',
			tooltipText: 'Bold',
			addToNormalToolbar: this.conf.addToNormalToolbar,
			addToNormalToolbarInsertMenu: this.conf.addToNormalToolbarInsertMenu,
			addToBubbleToolbar: this.conf.addToBubbleToolbar,

			eleType: ELE_TYPE_BUTTON,
			iconClassName: CN_ICON,
			clickCallBack: this.commands.formatBold,
		},
	]

	checkHighlight = (_event: Event) => {
		const btnEle = this.exsied.elements.editor.querySelector(`#${this.toolbarBtnIds?.normal}`)

		if (btnEle) {
			this.isHighlight() ? btnEle.classList.add(CN_ACTIVE) : btnEle.classList.remove(CN_ACTIVE)
		}
	}
}
