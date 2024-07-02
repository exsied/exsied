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
	ZERO_WIDTH_SPACE,
} from '../contants'
import { About } from '../plugins/about'
import { KvStringString } from '../types'
import { DropdownMenu } from '../ui/dropdown'
import { Toolbar } from '../ui/toolbar'
import { DomUtils } from './dom_utils'
import { bindEventClassName } from './events'
import { HotkeyUtils, ModifierKeys } from './hotkey_utils'
import { I18N } from './i18n'
import { CommandFunc, ExsiedPlugin, HOOK_AFTER_INIT, HOOK_AFTER_SET_HTML, HOOK_BEFORE_GET_HTML } from './plugin'

export type Hooks = {
	onInput?: (event: Event) => void
	beforeGetHtml?: (html: string) => string
	beforeSetHtml?: (html: string) => string
}

export type HookType = typeof HOOK_AFTER_INIT | typeof HOOK_AFTER_SET_HTML | typeof HOOK_BEFORE_GET_HTML

export type ExsiedInitConf = {
	plugins: ExsiedPlugin<Exsied>[]
	enableToolbarBubble: boolean
	locale?: string
	hotkeys?: { keyStr: string; func: CommandFunc; modifierKeys: ModifierKeys[] }[]
	dataAttrs?: { sign: string; signOriginal: string }
	hooks?: Hooks
	iAbideByExsiedLicenseAndDisableTheAboutPlugin?: boolean
}

export type ExsiedElements = {
	editor: HTMLElement | null
	toolbarMain: HTMLElement | null
	toolbarBubble: HTMLElement | null
	workplace: HTMLElement | null
}

export type ExsiedElementsI18n = {
	setDict: (locale: string, dict: KvStringString) => any
	getLocale: () => string
	setLocale: (locale: string) => any
	setBuiltInLocales: () => void
	getLocaleNames: () => string[]
}

export class Exsied {
	containerId = ''
	enableToolbarBubble = false
	elements: ExsiedElements = {
		editor: null,
		toolbarMain: null,
		toolbarBubble: null,
		workplace: null,
	}
	toolbar: Toolbar | null = null
	dropdownMenu: DropdownMenu | null = null
	plugins: ExsiedPlugin<Exsied>[] = []

	constructor(containerId: string) {
		this.containerId = containerId
	}

	init(conf: ExsiedInitConf) {
		if (!conf.iAbideByExsiedLicenseAndDisableTheAboutPlugin) {
			const plgAboud = new About()
			plgAboud.init(this)
			conf.plugins.push(plgAboud)
		}

		const pluginNames: string[] = []
		this.plugins.map((plg) => {
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
					this.plugins.push(plg)
				}
			} catch (error) {
				console.error('Exsied initialize plugin error: ', error, plg)
			}
		})

		this.toolbar = new Toolbar(this)
		this.dropdownMenu = new DropdownMenu(this)

		I18N.setBuiltInLocales()
		conf.locale ? I18N.setLocale(conf.locale) : I18N.setLocale('en')

		if (conf.dataAttrs) this.dataAttrs = conf.dataAttrs

		if (conf.hotkeys) {
			for (const item of conf.hotkeys) {
				HotkeyUtils.set(item.keyStr, item.func, item.modifierKeys)
			}
		}

		this.hooks = conf.hooks
		if (conf.hooks) {
			if (conf.hooks.onInput) {
				const hooksOnInput = conf.hooks.onInput
				this.elements.workplace?.addEventListener('input', (event) => {
					hooksOnInput(event)
				})
			}
		}

		if (conf.enableToolbarBubble) {
			this.enableToolbarBubble = conf.enableToolbarBubble
			this.toolbar.initBubble()
		}

		const editorEle = document.querySelector(`#${this.containerId}`)
		if (!editorEle) throw new Error('The exsied.elements.editor does not exist.')
		this.elements.editor = editorEle as HTMLElement
		editorEle.innerHTML = `
				<div class="${CN_EXSIED_ELE} ${CN_EDITOR_ELE}">  
					<div class="${CN_TOOLBAR_ELE} ${CN_TOOLBAR_MAIN_ELE}">
						<div class="${CN_TOOLBAR_NORMAL_ELE}">
							${this.toolbar.genToolbarStd()}
						</div>
					</div>
					<div class="${CN_WORKPLACE_ELE}" contentEditable="true"></div>
				</div>
				`

		const toolbarMainEle = editorEle.querySelector(`.${CN_TOOLBAR_MAIN_ELE}`)
		if (!toolbarMainEle) throw new Error('The exsied.elements.toolbar does not exist.')
		this.elements.toolbarMain = toolbarMainEle as HTMLElement

		const workplaceEle = editorEle.querySelector(`.${CN_WORKPLACE_ELE}`)
		if (!workplaceEle) throw new Error('The exsied.elements.workplace does not exist.')
		this.elements.workplace = workplaceEle as HTMLElement

		this.toolbar?.initDropdownElements()

		this.bindAllEvents()

		this.execPluginHook(HOOK_AFTER_INIT)

		this.plugins.map((plg) => {
			if (typeof plg.afterExsiedInit === 'function') {
				plg.afterExsiedInit()
			}
		})

		return this
	}

	afterExsiedInit = () => {}

	execPluginHook = (hook: HookType) => {
		for (const item of this.plugins) {
			if (!item.hooks) continue

			if (hook === HOOK_AFTER_INIT && item.hooks.afterInit) return item.hooks.afterInit()
			if (hook === HOOK_AFTER_SET_HTML && item.hooks.afterSetHtml) return item.hooks.afterSetHtml()
			if (hook === HOOK_BEFORE_GET_HTML && item.hooks.beforeGetHtml) return item.hooks.beforeGetHtml()
		}
	}

	bindAllEvents() {
		document.body.addEventListener('click', bindEventClassName)

		this.toolbar?.bindBtnEvents()

		if (HotkeyUtils.hasHotkeys()) {
			this.elements.workplace?.addEventListener('keydown', (event) => {
				HotkeyUtils.exec(event)
			})
		}
	}

	unbindAllEvent() {
		document.body.removeEventListener('click', bindEventClassName)

		this.toolbar?.unBindBtnEvents()

		if (HotkeyUtils.hasHotkeys()) {
			this.elements.workplace?.removeEventListener('keydown', (event) => {
				HotkeyUtils.exec(event)
			})
		}
	}

	cleanWorkplaceEle() {
		const workplaceEle = this.elements.workplace
		if (!workplaceEle) return

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
	getHtml() {
		this.cleanWorkplaceEle()
		let html = this.execPluginHook(HOOK_BEFORE_GET_HTML)
		if (html) {
			html = html.replaceAll(ZERO_WIDTH_SPACE, '')
			if (this.hooks && this.hooks.beforeGetHtml) {
				html = this.hooks.beforeGetHtml(html)
			}
			return html
		}
		return ''
	}
	setHtml(content: string) {
		if (this.hooks && this.hooks.beforeSetHtml) {
			content = this.hooks.beforeSetHtml(content)
		}
		const workplaceEle = this.elements.workplace
		if (!workplaceEle) return

		workplaceEle.innerHTML = content

		this.cleanWorkplaceEle()
		this.execPluginHook(HOOK_AFTER_SET_HTML)

		const inputEvent = new Event('input', { bubbles: true })
		workplaceEle.dispatchEvent(inputEvent)
	}
	destroy() {
		this.unbindAllEvent() // TODO: delete

		this.elements.editor?.remove()
	}

	range: Range | null = null
	cursorAllParentsTagNamesArr: string[] = []

	i18n: ExsiedElementsI18n = {
		setDict: I18N.setDict,
		getLocale: I18N.getLocale,
		setLocale: I18N.setLocale,
		setBuiltInLocales: I18N.setBuiltInLocales,
		getLocaleNames: I18N.getLocaleNames,
	}

	dataAttrs?: { sign: string; signOriginal: string }
	hooks?: Hooks

	genPopupId = (pluginName: string, ctrlName: string) => {
		return `exsied-popup___${pluginName}---${ctrlName}___${this.containerId}`
	}
}
