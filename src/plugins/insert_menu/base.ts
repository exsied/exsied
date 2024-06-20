/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */

export const PLUGIN_NAME = 'InsertMenu'
export const CN_ICON = 'exsied-icon-plus'
export const POPUP_ID = `exsied_${PLUGIN_NAME}_popup`
export const CN_ROOT = 'exsied-insert-menu-view'

export type PluginConf = {
	addToNormalToolbar: boolean
	addToBubbleToolbar: boolean
}

export const PLUGIN_CONF: PluginConf = {
	addToNormalToolbar: true,
	addToBubbleToolbar: false,
}
