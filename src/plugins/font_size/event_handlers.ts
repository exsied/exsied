import { FormatStyle } from '../../core/format/style'
import { Style } from '../../types'

export function formatFontSize(event: Event) {
	const selectEle = event.target as HTMLSelectElement

	const style: Style = {}
	style.fontSize = selectEle.value
	FormatStyle.formatSelected(style as CSSStyleDeclaration)
}
