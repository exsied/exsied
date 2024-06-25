/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { exsied } from '.'
import { TN_DIV } from '../contants'
import { tagNameLc } from '../utils'

export const CN_PREVIEW_BLOCK = 'exsied-data-preview-block'
export const CN_PREVIEW_RESULT = 'exsied-data-preview-result'
export const CN_PREVIEW_CTRLS = 'exsied-data-preview-ctrls'
export function dataAttr() {
	return {
		sign: exsied.dataAttrs?.sign || 'data-exsied-sign',
		signOriginal: exsied.dataAttrs?.signOriginal || 'data-exsied-original-sign',
	}
}

export class DataRender {
	ele: HTMLElement | null = null
	private previewEle: HTMLElement | null = null

	constructor() {}

	setEle(ele: HTMLElement, eleSign: string) {
		this.ele = ele

		ele.setAttribute(dataAttr().sign, eleSign)
	}

	render(renderHtml: string) {
		if (!this.ele) {
			console.error('DataRender.ele is null')
			return
		}

		this.previewEle = document.createElement(TN_DIV)
		this.previewEle.innerHTML = `
			<div class="${CN_PREVIEW_CTRLS}"></div>
			<div class="${CN_PREVIEW_RESULT}"></div>
            `
		this.previewEle.classList.add(CN_PREVIEW_BLOCK)
		this.previewEle.contentEditable = 'false'

		const retuleEle = this.previewEle.querySelector(`.${CN_PREVIEW_RESULT}`)
		if (!retuleEle) {
			console.error(`.${CN_PREVIEW_RESULT} not exist`)
			return
		}

		retuleEle.innerHTML = renderHtml

		const parentEle = this.ele.parentElement as HTMLElement
		let eee: HTMLElement | null = null
		if (tagNameLc(parentEle) === 'pre') {
			eee = parentEle
		} else {
			eee = this.ele
		}

		if (eee.nextElementSibling?.classList.contains(CN_PREVIEW_BLOCK)) {
			eee.nextElementSibling.remove()
		}
		eee.after(this.previewEle)
		eee.style.display = 'none'
	}

	addCtrlElements(ctrlElements: HTMLElement[]) {
		if (!this.previewEle) {
			console.error(`previewEle not exist`)
			return
		}

		const ctrlEle = this.previewEle.querySelector(`.${CN_PREVIEW_CTRLS}`)
		if (!ctrlEle) {
			console.error(`.${CN_PREVIEW_CTRLS} not exist`)
			return
		}

		for (const item of ctrlElements) {
			ctrlEle.append(item)
		}
	}
}
