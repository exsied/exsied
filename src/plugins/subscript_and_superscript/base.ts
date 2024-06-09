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
	addToBubble: boolean
}

export const PLUGIN_CONF: PluginConf = {
	addToBubble: true,
}
