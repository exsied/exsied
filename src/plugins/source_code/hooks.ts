import { TN_BUTTON, TN_DIV } from '../../contants'
import { exsied } from '../../core'
import { CN_PREVIEW_BLOCK, DataRender, dataAttr } from '../../core/data_render'
import { t } from '../../core/i18n'
import { tagNameLc } from '../../utils'
import { PLUGIN_CONF } from './base'

const renderer = new DataRender()
const SELECTOR = `pre code`

export const afterSetHtml = () => {
	const codeEles = exsied.elements.workplace.querySelectorAll(SELECTOR)

	for (const item of codeEles) {
		const eleSign = PLUGIN_CONF.randomChars()

		const ele = item as HTMLElement
		renderer.setEle(ele, eleSign)

		const renderedHtml = PLUGIN_CONF.renderData(ele)
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
			if (ele) PLUGIN_CONF.editData(ele as HTMLElement, originaSign)
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
}

export const beforeGetHtml = () => {
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
