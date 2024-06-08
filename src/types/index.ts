import { KEY_ALT, KEY_CTRL, KEY_META, KEY_SHIFT } from '../contants'
import { CommandFunc } from '../core/plugin'

export type Prettify<T> = {
	[P in keyof T]: T[P]
}

export type HTMLTagNames = Prettify<keyof HTMLElementTagNameMap>

export type Style = Partial<CSSStyleDeclaration>

export type KvStringString = {
	[key: string]: string
}

export type ModifierKeys = typeof KEY_ALT | typeof KEY_CTRL | typeof KEY_META | typeof KEY_SHIFT

export type HotkeyEventsObj = {
	[key: string]: CommandFunc[]
}
