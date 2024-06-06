import {
	CN_EDITOR_ELE,
	CN_TOOLBAR_ELE,
	CN_TOOLBAR_MAIN_ELE,
	CN_WORKPLACE_ELE,
	TN_DIV,
	ZERO_WIDTH_SPACE,
} from '../contants'
import pluginAbout from '../plugins/about'
import { Exsied, ExsiedInitConf, ExsiedPlugin } from '../types'
import { Toolbar } from '../ui/toolbar'
import { DomUtils } from './dom_utils'
import { bindAllEvents, unbindAllEvent } from './events'
import { HotkeyUtils } from './hotkey_utils'
import { I18N } from './i18n'

export const PLUGINS: ExsiedPlugin[] = []

const init = (conf: ExsiedInitConf) => {
	if (!conf.iAbideByExsiedLicenseAndDisableTheAboutPlugin) conf.plugins.push(pluginAbout)
	PLUGINS.push(...conf.plugins)

	if (conf.enableToolbarBubble) {
		exsied.enableToolbarBubble = conf.enableToolbarBubble
		Toolbar.initBubble()
	}

	const toolbarBtnsHtml = Toolbar.genBtns()
	const html = `
		<div class="${CN_EDITOR_ELE}">  
			<div class="${CN_TOOLBAR_ELE} ${CN_TOOLBAR_MAIN_ELE}">
				<div class="exsied-normal">
					${toolbarBtnsHtml}
				</div>
			</div>
			<div class="${CN_WORKPLACE_ELE}" contentEditable="true"></div>
		</div>
		`

	const editorEle = document.querySelector(`#${conf.id}`)
	if (!editorEle) throw new Error('The exsied.elements.editor does not exist.')
	exsied.elements.editor = editorEle as HTMLElement

	editorEle.innerHTML = html
	Toolbar.initDropdownElements()

	const toolbarMainEle = editorEle.querySelector(`.${CN_TOOLBAR_MAIN_ELE}`)
	if (!toolbarMainEle) throw new Error('The exsied.elements.toolbar does not exist.')
	exsied.elements.toolbarMain = toolbarMainEle as HTMLElement

	const workplaceEle = editorEle.querySelector(`.${CN_WORKPLACE_ELE}`)
	if (!workplaceEle) throw new Error('The exsied.elements.workplace does not exist.')
	exsied.elements.workplace = workplaceEle as HTMLElement

	if (conf.hotkeys) {
		for (const item of conf.hotkeys) {
			HotkeyUtils.set(item.keyStr, item.func, item.modifierKeys)
		}
	}

	bindAllEvents()
}

const destroy = () => {
	unbindAllEvent() // TODO: delete

	exsied.elements.editor.remove()
}

const cleanWorkplaceEle = () => {
	const workplaceEle = exsied.elements.workplace

	DomUtils.replaceTagName(workplaceEle, 'STRONG', 'b')
	DomUtils.replaceTagName(workplaceEle, 'EM', 'i')
	DomUtils.replaceTagName(workplaceEle, 'DEL', 's')

	DomUtils.removeNestedTags(workplaceEle, ['B'])
	DomUtils.removeNestedTags(workplaceEle, ['I'])
	DomUtils.removeNestedTags(workplaceEle, ['S'])
	DomUtils.removeNestedTags(workplaceEle, ['U'])

	DomUtils.mergeAdjacentTextNodes(workplaceEle)
	// DomUtils.mergeConsecutiveSameTags(workplace_ele, ['B', 'I', 'S', 'U', 'SUB', 'SUP'])
}

const getHtml = () => {
	cleanWorkplaceEle()

	return exsied.elements.workplace.innerHTML.replaceAll(ZERO_WIDTH_SPACE, '')
}

const setHtml = (content: string) => {
	const workplace_ele = exsied.elements.workplace
	workplace_ele.innerHTML = content

	cleanWorkplaceEle()
}

const newEmptyEle = (dataValue: string) => {
	const divEle = document.createElement(TN_DIV)
	divEle.setAttribute(`data-exsied-empty-ele`, dataValue)
	return divEle
}

export const exsied: Exsied = {
	containerId: '',
	enableToolbarBubble: true,
	elements: {
		editor: newEmptyEle('editorEle'),
		toolbarMain: newEmptyEle('toolbarEle'),
		toolbarBubble: newEmptyEle('toolbarBubbleEle'),
		workplace: newEmptyEle('workplaceEle'),
	},

	range: null,
	cursorAllParentsTagNamesArr: [],

	init,
	getHtml,
	setHtml,
	destroy,

	i18n: {
		setDict: I18N.setDict,
		getLocale: I18N.getLocale,
		setLocale: I18N.setLocale,
	},
}
