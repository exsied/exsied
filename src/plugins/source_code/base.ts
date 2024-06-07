export const PLUGIN_NAME = 'sourceCode'
export const CN_ICON_BRACES = 'exsied-btn-braces'
export const CN_ICON_XML = 'exsied-btn-xml'

export type PluginConf = {
	addToBubble: boolean
	renderData: (content: string) => string
	editData: (content: string, sign: string) => void
}

export const PLUGIN_CONF: PluginConf = {
	addToBubble: true,
	renderData: (_content: string) => {
		const msg = `Unimplemented callback: ${PLUGIN_NAME}.conf.renderData`
		console.error(msg)
		return msg
	},
	editData: (_content: string, _sign: string) => {
		console.error(`Unimplemented callback: ${PLUGIN_NAME}.conf.editData`)
	},
}
