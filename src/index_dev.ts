import { DEMO_CONTENT } from './demo_content'
import { KEY_CTRL } from './contants'
import { exsied } from './core'
import { PLUGIN_CONF as about_PLUGIN_CONF } from './plugins/about/base'
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

about_PLUGIN_CONF.deveploers.push(
	{
		name: 'enassi github',
		repoLink: 'https://github.com/enassi/enassi',
		webSiteLink: 'https://xxx.com/xxx',
		email: 'xxx@xxx.xxx',
		extContent: `Enassi's github repo`,
	},
	{
		name: 'enassi gitee',
		repoLink: 'https://gitee.com/enassi/enassi',
		webSiteLink: 'https://xxx.com/xxx',
		email: 'xxx@xxx.xxx',
		extContent: `Enassi's gitee repo`,
	},
)

exsied.init({
	id: 'app',
	plugins: [
		bold,
		italic,
		underline,
		strikethrough,
		headings,
		link,
		image,
		table,
		fontSize,
		fontFamily,
		backgroundColor,
		textColor,
		findAndReplace,
		sourceCode,
	],
	enableToolbarBubble: true,
	hotkeys: [
		{ keyStr: 'b', func: bold.commands[bold.name], modifierKeys: [KEY_CTRL] },
		{ keyStr: 'i', func: italic.commands[italic.name], modifierKeys: [KEY_CTRL] },
		{ keyStr: 'u', func: underline.commands[underline.name], modifierKeys: [KEY_CTRL] },
	],
})

exsied.setHtml(DEMO_CONTENT)

exsied.i18n.setDict('zh-CN', {
	Title: '标题',
	Alternative: '别名',
	Styles: '样式',
	Width: '宽度',
	Height: '高度',
})

exsied.i18n.setLocale('zh-CN')
