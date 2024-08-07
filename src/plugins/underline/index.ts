/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { CN_ACTIVE, TN_U } from '../../contants'
import { Exsied } from '../../core'
import { FormatTaName } from '../../core/format/tag_name'
import { ExsiedPlugin } from '../../core/plugin'
import { ELE_TYPE_BUTTON, ToolBarControlIds, emptyToolBarControlIds } from '../../ui/toolbar'

export type PluginConf = {
	addToNormalToolbar: boolean
	addToBubbleToolbar: boolean
}

export const CN_ICON = 'exsied-icon-underline'

export class PluginUnderline implements ExsiedPlugin<Exsied> {
	private exsied: Exsied = new Exsied('')

	private toolbarBtnIds: ToolBarControlIds = emptyToolBarControlIds

	name = 'Underline'
	conf: PluginConf = {
		addToNormalToolbar: true,
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
		return allTagNamesArr.includes(TN_U)
	}
	formatUnderline = () => {
		if (this.isHighlight()) {
			FormatTaName.unformatSelected(this.exsied, TN_U)
		} else {
			FormatTaName.formatSelected(this.exsied, TN_U)
		}
	}
	commands = { formatUnderline: this.formatUnderline }

	getToolBarControl = () => [
		{
			name: 'index',
			tooltipText: 'Underline',
			addToNormalToolbar: this.conf.addToNormalToolbar,
			addToBubbleToolbar: this.conf.addToBubbleToolbar,

			eleType: ELE_TYPE_BUTTON,
			iconClassName: CN_ICON,
			clickCallBack: this.commands.formatUnderline,
		},
	]

	checkHighlight = (_event: Event) => {
		const btnEle = this.exsied.elements.editor.querySelector(`#${this.toolbarBtnIds.normal}`)
		if (btnEle) {
			const allTagNamesArr = this.exsied.cursorAllParentsTagNamesArr
			allTagNamesArr.includes(TN_U) ? btnEle.classList.add(CN_ACTIVE) : btnEle.classList.remove(CN_ACTIVE)
		}
	}
}
