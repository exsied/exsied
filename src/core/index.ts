import {
	CN_EDITOR_ELE,
	CN_TOOLBAR_ELE,
	CN_TOOLBAR_MAIN_ELE,
	CN_WORKPLACE_ELE,
	TN_DIV,
	ZERO_WIDTH_SPACE,
} from '../contants'
import pluginAbout from '../plugins/about'
import { KvStringString } from '../types'
import { Toolbar } from '../ui/toolbar'
import { DomUtils } from './dom_utils'
import { bindAllEvents, unbindAllEvent } from './events'
import { HotkeyUtils, ModifierKeys } from './hotkey_utils'
import { I18N } from './i18n'
import {
	CommandFunc,
	ExsiedPlugin,
	HOOK_AFTER_INIT,
	HOOK_AFTER_SET_HTML,
	HOOK_BEFORE_GET_HTML,
	PLUGINS,
	execPluginHook,
} from './plugin'

export type ExsiedInitConf = {
	id: string
	plugins: ExsiedPlugin[]
	enableToolbarBubble: boolean
	hotkeys?: { keyStr: string; func: CommandFunc; modifierKeys: ModifierKeys[] }[]
	dataAttrs?: { sign: string; signOriginal: string }
	hooks?: {
		onInput?: (event: Event) => void
	}
	iAbideByExsiedLicenseAndDisableTheAboutPlugin?: boolean
}

export type Exsied = {
	containerId: string
	enableToolbarBubble: boolean
	elements: {
		editor: HTMLElement
		toolbarMain: HTMLElement
		toolbarBubble: HTMLElement
		workplace: HTMLElement
	}

	init: (conf: ExsiedInitConf) => any
	getHtml: () => string
	setHtml: (content: string) => any
	destroy: () => any

	range: Range | null
	cursorAllParentsTagNamesArr: string[]

	dataAttrs?: { sign: string; signOriginal: string }

	i18n: {
		setDict: (locale: string, dict: KvStringString) => any
		getLocale: () => string
		setLocale: (locale: string) => any
	}
}

const init = (conf: ExsiedInitConf) => {
	if (!conf.iAbideByExsiedLicenseAndDisableTheAboutPlugin) conf.plugins.push(pluginAbout)

	const pluginNames: string[] = []
	PLUGINS.map((plg) => {
		if (!pluginNames.includes(plg.name)) {
			pluginNames.push(plg.name)
		}
	})

	conf.plugins.map((plg) => {
		if (!pluginNames.includes(plg.name)) {
			PLUGINS.push(plg)
		}
	})

	if (conf.dataAttrs) exsied.dataAttrs = conf.dataAttrs

	if (conf.enableToolbarBubble) {
		exsied.enableToolbarBubble = conf.enableToolbarBubble
		Toolbar.initBubble()
	}

	const editorEle = document.querySelector(`#${conf.id}`)
	if (!editorEle) throw new Error('The exsied.elements.editor does not exist.')
	exsied.elements.editor = editorEle as HTMLElement
	editorEle.innerHTML = `
		<div class="${CN_EDITOR_ELE}">  
			<div class="${CN_TOOLBAR_ELE} ${CN_TOOLBAR_MAIN_ELE}">
				<div class="exsied-normal">
					${Toolbar.genBtns()}
				</div>
			</div>
			<div class="${CN_WORKPLACE_ELE}" contentEditable="true"></div>
		</div>
		`

	const toolbarMainEle = editorEle.querySelector(`.${CN_TOOLBAR_MAIN_ELE}`)
	if (!toolbarMainEle) throw new Error('The exsied.elements.toolbar does not exist.')
	exsied.elements.toolbarMain = toolbarMainEle as HTMLElement

	const workplaceEle = editorEle.querySelector(`.${CN_WORKPLACE_ELE}`)
	if (!workplaceEle) throw new Error('The exsied.elements.workplace does not exist.')
	exsied.elements.workplace = workplaceEle as HTMLElement

	Toolbar.initDropdownElements()

	if (conf.hotkeys) {
		for (const item of conf.hotkeys) {
			HotkeyUtils.set(item.keyStr, item.func, item.modifierKeys)
		}
	}

	if (conf.hooks) {
		if (conf.hooks.onInput) {
			const hooksOnInput = conf.hooks.onInput
			exsied.elements.workplace.addEventListener('input', function (event) {
				hooksOnInput(event)
			})
		}
	}

	bindAllEvents()

	execPluginHook(HOOK_AFTER_INIT)
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
	const html = execPluginHook(HOOK_BEFORE_GET_HTML)
	if (html) return html.replaceAll(ZERO_WIDTH_SPACE, '')
	return ''
}

const setHtml = (content: string) => {
	const workplace_ele = exsied.elements.workplace
	workplace_ele.innerHTML = content

	cleanWorkplaceEle()
	execPluginHook(HOOK_AFTER_SET_HTML)
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
