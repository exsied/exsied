import { TN_HR } from '../../contants'
import { exsied } from '../../core'
import { DomUtils } from '../../core/dom_utils'

export function insertHorizontalRule() {
	const ele = document.createElement(TN_HR)

	if (exsied.elements.workplace) DomUtils.addElementBySelection(exsied.elements.workplace, ele)
}
