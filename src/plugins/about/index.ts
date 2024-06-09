import { DomUtils } from '../../core/dom_utils'
import { ExsiedPlugin } from '../../core/plugin'
import { CN_ICON, PLUGIN_CONF, PLUGIN_NAME, POPUP_ID } from './base'
import { insertLink } from './event_handlers'
import './styles.scss'

export const about: ExsiedPlugin = {
	name: PLUGIN_NAME,
	conf: PLUGIN_CONF,
	commands: {},

	toolBarControl: [
		{
			name: PLUGIN_NAME,
			tooltipText: 'About',
			addToBubble: PLUGIN_CONF.addToBubble,

			eleType: 'button',
			iconClassName: CN_ICON,
			clickCallBack: insertLink,
		},
	],

	addHhandler: () => {},
	removeHhandler: () => {},
	checkHighlight: (_event) => {},
	removeTempEle: (_event) => {
		DomUtils.removeElementById(POPUP_ID)
	},
}
export default about
