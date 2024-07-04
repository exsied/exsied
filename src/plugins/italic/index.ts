/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { CN_ACTIVE, TN_EM, TN_I } from '../../contants'
import { Exsied } from '../../core'
import { FormatTaName } from '../../core/format/tag_name'
import { ExsiedPlugin } from '../../core/plugin'
import { ELE_TYPE_BUTTON, ToolBarControlIds, emptyToolBarControlIds } from '../../ui/toolbar'

export type PluginConf = {
	addToNormalToolbar: boolean
	addToBubbleToolbar: boolean
}

export const PLUGIN_NAME = 'Italic'
export const CN_ICON = 'exsied-icon-italic'

export class PluginItalic implements ExsiedPlugin<Exsied> {
	private exsied: Exsied = new Exsied('')

	private toolbarBtnIds: ToolBarControlIds = emptyToolBarControlIds

	name = 'Italic'
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
		return allTagNamesArr.includes(TN_I) || allTagNamesArr.includes(TN_EM)
	}

	formatItalic = () => {
		if (this.isHighlight()) {
			FormatTaName.unformatSelected(this.exsied, TN_I)
			FormatTaName.unformatSelected(this.exsied, TN_EM)
		} else {
			FormatTaName.formatSelected(this.exsied, TN_I)
		}
	}

	commands = {
		formatItalic: this.formatItalic,
	}

	getToolBarControl = () => [
		{
			name: 'index',
			tooltipText: 'Italic',
			addToNormalToolbar: this.conf.addToNormalToolbar,
			addToBubbleToolbar: this.conf.addToBubbleToolbar,

			eleType: ELE_TYPE_BUTTON,
			iconClassName: CN_ICON,
			clickCallBack: this.commands.formatItalic,
		},
	]

	checkHighlight = (event: Event) => {
		const btnEle = this.exsied.elements.editor.querySelector(`#${this.toolbarBtnIds.normal}`)
		if (btnEle) {
			const allTagNamesArr = this.exsied.cursorAllParentsTagNamesArr
			allTagNamesArr.includes(TN_EM) || allTagNamesArr.includes(TN_I)
				? btnEle.classList.add(CN_ACTIVE)
				: btnEle.classList.remove(CN_ACTIVE)
		}
	}
	removeTempEle = (event: Event) => {}
}
