/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License,
 * and if you do not meet the conditions, authorization is required
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */

export const PLUGIN_NAME = 'findAndReplace'
export const POPUP_ID = `exsied_${PLUGIN_NAME}_popup`
export const CN_ICON_FIND = 'exsied-btn-find'
export const CN_ICON_REPLACE = 'exsied-btn-replace'
export const CN_FIND = 'find-view'
export const CN_REPLACE = 'replace-view'

export type PluginConf = {
	addToNormalToolbar: {
		find: boolean
		replace: boolean
	}
	addToBubbleToolbar: {
		find: boolean
		replace: boolean
	}
}

export const PLUGIN_CONF: PluginConf = {
	addToNormalToolbar: {
		find: true,
		replace: true,
	},
	addToBubbleToolbar: {
		find: false,
		replace: false,
	},
}
