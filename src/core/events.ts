import { exsied } from '.'
import { CN_BIND_EVENT } from '../contants'
import { Toolbar } from '../ui/toolbar'
import { HotkeyUtils } from './hotkey_utils'

export type EventCallback = (event: Event) => void

export type EventCallbackObject = {
	[k: string]: EventCallback[]
}

export const ELE_CLICK_CALLBACK_BY_TAG: EventCallbackObject = {}

export const addEleClickCallbackByTag = (key: string, cb: EventCallback) => {
	let item = ELE_CLICK_CALLBACK_BY_TAG[key]
	if (item) {
		item.push(cb)
	} else {
		ELE_CLICK_CALLBACK_BY_TAG[key] = [cb]
	}
}

export const execEleEventClickCallbackByTag = (key: string, event: Event) => {
	let item = ELE_CLICK_CALLBACK_BY_TAG[key]
	if (item) {
		for (const cb of item) {
			cb(event)
		}
	}
}

export const ELE_CLICK_CALLBACK_BY_CLASS: EventCallbackObject = {}

export const addEleClickCallbackByClass = (key: string, cb: EventCallback) => {
	let item = ELE_CLICK_CALLBACK_BY_CLASS[key]
	if (item) {
		item.push(cb)
	} else {
		ELE_CLICK_CALLBACK_BY_CLASS[key] = [cb]
	}
}

export const execEleEventClickCallbackByClass = (key: string, event: Event) => {
	let item = ELE_CLICK_CALLBACK_BY_CLASS[key]
	if (item) {
		for (const cb of item) {
			cb(event)
		}
	}
}

const bindEventClassName = (event: Event) => {
	const targetEle = event.target as HTMLElement
	const classNames = targetEle.classList
	if (classNames.length > 0 || classNames.contains(CN_BIND_EVENT)) {
		for (const className of classNames) {
			execEleEventClickCallbackByClass(className, event)
		}
	}
}

export const bindAllEvents = () => {
	document.body.addEventListener('click', bindEventClassName)

	Toolbar.bindBtnEvents()

	if (HotkeyUtils.hasHotkeys()) {
		exsied.elements.workplace.addEventListener('keydown', function (event) {
			HotkeyUtils.exec(event)
		})
	}
}

export const unbindAllEvent = () => {
	document.body.removeEventListener('click', bindEventClassName)

	Toolbar.unBindBtnEvents()

	if (HotkeyUtils.hasHotkeys()) {
		exsied.elements.workplace.removeEventListener('keydown', function (event) {
			HotkeyUtils.exec(event)
		})
	}
}
