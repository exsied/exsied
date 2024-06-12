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
import { Style } from '../../types'

export function formatFontFamily(event: Event) {
	const selectEle = event.target as HTMLSelectElement

	const style: Style = {}
	style.fontFamily = selectEle.value
	FormatStyle.formatSelected(style as CSSStyleDeclaration)
}
