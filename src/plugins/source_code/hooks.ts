import { TN_BUTTON, TN_DIV } from '../../contants'
import { exsied } from '../../core'
import { CN_PREVIEW_BLOCK, DATA_ATTR_ORIGINAL_SIGN, DATA_ATTR_SIGN, DataRender } from '../../core/data_render'
import { t } from '../../core/i18n'
import { tagNameLc } from '../../utils'
import { randomChars } from '../../utils/string'
import { PLUGIN_CONF } from './base'

const renderer = new DataRender()
const SELECTOR = `pre code`

export const afterSetHtml = () => {
	const codeEles = exsied.elements.workplace.querySelectorAll(SELECTOR)

	for (const item of codeEles) {
		const eleSign = randomChars(28)
		renderer.setEle(item as HTMLElement, eleSign)

		const renderedHtml = PLUGIN_CONF.renderData(item.innerHTML)
		renderer.render(renderedHtml)

		// Edit
		const editBtn = document.createElement(TN_BUTTON)
		editBtn.innerHTML = t('Edit')
		editBtn.setAttribute(DATA_ATTR_ORIGINAL_SIGN, eleSign)
		editBtn.addEventListener('click', async (event) => {
			const elem = event.target as HTMLElement
			const originaSign = elem.getAttribute(DATA_ATTR_ORIGINAL_SIGN)
			if (!originaSign) return

			const ele = document.querySelector(`[${DATA_ATTR_SIGN}="${originaSign}"]`)
			if (ele) PLUGIN_CONF.editData(ele.innerHTML, originaSign)
		})

		// Copy
		const copyBtn = document.createElement(TN_BUTTON)
		copyBtn.innerHTML = t('Copy')
		copyBtn.setAttribute(DATA_ATTR_ORIGINAL_SIGN, eleSign)
		copyBtn.addEventListener('click', async (_event) => {
			const ele = document.querySelector(`[${DATA_ATTR_SIGN}="${eleSign}"]`)
			if (ele) await navigator.clipboard.writeText(ele.innerHTML || '')
		})

		// Delete
		const deleteBtn = document.createElement(TN_BUTTON)
		deleteBtn.innerHTML = t('Delete')
		deleteBtn.setAttribute(DATA_ATTR_ORIGINAL_SIGN, eleSign)
		deleteBtn.addEventListener('click', async (event) => {
			const elem = event.target as HTMLElement
			const elePreviewBlock = elem.closest(`.${CN_PREVIEW_BLOCK}`)
			if (elePreviewBlock) elePreviewBlock.remove()

			const ele = document.querySelector(`[${DATA_ATTR_SIGN}="${eleSign}"]`)
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
		ele.removeAttribute(DATA_ATTR_SIGN)

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
