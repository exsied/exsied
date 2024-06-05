import { TN_DIV, TN_H1, TN_H2, TN_H3, TN_H4, TN_H5, TN_H6, TN_SPAN } from '../../contants'
import { ToolBarSelectOption } from '../../ui/toolbar'

export const PLUGIN_NAME = 'headings'
export const HEADING_NAME_1 = 'heading1'
export const HEADING_NAME_2 = 'heading2'
export const HEADING_NAME_3 = 'heading3'
export const HEADING_NAME_4 = 'heading4'
export const HEADING_NAME_5 = 'heading5'
export const HEADING_NAME_6 = 'heading6'
export const OPTION_NORMAL_BLOCK = TN_SPAN
export const OPTION_NORMAL_INLINE = TN_DIV
export const OPTION_HEADING1 = TN_H1
export const OPTION_HEADING2 = TN_H2
export const OPTION_HEADING3 = TN_H3
export const OPTION_HEADING4 = TN_H4
export const OPTION_HEADING5 = TN_H5
export const OPTION_HEADING6 = TN_H6

export type PluginConf = {
	addToBubble: boolean
	headingsOptions: ToolBarSelectOption[]
}

export const PLUGIN_CONF: PluginConf = {
	addToBubble: true,
	headingsOptions: [
		{
			name: 'Normal block',
			value: OPTION_NORMAL_BLOCK,
			tooltipText: 'Normal block',
			iconClassName: 'exsied-btn-div',
		},
		{
			name: 'Normal inline',
			value: OPTION_NORMAL_INLINE,
			tooltipText: 'Normal inline',
			iconClassName: 'exsied-btn-span',
		},
		{
			name: HEADING_NAME_1,
			value: OPTION_HEADING1,
			tooltipText: 'Heading1',
			iconClassName: 'exsied-btn-h1',
		},
		{
			name: HEADING_NAME_2,
			value: OPTION_HEADING2,
			tooltipText: 'Heading2',
			iconClassName: 'exsied-btn-h2',
		},
		{
			name: HEADING_NAME_3,
			value: OPTION_HEADING3,
			tooltipText: 'Heading3',
			iconClassName: 'exsied-btn-h3',
		},
		{
			name: HEADING_NAME_4,
			value: OPTION_HEADING4,
			tooltipText: 'Heading4',
			iconClassName: 'exsied-btn-h4',
		},
		{
			name: HEADING_NAME_5,
			value: OPTION_HEADING5,
			tooltipText: 'Heading5',
			iconClassName: 'exsied-btn-h5',
		},
		{
			name: HEADING_NAME_6,
			value: OPTION_HEADING6,
			tooltipText: 'Heading6',
			iconClassName: 'exsied-btn-h6',
		},
	],
}
