/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { TN_DIV } from '../../contants'
import { Exsied } from '../../core'
import { DomUtilsInExsied } from '../../core/dom_utils'
import { ExsiedPlugin } from '../../core/plugin'
import { SelectionUtils } from '../../core/selection_utils'
import { ELE_TYPE_BUTTON } from '../../ui/toolbar'

export type PluginConf = {
	addToNormalToolbar: boolean
	addToNormalToolbarInsertMenu: boolean
	addToBubbleToolbar: boolean
}

export const CN_ICON = 'exsied-icon-square'

export class PluginNewBlock implements ExsiedPlugin<Exsied> {
	private exsied: Exsied = new Exsied('')

	name = 'NewBlock'
	conf: PluginConf = {
		addToNormalToolbar: false,
		addToNormalToolbarInsertMenu: true,
		addToBubbleToolbar: false,
	}

	init = (exsied: Exsied): void => {
		this.exsied = exsied
	}

	insertNewBlock = () => {
		const duie = new DomUtilsInExsied(this.exsied)
		const ele = duie.workplaceInsertNewChild(TN_DIV)
		if (ele) {
			ele.innerHTML = '<br/>'
			SelectionUtils.moveCursorToEle(ele)
		}
	}

	commands = {
		insertNewBlock: this.insertNewBlock,
	}

	getToolBarControl = () => [
		{
			name: 'index',
			tooltipText: 'Insert new block',
			addToNormalToolbar: this.conf.addToNormalToolbar,
			addToNormalToolbarInsertMenu: this.conf.addToNormalToolbarInsertMenu,
			addToBubbleToolbar: this.conf.addToBubbleToolbar,

			eleType: ELE_TYPE_BUTTON,
			iconClassName: CN_ICON,
			clickCallBack: this.commands.insertNewBlock,
		},
	]

	removeTempEle = (event: Event) => {}
}
