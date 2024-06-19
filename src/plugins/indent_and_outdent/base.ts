/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */

export const PLUGIN_NAME = 'IndentAndOutdent'
export const CN_ICON_INDENT = 'exsied-icon-indent'
export const CN_ICON_OUTDENT = 'exsied-icon-outdent'

export type PluginConf = {
	addToNormalToolbar: {
		indent: boolean
		outent: boolean
	}
	addToBubbleToolbar: {
		indent: boolean
		outent: boolean
	}
	stepPx: number
}

export const PLUGIN_CONF: PluginConf = {
	addToNormalToolbar: {
		indent: true,
		outent: true,
	},
	addToBubbleToolbar: {
		indent: false,
		outent: false,
	},
	stepPx: 10,
}
