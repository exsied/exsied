/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License,
 * and if you do not meet the conditions, authorization is required
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { Commands, ExsiedPlugin } from '../../core/plugin'
import { CN_ICON, PLUGIN_CONF, PLUGIN_NAME } from './base'
import { insertHorizontalRule } from './event_handlers'
import './styles.scss'

const commands: Commands = {}
commands[PLUGIN_NAME] = insertHorizontalRule

export const horizonalRule: ExsiedPlugin = {
	name: PLUGIN_NAME,
	conf: PLUGIN_CONF,
	commands,

	toolBarControl: [
		{
			name: PLUGIN_NAME,
			tooltipText: 'Horizonal rule',
			addToBubble: PLUGIN_CONF.addToBubble,

			eleType: 'button',
			iconClassName: CN_ICON,
			clickCallBack: commands[PLUGIN_NAME],
		},
	],

	addHhandler: () => {},
	removeHhandler: () => {},
	checkHighlight: (_event) => {},
	removeTempEle: (_event) => {},
}

export default horizonalRule
