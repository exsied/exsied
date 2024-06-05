import { TN_EM, TN_I } from '../../contants'
import { exsied } from '../../core'

export const PLUGIN_NAME = 'italic'
export const CN_ICON = 'exsied-btn-italic'

export const isHighlight = () => {
	const allTagNamesArr = exsied.cursorAllParentsTagNamesArr
	return allTagNamesArr.includes(TN_I) || allTagNamesArr.includes(TN_EM)
}

export type PluginConf = {
	addToBubble: boolean
}

export const PLUGIN_CONF: PluginConf = {
	addToBubble: true,
}
