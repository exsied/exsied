/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { TN_DEL, TN_S } from '../../contants'
import { exsied } from '../../core'

export const PLUGIN_NAME = 'Strikethrough'
export const CN_ICON = 'exsied-icon-strikethrough'

export const isHighlight = () => {
	const allTagNamesArr = exsied.cursorAllParentsTagNamesArr
	return allTagNamesArr.includes(TN_S) || allTagNamesArr.includes(TN_DEL)
}

export type PluginConf = {
	addToNormalToolbar: boolean
	addToBubbleToolbar: boolean
}

export const PLUGIN_CONF: PluginConf = {
	addToNormalToolbar: true,
	addToBubbleToolbar: true,
}
