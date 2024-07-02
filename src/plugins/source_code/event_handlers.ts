/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { TN_CODE, TN_DIV, TN_PRE } from '../../contants'

import { DomUtils } from '../../core/dom_utils'
import { SelectionUtils } from '../../core/selection_utils'
import { ELE_TYPE_BUTTON, ID_TOOLBAR_EXT, Toolbar } from '../../ui/toolbar'
import { CN_ICON_BACK, ID_SOURCE_CODE_EDIT_VIEW, PLUGIN_CONF } from './base'
import { renderElement } from './hooks'

export function toggleSourceView() {
	if (PLUGIN_CONF.toggleSourceViewCb) {
		PLUGIN_CONF.toggleSourceViewCb()
		return
	}

	const sourceCodeWorkplaceEle = document.createElement(TN_DIV)
	sourceCodeWorkplaceEle.classList.add('exsied-workplace')
	sourceCodeWorkplaceEle.id = ID_SOURCE_CODE_EDIT_VIEW
	sourceCodeWorkplaceEle.contentEditable = 'true'

	exsied.elements.workplace.after(sourceCodeWorkplaceEle)
	exsied.elements.workplace.style.display = 'none'

	Toolbar.genToolbarExt([
		{
			name: 'exit',
			buttonText: 'Exit',
			tooltipText: 'Exit',
			addToNormalToolbar: false,
			addToBubbleToolbar: false,

			eleType: ELE_TYPE_BUTTON,
			iconClassName: CN_ICON_BACK,
			clickCallBack: () => {
				const extToolbar = exsied.elements.toolbarMain.querySelector(`#${ID_TOOLBAR_EXT}`)
				if (extToolbar) extToolbar.remove()

				exsied.elements.workplace.style.display = ''
				sourceCodeWorkplaceEle.remove()
				if (!PLUGIN_CONF.toggleSourceViewAferInitCb) {
					exsied.elements.workplace.innerHTML = sourceCodeWorkplaceEle.textContent || ''
				}

				Toolbar.hideNormalToolbar(false)
			},
		},
	])

	if (PLUGIN_CONF.toggleSourceViewAferInitCb) {
		PLUGIN_CONF.toggleSourceViewAferInitCb(sourceCodeWorkplaceEle)
	} else {
		sourceCodeWorkplaceEle.textContent = exsied.elements.workplace.innerHTML
	}
}

export function insertCodeBlock() {
	const ele = document.createElement(TN_PRE)
	const codeEle = document.createElement(TN_CODE)

	const text = SelectionUtils.getSelectedText()
	codeEle.textContent = text ? text : PLUGIN_CONF.defaultText
	ele.appendChild(codeEle)
	if (exsied.elements.workplace) SelectionUtils.addElementBySelection(exsied.elements.workplace, ele)

	renderElement(codeEle)
}
