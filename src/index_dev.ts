/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { KEY_CTRL, PluginSourceCode } from './'
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

	const plgAbout = new PluginAbout()
	plgAbout.conf.deveploers.push(
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

	const plgBold = new PluginBold()

	const plgFontFamily = new PluginFontFamily()
	plgFontFamily.conf.fontFamilyOptions = [
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

	const plgFontSize = new PluginFontSize()
	plgFontSize.conf.fontSizeOptions = [
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

	const plgItalic = new PluginItalic()

	const plgLink = new PluginLink()
	plgLink.conf.clickLinkCb = (event) => {
		event.preventDefault()
		alert('clicked link, the event detail in console')
		console.info('plugin link clickLinkCb event: ', event)
	}

	const plgImage = new PluginImage()
	plgImage.conf.defaultSrc = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPgo8c3ZnIHdpZHRoPSI4MDBweCIgaGVpZ2h0PSI4MDBweCIgdmlld0JveD0iMCAwIDMyIDMyIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KPHBhdGggZD0iTTI1LjYgMEg2LjRDMi44NjUzOCAwIDAgMi44NjUzOCAwIDYuNFYyNS42QzAgMjkuMTM0NiAyLjg2NTM4IDMyIDYuNCAzMkgyNS42QzI5LjEzNDYgMzIgMzIgMjkuMTM0NiAzMiAyNS42VjYuNEMzMiAyLjg2NTM4IDI5LjEzNDYgMCAyNS42IDBaIiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXJfMTAzXzE3ODkpIi8+DQo8cGF0aCBkPSJNNS45NTc3IDI0Ljg4NDVDNS40MjU3OCAyNS45NDgzIDYuMTk5MzcgMjcuMiA3LjM4ODc4IDI3LjJIMTguMjExMUMxOS40MDA1IDI3LjIgMjAuMTc0MSAyNS45NDgzIDE5LjY0MjIgMjQuODg0NUwxNC4yMzEgMTQuMDYyMkMxMy42NDE0IDEyLjg4MjkgMTEuOTU4NSAxMi44ODI5IDExLjM2ODggMTQuMDYyMkw1Ljk1NzcgMjQuODg0NVoiIGZpbGw9IndoaXRlIi8+DQo8cGF0aCBkPSJNMTUuNTU3NyAyNC44ODQ1QzE1LjAyNTggMjUuOTQ4MyAxNS43OTk0IDI3LjIgMTYuOTg4OCAyNy4ySDI0LjYxMTFDMjUuODAwNSAyNy4yIDI2LjU3NDEgMjUuOTQ4MyAyNi4wNDIyIDI0Ljg4NDVMMjIuMjMxIDE3LjI2MjJDMjEuNjQxNCAxNi4wODI5IDE5Ljk1ODUgMTYuMDgyOSAxOS4zNjg4IDE3LjI2MjJMMTUuNTU3NyAyNC44ODQ1WiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC42Ii8+DQo8cGF0aCBkPSJNMjQuMDAwMiAxMS4yQzI1Ljc2NzUgMTEuMiAyNy4yMDAyIDkuNzY3MjYgMjcuMjAwMiA3Ljk5OTk1QzI3LjIwMDIgNi4yMzI2NCAyNS43Njc1IDQuNzk5OTUgMjQuMDAwMiA0Ljc5OTk1QzIyLjIzMjkgNC43OTk5NSAyMC44MDAyIDYuMjMyNjQgMjAuODAwMiA3Ljk5OTk1QzIwLjgwMDIgOS43NjcyNiAyMi4yMzI5IDExLjIgMjQuMDAwMiAxMS4yWiIgZmlsbD0id2hpdGUiLz4NCjxkZWZzPg0KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyXzEwM18xNzg5IiB4MT0iMTYiIHkxPSIwIiB4Mj0iMTYiIHkyPSIzMiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPg0KPHN0b3Agc3RvcC1jb2xvcj0iIzAwRTY3NiIvPg0KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDBDODUzIi8+DQo8L2xpbmVhckdyYWRpZW50Pg0KPC9kZWZzPg0KPC9zdmc+"
	plgImage.conf.defaultHeight = '150px'
	plgImage.conf.defaultWidth = '150px'

	const underline = new PluginUnderline()

	exsied.init({
		plugins: [
			plgAbout,
			plgBold,
			new PluginFindAndReplace(),
			new PluginColors(),
			plgFontFamily,
			plgFontSize,
			new PluginHeadings(),
			new PluginHorizonalRule(),
			plgImage,
			new PluginIndentAndOutdent(),
			new PluginInsertMenu(),
			plgItalic,
			plgLink,
			new PluginLists(),
			new PluginQuote(),
			new PluginStrikethrough(),
			new PluginSourceCode(),
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
			{ keyStr: 'b', func: plgBold.commands.formatBold, modifierKeys: [KEY_CTRL] },
			{ keyStr: 'i', func: plgItalic.commands.formatItalic, modifierKeys: [KEY_CTRL] },
			{ keyStr: 'u', func: underline.commands.formatUnderline, modifierKeys: [KEY_CTRL] },
		],
		hooks: {
			onInput: (_exsied, event) => {
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
