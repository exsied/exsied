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
import './styles/style.scss'

// class A {
// 	public property: number = 10
// 	public num: number = 10

// 	public method(): void {
// 		console.log('这是 A 的方法')
// 	}
// }
// interface IPlugin<T> {
// 	init(host: T): void
// }

// class B implements IPlugin<A> {
// 	private _host: A | undefined
// 	public init(host: A): void {
// 		this._host = host

// 		console.log(`插件 B 已连接到 ${this._host.property}`)
// 	}

// 	public enhanceMethod(): void {
// 		console.log('在插件 B 中增强 A 的方法')

// 		this._host?.method()
// 		console.log(this._host?.num);

// 	}
// }

// const a = new A()
// const b = new B()

// b.init(a) // 将 A 的实例传递给 B 的 init 方法
// b.enhanceMethod() // 调用 B 的方法，该方法会访问 A 的方法

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

// // plugin fontSize
// const fontSizeConf = plugins.fontSize.conf as FontSizePluginConf
// fontSizeConf.fontSizeOptions.push(
// 	{
// 		name: '18px',
// 		value: '18px',
// 		tooltipText: '',
// 		iconClassName: '',
// 	},
// 	{
// 		name: '28px',
// 		value: '28px',
// 		tooltipText: '',
// 		iconClassName: '',
// 	},
// )

// // plugin fontFamily
// const fontFamilyConf = plugins.fontFamily.conf as FontFamilyPluginConf
// fontFamilyConf.fontFamilyOptions.push(
// 	{
// 		name: 'fontFamily_1',
// 		value: 'fontFamily_1',
// 		tooltipText: '',
// 		iconClassName: '',
// 	},
// 	{
// 		name: 'fontFamily_2',
// 		value: 'fontFamily_2',
// 		tooltipText: '',
// 		iconClassName: '',
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

	exsied.init({
		plugins: [
			// 			plugins.redoAndUndo,
			// 			plugins.insertMenu,
			// 			plugins.bold,
			// 			plugins.italic,
			// 			plugins.underline,
			// 			plugins.strikethrough,
			// 			plugins.headings,
			// 			plugins.link,
			// 			plugins.image,
			// 			plugins.table,
			// 			plugins.horizonalRule,
			// 			plugins.quote,
			// 			plugins.lists,
			// 			plugins.fontSize,
			// 			plugins.fontFamily,
			// 			plugins.textAlign,
			// 			plugins.indentAndOutdent,
			// 			plugins.subscriptAndSupscript,
			// 			plugins.colors,
			// 			plugins.findAndReplace,
			// 			plugins.sourceCode,
			bold,
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
