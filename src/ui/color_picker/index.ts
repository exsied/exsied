/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { CN_TEMP_ELE, DATA_ATTR_TEMP_EDIT } from '../../contants'
import { Exsied } from '../../core'
import { DomUtils } from '../../core/dom_utils'
import { t } from '../../core/i18n'
import './styles.scss'

type ClickColotItemCallback = (color: string) => void

type CurrentValue = {
	b: number
	a: number
}

export const COLOR_TRANSPARENT = 'initial'

export class ColorPicker {
	private exsied: Exsied | null = null
	private cnColorPicker = 'exsied-color-picker'
	private cnGrid = 'exsied-color-grid'
	private cnColorBlock = 'exsied-color-block'
	private cnColorList = 'exsied-color-list'
	private cnPickerBtnA = 'exsied-icon-color-a'
	private cnPickerBtnB = 'exsied-icon-color-b'
	private cnPickerBtnItem = 'exsied-icon-color-item'

	private presetColors: string[] = []
	private stepArr: number[] = []
	private num = 9

	private currentValue: CurrentValue = {
		b: 0,
		a: 1,
	}

	private popupIid: string = ''
	private pluginName: string = ''
	private clickColotItemCallback: ClickColotItemCallback

	constructor(
		exsied: Exsied,
		popupId: string,
		pluginName: string,
		presetColors: string[],
		clickColotItemCallback: ClickColotItemCallback,
	) {
		this.popupIid = popupId
		this.pluginName = pluginName
		this.presetColors = presetColors
		this.clickColotItemCallback = clickColotItemCallback
		this.exsied = exsied
	}

	getRenderData() {
		const step = 255 / this.num
		for (let r = 0; r <= 256; r += step) {
			this.stepArr.push(Math.round(r))
		}

		return {
			html: `
                ${this.genPresetHtml()}

				<div class="picker-color-list">
					${this.genAdjustHtml()}

					<div>${t('Preview')}</div>
					<div class="${this.cnGrid} ${this.cnColorList}">${this.genColorListHtml(0, 1)}</div>
				</div>
				`,
		}
	}

	genColors(b: number, a: number) {
		let colors = []

		for (let i = 0; i < this.stepArr.length; i++) {
			const r = this.stepArr[i]

			let colorsLine = []
			for (let ii = 0; ii < this.stepArr.length; ii++) {
				const g = this.stepArr[ii]

				colorsLine.push(`rgba(${r}, ${g}, ${b}, ${a})`)
			}

			colors.push(colorsLine)
		}

		return colors
	}

	genColorGridHtml(colors: string[][]) {
		let res: string[] = []

		colors.forEach((line, _index) => {
			let innerHtmlLine = ''
			for (const color of line) {
				innerHtmlLine += `
					<div 
						class="${this.cnColorBlock} ${this.cnPickerBtnItem}" 
						style="background-color: ${color}" 
						data-color="${color}">
					</div>`
			}

			res.push(`<div class="${this.cnGrid}">${innerHtmlLine}</div>`)
		})

		return res
	}

	genPresetHtml() {
		let innerHtmlPreset = ''

		const presetLines = this.splitIntoChunks(this.presetColors)
		presetLines.map((line) => {
			let lineColors = ''
			line.map((color) => {
				lineColors += `
					<div 
						class="${this.cnColorBlock}  ${this.cnPickerBtnItem} ${color === COLOR_TRANSPARENT ? 'transparent' : ''}" 
						style="background-color: ${color}" data-color="${color}">
					</div>`
			})
			innerHtmlPreset = `<div class="${this.cnGrid} exsied-color-preset">${lineColors}</div>`
		})
		return innerHtmlPreset
	}

	genAdjustHtml() {
		let elePickerInnerHtmlB = ''
		const bLines = this.splitIntoChunks(this.stepArr)
		bLines.map((line) => {
			line.map((color) => {
				elePickerInnerHtmlB += `
					<div 
						class="${this.cnColorBlock} ${this.cnPickerBtnB}" 
						style="background-color: rgba(0, 0, ${color}, 1)"
						data-b="${color}">
					</div>`
			})
		})

		let elePickerInnerHtmlA = ''
		const alaphArr = [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1]
		alaphArr.forEach((item, _index) => {
			const innerHtmlLine = `
				<div
					class="color-block ${this.cnPickerBtnA}"
					style="background-color: rgba(0, 0, 0, ${item})"
					data-a="${item}"
				></div>
				`

			elePickerInnerHtmlA += innerHtmlLine
		})

		return `
			<div class="color-b">
				<div>${t('Adjust blue')}</div>
				<div class="${this.cnGrid}">
					${elePickerInnerHtmlB}
				</div>
			</div>
			<div class="color-a">
				<div>${t('Adjust transparency')}</div>
				<div class="color-grid">
					${elePickerInnerHtmlA}
				</div>
			</div>
			`
	}

	genColorListHtml(b: number, a: number) {
		let elePickerInnerHtml = ''
		const webSafeColors = this.genColors(b, a)

		const arr = this.genColorGridHtml(webSafeColors)
		arr.map((line) => {
			elePickerInnerHtml += line
		})

		return elePickerInnerHtml
	}

	splitIntoChunks<T>(arr: T[]): T[][] {
		const chunkSize = this.num
		const chunks: T[][] = []

		for (let i = 0; i < arr.length; i += chunkSize) {
			const end = Math.min(i + chunkSize, arr.length)
			chunks.push(arr.slice(i, end))
		}

		return chunks
	}

	showPopup(event: Event) {
		if (!this.exsied) return

		const targetEle = event.target as HTMLAnchorElement
		targetEle.setAttribute(DATA_ATTR_TEMP_EDIT, this.pluginName)

		const renderData = this.getRenderData()

		const scrollTop = window.pageYOffset || window.scrollY
		const scrollLeft = window.pageXOffset || window.scrollX
		const rect = targetEle.getBoundingClientRect()
		const ele = this.exsied.showPopup({
			id: this.popupIid,
			classNames: [CN_TEMP_ELE],
			attrs: { TEMP_EDIT_ID: this.pluginName },
			contentClassNames: [this.cnColorPicker],
			contentHtml: renderData.html,
			top: rect.bottom + scrollTop + 'px',
			left: rect.left + scrollLeft + 'px',
		})

		document.body.appendChild(ele)
		DomUtils.limitElementRect(ele)

		const elePickerBtnA = ele.querySelectorAll(`.${this.cnPickerBtnA}`)
		if (elePickerBtnA) {
			for (const item of elePickerBtnA) {
				const btnEle = item as HTMLElement
				btnEle.addEventListener('click', () => {
					const a = btnEle.getAttribute('data-a')
					if (a) {
						this.currentValue.a = parseFloat(a)

						const eleList = ele.querySelector(`.${this.cnColorList}`)
						if (eleList) {
							eleList.innerHTML = this.genColorListHtml(this.currentValue.b, this.currentValue.a)
							bindColorItemEvent()
						}
					}
				})
			}
		}

		const elePickerBtnB = ele.querySelectorAll(`.${this.cnPickerBtnB}`)
		if (elePickerBtnB) {
			for (const item of elePickerBtnB) {
				const btnEle = item as HTMLElement
				btnEle.addEventListener('click', () => {
					const a = btnEle.getAttribute('data-b')
					if (a) {
						this.currentValue.b = parseInt(a)

						const eleList = ele.querySelector(`.${this.cnColorList}`)
						if (eleList) {
							eleList.innerHTML = this.genColorListHtml(this.currentValue.b, this.currentValue.a)
							bindColorItemEvent()
						}
					}
				})
			}
		}

		const bindColorItemEvent = () => {
			const elePickerBtn = ele.querySelectorAll(`.${this.cnPickerBtnItem}`)
			if (elePickerBtn) {
				for (const item of elePickerBtn) {
					const btnEle = item as HTMLElement
					btnEle.addEventListener('click', () => {
						const color = btnEle.getAttribute('data-color') || ''

						this.clickColotItemCallback(color)
					})
				}
			}
		}

		bindColorItemEvent()
	}
}
