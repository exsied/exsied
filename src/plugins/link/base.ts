/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License,
 * and if you do not meet the conditions, authorization is required
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { LIB_NAME, LIB_REPO_GITHUB } from '../../contants'

export const PLUGIN_NAME = 'Link'
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
	addToNormalToolbar: boolean
	addToNormalToolbarInsertMenu: boolean
	addToBubbleToolbar: boolean
	defaultInnerHTML: string
	defaultHref: string
	clickLinkCb?: (event: MouseEvent) => void
}

export const PLUGIN_CONF: PluginConf = {
	addToNormalToolbar: false,
	addToNormalToolbarInsertMenu: true,
	addToBubbleToolbar: true,
	defaultInnerHTML: LIB_NAME,
	defaultHref: LIB_REPO_GITHUB,
}
