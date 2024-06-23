/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { FormatStyle } from '../../core/format/style'
import { SelectionUtils } from '../../core/selection_utils'
import { Style } from '../../types'
import { ColorPicker } from '../../ui/color_picker'
import { PLUGIN_CONF, PLUGIN_NAME, POPUP_ID_BKG, POPUP_ID_TEXT } from './base'

export function showColorPickerBkg(event: Event) {
	const picker = new ColorPicker(POPUP_ID_BKG, PLUGIN_NAME, PLUGIN_CONF.presetColors, (color: string) => {
		SelectionUtils.restoreSelection()
		if (color) {
			const style: Style = {}
			style.backgroundColor = color
			FormatStyle.formatSelected(style as CSSStyleDeclaration)
		}
	})

	picker.showPopup(event)
}

export function showColorPickerText(event: Event) {
	const picker = new ColorPicker(POPUP_ID_TEXT, PLUGIN_NAME, PLUGIN_CONF.presetColors, (color: string) => {
		SelectionUtils.restoreSelection()
		if (color) {
			const style: Style = {}
			style.color = color
			FormatStyle.formatSelected(style as CSSStyleDeclaration)
		}
	})

	picker.showPopup(event)
}
