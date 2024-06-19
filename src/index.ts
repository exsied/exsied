/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { DomUtils } from './core/dom_utils'
import { HotkeyUtils } from './core/hotkey_utils'
import { SelectionUtils } from './core/selection_utils'
import { about } from './plugins/about'
import { bold } from './plugins/bold'
import { colors } from './plugins/colors'
import { findAndReplace } from './plugins/find_and_replace'
import { FindAndReplace } from './plugins/find_and_replace/find'
import { fontFamily } from './plugins/font_family'
import { fontSize } from './plugins/font_size'
import { headings } from './plugins/headings'
import { horizonalRule } from './plugins/horizontal_rule'
import { image } from './plugins/image'
import { indentAndOutdent } from './plugins/indent_and_outdent'
import { insertMenu } from './plugins/insert_menu'
import { italic } from './plugins/italic'
import { link } from './plugins/link'
import { lists } from './plugins/lists'
import { quote } from './plugins/quote'
import { sourceCode } from './plugins/source_code'
import { strikethrough } from './plugins/strikethrough'
import { subscriptAndSupscript } from './plugins/subscript_and_supcript'
import { table } from './plugins/table'
import { textAlign } from './plugins/text_align'
import { underline } from './plugins/underline'
import { redoAndUndo } from './plugins/undo_and_redo'
import './styles/style.scss'
import { ColorPicker } from './ui/color_picker'
import { DropdownMenu } from './ui/dropdown'

export { ZERO_WIDTH_SPACE } from './contants'
export { exsied } from './core'
export { KEY_ALT, KEY_CTRL, KEY_META, KEY_SHIFT } from './core/hotkey_utils'

export const plugins = {
	about,
	bold,
	colors,
	findAndReplace,
	fontFamily,
	fontSize,
	headings,
	horizonalRule,
	image,
	indentAndOutdent,
	insertMenu,
	italic,
	link,
	lists,
	quote,
	redoAndUndo,
	sourceCode,
	strikethrough,
	subscriptAndSupscript,
	table,
	textAlign,
	underline,
}

export const utils = {
	ColorPicker,
	DomUtils,
	DropdownMenu,
	FindAndReplace,
	HotkeyUtils,
	SelectionUtils,
}
