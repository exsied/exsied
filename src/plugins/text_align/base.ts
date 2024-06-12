/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */

export const PLUGIN_NAME = 'TextAlign'
export const CN_ICON_CENTER = 'exsied-btn-center'
export const CN_ICON_LEFT = 'exsied-btn-left'
export const CN_ICON_RIGHT = 'exsied-btn-right'

export type PluginConf = {
	addToNormalToolbar: {
		center: boolean
		left: boolean
		right: boolean
	}
	addToBubbleToolbar: {
		center: boolean
		left: boolean
		right: boolean
	}
	defaultInnerHTML: string
}

export const PLUGIN_CONF: PluginConf = {
	addToNormalToolbar: {
		center: true,
		left: true,
		right: true,
	},
	addToBubbleToolbar: {
		center: false,
		left: false,
		right: false,
	},
	defaultInnerHTML: `
		<li></li>  
		<li></li>  
		<li></li>  
		`,
}
