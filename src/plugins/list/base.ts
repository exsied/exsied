export const PLUGIN_NAME = 'Quote'
export const CN_ICON_OL = 'exsied-btn-ol'
export const CN_ICON_UL = 'exsied-btn-ul'

export type PluginConf = {
	addToBubble: boolean
	defaultInnerHTML: string
}

export const PLUGIN_CONF: PluginConf = {
	addToBubble: true,
	defaultInnerHTML: `
		<li></li>  
		<li></li>  
		<li></li>  
		`,
}
