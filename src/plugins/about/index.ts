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
import { ExsiedPlugin } from '../../core/plugin'
import { CN_ICON, PLUGIN_CONF, PLUGIN_NAME, POPUP_ID } from './base'
import { showAbout } from './event_handlers'
import './styles.scss'

export const about: ExsiedPlugin = {
	name: PLUGIN_NAME,
	conf: PLUGIN_CONF,
	commands: {},

	toolBarControl: [
		{
			name: PLUGIN_NAME,
			tooltipText: 'About',
			addToNormalToolbar:PLUGIN_CONF.addToNormalToolbar,
			addToBubbleToolbar: PLUGIN_CONF.addToBubbleToolbar,

			eleType: 'button',
			iconClassName: CN_ICON,
			clickCallBack: showAbout,
		},
	],

	addHandler: () => {},
	removeHandler: () => {},
	checkHighlight: (_event) => {},
	removeTempEle: (_event) => {
		DomUtils.removeElementById(POPUP_ID)
	},
}
export default about
