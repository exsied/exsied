/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License,
 * and if you do not meet the conditions, authorization is required
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { exsied } from '../../core'
import { DomUtils } from '../../core/dom_utils'
import { Commands, ExsiedPlugin } from '../../core/plugin'
import { SelectionUtils } from '../../core/selection_utils'
import { Toolbar } from '../../ui/toolbar'
import {
	CN_ICON_BKG,
	CN_ICON_TEXT,
	NAME_BACKGROUND,
	NAME_TEXT,
	PLUGIN_CONF,
	PLUGIN_NAME,
	POPUP_ID_BKG,
	POPUP_ID_TEXT,
} from './base'
import { showColorPickerBkg, showColorPickerText } from './event_handlers'
import './styles.scss'

const toolbarBtnIdsBkg = Toolbar.genButtonIdStd(PLUGIN_NAME, NAME_BACKGROUND)
const toolbarBtnIdsText = Toolbar.genButtonIdStd(PLUGIN_NAME, NAME_TEXT)
const commands: Commands = {}
commands[NAME_BACKGROUND] = showColorPickerBkg
commands[NAME_TEXT] = showColorPickerText

export const colors: ExsiedPlugin = {
	name: PLUGIN_NAME,
	conf: PLUGIN_CONF,
	commands,

	toolBarControl: [
		{
			name: NAME_BACKGROUND,
			tooltipText: 'Background color',
			addToNormalToolbar: PLUGIN_CONF.addToNormalToolbar.background,
			addToBubbleToolbar: PLUGIN_CONF.addToBubbleToolbar.background,

			eleType: 'button',
			iconClassName: CN_ICON_BKG,
			clickCallBack: commands[NAME_BACKGROUND],
		},
		{
			name: NAME_TEXT,
			tooltipText: 'Text color',
			addToNormalToolbar: PLUGIN_CONF.addToNormalToolbar.text,
			addToBubbleToolbar: PLUGIN_CONF.addToBubbleToolbar.text,

			eleType: 'button',
			iconClassName: CN_ICON_TEXT,
			clickCallBack: commands[NAME_TEXT],
		},
	],

	addHandler: () => {
		const btnEleBkg = document.getElementById(toolbarBtnIdsBkg.normal)
		if (btnEleBkg) {
			btnEleBkg.addEventListener('mouseover', () => {
				SelectionUtils.backupSelection()
			})
		}
		const btnEleText = document.getElementById(toolbarBtnIdsText.normal)
		if (btnEleText) {
			btnEleText.addEventListener('mouseover', () => {
				SelectionUtils.backupSelection()
			})
		}
	},
	removeHandler: () => {},
	checkHighlight: (event) => {
		const btnEleBkg = exsied.elements.editor?.querySelector(`#${toolbarBtnIdsBkg.normal}`) as HTMLElement
		if (btnEleBkg) {
			const targetEle = event.target as HTMLElement
			const backgroundColor = DomUtils.getParentsStyleByKey(targetEle, 'background-color')

			DomUtils.setStyleProperty(btnEleBkg, {
				backgroundColor,
			} as unknown as CSSStyleDeclaration)
		}

		const btnEleText = exsied.elements.editor?.querySelector(`#${toolbarBtnIdsText.normal}`) as HTMLElement
		if (btnEleText) {
			const targetEle = event.target as HTMLElement
			const color = DomUtils.getParentsStyleByKey(targetEle, 'color')

			DomUtils.setStyleProperty(btnEleText, {
				backgroundColor: color,
			} as unknown as CSSStyleDeclaration)
		}
	},
	removeTempEle: (_event) => {
		DomUtils.removeElementById(POPUP_ID_BKG)
		DomUtils.removeElementById(POPUP_ID_TEXT)
	},
}

export default colors
