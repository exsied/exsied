import { TN_OL, TN_UL } from '../../contants'
import { exsied } from '../../core'
import { DomUtils } from '../../core/dom_utils'
import { SelectionUtils } from '../../core/selection_utils'
import { PLUGIN_CONF } from './base'

export function insertOl() {
	const selectedEles = SelectionUtils.getSelectedEles()

	const ele = document.createElement(TN_OL)
	ele.innerHTML = selectedEles && selectedEles.innerHTML ? selectedEles.innerHTML : PLUGIN_CONF.defaultInnerHTML

	if (exsied.elements.workplace) DomUtils.addElementBySelection(exsied.elements.workplace, ele)
}

export function insertUl() {
	const selectedEles = SelectionUtils.getSelectedEles()

	const ele = document.createElement(TN_UL)
	ele.innerHTML = selectedEles && selectedEles.innerHTML ? selectedEles.innerHTML : PLUGIN_CONF.defaultInnerHTML

	if (exsied.elements.workplace) DomUtils.addElementBySelection(exsied.elements.workplace, ele)
}
