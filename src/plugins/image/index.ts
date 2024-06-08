import { CN_ACTIVE, TN_IMG } from '../../contants'
import { exsied } from '../../core'
import { DomUtils } from '../../core/dom_utils'
import { addEleClickCallbackByClass, addEleClickCallbackByTag } from '../../core/events'
import { Commands, ExsiedPlugin } from '../../core/plugin'
import { Toolbar } from '../../ui/toolbar'
import { CN_BTN_SETTING, CN_ICON, PLUGIN_CONF, PLUGIN_NAME, RESIZER_ID } from './base'
import { insertImage, onClickImage, onClickImageSettingButton } from './event_handlers'
import './styles.scss'

const toolbarBtnIds = Toolbar.genButtonIds(PLUGIN_NAME, PLUGIN_NAME)
const commands: Commands = {}
commands[PLUGIN_NAME] = insertImage

const plugin: ExsiedPlugin = {
	name: PLUGIN_NAME,
	conf: PLUGIN_CONF,
	commands,

	toolBarControl: [
		{
			name: PLUGIN_NAME,
			tooltipText: 'Image',
			addToBubble: PLUGIN_CONF.addToBubble,

			eleType: 'button',
			iconClassName: CN_ICON,
			clickCallBack: commands[PLUGIN_NAME],
		},
	],

	addHhandler: () => {
		addEleClickCallbackByTag(TN_IMG, onClickImage)

		addEleClickCallbackByClass(CN_BTN_SETTING, onClickImageSettingButton)
	},
	removeHhandler: () => {},
	checkHighlight: (_event) => {
		const btnEle = exsied.elements.editor?.querySelector(`#${toolbarBtnIds.normal}`)

		if (btnEle) {
			const allTagNamesArr = exsied.cursorAllParentsTagNamesArr
			allTagNamesArr.includes(TN_IMG) ? btnEle.classList.add(CN_ACTIVE) : btnEle.classList.remove(CN_ACTIVE)
		}
	},
	removeTempEle: (_event) => {
		const allTagNamesArr = exsied.cursorAllParentsTagNamesArr
		if (!allTagNamesArr.includes(TN_IMG)) {
			DomUtils.removeElementById(RESIZER_ID)
		}
	},
}

export default plugin
