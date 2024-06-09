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
	const selectedEles = SelectionUtils.getSelectedEles()
	const text = selectedEles ? selectedEles.textContent : ''

	const ele = document.createElement(TN_PRE)
	const codeEle = document.createElement(TN_CODE)
	codeEle.textContent = text ? text : PLUGIN_CONF.defaultText
	ele.appendChild(codeEle)
	if (exsied.elements.workplace) DomUtils.addElementBySelection(exsied.elements.workplace, ele)

	renderElement(codeEle)
}
