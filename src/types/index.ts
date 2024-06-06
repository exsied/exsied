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

export type ExsiedCommands = { [key: string]: (event: Event) => any }

export interface ExsiedPlugin {
	name: string
	conf: any
	commands: ExsiedCommands
	toolBarControl: ToolBarControl[]
	addHhandler: () => any
	removeHhandler: () => any
	checkHighlight: (event: Event) => any
	removeTempEle: (event: Event) => any
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

	init: (conf: {
		id: string
		plugins: ExsiedPlugin[]
		enableToolbarBubble: boolean
		iAbideByExsiedLicenseAndDisableTheAboutPlugin?: boolean
	}) => any
	getHtml: () => string
	setHtml: (content: string) => any
	destroy: () => any

	i18n: {
		setDict: (locale: string, dict: KvStringString) => any
		getLocale: () => string
		setLocale: (locale: string) => any
	}
}
