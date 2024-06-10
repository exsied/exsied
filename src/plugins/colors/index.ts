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
import { CN_ICON_BKG, PLUGIN_CONF, PLUGIN_NAME, POPUP_ID_BKG, POPUP_ID_TEXT } from './base'
import { showColorPickerBkg, showColorPickerText } from './event_handlers'
import './styles.scss'

const BKG_NAME = 'backgroundColor'
const TEXT_NAME = 'textColor'
const toolbarBtnIds = Toolbar.genButtonIds(PLUGIN_NAME, PLUGIN_NAME)
const commands: Commands = {}
commands[BKG_NAME] = showColorPickerBkg
commands[TEXT_NAME] = showColorPickerText

export const colors: ExsiedPlugin = {
	name: PLUGIN_NAME,
	conf: PLUGIN_CONF,
	commands,

	toolBarControl: [
		{
			name: BKG_NAME,
			tooltipText: 'Background color',
			addToBubble: PLUGIN_CONF.addToBubble,

			eleType: 'button',
			iconClassName: CN_ICON_BKG,
			clickCallBack: commands[BKG_NAME],
		},
		{
			name: TEXT_NAME,
			tooltipText: 'Text color',
			addToBubble: PLUGIN_CONF.addToBubble,

			eleType: 'button',
			iconClassName: CN_ICON_BKG,
			clickCallBack: commands[TEXT_NAME],
		},
	],

	addHhandler: () => {
		const btnEle = document.getElementById(toolbarBtnIds.normal)
		if (btnEle) {
			btnEle.addEventListener('mouseover', () => {
				SelectionUtils.backupSelection()
			})
		}
	},
	removeHhandler: () => {},
	checkHighlight: (event) => {
		const btnEle = exsied.elements.editor?.querySelector(`#${toolbarBtnIds.normal}`) as HTMLElement
		if (btnEle) {
			const targetEle = event.target as HTMLElement
			const backgroundColor = DomUtils.getParentsStyleByKey(targetEle, 'background-color')

			DomUtils.setStyleProperty(btnEle, {
				backgroundColor,
			} as unknown as CSSStyleDeclaration)
		}
	},
	removeTempEle: (_event) => {
		DomUtils.removeElementById(POPUP_ID_BKG)
		DomUtils.removeElementById(POPUP_ID_TEXT)
	},
}

export default colors
