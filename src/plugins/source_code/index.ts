import { ExsiedCommands, ExsiedPlugin } from '../../types'
import { CN_ICON_BRACES, CN_ICON_XML, PLUGIN_CONF, PLUGIN_NAME } from './base'
import { insertCodeBlock, toggleSourceView } from './event_handlers'
import { afterSetHtml } from './hooks'
import './styles.scss'

export const SOURCE_CODE_VIEW_NAME = 'sourceCodeView'
export const INSERT_SOURCE_CODE_BOCK_NAME = 'insertSourceCodeBock'
const commands: ExsiedCommands = {}
commands[SOURCE_CODE_VIEW_NAME] = toggleSourceView
commands[INSERT_SOURCE_CODE_BOCK_NAME] = insertCodeBlock

const plugin: ExsiedPlugin = {
	name: PLUGIN_NAME,
	conf: PLUGIN_CONF,
	commands,

	toolBarControl: [
		{
			name: SOURCE_CODE_VIEW_NAME,
			tooltipText: 'Source code view',
			addToBubble: PLUGIN_CONF.addToBubble,

			eleType: 'button',
			iconClassName: CN_ICON_XML,
			clickCallBack: commands[SOURCE_CODE_VIEW_NAME],
		},
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
	},
}

export default plugin
