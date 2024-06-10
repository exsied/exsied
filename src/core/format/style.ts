/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License,
 * and if you do not meet the conditions, authorization is required
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { TN_SPAN, ZERO_WIDTH_SPACE } from '../../contants'
import { isOnlyWhitespace } from '../../utils/string'
import { DomUtils } from '../dom_utils'

export class FormatStyle {
	static formatSelected = (style: CSSStyleDeclaration) => {
		const selection = window.getSelection()
		if (!selection) return
		const range = selection.getRangeAt(0)
		if (!range) return

		const startNode = range.startContainer
		const startOffset = range.startOffset
		const endNode = range.endContainer
		const endOffset = range.endOffset

		if (startNode.nodeType !== Node.TEXT_NODE) {
			console.error('startNode is not a text node')

			return
		}

		let stop = false

		// First part
		const formatFirstPart = () => {
			const textNode = startNode as Text
			const span = document.createElement(TN_SPAN)
			DomUtils.setStyleProperty(span, style)

			if (startNode === endNode) {
				if (startOffset < textNode.length) {
					const newNode = textNode.splitText(startOffset)
					const finalNode = newNode.splitText(endOffset - startOffset)

					span.appendChild(newNode)
					textNode.after(span)
					span.after(finalNode)
				} else if (startOffset === textNode.length) {
					span.innerHTML = textNode.textContent || ''
					textNode.after(span)

					textNode.textContent = ZERO_WIDTH_SPACE
				}

				stop = true
				return
			} else {
				const newNode = textNode.splitText(startOffset)
				textNode.parentNode!.insertBefore(span, newNode)

				span.appendChild(newNode)
			}
		}

		// Last part
		const formatEndNode = (node: ChildNode) => {
			const span = document.createElement(TN_SPAN)
			DomUtils.setStyleProperty(span, style)

			const textContent = endNode.textContent || ''

			if (endOffset === textContent.length) {
				if (node.nodeType === Node.TEXT_NODE) {
					span.innerHTML = textContent
					DomUtils.setStyleProperty(span, style)

					node.after(span)
					node.remove()
				}
			} else {
				span.innerHTML = textContent?.substring(0, endOffset)

				endNode.textContent = textContent?.substring(endOffset, textContent.length)
				endNode.parentNode?.insertBefore(span, endNode)
			}
		}
		const formatLastPart = (node: ChildNode): boolean | undefined => {
			if (node.nodeType === Node.TEXT_NODE) {
				const textNode = endNode as Text
				const span = document.createElement(TN_SPAN)

				if (endOffset < textNode.length) {
					const newNode = textNode.splitText(endOffset)

					span.innerHTML = textNode.textContent || ''
					textNode.after(span)
					span.after(newNode)

					textNode.textContent = ZERO_WIDTH_SPACE
				} else if (endOffset === textNode.length) {
					span.innerHTML = textNode.textContent || ''
					textNode.after(span)

					textNode.textContent = ZERO_WIDTH_SPACE
				}
				DomUtils.setStyleProperty(span, style)

				return
			}

			for (const item of node.childNodes) {
				if (item.contains(endNode)) {
					const stop = formatLastPart(item)
					if (stop) return stop
				}

				if (item === endNode) {
					formatEndNode(item)

					return true
				}

				if (item.nodeType === Node.TEXT_NODE) {
					const span = document.createElement(TN_SPAN)
					span.innerHTML = item.textContent || ''
					DomUtils.setStyleProperty(span, style)

					item.after(span)
					item.textContent = ZERO_WIDTH_SPACE
				} else {
					DomUtils.setStyleProperty(item as HTMLElement, style)
				}
			}
		}

		formatFirstPart()
		if (stop) return

		let currentNode: ChildNode | null = startNode as ChildNode
		while (currentNode) {
			currentNode = DomUtils.getNextNode(currentNode)

			if (!currentNode) break

			if (currentNode.contains(endNode)) {
				formatLastPart(currentNode)

				break
			}

			if (currentNode === endNode) {
				formatLastPart(currentNode)

				break
			}

			if (currentNode.nodeType === Node.TEXT_NODE) {
				const textContent = currentNode.textContent || ''

				if (isOnlyWhitespace(textContent)) continue

				const span = document.createElement(TN_SPAN)
				span.innerHTML = textContent

				DomUtils.setStyleProperty(span, style)

				currentNode.after(span)
				currentNode.textContent = ZERO_WIDTH_SPACE
			} else {
				const ele = currentNode as HTMLElement
				DomUtils.setStyleProperty(ele, style)
			}
		}
	}

	static formatBlockEle = (ele: HTMLElement, style: CSSStyleDeclaration, isBlock?: boolean) => {
		let elem = isBlock ? ele : DomUtils.getBlockEle(ele)
		if (elem) DomUtils.setStyleProperty(elem, style)
	}
}
