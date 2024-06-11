/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License,
 * and if you do not meet the conditions, authorization is required
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { Commands, ExsiedPlugin } from '../../core/plugin'
import { CN_ICON_BRACES, PLUGIN_CONF, PLUGIN_NAME } from './base'
import { insertCodeBlock, toggleSourceView } from './event_handlers'
import { afterSetHtml, beforeGetHtml } from './hooks'
import './styles.scss'

export const NAME_SOURCE_CODE_VIEW = 'sourceCodeView'
export const NAME_INSERT_SOURCE_CODE_BOCK = 'insertSourceCodeBock'
const commands: Commands = {}
commands[NAME_SOURCE_CODE_VIEW] = toggleSourceView
commands[NAME_INSERT_SOURCE_CODE_BOCK] = insertCodeBlock

export const sourceCode: ExsiedPlugin = {
	name: PLUGIN_NAME,
	conf: PLUGIN_CONF,
	commands,

	toolBarControl: [
		/* TODO:
		{
			name: SOURCE_CODE_VIEW_NAME,
			tooltipText: 'Source code view',
			addToBubbleToolbar: PLUGIN_CONF.addToBubbleToolbar,

			eleType: 'button',
			iconClassName: CN_ICON_XML,
			clickCallBack: commands[SOURCE_CODE_VIEW_NAME],
		},
		*/
		{
			name: NAME_INSERT_SOURCE_CODE_BOCK,
			tooltipText: 'Insert source code bock',
			addToNormalToolbar: PLUGIN_CONF.addToNormalToolbar,
			addToBubbleToolbar: PLUGIN_CONF.addToBubbleToolbar,

			eleType: 'button',
			iconClassName: CN_ICON_BRACES,
			clickCallBack: commands[NAME_INSERT_SOURCE_CODE_BOCK],
		},
	],

	addHandler: () => {},
	removeHandler: () => {},
	checkHighlight: (_event) => {},
	removeTempEle: (_event) => {},
	hooks: {
		afterSetHtml,
		beforeGetHtml,
	},
}

export default sourceCode
