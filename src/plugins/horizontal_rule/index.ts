/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { TN_HR } from '../../contants'
import { Exsied } from '../../core'
import { Commands, ExsiedPlugin } from '../../core/plugin'
import { SelectionUtils } from '../../core/selection_utils'
import { ELE_TYPE_BUTTON } from '../../ui/toolbar'

export type PluginConf = {
	addToNormalToolbar: boolean
	addToNormalToolbarInsertMenu: boolean
	addToBubbleToolbar: boolean
}

export const PLUGIN_NAME = 'HorizonalRule'
export const CN_ICON = 'exsied-icon-hr'

export class HorizonalRule implements ExsiedPlugin<Exsied> {
	private exsied: Exsied | undefined
	private popupId = ''
	// private toolbarBtnIds: ToolBarControlIds = emptyToolBarControlIds

	name = 'HorizonalRule'
	conf: PluginConf = {
		addToNormalToolbar: false,
		addToNormalToolbarInsertMenu: true,
		addToBubbleToolbar: false,
	}

	init = (exsied: Exsied): void => {
		this.exsied = exsied
		this.popupId = this.exsied?.genPopupId(this.name, 'index') || ''
	}

	afterExsiedInit = () => {
		// this.toolbarBtnIds = this.exsied?.toolbar?.genButtonIdStd(this.name, 'index') || emptyToolBarControlIds
	}

	insertHorizontalRule() {
		const ele = document.createElement(TN_HR)
		if (this.exsied?.elements.workplace) SelectionUtils.addElementBySelection(this.exsied.elements.workplace, ele)
	}

	commands: Commands = {}

	toolBarControl = [
		{
			name: PLUGIN_NAME,
			tooltipText: 'Horizonal rule',
			addToNormalToolbar: this.conf.addToNormalToolbar,
			addToNormalToolbarInsertMenu: this.conf.addToNormalToolbarInsertMenu,
			addToBubbleToolbar: this.conf.addToBubbleToolbar,

			eleType: ELE_TYPE_BUTTON,
			iconClassName: CN_ICON,
			clickCallBack: this.commands[PLUGIN_NAME],
		},
	]

	addHandler = () => {}
	removeHandler = () => {}
	checkHighlight = (_event: any) => {}
	removeTempEle = (_event: any) => {}
}
