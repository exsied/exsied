/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License,
 * and if you do not meet the conditions, authorization is required
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { DomUtils } from '../../core/dom_utils'
import { t } from '../../core/i18n'
import { Commands, ExsiedPlugin } from '../../core/plugin'
import { SelectionUtils } from '../../core/selection_utils'
import { Toolbar } from '../../ui/toolbar'
import { CN_ICON, PLUGIN_CONF, PLUGIN_NAME, POPUP_ID } from './base'
import { showInsertMenu } from './event_handlers'
import './styles.scss'

const toolbarBtnIds = Toolbar.genButtonIds(PLUGIN_NAME, PLUGIN_NAME)
const commands: Commands = {}
commands[PLUGIN_NAME] = showInsertMenu

export const insertMenu: ExsiedPlugin = {
	name: PLUGIN_NAME,
	conf: PLUGIN_CONF,
	commands,

	toolBarControl: [
		{
			name: PLUGIN_NAME,
			buttonText: t('Insert'),
			tooltipText: 'Insert menu',
			addToNormalToolbar: PLUGIN_CONF.addToNormalToolbar,
			addToBubbleToolbar: PLUGIN_CONF.addToBubbleToolbar,

			eleType: 'button',
			iconClassName: CN_ICON,
			clickCallBack: commands[PLUGIN_NAME],
		},
	],

	addHandler: () => {
		const btnEle = document.getElementById(toolbarBtnIds.normal)
		if (btnEle) {
			btnEle.addEventListener('mouseover', () => {
				SelectionUtils.backupSelection()
			})
		}
	},
	removeHandler: () => {},
	checkHighlight: (_event) => {},
	removeTempEle: (_event) => {
		DomUtils.removeElementById(POPUP_ID)
	},
}

export default insertMenu
