/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License,
 * and if you do not meet the conditions, authorization is required
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { TN_DIV } from '../../contants'
import { DomUtils } from '../../core/dom_utils'
import { EventCallback } from '../../core/events'
import { KvStringString } from '../../types'
import './styles.scss'

export type actionButton = {
	text: string
	id: string
	callback: EventCallback
}

export type PopupViewProps = {
	id: string
	classNames: string[]
	attrs: KvStringString
	contentClassNames: string[]
	contentAttrs: KvStringString
	contentHtml: string
	titlebarText?: string
	actionsButtons?: actionButton[]
}

export const CN_POPUP_VIEW = 'exsied-popup-view'
export const CN_POPUP_CLOSE_BTN = 'exsied-btn-close'

export const createPopupView = (props: PopupViewProps) => {
	let contentAttrsStr = ''

	Object.keys(props.contentAttrs).forEach((key) => {
		if (key !== '') contentAttrsStr += ` ${key}="${props.contentAttrs[key]}"`
	})

	const htmlTitlebar = props.titlebarText
		? `					
		<div class="exsied-popup-titlebar">
			<div class="exsied-popup-titlebar-content">${props.titlebarText}</div>
			<div class="exsied-popup-titlebar-actions">
				<i class="exsied-icon ${CN_POPUP_CLOSE_BTN}"></i>
			</div>
		</div>
		`
		: ''

	let htmlActionButtons = ''
	props.actionsButtons?.map((value, _index) => {
		htmlActionButtons += `<button id="${value.id}">${value.text}</button>`
	})

	let htmlContent = `					
		<div
			class="exsied-popup-content ${props.contentClassNames.join(' ')}" 
			${contentAttrsStr}
		>
			${htmlTitlebar}
			${props.contentHtml}
		</div>
		`
	if (htmlActionButtons) {
		htmlContent += `
			<div class="exsied-popup-actions">
				${htmlActionButtons}
			</div>`
	}

	const ele = document.createElement(TN_DIV)
	ele.id = props.id
	ele.innerHTML = htmlContent
	ele.classList.add(CN_POPUP_VIEW)

	for (const className of props.classNames) {
		ele.classList.add(className)
	}

	for (const key in props.attrs) {
		ele.setAttribute(key, props.attrs[key])
	}

	if (props.titlebarText) {
		const closeBtn = ele.querySelector(`.${CN_POPUP_CLOSE_BTN}`)
		if (closeBtn) {
			closeBtn.addEventListener('click', (event) => {
				const targetEle = event.target as HTMLElement
				const popupEle = targetEle.closest(`.${CN_POPUP_VIEW}`)
				if (popupEle) DomUtils.removeElementById(popupEle.id)
			})
		}
	}

	props.actionsButtons?.map((value, _index) => {
		const btnEle = ele.querySelector(`#${value.id}`)
		if (btnEle) {
			btnEle.addEventListener('click', value.callback)
		}
	})

	return ele
}
