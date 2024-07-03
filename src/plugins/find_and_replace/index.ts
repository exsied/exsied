/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { Exsied } from '../../core'
import { DomUtils } from '../../core/dom_utils'
import { Commands, ExsiedPlugin } from '../../core/plugin'
import { ELE_TYPE_BUTTON } from '../../ui/toolbar'
import { clearHighLight, onClick, resetValue } from './event_handlers'
import './styles.scss'

export type PluginConf = {
	addToNormalToolbar: {
		find: boolean
		replace: boolean
	}
	addToBubbleToolbar: {
		find: boolean
		replace: boolean
	}
}

export const CN_ICON_FIND = 'exsied-icon-find'
export const CN_ICON_REPLACE = 'exsied-icon-replace'

export const NAME_FIND = 'find'
export const NAME_REPLACE = 'replace'

export class PluginFindAndReplace implements ExsiedPlugin<Exsied> {
	private exsied: Exsied = new Exsied('')
	private popupId = ''
	// private toolbarBtnIds: ToolBarControlIds = emptyToolBarControlIds

	name = 'FindAndReplace'
	conf: PluginConf = {
		addToNormalToolbar: {
			find: true,
			replace: true,
		},
		addToBubbleToolbar: {
			find: false,
			replace: false,
		},
	}

	init = (exsied: Exsied): void => {
		this.exsied = exsied
		this.popupId = this.exsied.genPopupId(this.name, 'index') || ''
	}

	afterToolbarInit = () => {
		// this.toolbarBtnIds = this.exsied.toolbar.genButtonIdStd(this.name, 'index') || emptyToolBarControlIds
	}

	commands: Commands = {
		find: (event: Event) => {
			onClick(event, false, this.exsied as Exsied, this.popupId, this.name)
		},
		replace: (event: Event) => {
			onClick(event, true, this.exsied as Exsied, this.popupId, this.name)
		},
	}

	toolBarControl = [
		{
			name: NAME_FIND,
			tooltipText: 'Find',
			addToNormalToolbar: this.conf.addToNormalToolbar.find,
			addToBubbleToolbar: this.conf.addToBubbleToolbar.find,

			eleType: ELE_TYPE_BUTTON,
			iconClassName: CN_ICON_FIND,
			clickCallBack: this.commands[NAME_FIND],
		},
		{
			name: NAME_REPLACE,
			tooltipText: 'Replace',
			addToNormalToolbar: this.conf.addToNormalToolbar.replace,
			addToBubbleToolbar: this.conf.addToBubbleToolbar.replace,

			eleType: ELE_TYPE_BUTTON,
			iconClassName: CN_ICON_REPLACE,
			clickCallBack: this.commands[NAME_REPLACE],
		},
	]

	addHandler = () => {}
	removeHandler = () => {}
	checkHighlight = (_event: any) => {}
	removeTempEle = (_event: any) => {
		DomUtils.removeElementById(this.popupId)
		resetValue()
		clearHighLight()

		if (this.exsied.elements.workplace) {
			const workplace_ele = this.exsied.elements.workplace
			DomUtils.mergeAdjacentTextNodes(workplace_ele)
		}
	}
}
