/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License,
 * and if you do not meet the conditions, authorization is required
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

exsied.init({
	id: 'app',
	plugins: [
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
		plugins.insertMenu,
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
		onInput: (event) => {
			const ele = event.target as HTMLElement
			console.log('>>> hooks.onInput :', ele.innerHTML)
		},
	},
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

//
const testBtn = document.createElement('button')
testBtn.innerHTML = 'Get content html'
testBtn.addEventListener('click', () => {
	const html = exsied.getHtml()
	console.log(' >>> Exsied content html :::', html)
})

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

const btnsEle = document.getElementById('optBtns')
if (btnsEle) {
	btnsEle.append(darkModeBtn)
	btnsEle.append(testBtn)
}
