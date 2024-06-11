/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License,
 * and if you do not meet the conditions, authorization is required
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */

export const PLUGIN_NAME = 'Quote'
export const CN_ICON_OL = 'exsied-btn-ol'
export const CN_ICON_UL = 'exsied-btn-ul'

export type PluginConf = {
	addToNormalToolbar: {
		ol: boolean
		ul: boolean
	}
	addToBubbleToolbar: {
		ol: boolean
		ul: boolean
	}
	defaultInnerHTML: string
}

export const PLUGIN_CONF: PluginConf = {
	addToNormalToolbar: {
		ol: true,
		ul: true,
	},
	addToBubbleToolbar: {
		ol: false,
		ul: false,
	},
	defaultInnerHTML: `
		<li></li>  
		<li></li>  
		<li></li>  
		`,
}
