import { KEY_CTRL, exsied, plugins } from './'
import { DEMO_CONTENT } from './demo_content'
import { PLUGIN_CONF as about_PLUGIN_CONF } from './plugins/about/base'
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
		plugins.bold,
		plugins.italic,
		plugins.underline,
		plugins.strikethrough,
		plugins.headings,
		plugins.link,
		plugins.image,
		plugins.table,
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
