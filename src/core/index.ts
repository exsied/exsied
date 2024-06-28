/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import {
	CN_EDITOR_ELE,
	CN_EXSIED_ELE,
	CN_TOOLBAR_ELE,
	CN_TOOLBAR_MAIN_ELE,
	CN_TOOLBAR_NORMAL_ELE,
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

export type Hooks = {
	onInput?: (event: Event) => void
	beforeGetHtml?: (html: string) => string
	beforeSetHtml?: (html: string) => string
}

export type ExsiedInitConf = {
	id: string
	plugins: ExsiedPlugin[]
	enableToolbarBubble: boolean
	locale?: string
	hotkeys?: { keyStr: string; func: CommandFunc; modifierKeys: ModifierKeys[] }[]
	dataAttrs?: { sign: string; signOriginal: string }
	hooks?: Hooks
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

	i18n: {
		setDict: (locale: string, dict: KvStringString) => any
		getLocale: () => string
		setLocale: (locale: string) => any
		setBuiltInLocales: () => void
		getLocaleNames: () => string[]
	}

	dataAttrs?: { sign: string; signOriginal: string }
	hooks?: Hooks
}

const init = (conf: ExsiedInitConf) => {
	if (!conf.iAbideByExsiedLicenseAndDisableTheAboutPlugin) conf.plugins.push(pluginAbout)

	const pluginNames: string[] = []
	PLUGINS.map((plg) => {
		try {
			if (!pluginNames.includes(plg.name)) {
				pluginNames.push(plg.name)
			}
		} catch (error) {
			console.error('Exsied initialize plugin error: ', error, plg)
		}
	})

	conf.plugins.map((plg) => {
		try {
			if (!pluginNames.includes(plg.name)) {
				PLUGINS.push(plg)
			}
		} catch (error) {
			console.error('Exsied initialize plugin error: ', error, plg)
		}
	})

	I18N.setBuiltInLocales()
	conf.locale ? I18N.setLocale(conf.locale) : I18N.setLocale('en')

	if (conf.dataAttrs) exsied.dataAttrs = conf.dataAttrs

	if (conf.enableToolbarBubble) {
		exsied.enableToolbarBubble = conf.enableToolbarBubble
		Toolbar.initBubble()
	}

	const editorEle = document.querySelector(`#${conf.id}`)
	if (!editorEle) throw new Error('The exsied.elements.editor does not exist.')
	exsied.elements.editor = editorEle as HTMLElement
	editorEle.innerHTML = `
		<div class="${CN_EXSIED_ELE} ${CN_EDITOR_ELE}">  
			<div class="${CN_TOOLBAR_ELE} ${CN_TOOLBAR_MAIN_ELE}">
				<div class="${CN_TOOLBAR_NORMAL_ELE}">
					${Toolbar.genToolbarStd()}
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

	exsied.hooks = conf.hooks
	if (conf.hooks) {
		if (conf.hooks.onInput) {
			const hooksOnInput = conf.hooks.onInput
			exsied.elements.workplace.addEventListener('input', (event) => {
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
	let html = execPluginHook(HOOK_BEFORE_GET_HTML)
	if (html) {
		html = html.replaceAll(ZERO_WIDTH_SPACE, '')
		if (exsied.hooks && exsied.hooks.beforeGetHtml) {
			html = exsied.hooks.beforeGetHtml(html)
		}
		return html
	}
	return ''
}

const setHtml = (html: string) => {
	let content = html
	if (exsied.hooks && exsied.hooks.beforeSetHtml) {
		content = exsied.hooks.beforeSetHtml(content)
	}
	const workplaceEle = exsied.elements.workplace
	workplaceEle.innerHTML = content

	cleanWorkplaceEle()
	execPluginHook(HOOK_AFTER_SET_HTML)

	const inputEvent = new Event('input', { bubbles: true })
	workplaceEle.dispatchEvent(inputEvent)
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
		setBuiltInLocales: I18N.setBuiltInLocales,
		getLocaleNames: I18N.getLocaleNames,
	},
}
