export const PLUGIN_NAME = 'backgroundColor'
export const CN_ICON = 'exsied-btn-background-color'
export const POPUP_ID = `exsied_${PLUGIN_NAME}_popup`

export type PluginConf = {
	addToBubble: boolean
	presetColors: string[] // rgb(1, 2, 3) or #123456 etc.
}

export const PLUGIN_CONF: PluginConf = {
	addToBubble: true,
	presetColors: ['#f00', '#0f0', '#00f'],
}
