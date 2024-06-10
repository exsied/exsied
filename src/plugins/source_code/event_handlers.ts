/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License,
 * and if you do not meet the conditions, authorization is required
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { TN_CODE, TN_PRE } from '../../contants'
import { exsied } from '../../core'
import { DomUtils } from '../../core/dom_utils'
import { SelectionUtils } from '../../core/selection_utils'
import { PLUGIN_CONF } from './base'
import { renderElement } from './hooks'

export function toggleSourceView() {
	// TODO:
}

export function insertCodeBlock() {
	const ele = document.createElement(TN_PRE)
	const codeEle = document.createElement(TN_CODE)

	const text = SelectionUtils.getSelectedText()
	codeEle.textContent = text ? text : PLUGIN_CONF.defaultText
	ele.appendChild(codeEle)
	if (exsied.elements.workplace) DomUtils.addElementBySelection(exsied.elements.workplace, ele)

	renderElement(codeEle)
}
