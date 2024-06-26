/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { ToolBarControl } from '../ui/toolbar'

export type ClickEventHandler = (event: MouseEvent) => any
export type ChangeEventHandler = (event: Event) => any

export interface EventWithElement extends Event {
	customElement: Element
}

export function getEventWithElementEle(event: Event | EventWithElement) {
	if ('customElement' in event) return event.customElement

	return null
}

export type CommandFunc = (event: Event | EventWithElement) => any
export type Commands = { [key: string]: CommandFunc }

export interface ExsiedPlugin {
	name: string
	conf: any
	commands: Commands
	toolBarControl?: ToolBarControl[]
	addHandler: () => any
	removeHandler: () => any
	checkHighlight: (event: Event) => any
	removeTempEle: (event: Event) => any
	hooks?: {
		afterInit?: () => void
		afterSetHtml?: () => void
		beforeGetHtml?: () => string
	}
}

export const HOOK_AFTER_INIT = 1
export const HOOK_AFTER_SET_HTML = 2
export const HOOK_BEFORE_GET_HTML = 3

export type HookType = typeof HOOK_AFTER_INIT | typeof HOOK_AFTER_SET_HTML | typeof HOOK_BEFORE_GET_HTML

export const PLUGINS: ExsiedPlugin[] = []

export function execPluginHook(hook: HookType) {
	for (const item of PLUGINS) {
		if (!item.hooks) continue

		if (hook === HOOK_AFTER_INIT && item.hooks.afterInit) return item.hooks.afterInit()
		if (hook === HOOK_AFTER_SET_HTML && item.hooks.afterSetHtml) return item.hooks.afterSetHtml()
		if (hook === HOOK_BEFORE_GET_HTML && item.hooks.beforeGetHtml) return item.hooks.beforeGetHtml()
	}
}
