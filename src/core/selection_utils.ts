/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { Exsied } from '.'
import { TN_SPAN, TN_TEMP } from '../contants'
import { HTMLTagNames } from '../types'
import { tagNameLc } from '../utils'
import { DomUtils } from './dom_utils'

export type SplitElementRes = {
	ancestorNode: Node
	firstPart: HTMLElement
	middlePart: HTMLElement
	lastPart: HTMLElement
	range: Range
}

export class SelectionUtilsInExsied {
	private exsied: Exsied | null = null

	constructor(exsied: Exsied) {
		this.exsied = exsied
	}

	backupSelection = () => {
		const selection = window.getSelection()
		if (!selection) return
		if (selection.rangeCount > 0) {
			if (this.exsied) this.exsied.range = selection.getRangeAt(0)
		}
	}

	restoreSelection = () => {
		const selection = window.getSelection()
		if (!selection) return

		selection.removeAllRanges()
		if (this.exsied && this.exsied.range) {
			selection.addRange(this.exsied.range)
		}
	}

	addElementBySelection = (rootNode: HTMLElement, node: Node) => {
		if (!rootNode || !rootNode.contentEditable || rootNode.contentEditable !== 'true') {
			throw new Error('The provided element is not editable or does not exist.')
		}

		let range: Range | null = null
		const sel = window.getSelection()
		if (sel && sel.rangeCount > 0) {
			range = sel.getRangeAt(0)
			range.deleteContents()
		}

		if (!range) {
			range = document.createRange()
			range.selectNodeContents(rootNode)
			range.collapse(true)
		}

		if (this.exsied) {
			const workplaceEle = this.exsied.elements.workplace
			if (workplaceEle.contains(range.startContainer) && workplaceEle.contains(range.endContainer)) {
				range.insertNode(node)
			}
		}
	}
}

export class SelectionUtils {
	static getSelectedEles = () => {
		const selection = window.getSelection()
		if (!selection || selection.rangeCount === 0) return

		const ele = document.createElement(TN_SPAN)
		const range = selection.getRangeAt(0)
		const middleFragment = range.cloneContents()
		if (middleFragment.childNodes.length > 0) {
			while (middleFragment.firstChild) {
				ele.appendChild(middleFragment.firstChild.cloneNode(true))
				middleFragment.firstChild.remove()
			}
		}

		return ele
	}

	static getSelectedText = () => {
		const selectedEles = this.getSelectedEles()
		if (selectedEles) return selectedEles.textContent || ''

		return ''
	}

	static getCursorNode = (rootEle?: HTMLElement) => {
		const selection = window.getSelection()
		if (!selection) return
		if (selection.rangeCount > 0) {
			const range = selection.getRangeAt(0)
			const startNode = range.startContainer

			if (startNode.nodeType === Node.TEXT_NODE) {
				if (rootEle && startNode.parentNode && startNode.parentNode.isSameNode(rootEle)) {
					return startNode
				} else {
					return startNode.parentNode
				}
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
		_exsied: Exsied,
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
					range,
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
			range,
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

	static moveCursorToEle = (targetDiv: HTMLElement) => {
		if (!targetDiv) return

		targetDiv.focus()

		const selection = window.getSelection()
		const range = document.createRange()

		range.setStart(targetDiv, 0)
		range.setEnd(targetDiv, 0)

		if (selection) {
			selection.removeAllRanges()
			selection.addRange(range)
		}
	}
}
