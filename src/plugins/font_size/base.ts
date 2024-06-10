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

export const PLUGIN_NAME = 'fontSize'

export type PluginConf = {
	addToNormal: boolean
	addToBubble: boolean
	fontSizeOptions: ToolBarSelectOption[]
}

export const PLUGIN_CONF: PluginConf = {
	addToNormal:true,
	addToBubble: false,
	fontSizeOptions: [
		// {
		// 	name: '8px',
		// 	value: '8px',
		// 	tooltipText: '',
		// 	iconClassName: '',
		// },
	],
}
