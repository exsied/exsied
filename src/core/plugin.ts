import { ExsiedPlugin } from '../types'

export const HOOK_AFTER_INIT = 1
export const HOOK_AFTER_SET_HTML = 2
export const HOOK_BEFORE_GET_HTML = 3

export type HookType = typeof HOOK_AFTER_INIT | typeof HOOK_AFTER_SET_HTML | typeof HOOK_BEFORE_GET_HTML

export const PLUGINS: ExsiedPlugin[] = []

export const execPluginHook = (hook: HookType) => {
	for (const item of PLUGINS) {
		if (item.hooks) {
			if (hook === HOOK_AFTER_INIT && item.hooks.afterInit) return item.hooks.afterInit()
			if (hook === HOOK_AFTER_SET_HTML && item.hooks.afterSetHtml) return item.hooks.afterSetHtml()
			if (hook === HOOK_BEFORE_GET_HTML && item.hooks.beforeGetHtml) return item.hooks.beforeGetHtml()
		}
	}
}
