import { KEY_ALT, KEY_CTRL, KEY_META, KEY_SHIFT } from '../contants'
import { HotkeyEventsObj, ModifierKeys } from '../types'
import { CommandFunc } from './plugin'

// 4
const altCtrlMetaShift: HotkeyEventsObj = {}
// 3
const altCtrlMeta: HotkeyEventsObj = {}
const altCtrlShift: HotkeyEventsObj = {}
const altMetaShift: HotkeyEventsObj = {}
const ctrlMetaShift: HotkeyEventsObj = {}
// 2
const altCtrl: HotkeyEventsObj = {}
const altMeta: HotkeyEventsObj = {}
const altShift: HotkeyEventsObj = {}
const ctrlMeta: HotkeyEventsObj = {}
const ctrlShift: HotkeyEventsObj = {}
const metaShift: HotkeyEventsObj = {}
// 1
const alt: HotkeyEventsObj = {}
const ctrl: HotkeyEventsObj = {}
const shift: HotkeyEventsObj = {}
const meta: HotkeyEventsObj = {}

let hasHotkeys = false

export class HotkeyUtils {
	static hasHotkeys = () => {
		return hasHotkeys
	}

	static set = (keyStr: string, func: CommandFunc, modifierKeysArr: ModifierKeys[]) => {
		if (keyStr.length > 1) throw new Error('The key of hotkey must be 1 char')

		hasHotkeys = true
		const key = keyStr.toLowerCase()

		let hasAlt = false
		let hasCtrl = false
		let hasShift = false
		let hasMeta = false

		for (const item of modifierKeysArr) {
			if (item === KEY_ALT) hasAlt = true
			if (item === KEY_CTRL) hasCtrl = true
			if (item === KEY_SHIFT) hasShift = true
			if (item === KEY_META) hasMeta = true
		}

		const pushKey = (obj: HotkeyEventsObj, func: CommandFunc) => {
			if (obj[key]) {
				obj[key].push(func)
			} else {
				obj[key] = [func]
			}
		}

		// 4
		if (hasAlt && hasCtrl && hasShift && hasMeta) pushKey(altCtrlMetaShift, func)
		// 3
		else if (hasAlt && hasCtrl && hasMeta) pushKey(altCtrlMeta, func)
		else if (hasAlt && hasCtrl && hasShift) pushKey(altCtrlShift, func)
		else if (hasAlt && hasShift && hasMeta) pushKey(altMetaShift, func)
		else if (hasCtrl && hasShift && hasMeta) pushKey(ctrlMetaShift, func)
		//2
		else if (hasAlt && hasCtrl) pushKey(altCtrl, func)
		else if (hasAlt && hasMeta) pushKey(altMeta, func)
		else if (hasAlt && hasShift) pushKey(altShift, func)
		else if (hasCtrl && hasMeta) pushKey(ctrlMeta, func)
		else if (hasCtrl && hasShift) pushKey(ctrlShift, func)
		else if (hasMeta && hasShift) pushKey(metaShift, func)
		// 1
		else if (hasAlt) pushKey(alt, func)
		else if (hasCtrl) pushKey(ctrl, func)
		else if (hasShift) pushKey(shift, func)
		else if (hasMeta) pushKey(meta, func)
	}

	static exec = (event: KeyboardEvent) => {
		let eventData = null

		// 4
		if (event.altKey && event.ctrlKey && event.metaKey && event.shiftKey) eventData = altCtrlMetaShift
		// 3
		else if (event.altKey && event.ctrlKey && event.metaKey) eventData = altCtrlMeta
		else if (event.altKey && event.ctrlKey && event.shiftKey) eventData = altCtrlShift
		else if (event.altKey && event.metaKey && event.shiftKey) eventData = ctrlMetaShift
		else if (event.ctrlKey && event.metaKey && event.shiftKey) eventData = ctrlMetaShift
		// 2
		else if (event.altKey && event.ctrlKey) eventData = altCtrl
		else if (event.altKey && event.metaKey) eventData = altMeta
		else if (event.altKey && event.shiftKey) eventData = altShift
		else if (event.ctrlKey && event.metaKey) eventData = ctrlMeta
		else if (event.ctrlKey && event.shiftKey) eventData = ctrlShift
		else if (event.metaKey && event.shiftKey) eventData = metaShift
		// 1
		else if (event.altKey) eventData = alt
		else if (event.ctrlKey) eventData = ctrl
		else if (event.shiftKey) eventData = shift
		else if (event.metaKey) eventData = meta

		if (!eventData) return

		const key = event.key
		if (key === KEY_ALT || key === KEY_CTRL || key === KEY_SHIFT || key === KEY_META) return

		// TODO: Processing keyboard symbols with and without shift
		const funcs = eventData[key.toLowerCase()]
		if (funcs.length > 0) {
			for (const func of funcs) {
				event.preventDefault()
				if (func) func(event)
			}
		}
	}
}
