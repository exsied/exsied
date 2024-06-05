import { ToolBarSelectOption } from '../../ui/toolbar'

export const PLUGIN_NAME = 'font-family'

export type PluginConf = {
	addToBubble: boolean
	fontFamilyOptions: ToolBarSelectOption[]
}

export const PLUGIN_CONF: PluginConf = {
	addToBubble: false,
	fontFamilyOptions: [
		{
			name: 'test font family',
			value: 'test font family',
			tooltipText: 'test font family',
			iconClassName: 'exsied-btn-font-family',
		},
	],
}
