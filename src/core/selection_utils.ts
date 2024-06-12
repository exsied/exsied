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
import { TN_SPAN, TN_TEMP } from '../contants'
import { HTMLTagNames } from '../types'
import { tagNameLc } from '../utils'
import { DomUtils } from './dom_utils'

export type SplitElementRes = {
	ancestorNode: Node
	firstPart: HTMLElement
	middlePart: HTMLElement
	lastPart: HTMLElement
}

export class SelectionUtils {
	static getRange = () => {
		return exsied.range
	}

	static setRange = (r: Range) => {
		exsied.range = r
	}

	static backupSelection = () => {
		const selection = window.getSelection()
		if (!selection) return
		if (selection.rangeCount > 0) {
			exsied.range = selection.getRangeAt(0)
		}
	}

	static restoreSelection = () => {
		const selection = window.getSelection()
		if (!selection) return

		selection.removeAllRanges()
		if (exsied.range) {
			selection.addRange(exsied.range)
		}
	}

	static getSelectedEles = () => {
		const selection = window.getSelection()
		if (!selection || selection.rangeCount === 0) return

		const middlePart = document.createElement(TN_SPAN)
		const range = selection.getRangeAt(0)
		const middleFragment = range.cloneContents()
		if (middleFragment.childNodes.length > 0) {
			while (middleFragment.firstChild) {
				middlePart.appendChild(middleFragment.firstChild.cloneNode(true))
				middleFragment.firstChild.remove()
			}
		}

		return middlePart
	}

	static getSelectedText = () => {
		const selectedEles = this.getSelectedEles()
		if (selectedEles) return selectedEles.textContent || ''

		return ''
	}

	static getCursorNode = () => {
		const selection = window.getSelection()
		if (!selection) return
		if (selection.rangeCount > 0) {
			const range = selection.getRangeAt(0)
			const startNode = range.startContainer

			if (startNode.nodeType === Node.TEXT_NODE) {
				return startNode.parentNode
			} else if (range.collapsed) {
				return startNode
			}
		}

		return null
	}

	static copyRangeToEle = (ele: HTMLElement, range: Range) => {
		const firstFragment = range.cloneContents()
		if (firstFragment.childNodes.length > 0) {
			while (firstFragment.firstChild) {
				ele.appendChild(firstFragment.firstChild.cloneNode(true))
				firstFragment.firstChild.remove()
			}
		}
	}

	static splitElement = (
		firstTagName: HTMLTagNames | null,
		middleTagName: HTMLTagNames,
		lastTagName: HTMLTagNames | null,
		ancestorNodeByTagName: boolean,
		ancestorTagName: HTMLTagNames | null,
		rangeIpt?: Range,
	) => {
		let range = rangeIpt
		if (!range) {
			const selection = window.getSelection()
			if (!selection) return
			range = selection.getRangeAt(0)
		}

		if (!range) return

		const startNode = range.startContainer
		const startOffset = range.startOffset
		const endNode = range.endContainer
		const endOffset = range.endOffset

		let ancestorNode = null
		const firstPart = document.createElement(firstTagName ? firstTagName : TN_TEMP)
		const middlePart = document.createElement(middleTagName)
		const lastPart = document.createElement(lastTagName ? lastTagName : TN_TEMP)

		if (ancestorNodeByTagName) {
			const secondNode = DomUtils.getNextNode(startNode)

			if (
				(startNode as Element).textContent?.length === startOffset &&
				endOffset === 0 &&
				secondNode &&
				secondNode.nodeType === Node.ELEMENT_NODE &&
				tagNameLc(secondNode as HTMLElement) === middleTagName &&
				DomUtils.getNextNode(secondNode) === endNode
			) {
				return {
					ancestorNode: secondNode,
					firstPart,
					middlePart: secondNode as HTMLElement,
					lastPart,
				} as SplitElementRes
			} else {
				if (ancestorTagName)
					ancestorNode = DomUtils.findClosestAncestorByTagName(range.commonAncestorContainer, ancestorTagName)
			}
		} else {
			ancestorNode = range.commonAncestorContainer
		}

		if (!ancestorNode) return

		this.copyRangeToEle(middlePart, range)

		const firstRange = document.createRange()
		firstRange.setStart(ancestorNode, 0)
		firstRange.setEnd(startNode, startOffset)
		this.copyRangeToEle(firstPart, firstRange)

		const lastRange = document.createRange()
		lastRange.setStart(endNode, endOffset)

		const lastChild = ancestorNode.nodeType === Node.TEXT_NODE ? ancestorNode : ancestorNode.lastChild
		if (!lastChild) {
			console.error('No last child found')
			return
		}

		if (lastChild.nodeType === Node.TEXT_NODE) {
			lastRange.setEnd(lastChild, lastChild.textContent?.length || 0)
		} else {
			lastRange.setEndAfter(lastChild)
		}
		this.copyRangeToEle(lastPart, lastRange)

		return {
			ancestorNode,
			firstPart,
			middlePart,
			lastPart,
		} as SplitElementRes
	}

	static getRangeRect() {
		const selection = window.getSelection()
		if (!selection) return

		const range = selection.getRangeAt(0)
		const rangeRect = range.getBoundingClientRect()
		return {
			left: rangeRect.left,
			right: rangeRect.right,
			top: rangeRect.top,
			bottom: rangeRect.bottom,
		}
	}

	static hasSelectedContent() {
		const selection = window.getSelection()
		if (selection && selection.rangeCount > 0) {
			const selectedText = selection.toString()
			if (selectedText.length > 0) return true
		}

		return false
	}
}
