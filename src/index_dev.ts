/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { KEY_CTRL, exsied, plugins } from './'
import { DEMO_CONTENT } from './demo_content'
import { PluginConf as AboutPluginConf } from './plugins/about/base'
import { PluginConf as FontFamilyPluginConf } from './plugins/font_family/base'
import { PluginConf as FontSizePluginConf } from './plugins/font_size/base'
import { PluginConf as LinkConf } from './plugins/link/base'
import './styles/style.scss'

// plugin about
const aboutConf = plugins.about.conf as AboutPluginConf
aboutConf.deveploers.push(
	{
		name: 'enassi',
		repoLink: 'https://github.com/enassi/enassi',
		webSiteLink: 'https://xxx.com/xxx',
		email: 'xxx@xxx.xxx',
		extContent: `Enassi's github repo`,
	},
	{
		name: 'exsied',
		repoLink: 'https://gitee.com/exsied/exsied',
		webSiteLink: 'https://xxx.com/xxx',
		email: 'xxx@xxx.xxx',
		extContent: `Exsied's gitee repo`,
	},
)

// plugin fontSize
const fontSizeConf = plugins.fontSize.conf as FontSizePluginConf
fontSizeConf.fontSizeOptions.push(
	{
		name: '18px',
		value: '18px',
		tooltipText: '',
		iconClassName: '',
	},
	{
		name: '28px',
		value: '28px',
		tooltipText: '',
		iconClassName: '',
	},
)

// plugin fontFamily
const fontFamilyConf = plugins.fontFamily.conf as FontFamilyPluginConf
fontFamilyConf.fontFamilyOptions.push(
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
)

// plugin link
const linkConf = plugins.link.conf as LinkConf
linkConf.clickLinkCb = (event) => {
	event.preventDefault()
	alert('clicked link, the event detail in console')
	console.info('plugin link clickLinkCb event: ', event)
}

// config i18n
//
// Set a new  dict
// exsied.i18n.setDict('zh-Hans', {
// 	Title: '标题',
// 	Alternative: '别名',
// 	Styles: '样式',
// 	Width: '宽度',
// 	Height: '高度',
// })
// exsied.i18n.setLocale('zh-Hans')
//
// Use English
exsied.i18n.setBuiltInLocales()
exsied.i18n.setLocale('en')

const initExsied = () => {
	exsied.init({
		id: 'app',
		plugins: [
			plugins.redoAndUndo,
			plugins.insertMenu,
			plugins.bold,
			plugins.italic,
			plugins.underline,
			plugins.strikethrough,
			plugins.headings,
			plugins.link,
			plugins.image,
			plugins.table,
			plugins.horizonalRule,
			plugins.quote,
			plugins.lists,
			plugins.fontSize,
			plugins.fontFamily,
			plugins.textAlign,
			plugins.indentAndOutdent,
			plugins.subscriptAndSupscript,
			plugins.colors,
			plugins.findAndReplace,
			plugins.sourceCode,
		],
		enableToolbarBubble: true,
		hotkeys: [
			{ keyStr: 'b', func: plugins.bold.commands[plugins.bold.name], modifierKeys: [KEY_CTRL] },
			{ keyStr: 'i', func: plugins.italic.commands[plugins.italic.name], modifierKeys: [KEY_CTRL] },
			{ keyStr: 'u', func: plugins.underline.commands[plugins.underline.name], modifierKeys: [KEY_CTRL] },
		],
		hooks: {
			// onInput: (event) => {
			// 	const ele = event.target as HTMLElement
			// 	console.log('>>> hooks.onInput :', ele.innerHTML)
			// },
		},
	})

	exsied.setHtml(DEMO_CONTENT)
}
initExsied()

// getContentBtn
const getContentBtn = document.createElement('button')
getContentBtn.innerHTML = 'Log content html'
getContentBtn.addEventListener('click', () => {
	const html = exsied.getHtml()
	console.log(' >>> Exsied content html :::', html)
})

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
	console.log(`Selected value: ${selectedValue}`)

	exsied.i18n.setLocale(selectedValue)
	initExsied()
})

const btnsEle = document.getElementById('optBtns')
if (btnsEle) {
	btnsEle.append(getContentBtn)
	btnsEle.append(darkModeBtn)
	btnsEle.append(localeLabel)
	btnsEle.append(localeSelect)
}
