/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { TN_DIV, TN_H1, TN_H2, TN_H3, TN_H4, TN_H5, TN_H6 } from '../../contants'
import { ToolBarSelectOption } from '../../ui/toolbar'

export const PLUGIN_NAME = 'Headings'
export const NAME_HEADING_1 = 'Heading1'
export const NAME_HEADING_2 = 'Heading2'
export const NAME_HEADING_3 = 'Heading3'
export const NAME_HEADING_4 = 'Heading4'
export const NAME_HEADING_5 = 'Heading5'
export const NAME_HEADING_6 = 'Heading6'
export const OPTION_Paragraph = TN_DIV
export const OPTION_HEADING1 = TN_H1
export const OPTION_HEADING2 = TN_H2
export const OPTION_HEADING3 = TN_H3
export const OPTION_HEADING4 = TN_H4
export const OPTION_HEADING5 = TN_H5
export const OPTION_HEADING6 = TN_H6

export type PluginConf = {
	addToNormalToolbar: boolean
	addToBubbleToolbar: boolean
	headingsOptions: ToolBarSelectOption[]
}

export const PLUGIN_CONF: PluginConf = {
	addToNormalToolbar: true,
	addToBubbleToolbar: true,
	headingsOptions: [
		{
			name: 'Paragraph',
			value: OPTION_Paragraph,
			tooltipText: 'Paragraph',
			iconClassName: 'exsied-icon-paragraph',
		},
		{
			name: NAME_HEADING_1,
			value: OPTION_HEADING1,
			tooltipText: 'Heading1',
			iconClassName: 'exsied-icon-h1',
		},
		{
			name: NAME_HEADING_2,
			value: OPTION_HEADING2,
			tooltipText: 'Heading2',
			iconClassName: 'exsied-icon-h2',
		},
		{
			name: NAME_HEADING_3,
			value: OPTION_HEADING3,
			tooltipText: 'Heading3',
			iconClassName: 'exsied-icon-h3',
		},
		{
			name: NAME_HEADING_4,
			value: OPTION_HEADING4,
			tooltipText: 'Heading4',
			iconClassName: 'exsied-icon-h4',
		},
		{
			name: NAME_HEADING_5,
			value: OPTION_HEADING5,
			tooltipText: 'Heading5',
			iconClassName: 'exsied-icon-h5',
		},
		{
			name: NAME_HEADING_6,
			value: OPTION_HEADING6,
			tooltipText: 'Heading6',
			iconClassName: 'exsied-icon-h6',
		},
	],
}
