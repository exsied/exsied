/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { TN_B, TN_STRONG } from '../../contants'
import { exsied } from '../../core'

export const PLUGIN_NAME = 'Bold'
export const CN_ICON = 'exsied-icon-blod'

export const isHighlight = () => {
	const allTagNamesArr = exsied.cursorAllParentsTagNamesArr
	return allTagNamesArr.includes(TN_B) || allTagNamesArr.includes(TN_STRONG)
}

export type PluginConf = {
	addToNormalToolbar: boolean
	addToBubbleToolbar: boolean
}

export const PLUGIN_CONF: PluginConf = {
	addToNormalToolbar: true,
	addToBubbleToolbar: true,
}
