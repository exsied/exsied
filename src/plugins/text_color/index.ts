import { exsied } from '../../core'
import { DomUtils } from '../../core/dom_utils'
import { SelectionUtils } from '../../core/selection_utils'
import { ExsiedPlugin } from '../../types'
import { Toolbar } from '../../ui/toolbar'
import { CN_ICON, PLUGIN_CONF, PLUGIN_NAME, POPUP_ID } from './base'
import { showBackgroundColorPicker } from './event_handlers'
import './styles.scss'

const toolbarBtnIds = Toolbar.genButtonIds(PLUGIN_NAME, PLUGIN_NAME)

const plugin: ExsiedPlugin = {
	name: PLUGIN_NAME,
	conf: PLUGIN_CONF,

	toolBarControl: [
		{
			name: PLUGIN_NAME,
			tooltipText: 'Text color',
			eleType: 'button',
			iconClassName: CN_ICON,
			clickCallBack: showBackgroundColorPicker,
			addToBubble: PLUGIN_CONF.addToBubble,
		},
	],

	addHhandler: () => {
		const btnEle = document.getElementById(toolbarBtnIds.normal)
		if (btnEle) {
			btnEle.addEventListener('mouseover', () => {
				SelectionUtils.backupSelection()
			})
		}
	},
	removeHhandler: () => {},
	checkHighlight: (event) => {
		const btnEle = exsied.elements.editor?.querySelector(`#${toolbarBtnIds.normal}`) as HTMLElement
		if (btnEle) {
			const targetEle = event.target as HTMLElement
			const backgroundColor = DomUtils.getParentsStyleByKey(targetEle, 'color')

			DomUtils.setStyleProperty(btnEle, {
				backgroundColor,
			} as unknown as CSSStyleDeclaration)
		}
	},
	removeTempEle: (_event) => {
		DomUtils.removeElementById(POPUP_ID)
	},
}

export default plugin
