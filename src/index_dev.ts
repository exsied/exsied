import { KEY_CTRL, exsied, plugins } from './'
import { DEMO_CONTENT } from './demo_content'
import { PluginConf as AboutPluginConf } from './plugins/about/base'
import { PluginConf as FontFamilyPluginConf } from './plugins/font_family/base'
import { PluginConf as FontSizePluginConf } from './plugins/font_size/base'
import './styles/style.scss'

const aboutConf = plugins.about.conf as AboutPluginConf
aboutConf.deveploers.push(
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
		plugins.subscriptAndSuperscript,
		plugins.link,
		plugins.image,
		plugins.table,
		plugins.horizonalRule,
		plugins.quote,
		plugins.fontSize,
		plugins.fontFamily,
		plugins.backgroundColor,
		plugins.textColor,
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

// Test get content HTML
const testBtn = document.createElement('button')
testBtn.innerHTML = 'Get content html'
testBtn.addEventListener('click', () => {
	const html = exsied.getHtml()
	console.log(' >>> Exsied content html :::', html)
})
const testEle = document.getElementById('test')
if (testEle) testEle.append(testBtn)
