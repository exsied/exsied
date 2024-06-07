import { KEY_ALT, KEY_CTRL, KEY_META, KEY_SHIFT } from '../contants'
import { ToolBarControl } from '../ui/toolbar'

export type Prettify<T> = {
	[P in keyof T]: T[P]
}

export type HTMLTagNames = Prettify<keyof HTMLElementTagNameMap>

export type Style = Partial<CSSStyleDeclaration>

export type KvStringString = {
	[key: string]: string
}

export type ClickEventHandler = (event: MouseEvent) => any
export type ChangeEventHandler = (event: Event) => any

export type CommandFunc = (event: Event) => any
export type Commands = { [key: string]: CommandFunc }

export interface ExsiedPlugin {
	name: string
	conf: any
	commands: Commands
	toolBarControl?: ToolBarControl[]
	addHhandler: () => any
	removeHhandler: () => any
	checkHighlight: (event: Event) => any
	removeTempEle: (event: Event) => any
	hooks?: {
		afterInit?: () => void
		afterSetHtml?: () => void
		beforeGetHtml?: () => string
	}
}

export type ExsiedInitConf = {
	id: string
	plugins: ExsiedPlugin[]
	enableToolbarBubble: boolean
	hotkeys?: { keyStr: string; func: CommandFunc; modifierKeys: ModifierKeys[] }[]
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

	range: Range | null
	cursorAllParentsTagNamesArr: string[]

	init: (conf: ExsiedInitConf) => any
	getHtml: () => string
	setHtml: (content: string) => any
	destroy: () => any

	i18n: {
		setDict: (locale: string, dict: KvStringString) => any
		getLocale: () => string
		setLocale: (locale: string) => any
	}
}

export type ModifierKeys = typeof KEY_ALT | typeof KEY_CTRL | typeof KEY_META | typeof KEY_SHIFT

export type HotkeyEventsObj = {
	[key: string]: CommandFunc[]
}
