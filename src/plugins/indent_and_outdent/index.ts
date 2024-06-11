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
import { formatIndent, formatOutdent } from './event_handlers'
import './styles.scss'

const NAME_INDENT = 'indent'
const NAME_OUTDENT = 'outdent'
const toolbarBtnIds = Toolbar.genButtonIds(PLUGIN_NAME, PLUGIN_NAME)
const commands: Commands = {}
commands[NAME_INDENT] = formatIndent
commands[NAME_OUTDENT] = formatOutdent

export const indentAndOutdent: ExsiedPlugin = {
	name: PLUGIN_NAME,
	conf: PLUGIN_CONF,
	commands,

	toolBarControl: [
		{
			name: NAME_INDENT,
			tooltipText: 'Indent',
			addToNormal:PLUGIN_CONF.addToNormal.indent,
			addToBubble: PLUGIN_CONF.addToBubble.indent,

			eleType: 'button',
			iconClassName: CN_ICON_INDENT,
			clickCallBack: commands[NAME_INDENT],
		},
		{
			name: NAME_OUTDENT,
			tooltipText: 'Outdent',
			addToNormal:PLUGIN_CONF.addToNormal.outent,
			addToBubble: PLUGIN_CONF.addToBubble.outent,

			eleType: 'button',
			iconClassName: CN_ICON_OUTDENT,
			clickCallBack: commands[NAME_OUTDENT],
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
