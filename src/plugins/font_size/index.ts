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
import { genDropdownId } from '../../ui/dropdown'
import { Toolbar } from '../../ui/toolbar'
import { PLUGIN_CONF, PLUGIN_NAME } from './base'
import { formatFontSize } from './event_handlers'
import './styles.scss'

const toolbarBtnIds = Toolbar.genButtonIds(PLUGIN_NAME, PLUGIN_NAME)
const dropDownId = genDropdownId(toolbarBtnIds.normal)
const commands: Commands = {}
commands[PLUGIN_NAME] = formatFontSize

export const fontSize: ExsiedPlugin = {
	name: PLUGIN_NAME,
	conf: PLUGIN_CONF,
	commands,

	toolBarControl: [
		{
			name: PLUGIN_NAME,
			tooltipText: 'Font size',
			addToBubble: PLUGIN_CONF.addToBubble,

			eleType: 'select',
			changeCallBack: commands[PLUGIN_NAME],
			defaultText: 'Font size',
			options: PLUGIN_CONF.fontSizeOptions,
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

export default fontSize
