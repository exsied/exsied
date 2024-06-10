/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License,
 * and if you do not meet the conditions, authorization is required
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { FormatStyle } from '../../core/format/style'
import { SelectionUtils } from '../../core/selection_utils'
import { Style } from '../../types'

export function formatTextCenter(_event: Event) {
	const style: Style = {}
	style.textAlign = 'center'
	const cursorEle = SelectionUtils.getCursorNode()
	if (cursorEle) FormatStyle.formatBlockEle(cursorEle as HTMLElement, style as CSSStyleDeclaration)
}

export function formatTextLeft(_event: Event) {
	const style: Style = {}
	style.textAlign = 'left'
	const cursorEle = SelectionUtils.getCursorNode()
	if (cursorEle) FormatStyle.formatBlockEle(cursorEle as HTMLElement, style as CSSStyleDeclaration)
}

export function formatTextRight(_event: Event) {
	const style: Style = {}
	style.textAlign = 'right'
	const cursorEle = SelectionUtils.getCursorNode()
	if (cursorEle) FormatStyle.formatBlockEle(cursorEle as HTMLElement, style as CSSStyleDeclaration)
}
