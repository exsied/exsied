/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { TN_Q } from '../../contants'

import { DomUtils } from '../../core/dom_utils'
import { SelectionUtils } from '../../core/selection_utils'
import { PLUGIN_CONF } from './base'

export function insertQuote() {
	const selectedEles = SelectionUtils.getSelectedEles()

	const ele = document.createElement(TN_Q)
	ele.innerHTML = selectedEles && selectedEles.innerHTML ? selectedEles.innerHTML : PLUGIN_CONF.defaultInnerHTML

	if (exsied.elements.workplace) SelectionUtils.addElementBySelection(exsied.elements.workplace, ele)
}
