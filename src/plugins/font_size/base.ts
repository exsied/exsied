import { ToolBarSelectOption } from '../../ui/toolbar'

export const PLUGIN_NAME = 'fontSize'

export type PluginConf = {
	addToBubble: boolean
	fontSizeOptions: ToolBarSelectOption[]
}

export const PLUGIN_CONF: PluginConf = {
	addToBubble: false,
	fontSizeOptions: [
		{
			name: '8px',
			value: '8px',
			tooltipText: '',
			iconClassName: '',
		},
		{
			name: '12px',
			value: '12px',
			tooltipText: '',
			iconClassName: '',
		},
	],
}
