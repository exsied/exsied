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

function format  (value: string)  {
	const style: Style = {}
	style.textAlign = value
	const cursorEle = SelectionUtils.getCursorNode()
	if (cursorEle) FormatStyle.formatBlockEle(cursorEle as HTMLElement, style as CSSStyleDeclaration)
}

export function formatTextCenter(_event: Event) {
	format('center')
}

export function formatTextLeft(_event: Event) {
	format('left')
}

export function formatTextRight(_event: Event) {
	format('right')
}
