/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License,
 * and if you do not meet the conditions, authorization is required
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { TN_CODE, TN_DIV, TN_PRE } from '../../contants'
import { exsied } from '../../core'
import { DomUtils } from '../../core/dom_utils'
import { SelectionUtils } from '../../core/selection_utils'
import { ID_TOOLBAR_EXT, Toolbar } from '../../ui/toolbar'
import { CN_ICON_BACK, ID_SOURCE_CODE_EDIT_VIEW, PLUGIN_CONF } from './base'
import { renderElement } from './hooks'

export function toggleSourceView() {
	const workplaceEle = document.createElement(TN_DIV)
	workplaceEle.classList.add('exsied-workplace')
	workplaceEle.id = ID_SOURCE_CODE_EDIT_VIEW
	workplaceEle.contentEditable = 'true'

	PLUGIN_CONF.aferInitSourceCodeViewCb(workplaceEle)

	workplaceEle.addEventListener('input', (_event) => {
		 PLUGIN_CONF.inputInSourceCodeViewCb(workplaceEle)
	})

	exsied.elements.workplace.after(workplaceEle)
	exsied.elements.workplace.style.display = 'none'

	Toolbar.genToolbarExt([
		{
			name: 'exit',
			tooltipText: 'Exit',
			addToNormalToolbar: false,
			addToBubbleToolbar: false,

			eleType: 'button',
			iconClassName: CN_ICON_BACK,
			clickCallBack: () => {
				const extToolbar = exsied.elements.toolbarMain.querySelector(`#${ID_TOOLBAR_EXT}`)
				if (extToolbar) extToolbar.remove()

				exsied.elements.workplace.style.display = ''
				exsied.elements.workplace.innerHTML = workplaceEle.textContent || ''
				workplaceEle.remove()

				Toolbar.hideNormalToolbar(false)
			},
		},
	])
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
