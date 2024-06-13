/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { DomUtils } from '../../core/dom_utils'
import { FormatStyle } from '../../core/format/style'
import { SelectionUtils } from '../../core/selection_utils'
import { Style } from '../../types'
import { PLUGIN_CONF } from './base'

const INDENT = 1
const ONTDENT = 2

function indent(direction: typeof INDENT | typeof ONTDENT) {
	const cursorEle = SelectionUtils.getCursorNode()
	const blockEle = DomUtils.getBlockEle(cursorEle as HTMLElement)
	if (!blockEle) return

	const style: Style = {}
	let paddingInlineStartPx = 0
	if (blockEle.style.paddingInlineStart) paddingInlineStartPx = parseInt(blockEle.style.paddingInlineStart)
	if (direction === INDENT) style.paddingInlineStart = `${paddingInlineStartPx + PLUGIN_CONF.stepPx}px`
	if (direction === ONTDENT) style.paddingInlineStart = `${paddingInlineStartPx - PLUGIN_CONF.stepPx}px`
	if (blockEle) FormatStyle.formatBlockEle(blockEle, style as CSSStyleDeclaration, true)
}

export function formatIndent(_event: Event) {
	indent(INDENT)
}

export function formatOutdent(_event: Event) {
	indent(ONTDENT)
}
