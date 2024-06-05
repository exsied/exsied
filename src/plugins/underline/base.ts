import { TN_U } from '../../contants'
import { exsied } from '../../core'

export const PLUGIN_NAME = 'underline'
export const CN_ICON = 'exsied-btn-underline'

export const isHighlight = () => {
	const allTagNamesArr = exsied.cursorAllParentsTagNamesArr
	return allTagNamesArr.includes(TN_U)
}

export type PluginConf = {
	addToBubble: boolean
}

export const PLUGIN_CONF: PluginConf = {
	addToBubble: true,
}
