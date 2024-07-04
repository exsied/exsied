/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { Exsied } from '.'
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

export interface ExsiedPlugin<T> {
	init(host: T): void

	name: string
	conf: any
	commands?: object
	getToolBarControl?: () => ToolBarControl[]
	addHandler: () => any
	removeHandler: () => any
	checkHighlight: (event: Event) => any
	removeTempEle: (event: Event) => any
	hooks?: {
		afterInit?: (exsied: Exsied) => void
		afterSetHtml?: (exsied: Exsied) => void
		beforeGetHtml?: (exsied: Exsied) => string
	}
	afterToolbarInit?: () => void
}

export const HOOK_AFTER_INIT = 1
export const HOOK_AFTER_SET_HTML = 2
export const HOOK_BEFORE_GET_HTML = 3
