import about from './plugins/about'
import backgroundColor from './plugins/background_color'
import bold from './plugins/bold'
import findAndReplace from './plugins/find_and_replace'
import fontFamily from './plugins/font_family'
import fontSize from './plugins/font_size'
import headings from './plugins/headings'
import image from './plugins/image'
import italic from './plugins/italic'
import link from './plugins/link'
import sourceCode from './plugins/source_code'
import strikethrough from './plugins/strikethrough'
import table from './plugins/table'
import textColor from './plugins/text_color'
import underline from './plugins/underline'
import './styles/style.scss'

export { exsied } from './core'
export const exsiedPlugins = {
	about,
	backgroundColor,
	bold,
	findAndReplace,
	fontFamily,
	fontSize,
	headings,
	image,
	italic,
	link,
	sourceCode,
	strikethrough,
	table,
	textColor,
	underline,
}
