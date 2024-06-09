import { FormatStyle } from '../../core/format/style'
import { Style } from '../../types'

export function formatFontFamily(event: Event) {
	const selectEle = event.target as HTMLSelectElement

	const style: Style = {}
	style.fontFamily = selectEle.value
	FormatStyle.formatSelected(style as CSSStyleDeclaration)
}
