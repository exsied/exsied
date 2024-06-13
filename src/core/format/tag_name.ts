/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { TN_SPAN } from '../../contants'
import { HTMLTagNames } from '../../types'
import { SelectionUtils, SplitElementRes } from '../selection_utils'

const replaceElement = (
	seRes: SplitElementRes,
	replaceAncestor: boolean,
	firstByChildren: boolean,
	middleByChildren: boolean,
	lastByChildren: boolean,
) => {
	const ancestorEle = seRes.ancestorNode as HTMLElement

	if (ancestorEle.nodeType === Node.TEXT_NODE || replaceAncestor) {
		if (lastByChildren) {
			const lastPartArray = Array.from(seRes.lastPart.childNodes)
			lastPartArray.reverse()
			lastPartArray.forEach((item) => {
				ancestorEle.after(item)
			})
		} else {
			ancestorEle.after(seRes.lastPart)
		}

		if (middleByChildren) {
			const middlePartArray = Array.from(seRes.middlePart.childNodes)
			middlePartArray.reverse()
			middlePartArray.forEach((item) => {
				ancestorEle.after(item)
			})
		} else {
			ancestorEle.after(seRes.middlePart)
		}

		if (firstByChildren) {
			const firstPartArray = Array.from(seRes.firstPart.childNodes)
			firstPartArray.reverse()
			firstPartArray.forEach((item) => {
				ancestorEle.after(item)
			})
		} else {
			ancestorEle.after(seRes.firstPart)
		}

		ancestorEle.remove()
	} else {
		ancestorEle.innerHTML = ''

		if (firstByChildren) {
			const firstPartArray = Array.from(seRes.firstPart.childNodes)
			firstPartArray.forEach((item) => {
				ancestorEle.appendChild(item)
			})
		} else {
			ancestorEle.appendChild(seRes.firstPart)
		}

		if (middleByChildren) {
			const middlePartArray = Array.from(seRes.middlePart.childNodes)
			middlePartArray.forEach((item) => {
				ancestorEle.appendChild(item)
			})
		} else {
			ancestorEle.appendChild(seRes.middlePart)
		}

		if (lastByChildren) {
			const lastPartArray = Array.from(seRes.lastPart.childNodes)
			lastPartArray.forEach((item) => {
				ancestorEle.appendChild(item)
			})
		} else {
			ancestorEle.appendChild(seRes.lastPart)
		}
	}
}

export class FormatTaName {
	static formatSelected = (tagName: HTMLTagNames, range?: Range, className?: string) => {
		const seRes = SelectionUtils.splitElement(null, tagName, null, false, null, range)
		if (!seRes) return

		if (className) seRes.middlePart.className = className

		replaceElement(seRes, false, true, false, true)
	}

	static unformatSelected = (tagName: HTMLTagNames) => {
		const seRes = SelectionUtils.splitElement(tagName, tagName, tagName, true, tagName)
		if (!seRes) return

		if (seRes.ancestorNode === seRes.middlePart) {
			const middlePart = seRes.middlePart
			const ancestorEle = seRes.ancestorNode as HTMLElement

			if (middlePart.childNodes.length === 1 && middlePart.firstChild?.nodeType === Node.TEXT_NODE) {
				const node = document.createTextNode(middlePart.firstChild.textContent || '')
				ancestorEle.after(node)
			} else {
				const node = document.createElement(TN_SPAN)
				if (middlePart.nodeType === Node.TEXT_NODE) {
					node.innerHTML = middlePart.textContent || ''
				} else if (middlePart.nodeType === Node.ELEMENT_NODE) {
					node.innerHTML = middlePart.innerHTML
				}

				ancestorEle.after(node)
			}

			ancestorEle.remove()

			return
		}

		replaceElement(seRes, true, false, true, false)
	}
}
