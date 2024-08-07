/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { CN_ACTIVE, TN_DEL, TN_S } from '../../contants'
import { Exsied } from '../../core'
import { FormatTaName } from '../../core/format/tag_name'
import { ExsiedPlugin } from '../../core/plugin'
import { ELE_TYPE_BUTTON, ToolBarControlIds, emptyToolBarControlIds } from '../../ui/toolbar'

export type PluginConf = {
	addToNormalToolbar: boolean
	addToBubbleToolbar: boolean
}

export const CN_ICON = 'exsied-icon-strikethrough'

export class PluginStrikethrough implements ExsiedPlugin<Exsied> {
	private exsied: Exsied = new Exsied('')

	private toolbarBtnIds: ToolBarControlIds = emptyToolBarControlIds

	name = 'Strikethrough'

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
		return allTagNamesArr.includes(TN_S) || allTagNamesArr.includes(TN_DEL)
	}

	formatStrikethough = () => {
		if (this.isHighlight()) {
			FormatTaName.unformatSelected(this.exsied, TN_S)
			FormatTaName.unformatSelected(this.exsied, TN_DEL)
		} else {
			FormatTaName.formatSelected(this.exsied, TN_S)
		}
	}

	commands = {
		formatStrikethough: this.formatStrikethough,
	}

	getToolBarControl = () => [
		{
			name: 'index',
			tooltipText: 'Strikethough',
			addToNormalToolbar: this.conf.addToNormalToolbar,
			addToBubbleToolbar: this.conf.addToBubbleToolbar,

			eleType: ELE_TYPE_BUTTON,
			iconClassName: CN_ICON,
			clickCallBack: this.commands.formatStrikethough,
		},
	]

	checkHighlight = (_event: Event) => {
		const btnEle = this.exsied.elements.editor.querySelector(`#${this.toolbarBtnIds.normal}`)
		if (btnEle) {
			const allTagNamesArr = this.exsied.cursorAllParentsTagNamesArr
			allTagNamesArr.includes(TN_DEL) || allTagNamesArr.includes(TN_S)
				? btnEle.classList.add(CN_ACTIVE)
				: btnEle.classList.remove(CN_ACTIVE)
		}
	}
}
