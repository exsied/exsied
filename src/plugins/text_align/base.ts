export const PLUGIN_NAME = 'Quote'
export const CN_ICON_CENTER = 'exsied-btn-center'
export const CN_ICON_LEFT = 'exsied-btn-left'
export const CN_ICON_RIGHT = 'exsied-btn-right'

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
