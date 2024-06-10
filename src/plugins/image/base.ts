/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License,
 * and if you do not meet the conditions, authorization is required
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */

export const PLUGIN_NAME = 'image'
export const CN_ICON = 'exsied-btn-image'
export const CN_RESIZER = 'exsied-image-resizer'
export const CN_BTN_TL = 'exsied-image-resizer-tl'
export const CN_BTN_TC = 'exsied-image-resizer-tc'
export const CN_BTN_TR = 'exsied-image-resizer-tr'
export const CN_BTN_L = 'exsied-image-resizer-l'
export const CN_BTN_R = 'exsied-image-resizer-r'
export const CN_BTN_BL = 'exsied-image-resizer-bl'
export const CN_BTN_BC = 'exsied-image-resizer-bc'
export const CN_BTN_BR = 'exsied-image-resizer-br'
export const CN_BTN_SETTING = 'exsied-image-settings-btn'

export const RESIZER_ID = `exsied_${PLUGIN_NAME}_resizer`

export type PluginConf = {
	addToBubble: boolean
	defaultAlt: string
	defaultSrc: string
}

export const PLUGIN_CONF: PluginConf = {
	addToBubble: false,
	defaultAlt: 'enassi',
	defaultSrc: 'http://chemdevice.com/upload/202403/07/202403070917419604.jpg',
}
