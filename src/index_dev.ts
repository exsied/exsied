/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { KEY_CTRL } from './'
import { Exsied } from './core'
import { DEMO_CONTENT } from './demo_content'
import { PluginAbout } from './plugins/about'
import { PluginBold } from './plugins/bold'
import { PluginColors } from './plugins/colors'
import { PluginFindAndReplace } from './plugins/find_and_replace'
import { PluginFontFamily } from './plugins/font_family'
import { PluginFontSize } from './plugins/font_size'
import { PluginHeadings } from './plugins/headings'
import { PluginHorizonalRule } from './plugins/horizontal_rule'
import { PluginImage } from './plugins/image'
import { PluginIndentAndOutdent } from './plugins/indent_and_outdent'
import { PluginInsertMenu } from './plugins/insert_menu'
import { PluginItalic } from './plugins/italic'
import { PluginLink } from './plugins/link'
import { PluginLists } from './plugins/lists'
import { PluginNewBlock } from './plugins/new_block'
import { PluginQuote } from './plugins/quote'
import { PluginStrikethrough } from './plugins/strikethrough'
import { PluginSubscriptAndSupscript } from './plugins/subscript_and_supcript'
import { PluginTable } from './plugins/table'
import { PluginTextAlign } from './plugins/text_align'
import { PluginUnderline } from './plugins/underline'
import { PluginRedoAndUndo } from './plugins/undo_and_redo'
import './styles/style.scss'

const initExsied = (containerId: string, content: string, locale?: string) => {
	const exsied = new Exsied(containerId)

	const about = new PluginAbout()
	about.conf.deveploers.push(
		{
			name: 'fivim',
			repoLink: 'https://github.com/fivim/fivim',
			webSiteLink: 'https://xxx.com/xxx',
			email: 'xxx@xxx.xxx',
			extContent: `Fivim's github repo`,
		},
		{
			name: 'exsied',
			repoLink: 'https://gitee.com/exsied/exsied',
			webSiteLink: 'https://xxx.com/xxx',
			email: 'xxx@xxx.xxx',
			extContent: `Exsied's gitee repo`,
		},
	)

	const bold = new PluginBold()

	const fontFamily = new PluginFontFamily()
	fontFamily.conf.fontFamilyOptions = [
		{
			name: 'font family 1',
			value: 'font family 1',
			tooltipText: '',
			iconClassName: '',
		},
		{
			name: 'font family 2',
			value: 'font family 2',
			tooltipText: '',
			iconClassName: '',
		},
	]

	const fontSize = new PluginFontSize()
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

	const italic = new PluginItalic()

	const link = new PluginLink()
	link.conf.clickLinkCb = (event) => {
		event.preventDefault()
		alert('clicked link, the event detail in console')
		console.info('plugin link clickLinkCb event: ', event)
	}

	const underline = new PluginUnderline()

	exsied.init({
		plugins: [
			about,
			bold,
			new PluginFindAndReplace(),
			new PluginColors(),
			fontFamily,
			fontSize,
			new PluginHeadings(),
			new PluginHorizonalRule(),
			new PluginImage(),
			new PluginIndentAndOutdent(),
			new PluginInsertMenu(),
			italic,
			link,
			new PluginLists(),
			new PluginQuote(),
			new PluginStrikethrough(),
			new PluginSubscriptAndSupscript(),
			new PluginTable(),
			new PluginTextAlign(),
			underline,
			new PluginRedoAndUndo(),
			new PluginNewBlock(),
		],
		enableToolbarBubble: true,
		locale: locale || 'en',
		hotkeys: [
			{ keyStr: 'b', func: bold.commands.formatBold, modifierKeys: [KEY_CTRL] },
			{ keyStr: 'i', func: italic.commands.formatItalic, modifierKeys: [KEY_CTRL] },
			{ keyStr: 'u', func: underline.commands.formatUnderline, modifierKeys: [KEY_CTRL] },
		],
		hooks: {
			onInput: (exsied, event) => {
				const ele = event.target as HTMLElement
				console.log('>>> hooks.onInput :', ele.innerHTML)
			},
		},
	})

	exsied.setHtml(content)
}

const eleIdShort = 'appShort'
const eleIdLong = 'appLong'

const initShort = (locale?: string) => initExsied(eleIdShort, 'short demo', locale)
const initLong = (locale?: string) => initExsied(eleIdLong, DEMO_CONTENT, locale)

initShort()
initLong()
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

	initShort(selectedValue)
	initLong(selectedValue)
})

const btnsEle = document.getElementById('optBtns')
if (btnsEle) {
	btnsEle.append(localeLabel)
	btnsEle.append(localeSelect)
	btnsEle.append(darkModeBtn)
}
