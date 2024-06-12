/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License,
 * and if you do not meet the conditions, authorization is required
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */

export const PLUGIN_NAME = 'RedoAndUndo'
export const CN_ICON_REDO = 'exsied-btn-redo'
export const CN_ICON_UNDO = 'exsied-btn-undo'

export type PluginConf = {
	addToNormalToolbar: {
		redo: boolean
		undo: boolean
	}
	addToBubbleToolbar: {
		redo: boolean
		undo: boolean
	}
	compressCb?: (str: string) => any
	uncompressCb?: (value: any) => string
}

export const PLUGIN_CONF: PluginConf = {
	addToNormalToolbar: {
		redo: true,
		undo: true,
	},
	addToBubbleToolbar: {
		redo: false,
		undo: false,
	},
}
