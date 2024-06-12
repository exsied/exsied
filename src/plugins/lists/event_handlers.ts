/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { TN_OL, TN_UL } from '../../contants'
import { exsied } from '../../core'
import { DomUtils } from '../../core/dom_utils'
import { SelectionUtils } from '../../core/selection_utils'
import { PLUGIN_CONF } from './base'

export function insert(tagName: typeof TN_OL | typeof TN_UL) {
	const selectedEles = SelectionUtils.getSelectedEles()

	const ele = document.createElement(tagName)
	ele.innerHTML = selectedEles && selectedEles.innerHTML ? selectedEles.innerHTML : PLUGIN_CONF.defaultInnerHTML

	if (exsied.elements.workplace) DomUtils.addElementBySelection(exsied.elements.workplace, ele)
}

export function insertOl() {
	insert(TN_OL)
}

export function insertUl() {
	insert(TN_UL)
}
