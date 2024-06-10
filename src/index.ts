import { about } from './plugins/about'
import { backgroundColor } from './plugins/background_color'
import { bold } from './plugins/bold'
import { findAndReplace } from './plugins/find_and_replace'
import { fontFamily } from './plugins/font_family'
import { fontSize } from './plugins/font_size'
import { headings } from './plugins/headings'
import { horizonalRule } from './plugins/horizontal_rule'
import { image } from './plugins/image'
import { italic } from './plugins/italic'
import { link } from './plugins/link'
import { list } from './plugins/list'
import { quote } from './plugins/quote'
import { sourceCode } from './plugins/source_code'
import { strikethrough } from './plugins/strikethrough'
import { subscriptAndSuperscript } from './plugins/subscript_and_superscript'
import { table } from './plugins/table'
import { textAlign } from './plugins/text_align'
import { textColor } from './plugins/text_color'
import { underline } from './plugins/underline'
import './styles/style.scss'

export { ZERO_WIDTH_SPACE } from './contants'
export { exsied } from './core'
export { KEY_ALT, KEY_CTRL, KEY_META, KEY_SHIFT } from './core/hotkey_utils'

export const plugins = {
	about,
	backgroundColor,
	bold,
	findAndReplace,
	fontFamily,
	fontSize,
	headings,
	horizonalRule,
	image,
	italic,
	link,
	list,
	quote,
	sourceCode,
	strikethrough,
	subscriptAndSuperscript,
	table,
	textAlign,
	textColor,
	underline,
}
