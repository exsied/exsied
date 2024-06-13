/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */

export const PLUGIN_NAME = 'Table'
export const CN_ICON = 'exsied-btn-table'
export const POPUP_ID = `exsied_${PLUGIN_NAME}_popup`
export const CN_TABLE_CELL_ACTION_BUTTON = 'exsied-btn-table-cell-action'
export const DATA_ROW_INDEX = 'data-row-index'
export const DATA_COLUNM_INDEX = 'data-column-index'

export type PluginConf = {
	addToNormalToolbar: boolean
	addToNormalToolbarInsertMenu: boolean
	addToBubbleToolbar: boolean
}

export const PLUGIN_CONF: PluginConf = {
	addToNormalToolbar: false,
	addToNormalToolbarInsertMenu: true,
	addToBubbleToolbar: false,
}
