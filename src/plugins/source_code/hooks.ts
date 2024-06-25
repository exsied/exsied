/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { TN_BUTTON, TN_DIV } from '../../contants'
import { exsied } from '../../core'
import { CN_PREVIEW_BLOCK, DataRender, dataAttr } from '../../core/data_render'
import { t } from '../../core/i18n'
import { EventWithElement, getEventWithElementEle } from '../../core/plugin'
import { tagNameLc } from '../../utils'
import { PLUGIN_CONF } from './base'

const renderer = new DataRender()
const SELECTOR = `pre code`

export function renderElement(item: Element) {
	const eleSign = PLUGIN_CONF.randomCharsCb()

	const ele = item as HTMLElement
	renderer.setEle(ele, eleSign)

	const renderedHtml = PLUGIN_CONF.renderDataCb(ele)
	renderer.render(renderedHtml)

	// Edit
	const editBtn = document.createElement(TN_BUTTON)
	editBtn.innerHTML = t('Edit')
	editBtn.setAttribute(dataAttr().signOriginal, eleSign)
	editBtn.addEventListener('click', async (event) => {
		const elem = event.target as HTMLElement
		const originaSign = elem.getAttribute(dataAttr().signOriginal)
		if (!originaSign) return

		const ele = document.querySelector(`[${dataAttr().sign}="${originaSign}"]`)
		if (ele) PLUGIN_CONF.editDataCb(ele as HTMLElement, originaSign)
	})

	// Copy
	const copyBtn = document.createElement(TN_BUTTON)
	copyBtn.innerHTML = t('Copy')
	copyBtn.setAttribute(dataAttr().signOriginal, eleSign)
	copyBtn.addEventListener('click', async (_event) => {
		const ele = document.querySelector(`[${dataAttr().sign}="${eleSign}"]`)
		if (ele) await navigator.clipboard.writeText(ele.innerHTML || '')
	})

	// Delete
	const deleteBtn = document.createElement(TN_BUTTON)
	deleteBtn.innerHTML = t('Delete')
	deleteBtn.setAttribute(dataAttr().signOriginal, eleSign)
	deleteBtn.addEventListener('click', async (event) => {
		const elem = event.target as HTMLElement
		const elePreviewBlock = elem.closest(`.${CN_PREVIEW_BLOCK}`)
		if (elePreviewBlock) elePreviewBlock.remove()

		const ele = document.querySelector(`[${dataAttr().sign}="${eleSign}"]`)
		if (ele) {
			const parentEle = ele.parentElement as HTMLElement
			if (tagNameLc(parentEle) === 'pre') parentEle.remove()
			ele.remove()
		}
	})

	renderer.addCtrlElements([editBtn, copyBtn, deleteBtn])
}

export function renderCodeEle(event: Event | EventWithElement) {
	const ele = getEventWithElementEle(event)
	if (ele) renderElement(ele)
}

export function afterSetHtml() {
	const codeEles = exsied.elements.workplace.querySelectorAll(SELECTOR)
	for (const item of codeEles) {
		renderElement(item)
	}
}

export function beforeGetHtml() {
	const tempEle = document.createElement(TN_DIV)
	tempEle.innerHTML = exsied.elements.workplace.innerHTML
	const codeEles = tempEle.querySelectorAll(SELECTOR)

	for (const item of codeEles) {
		const ele = item as HTMLElement
		ele.removeAttribute(dataAttr().sign)

		const parentEle = ele.parentElement as HTMLElement
		if (tagNameLc(parentEle) === 'pre') {
			parentEle.style.display = ''
		} else {
			ele.style.display = ''
		}
	}

	const previewBlockEles = tempEle.querySelectorAll(`.${CN_PREVIEW_BLOCK}`)
	for (const iterator of previewBlockEles) {
		iterator.remove()
	}

	return tempEle.innerHTML
}
