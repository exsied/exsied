import { TN_DEL, TN_S } from '../../contants'
import { exsied } from '../../core'

export const PLUGIN_NAME = 'strikethrough'
export const CN_ICON = 'exsied-btn-strikethrough'

export const isHighlight = () => {
	const allTagNamesArr = exsied.cursorAllParentsTagNamesArr
	return allTagNamesArr.includes(TN_S) || allTagNamesArr.includes(TN_DEL)
}

export type PluginConf = {
	addToBubble: boolean
}

export const PLUGIN_CONF: PluginConf = {
	addToBubble: true,
}
