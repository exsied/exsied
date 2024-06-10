/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License,
 * and if you do not meet the conditions, authorization is required
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { CN_ACTIVE, TN_BLOCKQUOTE, TN_Q } from '../../contants'
import { exsied } from '../../core'
import { Commands, ExsiedPlugin } from '../../core/plugin'
import { Toolbar } from '../../ui/toolbar'
import { CN_ICON_INDENT, CN_ICON_OUTDENT, PLUGIN_CONF, PLUGIN_NAME } from './base'
import { formatIndent as formatIndent, formatOutdent } from './event_handlers'
import './styles.scss'

const INDENT_NAME = 'indent'
const OUTDENT_NAME = 'outdent'
const toolbarBtnIds = Toolbar.genButtonIds(PLUGIN_NAME, PLUGIN_NAME)
const commands: Commands = {}
commands[INDENT_NAME] = formatIndent
commands[OUTDENT_NAME] = formatOutdent

export const indentAndOutdent: ExsiedPlugin = {
	name: PLUGIN_NAME,
	conf: PLUGIN_CONF,
	commands,

	toolBarControl: [
		{
			name: INDENT_NAME,
			tooltipText: 'Indent',
			addToBubble: PLUGIN_CONF.addToBubble,

			eleType: 'button',
			iconClassName: CN_ICON_INDENT,
			clickCallBack: commands[INDENT_NAME],
		},
		{
			name: OUTDENT_NAME,
			tooltipText: 'Outdent',
			addToBubble: PLUGIN_CONF.addToBubble,

			eleType: 'button',
			iconClassName: CN_ICON_OUTDENT,
			clickCallBack: commands[OUTDENT_NAME],
		},
	],

	addHhandler: () => {},
	removeHhandler: () => {},
	checkHighlight: (_event) => {
		const btnEle = exsied.elements.editor?.querySelector(`#${toolbarBtnIds.normal}`)

		if (btnEle) {
			const allTagNamesArr = exsied.cursorAllParentsTagNamesArr
			allTagNamesArr.includes(TN_Q) || allTagNamesArr.includes(TN_BLOCKQUOTE)
				? btnEle.classList.add(CN_ACTIVE)
				: btnEle.classList.remove(CN_ACTIVE)
		}
	},
	removeTempEle: (_event) => {},
}

export default indentAndOutdent
