/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { DomUtils } from '../../core/dom_utils'

export class FindAndReplace {
	static findRanges(rootNode: HTMLElement, findText: string, isReMode?: boolean) {
		const ranges: Range[] = []
		let re = null

		if (isReMode) {
			try {
				let safePatternString = findText
				re = new RegExp(safePatternString)
			} catch (error) {
				console.error('new RegExp error')

				return ranges
			}
		}

		function traverseTextNodes(node: Node, re: RegExp | null) {
			if (node.nodeType === Node.TEXT_NODE && node.textContent) {
				let text = ''
				let index = 0

				if (re === null) {
					text = findText
					index = node.textContent.indexOf(text)
				} else {
					let matches = node.textContent.match(re)
					if (matches) {
						text = matches[0]
						index = node.textContent.indexOf(text)
					}
				}

				while (text !== '' && index >= 0) {
					let range = document.createRange()
					range.setStart(node, index)
					range.setEnd(node, index + text.length)
					ranges.push(range)

					index = node.textContent.indexOf(text, index + text.length)
				}
			}

			for (let i = 0; i < node.childNodes.length; i++) {
				traverseTextNodes(node.childNodes[i], re)
			}
		}

		traverseTextNodes(rootNode, re)
		return ranges
	}

	static replaceText(range: Range, replaceText: string) {
		try {
			const rng = document.createRange()

			rng.setStart(range.startContainer, range.startOffset)
			rng.setEnd(range.endContainer, range.endOffset)
			rng.deleteContents()

			const textNode = document.createTextNode(replaceText)
			DomUtils.insertNodeAfterRange(rng, textNode)
		} finally {
		}
	}

	static replaceTextAll(container: HTMLElement, findText: string, replaceText: string, isReMode?: boolean) {
		const ranges = this.findRanges(container, findText, isReMode)
		if (ranges) {
			for (const range of ranges) {
				this.replaceText(range, replaceText)
			}
		}
	}
}
