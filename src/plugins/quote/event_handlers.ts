import { TN_BLOCKQUOTE, TN_Q } from '../../contants'
import { exsied } from '../../core'
import { DomUtils } from '../../core/dom_utils'
import { SelectionUtils } from '../../core/selection_utils'
import { PLUGIN_CONF } from './base'

export function insertQuote() {
	const selectedEles = SelectionUtils.getSelectedEles()

	const ele = document.createElement(TN_Q)
	ele.innerHTML = selectedEles ? selectedEles.innerHTML : PLUGIN_CONF.defaultInnerHTML

	if (exsied.elements.workplace) DomUtils.addElementBySelection(exsied.elements.workplace, ele)
}
