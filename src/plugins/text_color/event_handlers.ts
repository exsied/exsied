import { FormatStyle } from '../../core/format/style'
import { SelectionUtils } from '../../core/selection_utils'
import { Style } from '../../types'
import { ColorPicker } from '../../ui/color-picker'
import { PLUGIN_CONF, PLUGIN_NAME, POPUP_ID } from './base'

export function showBackgroundColorPicker(event: Event) {
	const picker = new ColorPicker(POPUP_ID, PLUGIN_NAME, PLUGIN_CONF.presetColors, (color: string) => {
		SelectionUtils.restoreSelection()
		if (color) {
			const style: Style = {}
			style.color = color
			FormatStyle.formatSelected(style as CSSStyleDeclaration)
		}
	})

	picker.showColorPicker(event)
}
