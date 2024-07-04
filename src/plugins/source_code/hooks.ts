/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { PLUGIN_NAME, PluginConf } from '.'
import { TN_BUTTON, TN_DIV } from '../../contants'
import { Exsied } from '../../core'
import { CN_PREVIEW_BLOCK } from '../../core/data_render'
import { t } from '../../core/i18n'
import { tagNameLc } from '../../utils'

const SELECTOR = `pre code`

export function renderElement(exsied: Exsied, item: Element) {
	let pluginConf: PluginConf | null = null
	for (const plg of exsied.plugins) {
		if (plg.name === PLUGIN_NAME) {
			pluginConf = plg.conf
		}
	}
	if (!pluginConf) return

	const eleSign = pluginConf.randomCharsCb()

	const ele = item as HTMLElement
	exsied.dataRender.setEle(ele, eleSign)

	const renderedHtml = pluginConf.renderDataCb(ele)
	exsied.dataRender.render(renderedHtml)

	// Edit
	const editBtn = document.createElement(TN_BUTTON)
	editBtn.innerHTML = t('Edit')
	editBtn.setAttribute(exsied.dataRender.dataAttr().signOriginal, eleSign)
	editBtn.addEventListener('click', async (event) => {
		const elem = event.target as HTMLElement
		const originaSign = elem.getAttribute(exsied.dataRender.dataAttr().signOriginal)
		if (!originaSign) return

		const ele = document.querySelector(`[${exsied.dataRender.dataAttr().sign}="${originaSign}"]`)
		if (ele) pluginConf.editDataCb(ele as HTMLElement, originaSign)
	})

	// Copy
	const copyBtn = document.createElement(TN_BUTTON)
	copyBtn.innerHTML = t('Copy')
	copyBtn.setAttribute(exsied.dataRender.dataAttr().signOriginal, eleSign)
	copyBtn.addEventListener('click', async (_event) => {
		const ele = document.querySelector(`[${exsied.dataRender.dataAttr().sign}="${eleSign}"]`)
		if (ele) await navigator.clipboard.writeText(ele.innerHTML || '')
	})

	// Delete
	const deleteBtn = document.createElement(TN_BUTTON)
	deleteBtn.innerHTML = t('Delete')
	deleteBtn.setAttribute(exsied.dataRender.dataAttr().signOriginal, eleSign)
	deleteBtn.addEventListener('click', async (event) => {
		const elem = event.target as HTMLElement
		const elePreviewBlock = elem.closest(`.${CN_PREVIEW_BLOCK}`)
		if (elePreviewBlock) elePreviewBlock.remove()

		const ele = document.querySelector(`[${exsied.dataRender.dataAttr().sign}="${eleSign}"]`)
		if (ele) {
			const parentEle = ele.parentElement as HTMLElement
			if (tagNameLc(parentEle) === 'pre') parentEle.remove()
			ele.remove()
		}
	})

	exsied.dataRender.addCtrlElements([editBtn, copyBtn, deleteBtn])
}

export function afterSetHtml(exsied: Exsied) {
	const codeEles = exsied.elements.workplace.querySelectorAll(SELECTOR)
	for (const item of codeEles) {
		renderElement(exsied, item)
	}
}

export function beforeGetHtml(exsied: Exsied) {
	const tempEle = document.createElement(TN_DIV)
	tempEle.innerHTML = exsied.elements.workplace.innerHTML
	const codeEles = tempEle.querySelectorAll(SELECTOR)

	for (const item of codeEles) {
		const ele = item as HTMLElement
		ele.removeAttribute(exsied.dataRender.dataAttr().sign)

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
