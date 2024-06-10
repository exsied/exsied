/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License,
 * and if you do not meet the conditions, authorization is required
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { TN_EM, TN_I } from '../../contants'
import { exsied } from '../../core'

export const PLUGIN_NAME = 'italic'
export const CN_ICON = 'exsied-btn-italic'

export const isHighlight = () => {
	const allTagNamesArr = exsied.cursorAllParentsTagNamesArr
	return allTagNamesArr.includes(TN_I) || allTagNamesArr.includes(TN_EM)
}

export type PluginConf = {
	addToNormal: boolean
	addToBubble: boolean
}

export const PLUGIN_CONF: PluginConf = {
	addToNormal:true,
	addToBubble: true,
}
