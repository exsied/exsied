/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */

import { Commands, ExsiedPlugin } from '../../core/plugin'
import { ELE_TYPE_BUTTON } from '../../ui/toolbar'
import { CN_ICON_REDO, CN_ICON_UNDO, PLUGIN_CONF, PLUGIN_NAME } from './base'
import { redo, undo, update } from './event_handlers'
import './styles.scss'

export const NAME_REDO = 'Redo'
export const NAME_UNDO = 'Undo'

const commands: Commands = {}
commands[NAME_REDO] = redo
commands[NAME_UNDO] = undo

export const redoAndUndo: ExsiedPlugin = {
	name: PLUGIN_NAME,
	conf: PLUGIN_CONF,
	commands,

	toolBarControl: [
		{
			name: NAME_UNDO,
			tooltipText: 'Undo',
			addToNormalToolbar: PLUGIN_CONF.addToNormalToolbar.undo,
			addToBubbleToolbar: PLUGIN_CONF.addToBubbleToolbar.undo,

			eleType: ELE_TYPE_BUTTON,
			iconClassName: CN_ICON_UNDO,
			clickCallBack: commands[NAME_UNDO],
		},
		{
			name: NAME_REDO,
			tooltipText: 'Redo',
			addToNormalToolbar: PLUGIN_CONF.addToNormalToolbar.redo,
			addToBubbleToolbar: PLUGIN_CONF.addToBubbleToolbar.redo,

			eleType: ELE_TYPE_BUTTON,
			iconClassName: CN_ICON_REDO,
			clickCallBack: commands[NAME_REDO],
		},
	],

	addHandler: () => {
		exsied.elements.workplace.addEventListener('input', update)
	},
	removeHandler: () => {},
	checkHighlight: (_event) => {},
	removeTempEle: (_event) => {},
}

export default redoAndUndo
