import { TN_B, TN_STRONG } from '../../contants'
import { exsied } from '../../core'

export const PLUGIN_NAME = 'bold'
export const CN_ICON = 'exsied-btn-blod'

export const isHighlight = () => {
	const allTagNamesArr = exsied.cursorAllParentsTagNamesArr
	return allTagNamesArr.includes(TN_B) || allTagNamesArr.includes(TN_STRONG)
}

export type PluginConf = {
	addToBubble: boolean
}

export const PLUGIN_CONF: PluginConf = {
	addToBubble: true,
}
