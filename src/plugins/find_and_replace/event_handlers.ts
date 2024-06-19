/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { CN_ACTIVE, CN_TEMP_ELE, CN_TEMP_ELE_HIGHLIGHT, TN_SPAN } from '../../contants'
import { exsied } from '../../core'
import { DomUtils } from '../../core/dom_utils'
import { FormatTaName } from '../../core/format/tag_name'
import { createPopupView } from '../../ui/popup_view'
import { CN_FIND, CN_REGEX, PLUGIN_NAME, POPUP_ID } from './base'
import { FindAndReplace } from './find'

const CN_FIND_BOX = 'exsied-find-box'
const CN_FIND_ACTIONS = 'exsied-find-actions'
const CN_FIND_INPUT = 'exsied-find-input'
const CN_FIND_COUNT = 'exsied-find-count'
const CN_FIND_COUNT_CURRENT = 'exsied-find-count-current'
const CN_FIND_COUNT_TOTAL = 'exsied-find-count-total'
const CN_REPLACE_INPUT = 'exsied-replace-input'
const CN_PREV = 'exsied-prev'
const CN_NEXT = 'exsied-next'
const CN_CLOSE = 'exsied-close'
const CN_HIGHLIGHT_ALL = 'exsied-hightlight-all'
const CN_REPLACE_THIS = 'exsied-replace-this'
const CN_REPLACE_ALL = 'exsied-replace-all'

let findText = ''
let replaceText = ''
let currentPosition = 0
let totalCount = 0
let isReMode = false

export function reset() {
	findText = ''
	replaceText = ''
	currentPosition = 0
	totalCount = 0
}

export function showFindBox(top: number, left: number, isReplace: boolean) {
	let contentHtml = `
		<div class="${CN_FIND_BOX}">
			<input class="${CN_FIND_INPUT}"/>
			<div class="${CN_FIND_ACTIONS}">
				<div class="exsied-btn ${CN_REGEX}">
					<i class="exsied-icon exsied-icon-regex"></i>
				</div>
				<div class="${CN_FIND_COUNT}">
					<div class="${CN_FIND_COUNT_CURRENT}">0</div>
					/
					<div class="${CN_FIND_COUNT_TOTAL}">0</div>
				</div>
				<div class="exsied-btn ${CN_PREV}">
					<i class="exsied-icon exsied-icon-prev"></i>
				</div>
				<div class="exsied-btn ${CN_NEXT}">
					<i class="exsied-icon exsied-icon-next"></i>
				</div>
				<div class="exsied-btn ${CN_HIGHLIGHT_ALL}">
					<i class="exsied-icon exsied-icon-hightlight-all"></i>
				</div>
				<div class="exsied-btn ${CN_CLOSE}">
					<i class="exsied-icon exsied-icon-close"></i>
				</div>
			</div>
		</div>
		`
	if (isReplace) {
		contentHtml += `
			<div class="${CN_FIND_BOX}">
				<input class="${CN_REPLACE_INPUT}"/>
				<div class="${CN_FIND_ACTIONS}">
					<div class="exsied-btn ${CN_REPLACE_THIS}">
						<i class="exsied-icon exsied-icon-replace-this"></i>
					</div>
					<div class="exsied-btn ${CN_REPLACE_ALL}">
						<i class="exsied-icon exsied-icon-replace-all"></i>
					</div>
				</div>
			</div>
			`
	}

	const ele = createPopupView({
		id: POPUP_ID,
		classNames: [CN_TEMP_ELE, CN_FIND_BOX],
		attrs: { TEMP_EDIT_ID: PLUGIN_NAME },
		contentClassNames: [CN_FIND],
		contentAttrs: {},
		contentHtml,
	})

	ele.style.position = 'absolute'
	ele.style.top = top + 'px'
	ele.style.left = left + 'px'

	document.body.appendChild(ele)
	DomUtils.limitElementRect(ele)

	// regex button
	const eleRegex = ele.querySelector(`.${CN_REGEX}`)
	if (eleRegex) {
		eleRegex.addEventListener('click', (_event) => {
			if (eleRegex.classList.contains(CN_ACTIVE)) {
				eleRegex.classList.remove(CN_ACTIVE)
			} else {
				eleRegex.classList.add(CN_ACTIVE)
				isReMode = !isReMode
			}
		})
	}

	// find text input
	const eleInput = ele.querySelector(`.${CN_FIND_INPUT}`)
	const eleCurrentPosition = ele.querySelector(`.${CN_FIND_COUNT_CURRENT}`)
	const eleTotal = ele.querySelector(`.${CN_FIND_COUNT_TOTAL}`)
	if (eleInput) {
		;(eleInput as HTMLInputElement).focus()
		eleInput.addEventListener('input', (event) => {
			const targetInput = event.target as HTMLInputElement
			findText = targetInput.value
			if (!findText) return

			const ranges = FindAndReplace.findRanges(exsied.elements.workplace as HTMLElement, findText, isReMode)
			if (ranges.length > 0) {
				currentPosition = 0
				totalCount = ranges ? ranges.length : 0

				if (eleCurrentPosition) eleCurrentPosition.innerHTML = `${currentPosition + 1}`
				if (eleTotal) eleTotal.innerHTML = `${totalCount}`

				const range = ranges[currentPosition]
				FormatTaName.formatSelected(TN_SPAN, range, `${CN_TEMP_ELE_HIGHLIGHT}`)
			} else {
				reset()
			}
		})
	}

	// prev button
	const elePrev = ele.querySelector(`.${CN_PREV}`)
	if (elePrev) {
		elePrev.addEventListener('click', (_event) => {
			clearHighLight()
			currentPosition--
			if (currentPosition < 0) {
				currentPosition = totalCount - 1
			}

			const ranges = FindAndReplace.findRanges(exsied.elements.workplace as HTMLElement, findText, isReMode)
			if (!ranges) return

			if (eleCurrentPosition) eleCurrentPosition.innerHTML = `${currentPosition + 1}`

			const range = ranges[currentPosition]
			FormatTaName.formatSelected(TN_SPAN, range, CN_TEMP_ELE_HIGHLIGHT)
		})
	}

	// next button
	const eleNext = ele.querySelector(`.${CN_NEXT}`)
	if (eleNext) {
		eleNext.addEventListener('click', (_event) => {
			clearHighLight()
			currentPosition++
			if (currentPosition > totalCount) {
				currentPosition = 0
			}

			if (eleCurrentPosition) eleCurrentPosition.innerHTML = `${currentPosition + 1}`

			const ranges = FindAndReplace.findRanges(exsied.elements.workplace as HTMLElement, findText, isReMode)
			if (!ranges) return
			const range = ranges[currentPosition]

			FormatTaName.formatSelected(TN_SPAN, range, `${CN_TEMP_ELE_HIGHLIGHT}`)
		})
	}

	// highlight button
	const elehHighlightALl = ele.querySelector(`.${CN_HIGHLIGHT_ALL}`)
	if (elehHighlightALl) {
		elehHighlightALl.addEventListener('click', (_event) => {
			if (findText === '') return

			const ranges = FindAndReplace.findRanges(exsied.elements.workplace as HTMLElement, findText, isReMode)
			if (!ranges) return

			FormatTaName.formatSelected(TN_SPAN, ranges[0], `${CN_TEMP_ELE_HIGHLIGHT}`)

			const highlightByIndex = (index: number) => {
				const ranges = FindAndReplace.findRanges(exsied.elements.workplace as HTMLElement, findText, isReMode)
				if (!ranges) return

				FormatTaName.formatSelected(TN_SPAN, ranges[index], `${CN_TEMP_ELE_HIGHLIGHT}`)
			}

			let index = 0
			for (const _iterator of ranges) {
				if (index > 0) highlightByIndex(index)
				index++
			}
		})
	}

	// close button
	const eleClose = ele.querySelector(`.${CN_CLOSE}`)
	if (eleClose) {
		eleClose.addEventListener('click', (_event) => {
			ele.remove()
			clearHighLight()
			reset()
		})
	}

	// replace text input
	const eleReplaceInput = ele.querySelector(`.${CN_REPLACE_INPUT}`)
	if (eleReplaceInput) {
		eleReplaceInput.addEventListener('input', (event) => {
			const targetInput = event.target as HTMLInputElement
			replaceText = targetInput.value
		})
	}

	// replace this button
	const eleReplaceThis = ele.querySelector(`.${CN_REPLACE_THIS}`)
	if (eleReplaceThis) {
		eleReplaceThis.addEventListener('click', (_event) => {
			if (findText === '') return

			const ranges = FindAndReplace.findRanges(exsied.elements.workplace as HTMLElement, findText, isReMode)
			if (!ranges) return

			const range = ranges[currentPosition - 1]
			FindAndReplace.replaceText(range, replaceText)
		})
	}

	// replace all button
	const eleReplaceAll = ele.querySelector(`.${CN_REPLACE_ALL}`)
	if (eleReplaceAll) {
		eleReplaceAll.addEventListener('click', (_event) => {
			if (findText === '') return

			const ranges = FindAndReplace.findRanges(exsied.elements.workplace as HTMLElement, findText, isReMode)
			if (!ranges) return

			FindAndReplace.replaceTextAll(exsied.elements.workplace as HTMLElement, findText, replaceText)
		})
	}

	return ele
}

export function onClick(event: Event, isReplace: boolean) {
	const targetEle = event.target as HTMLAnchorElement
	const rect = targetEle.getBoundingClientRect()

	showFindBox(rect.bottom, rect.left, isReplace)
}

export function onClickFind(event: Event) {
	onClick(event, false)
}

export function onClickReplace(event: Event) {
	onClick(event, true)
}

const clearHighLight = () => {
	DomUtils.promoteChildNodesByTagName(TN_SPAN, CN_TEMP_ELE_HIGHLIGHT)
}
