import { LIB_NAME, LIB_REPO } from '../../contants'

export const PLUGIN_NAME = 'link'
export const CN_ICON = 'exsied-btn-link'
export const POPUP_ID = `exsied_${PLUGIN_NAME}_popup`
export const CN_ROOT = 'exsied-link-editor'
export const CN_EDIT_BTN = 'exsied-link-edit'
export const CN_PREVIEW = 'exsied-preview-view'
export const CN_TRASH = 'exsied-link-trash'
export const CN_EDIT_VIEW = 'exsied-edit-view'
export const CN_EDIT_INPUT = 'exsied-link-input'
export const CN_CANCEL_BTN = 'exsied-link-cancel'
export const CN_CONFIRM_BTN = 'exsied-link-confirm'

export type PluginConf = {
	addToBubble: boolean
	defaultInnerHTML: string
	defaultHref: string
}

export const PLUGIN_CONF: PluginConf = {
	addToBubble: true,
	defaultInnerHTML: LIB_NAME,
	defaultHref: LIB_REPO,
}
