/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */

export const PLUGIN_NAME = 'Colors'
export const CN_ICON_BKG = 'exsied-icon-background-color'
export const CN_ICON_TEXT = 'exsied-icon-text-color'
export const NAME_BACKGROUND = 'backgroundColor'
export const NAME_TEXT = 'textColor'
export const POPUP_ID_BKG = `exsied_${PLUGIN_NAME}_popup_bkg`
export const POPUP_ID_TEXT = `exsied_${PLUGIN_NAME}_popup_text`

export type PluginConf = {
	addToNormalToolbar: {
		background: boolean
		text: boolean
	}
	addToBubbleToolbar: {
		background: boolean
		text: boolean
	}
	presetColors: string[] // rgb(1, 2, 3) or #123456 etc.
}

export const PLUGIN_CONF: PluginConf = {
	addToNormalToolbar: {
		background: true,
		text: true,
	},
	addToBubbleToolbar: {
		background: false,
		text: false,
	},
	presetColors: ['#f00', '#0f0', '#00f'],
}
