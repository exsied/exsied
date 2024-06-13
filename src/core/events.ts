/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { exsied } from '.'
import { CN_BIND_EVENT } from '../contants'
import { Toolbar } from '../ui/toolbar'
import { HotkeyUtils } from './hotkey_utils'

export type EventCallback = (event: Event) => void

export type EventCallbackObject = {
	[k: string]: EventCallback[]
}

export const ELE_CLICK_CALLBACK_BY_TAG: EventCallbackObject = {}

export function addEleClickCallbackByTag(key: string, cb: EventCallback) {
	let item = ELE_CLICK_CALLBACK_BY_TAG[key]
	if (item) {
		item.push(cb)
	} else {
		ELE_CLICK_CALLBACK_BY_TAG[key] = [cb]
	}
}

export function execEleEventClickCallbackByTag(key: string, event: Event) {
	let item = ELE_CLICK_CALLBACK_BY_TAG[key]
	if (item) {
		for (const cb of item) {
			cb(event)
		}
	}
}

export const ELE_CLICK_CALLBACK_BY_CLASS: EventCallbackObject = {}

export function addEleClickCallbackByClass(key: string, cb: EventCallback) {
	let item = ELE_CLICK_CALLBACK_BY_CLASS[key]
	if (item) {
		item.push(cb)
	} else {
		ELE_CLICK_CALLBACK_BY_CLASS[key] = [cb]
	}
}

export function execEleEventClickCallbackByClass(key: string, event: Event) {
	let item = ELE_CLICK_CALLBACK_BY_CLASS[key]
	if (item) {
		for (const cb of item) {
			cb(event)
		}
	}
}

function bindEventClassName(event: Event) {
	const targetEle = event.target as HTMLElement
	const classNames = targetEle.classList
	if (classNames.length > 0 || classNames.contains(CN_BIND_EVENT)) {
		for (const className of classNames) {
			execEleEventClickCallbackByClass(className, event)
		}
	}
}

export function bindAllEvents() {
	document.body.addEventListener('click', bindEventClassName)

	Toolbar.bindBtnEvents()

	if (HotkeyUtils.hasHotkeys()) {
		exsied.elements.workplace.addEventListener('keydown', (event) => {
			HotkeyUtils.exec(event)
		})
	}
}

export function unbindAllEvent() {
	document.body.removeEventListener('click', bindEventClassName)

	Toolbar.unBindBtnEvents()

	if (HotkeyUtils.hasHotkeys()) {
		exsied.elements.workplace.removeEventListener('keydown', (event) => {
			HotkeyUtils.exec(event)
		})
	}
}
