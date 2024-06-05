import { ExsiedPlugin } from '../../types'
import { genDropdownId } from '../../ui/dropdown'
import { Toolbar } from '../../ui/toolbar'
import { PLUGIN_CONF, PLUGIN_NAME } from './base'
import { formatFontFamily } from './event_handlers'
import './styles.scss'

const toolbarBtnIds = Toolbar.genButtonIds(PLUGIN_NAME, PLUGIN_NAME)
const dropDownId = genDropdownId(toolbarBtnIds.normal)

const plugin: ExsiedPlugin = {
	name: PLUGIN_NAME,
	conf: PLUGIN_CONF,

	toolBarControl: [
		{
			name: PLUGIN_NAME,
			tooltipText: 'Font family',
			addToBubble: PLUGIN_CONF.addToBubble,

			eleType: 'select',
			changeCallBack: formatFontFamily,
			defaultText: 'Font family',
			options: PLUGIN_CONF.fontFamilyOptions,
		},
	],

	addHhandler: () => {},
	removeHhandler: () => {},
	checkHighlight: (_event) => {
		// TODO:
	},
	removeTempEle: (_event) => {
		Toolbar.hideDropdowntList(dropDownId)
	},
}

export default plugin
