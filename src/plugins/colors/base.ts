/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License,
 * and if you do not meet the conditions, authorization is required
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */

export const PLUGIN_NAME = 'colors'
export const CN_ICON_BKG = 'exsied-btn-background-color'
export const CN_ICON_TEXT = 'exsied-btn-text-color'
export const POPUP_ID_BKG = `exsied_${PLUGIN_NAME}_popup_bkg`
export const POPUP_ID_TEXT = `exsied_${PLUGIN_NAME}_popup_text`

export type PluginConf = {
	addToBubble: boolean
	presetColors: string[] // rgb(1, 2, 3) or #123456 etc.
}

export const PLUGIN_CONF: PluginConf = {
	addToBubble: true,
	presetColors: ['#f00', '#0f0', '#00f'],
}
