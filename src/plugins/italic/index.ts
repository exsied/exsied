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
import { Commands, ExsiedPlugin } from '../../core/plugin'
import { ELE_TYPE_BUTTON, ToolBarControlIds, emptyToolBarControlIds } from '../../ui/toolbar'

export type PluginConf = {
	addToNormalToolbar: boolean
	addToBubbleToolbar: boolean
}

export const PLUGIN_NAME = 'Italic'
export const CN_ICON = 'exsied-icon-italic'

export class Italic implements ExsiedPlugin<Exsied> {
	private exsied: Exsied | undefined
	// private popupId = ''
	private toolbarBtnIds: ToolBarControlIds = emptyToolBarControlIds

	name = 'Italic'
	conf: PluginConf = {
		addToNormalToolbar: true,
		addToBubbleToolbar: true,
	}

	init = (exsied: Exsied): void => {
		this.exsied = exsied
		// this.popupId = this.exsied?.genPopupId(this.name, 'index') || ''
	}

	afterToolbarInit = () => {
		this.toolbarBtnIds = this.exsied?.toolbar?.genButtonIdStd(this.name, 'index') || emptyToolBarControlIds
	}

	isHighlight = () => {
		const allTagNamesArr = this.exsied?.cursorAllParentsTagNamesArr || []
		return allTagNamesArr.includes(TN_I) || allTagNamesArr.includes(TN_EM)
	}

	formatItalic = () => {
		if (this.isHighlight()) {
			FormatTaName.unformatSelected(TN_I)
			FormatTaName.unformatSelected(TN_EM)
		} else {
			FormatTaName.formatSelected(TN_I)
		}
	}

	commands: Commands = {
		formatItalic: this.formatItalic,
	}

	toolBarControl = [
		{
			name: PLUGIN_NAME,
			tooltipText: 'Italic',
			addToNormalToolbar: this.conf.addToNormalToolbar,
			addToBubbleToolbar: this.conf.addToBubbleToolbar,

			eleType: ELE_TYPE_BUTTON,
			iconClassName: CN_ICON,
			clickCallBack: this.commands[PLUGIN_NAME],
		},
	]

	addHandler = () => {}
	removeHandler = () => {}
	checkHighlight = (_event: any) => {
		const btnEle = this.exsied?.elements.editor?.querySelector(`#${this.toolbarBtnIds.normal}`)
		if (btnEle) {
			const allTagNamesArr = this.exsied?.cursorAllParentsTagNamesArr || []
			allTagNamesArr.includes(TN_EM) || allTagNamesArr.includes(TN_I)
				? btnEle.classList.add(CN_ACTIVE)
				: btnEle.classList.remove(CN_ACTIVE)
		}
	}
	removeTempEle = (_event: any) => {}
}
