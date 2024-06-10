/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License,
 * and if you do not meet the conditions, authorization is required
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */

export const PLUGIN_NAME = 'indentAndOutdent'
export const CN_ICON_INDENT = 'exsied-btn-indent'
export const CN_ICON_OUTDENT = 'exsied-btn-outdent'

export type PluginConf = {
	addToBubble: {
		indent: boolean
		outent: boolean
	}
	stepPx: number
}

export const PLUGIN_CONF: PluginConf = {
	addToBubble: {
		indent: false,
		outent: false,
	},
	stepPx: 10,
}
