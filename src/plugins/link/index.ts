import { CN_ACTIVE, TN_A } from '../../contants'
import { exsied } from '../../core'
import { DomUtils } from '../../core/dom_utils'
import { addEleClickCallbackByTag } from '../../core/events'
import { ExsiedCommands, ExsiedPlugin } from '../../types'
import { Toolbar } from '../../ui/toolbar'
import { CN_ICON, PLUGIN_CONF, PLUGIN_NAME, POPUP_ID } from './base'
import { insertLink, onClickLink } from './event_handlers'
import './styles.scss'

const toolbarBtnIds = Toolbar.genButtonIds(PLUGIN_NAME, PLUGIN_NAME)
const commands: ExsiedCommands = {}
commands[PLUGIN_NAME] =insertLink 

const plugin: ExsiedPlugin = {
	name: PLUGIN_NAME,
	conf: PLUGIN_CONF,
	commands,

	toolBarControl: [
		{
			name: PLUGIN_NAME,
			tooltipText: 'Link',
			addToBubble: PLUGIN_CONF.addToBubble,

			eleType: 'button',
			iconClassName: CN_ICON,
			clickCallBack: commands[PLUGIN_NAME],
		},
	],

	addHhandler: () => {
		addEleClickCallbackByTag(TN_A, onClickLink)
	},
	removeHhandler: () => {},
	checkHighlight: (_event) => {
		const btnEle = exsied.elements.editor?.querySelector(`#${toolbarBtnIds.normal}`)

		if (btnEle) {
			const allTagNamesArr = exsied.cursorAllParentsTagNamesArr
			allTagNamesArr.includes(TN_A) ? btnEle.classList.add(CN_ACTIVE) : btnEle.classList.remove(CN_ACTIVE)
		}
	},
	removeTempEle: (_event) => {
		const allTagNamesArr = exsied.cursorAllParentsTagNamesArr
		if (!allTagNamesArr.includes(TN_A)) {
			DomUtils.removeElementById(POPUP_ID)
		}
	},
}

export default plugin
