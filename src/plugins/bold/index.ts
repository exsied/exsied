import { CN_ACTIVE } from '../../contants'
import { exsied } from '../../core'
import { ExsiedCommands, ExsiedPlugin } from '../../types'
import { Toolbar } from '../../ui/toolbar'
import { CN_ICON, PLUGIN_CONF, PLUGIN_NAME, isHighlight } from './base'
import { formatTextBold } from './event_handlers'
import './styles.scss'

const toolbarBtnIds = Toolbar.genButtonIds(PLUGIN_NAME, PLUGIN_NAME)
const commands: ExsiedCommands = {}
commands[PLUGIN_NAME] = formatTextBold

const plugin: ExsiedPlugin = {
	name: PLUGIN_NAME,
	conf: PLUGIN_CONF,
	commands,

	toolBarControl: [
		{
			name: PLUGIN_NAME,
			tooltipText: 'Bold',
			addToBubble: PLUGIN_CONF.addToBubble,

			eleType: 'button',
			iconClassName: CN_ICON,
			clickCallBack: commands[PLUGIN_NAME],
		},
	],

	addHhandler: () => {},
	removeHhandler: () => {},
	checkHighlight: (_event) => {
		const btnEle = exsied.elements.editor?.querySelector(`#${toolbarBtnIds.normal}`)
		if (btnEle) {
			isHighlight() ? btnEle.classList.add(CN_ACTIVE) : btnEle.classList.remove(CN_ACTIVE)
		}
	},
	removeTempEle: (_event) => {},
}

export default plugin
