/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License,
 * and if you do not meet the conditions, authorization is required
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { TN_SUB, TN_SUP } from '../../contants'
import { exsied } from '../../core'

export const PLUGIN_NAME = 'subscriptAndSuperscript'
export const CN_ICON_SUB = 'exsied-btn-sub'
export const CN_ICON_SUP = 'exsied-btn-sup'

export const isHighlightSub = () => {
	const allTagNamesArr = exsied.cursorAllParentsTagNamesArr
	return allTagNamesArr.includes(TN_SUB)
}

export const isHighlightSup = () => {
	const allTagNamesArr = exsied.cursorAllParentsTagNamesArr
	return allTagNamesArr.includes(TN_SUP)
}

export type PluginConf = {
	addToNormal: {
		sub: boolean
		sup: boolean
	}
	addToBubble: {
		sub: boolean
		sup: boolean
	}
}

export const PLUGIN_CONF: PluginConf = {
	addToNormal: {
		sub: true,
		sup: true,
	},
	addToBubble: {
		sub: false,
		sup: false,
	},
}
