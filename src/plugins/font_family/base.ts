/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License,
 * and if you do not meet the conditions, authorization is required
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { ToolBarSelectOption } from '../../ui/toolbar'

export const PLUGIN_NAME = 'fontFamily'

export type PluginConf = {
	addToBubble: boolean
	fontFamilyOptions: ToolBarSelectOption[]
}

export const PLUGIN_CONF: PluginConf = {
	addToBubble: false,
	fontFamilyOptions: [
		// {
		// 	name: 'test font family',
		// 	value: 'test font family',
		// 	tooltipText: 'test font family',
		// 	iconClassName: 'exsied-btn-font-family',
		// },
	],
}
