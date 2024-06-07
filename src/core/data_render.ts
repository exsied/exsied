import { TN_DIV } from '../contants'
import { tagNameLc } from '../utils'

export const CN_PREVIEW_BLOCK = 'exsied-data-preview-block'
export const CN_PREVIEW_RESULT = 'exsied-data-preview-result'
export const CN_PREVIEW_CTRLS = 'exsied-data-preview-ctrls'
export const DATA_ATTR_SIGN = 'data-exsied-sign'
export const DATA_ATTR_ORIGINAL_SIGN = 'data-exsied-original-sign'

export class DataRender {
	ele: HTMLElement | null = null
	private previewEle: HTMLElement | null = null

	constructor() {}

	setEle(ele: HTMLElement, eleSign: string) {
		this.ele = ele

		ele.setAttribute(DATA_ATTR_SIGN, eleSign)
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
		if (tagNameLc(parentEle) === 'pre') {
			parentEle.after(this.previewEle)
			parentEle.style.display = 'none'
		} else {
			this.ele.after(this.previewEle)
			this.ele.style.display = 'none'
		}
	}

	addCtrlElement(ctrlElements: HTMLElement[]) {
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
