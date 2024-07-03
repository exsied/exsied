/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
// import { KEY_CTRL, plugins } from './'
import { Exsied } from './core'
import { DEMO_CONTENT } from './demo_content'
// import { PluginConf as AboutPluginConf } from './plugins/about/base'
// import { PluginConf as FontFamilyPluginConf } from './plugins/font_family/base'
// import { PluginConf as FontSizePluginConf } from './plugins/font_size/base'
// import { PluginConf as LinkConf } from './plugins/link/base'
import { Bold } from './plugins/bold'
import { Colors } from './plugins/colors'
import { FindAndReplace } from './plugins/find_and_replace'
import { FontFamily } from './plugins/font_family'
import { FontSize } from './plugins/font_size'
import { Headings } from './plugins/headings'
import { HorizonalRule } from './plugins/horizontal_rule'
import { Image } from './plugins/image'
import { IndentAndOutdent } from './plugins/indent_and_outdent'
import { InsertMenu } from './plugins/insert_menu'
import { Italic } from './plugins/italic'
import { Link } from './plugins/link'
import { Lists } from './plugins/lists'
import { Quote } from './plugins/quote'
import { Strikethrough } from './plugins/strikethrough'
import { SubscriptAndSupscript } from './plugins/subscript_and_supcript'
import { Table } from './plugins/table'
import { TextAlign } from './plugins/text_align'
import { Underline } from './plugins/underline'
import './styles/style.scss'

// // plugin about
// const aboutConf = plugins.about.conf as AboutPluginConf
// aboutConf.deveploers.push(
// 	{
// 		name: 'fivim',
// 		repoLink: 'https://github.com/fivim/fivim',
// 		webSiteLink: 'https://xxx.com/xxx',
// 		email: 'xxx@xxx.xxx',
// 		extContent: `Fivim's github repo`,
// 	},
// 	{
// 		name: 'exsied',
// 		repoLink: 'https://gitee.com/exsied/exsied',
// 		webSiteLink: 'https://xxx.com/xxx',
// 		email: 'xxx@xxx.xxx',
// 		extContent: `Exsied's gitee repo`,
// 	},
// )

// // plugin link
// const linkConf = plugins.link.conf as LinkConf
// linkConf.clickLinkCb = (event) => {
// 	event.preventDefault()
// 	alert('clicked link, the event detail in console')
// 	console.info('plugin link clickLinkCb event: ', event)
// }

const initExsied = (containerId: string, content: string, locale?: string) => {
	const exsied = new Exsied(containerId)

	const bold = new Bold()
	bold.init(exsied)

	const findAndReplace = new FindAndReplace()
	findAndReplace.init(exsied)

	const colors = new Colors()
	colors.init(exsied)

	const fontFamily = new FontFamily()
	fontFamily.init(exsied)
	fontFamily.conf.fontFamilyOptions = [
		{
			name: 'fontFamily_1',
			value: 'fontFamily_1',
			tooltipText: '',
			iconClassName: '',
		},
		{
			name: 'fontFamily_2',
			value: 'fontFamily_2',
			tooltipText: '',
			iconClassName: '',
		},
	]

	const fontSize = new FontSize()
	fontSize.init(exsied)
	fontSize.conf.fontSizeOptions = [
		{
			name: '18px',
			value: '18px',
			tooltipText: '18px',
			iconClassName: '',
		},
		{
			name: '28px',
			value: '28px',
			tooltipText: '28px',
			iconClassName: '',
		},
	]

	const headings = new Headings()
	headings.init(exsied)

	const horizonalRule = new HorizonalRule()
	horizonalRule.init(exsied)

	const image = new Image()
	image.init(exsied)

	const indentAndOutdent = new IndentAndOutdent()
	indentAndOutdent.init(exsied)

	const insertMenu = new InsertMenu()
	insertMenu.init(exsied)

	const italic = new Italic()
	italic.init(exsied)

	const link = new Link()
	link.init(exsied)

	const lists = new Lists()
	lists.init(exsied)

	const quote = new Quote()
	quote.init(exsied)

	const strikethrough = new Strikethrough()
	quote.init(exsied)

	const subscriptAndSupscript = new SubscriptAndSupscript()
	subscriptAndSupscript.init(exsied)

	const table = new Table()
	table.init(exsied)

	const textAlign = new TextAlign()
	textAlign.init(exsied)

	const underline = new Underline()
	underline.init(exsied)

	exsied.init({
		plugins: [
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
			strikethrough,
			subscriptAndSupscript,
			table,
			textAlign,
			underline,
		],
		enableToolbarBubble: true,
		locale: locale || 'en',
		// hotkeys: [
		// 	{ keyStr: 'b', func: plugins.bold.commands[plugins.bold.name], modifierKeys: [KEY_CTRL] },
		// 	{ keyStr: 'i', func: plugins.italic.commands[plugins.italic.name], modifierKeys: [KEY_CTRL] },
		// 	{ keyStr: 'u', func: plugins.underline.commands[plugins.underline.name], modifierKeys: [KEY_CTRL] },
		// ],
		hooks: {
			// onInput: (event) => {
			// 	const ele = event.target as HTMLElement
			// 	console.log('>>> hooks.onInput :', ele.innerHTML)
			// },
		},
	})

	exsied.setHtml(content)
}

const eleIdShort = 'appShort'
const eleIdLong = 'appLong'

initExsied(eleIdShort, 'short demo')
initExsied(eleIdLong, DEMO_CONTENT)

// custom locale
//
// Set a new  dict
// exsied.i18n.setDict('zh-CN', {
// 	Title: '标题',
// 	Alternative: '别名',
// 	Styles: '样式',
// 	Width: '宽度',
// 	Height: '高度',
// })
// exsied.i18n.setLocale('zh-CN')
//

// darkModeBtn
const darkModeBtn = document.createElement('button')
darkModeBtn.innerHTML = 'Toggle dark mode'
darkModeBtn.addEventListener('click', () => {
	const bodyEle = document.querySelector('body')
	if (!bodyEle) return

	if (bodyEle.classList.contains('dark')) {
		bodyEle.classList.remove('dark')
	} else {
		bodyEle.classList.add('dark')
	}
})

// change locale
const locales = [
	{ text: 'German(Deutsch)', symbol: 'de' },
	{ text: 'Spanish(Español)', symbol: 'es' },
	{ text: 'French(Français)', symbol: 'fr' },
	{ text: 'English', symbol: 'en' },
	{ text: 'Russian(Русский язык)', symbol: 'ru' },
	{ text: 'Simplified Chinese(简体中文)', symbol: 'zh-Hans' },
	{ text: 'Traditional Chinese(繁體中文)', symbol: 'zh-Hant' },
]
const localeLabel = document.createElement('span')
localeLabel.innerHTML = 'Change locale:'
//
const localeSelect = document.createElement('select')
localeSelect.id = 'mySelect'
for (const item of locales) {
	const optionElement = document.createElement('option')
	optionElement.value = item.symbol
	optionElement.text = item.text
	localeSelect.appendChild(optionElement)
}
localeSelect.addEventListener('change', (event) => {
	const selectedValue = (event.target as HTMLSelectElement).value
	initExsied(eleIdLong, DEMO_CONTENT, selectedValue)
})

const btnsEle = document.getElementById('optBtns')
if (btnsEle) {
	btnsEle.append(darkModeBtn)
	btnsEle.append(localeLabel)
	btnsEle.append(localeSelect)
}
