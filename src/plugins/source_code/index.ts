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

export const SOURCE_CODE_VIEW_NAME = 'sourceCodeView'
export const INSERT_SOURCE_CODE_BOCK_NAME = 'insertSourceCodeBock'
const commands: Commands = {}
commands[SOURCE_CODE_VIEW_NAME] = toggleSourceView
commands[INSERT_SOURCE_CODE_BOCK_NAME] = insertCodeBlock

export const sourceCode: ExsiedPlugin = {
	name: PLUGIN_NAME,
	conf: PLUGIN_CONF,
	commands,

	toolBarControl: [
		/* TODO:
		{
			name: SOURCE_CODE_VIEW_NAME,
			tooltipText: 'Source code view',
			addToBubble: PLUGIN_CONF.addToBubble,

			eleType: 'button',
			iconClassName: CN_ICON_XML,
			clickCallBack: commands[SOURCE_CODE_VIEW_NAME],
		},
		*/
		{
			name: INSERT_SOURCE_CODE_BOCK_NAME,
			tooltipText: 'Insert source code bock',
			addToBubble: PLUGIN_CONF.addToBubble,

			eleType: 'button',
			iconClassName: CN_ICON_BRACES,
			clickCallBack: commands[INSERT_SOURCE_CODE_BOCK_NAME],
		},
	],

	addHhandler: () => {},
	removeHhandler: () => {},
	checkHighlight: (_event) => {},
	removeTempEle: (_event) => {},
	hooks: {
		afterSetHtml,
		beforeGetHtml,
	},
}

export default sourceCode
