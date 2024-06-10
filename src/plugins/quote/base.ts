export const PLUGIN_NAME = 'Quote'
export const CN_ICON = 'exsied-btn-quote'

export type PluginConf = {
	addToBubble: boolean
	defaultInnerHTML: string
}

export const PLUGIN_CONF: PluginConf = {
	addToBubble: true,
	defaultInnerHTML: '> ',
}
