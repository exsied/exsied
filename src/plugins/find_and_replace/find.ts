/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License,
 * and if you do not meet the conditions, authorization is required
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { HTMLTagNames } from '../../types'
import { tagNameLc } from '../../utils'

const TN_INSEPARABLE: Set<HTMLTagNames> = new Set([
	'br',
	'hr',
	'iframe',
	'img',
	'input',
	'link',
	'script',
	'textarea',
	'video',
])

const isFragment = (node: Node) => {
	return node.nodeType === Node.DOCUMENT_FRAGMENT_NODE && node.ownerDocument?.defaultView
}

const isInTagNames = (node: Node, tagNames: Set<HTMLTagNames>): node is HTMLElementTagNameMap[HTMLTagNames] => {
	if (!(node.nodeType === Node.ELEMENT_NODE)) return false

	const tagName = tagNameLc(node as HTMLElement)
	return tagNames.has(tagName) || tagNames.has(tagName.toLowerCase() as HTMLTagNames)
}

const insertNodeAfter = (ele: Node, newEle: Node | DocumentFragment) => {
	const { parentNode } = ele
	if (!parentNode) return

	if (parentNode.lastChild === ele) {
		parentNode.appendChild(newEle)
	} else {
		parentNode.insertBefore(newEle, ele.nextSibling)
	}
}

const insertNode = (range: Range, node: Node) => {
	range.collapsed || range.deleteContents()
	const child = isFragment(node) ? node.lastChild : node

	if (
		range.startContainer === range.endContainer &&
		range.collapsed &&
		isInTagNames(range.startContainer, TN_INSEPARABLE)
	) {
		insertNodeAfter(range.startContainer, node)
	} else {
		range.insertNode(node)
		child && range.setStartBefore(child)
	}

	range.collapse(true)
	;[node.nextSibling, node.previousSibling].forEach((n) => {
		n && n.nodeType === Node.TEXT_NODE && !n.nodeValue && n.parentNode && n.parentNode.removeChild(node)
	})
}

export class FindAndReplace {
	static findRanges(rootNode: HTMLElement, findText: string) {
		const ranges: Range[] = []

		function traverseTextNodes(node: Node) {
			if (node.nodeType === Node.TEXT_NODE && node.textContent) {
				let index = node.textContent.indexOf(findText)
				while (index !== -1) {
					let range = document.createRange()
					range.setStart(node, index)
					range.setEnd(node, index + findText.length)
					ranges.push(range)

					index = node.textContent.indexOf(findText, index + findText.length)
				}
			}

			for (let i = 0; i < node.childNodes.length; i++) {
				traverseTextNodes(node.childNodes[i])
			}
		}

		traverseTextNodes(rootNode)
		return ranges
	}

	static replaceText(range: Range, replaceText: string) {
		try {
			const rng = document.createRange()

			rng.setStart(range.startContainer, range.startOffset)
			rng.setEnd(range.endContainer, range.endOffset)
			rng.deleteContents()

			const textNode = document.createTextNode(replaceText)
			insertNode(rng, textNode)
		} finally {
		}
	}

	static replaceTextAll(container: HTMLElement, findText: string, replaceText: string) {
		const ranges = this.findRanges(container, findText)
		if (ranges) {
			for (const range of ranges) {
				this.replaceText(range, replaceText)
			}
		}
	}
}
