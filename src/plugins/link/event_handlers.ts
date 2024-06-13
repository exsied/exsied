/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { CN_TEMP_ELE, DATA_ATTR_TEMP_EDIT, TN_A } from '../../contants'
import { exsied } from '../../core'
import { DomUtils } from '../../core/dom_utils'
import { SelectionUtils } from '../../core/selection_utils'
import { createPopupView } from '../../ui/popup_view'
import {
	CN_CANCEL_BTN,
	CN_CONFIRM_BTN,
	CN_EDIT_BTN,
	CN_EDIT_INPUT,
	CN_EDIT_VIEW,
	CN_PREVIEW,
	CN_ROOT,
	CN_TRASH,
	PLUGIN_CONF,
	PLUGIN_NAME,
	POPUP_ID,
} from './base'

export function insertLink() {
	const selectedEles = SelectionUtils.getSelectedEles()

	const ele = document.createElement(TN_A)
	ele.href = PLUGIN_CONF.defaultHref
	ele.innerHTML = selectedEles && selectedEles.innerHTML ? selectedEles.innerHTML : PLUGIN_CONF.defaultInnerHTML
	if (exsied.elements.workplace) DomUtils.addElementBySelection(exsied.elements.workplace, ele)
}

export function onClickLink(event: Event) {
	event.stopPropagation()
	event.preventDefault()

	const targetEle = event.target as HTMLAnchorElement
	targetEle.setAttribute(DATA_ATTR_TEMP_EDIT, PLUGIN_NAME)

	const contentHtml = `					
        <div class="${CN_PREVIEW}">
        	<a href="${targetEle.href || PLUGIN_CONF.defaultHref}" target="_blank" rel="noopener noreferrer">
		  		${targetEle.innerText || PLUGIN_CONF.defaultInnerHTML}
			</a>
			<div class="exsied-btn ${CN_EDIT_BTN}">
          		<i class="exsied-icon exsied-btn-edit"></i>
		  	</div>
			<div class="exsied-btn ${CN_TRASH}">
          		<i class="exsied-icon exsied-btn-trash"></i>
			</div>
        </div>
        <div class="${CN_EDIT_VIEW}" style="display: none">
        	<input class="${CN_EDIT_INPUT}" value="">	
			<div class="exsied-btn ${CN_CANCEL_BTN}">
				<i class="exsied-icon exsied-btn-cancel"></i>
			</div>
			<div class="exsied-btn ${CN_CONFIRM_BTN}">
				<i class="exsied-icon exsied-btn-confirm"></i>
			</div>
        </div>
        `

	const ele = createPopupView({
		id: POPUP_ID,
		classNames: [CN_TEMP_ELE, CN_ROOT],
		attrs: { TEMP_EDIT_ID: PLUGIN_NAME },
		contentClassNames: ['exsied-link-view'],
		contentAttrs: {},
		contentHtml,
	})

	const rect = targetEle.getBoundingClientRect()
	ele.style.position = 'absolute'
	ele.style.top = rect.bottom + 'px'
	ele.style.left = rect.left + 'px'

	document.body.appendChild(ele)

	const clickLinkCb = PLUGIN_CONF.clickLinkCb
	if (clickLinkCb) {
		const link = ele.querySelector(`.${CN_PREVIEW} a`)
		if (link) {
			const eleLink = link as HTMLAnchorElement
			eleLink.addEventListener('click', clickLinkCb)
		}
	}

	const eleEditBtn = ele.querySelector(`.${CN_EDIT_BTN}`)
	if (eleEditBtn) {
		eleEditBtn.addEventListener('click', onClickLinkEditBtn)
	}

	const eleTrashBtn = ele.querySelector(`.${CN_TRASH}`)
	if (eleTrashBtn) {
		eleTrashBtn.addEventListener('click', onClickLinkTrashBtn)
	}

	const eleCancelBtn = ele.querySelector(`.${CN_CANCEL_BTN}`)
	if (eleCancelBtn) {
		eleCancelBtn.addEventListener('click', onClickLinkConcelBtn)
	}

	const eleconfirmBtn = ele.querySelector(`.${CN_CONFIRM_BTN}`)
	if (eleconfirmBtn) {
		eleconfirmBtn.addEventListener('click', onClickLinkConfirmBtn)
	}
}

export function onClickLinkEditBtn(event: Event) {
	const root = (event.target as HTMLElement).closest(`.${CN_ROOT}`)
	const previewView = root?.querySelector(`.${CN_PREVIEW}`) as HTMLElement
	const editView = root?.querySelector(`.${CN_EDIT_VIEW}`) as HTMLElement

	const link = previewView.querySelector(`a`) as HTMLAnchorElement
	const input = editView.querySelector(`.${CN_EDIT_INPUT}`) as HTMLInputElement
	input.value = link.href

	previewView.style.display = 'none'
	editView.style.display = 'flex'
}

export function onClickLinkTrashBtn(_event: Event) {
	const link = document.querySelector(`[${DATA_ATTR_TEMP_EDIT}="${PLUGIN_NAME}"]`) as HTMLAnchorElement
	const textContent = link.textContent || link.innerText
	link.parentNode?.replaceChild(document.createTextNode(textContent), link)
	link.removeAttribute(DATA_ATTR_TEMP_EDIT)

	DomUtils.removeElementById(POPUP_ID)
}

export function onClickLinkConcelBtn(_event: Event) {
	const link = document.querySelector(`[${DATA_ATTR_TEMP_EDIT}="${PLUGIN_NAME}"]`) as HTMLAnchorElement
	link.removeAttribute(DATA_ATTR_TEMP_EDIT)

	DomUtils.removeElementById(POPUP_ID)
}

export function onClickLinkConfirmBtn(event: Event) {
	const root = (event.target as HTMLElement).closest(`.${CN_ROOT}`)
	const editView = root?.querySelector(`.${CN_EDIT_VIEW}`) as HTMLElement

	const link = document.querySelector(`[${DATA_ATTR_TEMP_EDIT}="${PLUGIN_NAME}"]`) as HTMLAnchorElement
	const input = editView.querySelector(`.${CN_EDIT_INPUT}`) as HTMLInputElement
	link.setAttribute('href', input.value)
	link.removeAttribute(DATA_ATTR_TEMP_EDIT)

	DomUtils.removeElementById(POPUP_ID)
}
