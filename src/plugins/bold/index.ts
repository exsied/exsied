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
import { Commands, ExsiedPlugin } from '../../core/plugin'
import { ELE_TYPE_BUTTON, ToolBarControlIds } from '../../ui/toolbar'
import { CN_ICON, PLUGIN_CONF, PLUGIN_NAME } from './base'
import './styles.scss'

export class Bold implements ExsiedPlugin<Exsied> {
	exsied: Exsied | undefined
	toolbarBtnIds: ToolBarControlIds | null = null

	init = (exsied: Exsied): void => {
		this.exsied = exsied
	}

	afterExsiedInit = () => {
		this.toolbarBtnIds = this.exsied?.toolbar?.genButtonIdStd(PLUGIN_NAME, PLUGIN_NAME) || null
	}

	isHighlight = () => {
		const allTagNamesArr = this.exsied?.cursorAllParentsTagNamesArr || []

		return allTagNamesArr.includes(TN_B) || allTagNamesArr.includes(TN_STRONG)
	}

	formatTextBold = () => {
		if (this.isHighlight()) {
			FormatTaName.unformatSelected(TN_B)
			FormatTaName.unformatSelected(TN_STRONG)
		} else {
			FormatTaName.formatSelected(TN_B)
		}
	}

	name = PLUGIN_NAME
	conf = PLUGIN_CONF

	commands: Commands = {
		formatBold: this.formatTextBold,
	}

	toolBarControl = [
		{
			name: PLUGIN_NAME,
			tooltipText: 'Bold',
			addToNormalToolbar: PLUGIN_CONF.addToNormalToolbar,
			addToNormalToolbarInsertMenu: PLUGIN_CONF.addToNormalToolbarInsertMenu,
			addToBubbleToolbar: PLUGIN_CONF.addToBubbleToolbar,

			eleType: ELE_TYPE_BUTTON,
			iconClassName: CN_ICON,
			clickCallBack: this.commands['formatBold'],
		},
	]

	addHandler = () => {}
	removeHandler = () => {}
	checkHighlight = (_event: any) => {
		const btnEle = this.exsied?.elements.editor?.querySelector(`#${this.toolbarBtnIds?.normal}`)

		if (btnEle) {
			this.isHighlight() ? btnEle.classList.add(CN_ACTIVE) : btnEle.classList.remove(CN_ACTIVE)
		}
	}
	removeTempEle = (_event: any) => {}
}
