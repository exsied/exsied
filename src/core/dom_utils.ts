/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License,
 * and if you do not meet the conditions, authorization is required
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { TN_DIV, TN_P } from '../contants'
import { HTMLTagNames } from '../types'
import { tagNameLc } from '../utils'

export class DomUtils {
	static getBlockEle = (ele: HTMLElement) => {
		let elem = null

		if (ele.tagName === TN_P) elem = ele
		if (ele.tagName === TN_DIV) elem = ele
		if (!elem) elem = ele.closest(TN_P)
		if (!elem) elem = ele.closest(TN_DIV)

		return elem
	}

	static getAllParentTagNames = (element: HTMLElement, rootEle: HTMLElement) => {
		let parentsTagNameArr: HTMLTagNames[] = []
		let currentNode: Node | null | undefined = element?.parentNode

		while (currentNode) {
			if (currentNode instanceof HTMLElement) {
				if (currentNode === rootEle) return parentsTagNameArr
				parentsTagNameArr.push(tagNameLc(currentNode))
			}

			currentNode = currentNode.parentNode
		}

		return parentsTagNameArr
	}

	static getParentsStyleByKey = (element: HTMLElement, styleKey: string) => {
		let current: HTMLElement | null = element

		while (current) {
			if (current instanceof HTMLElement) {
				const sv = current.style.getPropertyValue(styleKey)
				if (sv !== '') return sv
			}

			current = current.parentElement
		}

		return ''
	}

	static existElementById(id: string) {
		const element = document.getElementById(id)
		if (element) return true
		return false
	}

	static removeElementById(id: string) {
		const element = document.getElementById(id)
		if (element) element.parentNode?.removeChild(element)
	}

	static removeElementByClass(className: string) {
		const elements = document.getElementsByClassName(`.${className}`)
		for (let i = elements.length - 1; i >= 0; i--) {
			const element = elements[i]
			element.remove()
		}
	}

	static addElementBySelection = (rootNode: HTMLElement, node: Node) => {
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

		range.insertNode(node)
	}

	static tableAddRow(table: HTMLTableElement, index: number) {
		if (!table) return

		const newRowOrCell = document.createElement('tr')
		newRowOrCell.innerHTML = '<td><br/></td>'.repeat(table.rows[0].cells.length)

		table.tBodies[0].insertBefore(newRowOrCell, table.rows[index])
	}

	static tableAddColumn(table: HTMLTableElement, index: number) {
		if (!table) return

		for (let i = 0; i < table.rows.length; i++) {
			const newCell = document.createElement('td')

			table.rows[i].insertBefore(newCell, table.rows[i].cells[index])
		}
	}

	static tableDeleteRow(table: HTMLTableElement, index: number) {
		if (!table) return
		if (index >= 0 && index < table.rows.length) table.deleteRow(index)
	}

	static tableDeleteColumn(table: HTMLTableElement, index: number) {
		if (!table) return

		for (let i = table.rows.length - 1; i >= 0; i--) {
			table.rows[i].deleteCell(index)
		}
	}

	static setStyleProperty(ele: HTMLElement, style: CSSStyleDeclaration) {
		for (let prop in style) {
			ele.style[prop] = style[prop]
		}
	}

	static removeStyleProperty(element: HTMLElement, keyString: string) {
		const style = element.getAttribute('style')

		if (style) {
			const newStyle = style.replace(new RegExp(`${keyString}\\s*:\\s*[^;]*;`, 'gi'), '')

			if (newStyle.trim() === '') {
				element.removeAttribute('style')
			} else {
				element.setAttribute('style', newStyle)
			}
		}
	}

	static setClassName(element: HTMLElement, className: string) {
		let newClass = className
		const cls = element.getAttribute('class')
		if (cls) newClass += ` ${cls}`
		element.setAttribute('class', newClass)
	}

	static removeClassName(element: HTMLElement, className: string) {
		const cls = element.getAttribute('class')
		if (cls) {
			let newClass: string[] = []
			const arr = cls.split(' ')
			arr.map((cls) => {
				if (cls !== className) newClass.push(cls)
			})
			element.setAttribute('class', newClass.join(' '))
		}
	}

	static promoteChildNodesByTagName(tagName: HTMLTagNames, className?: string): void {
		const elements = document.body.querySelectorAll(tagName)

		for (let i = 0; i < elements.length; i++) {
			const element = elements[i] as HTMLElement

			if (className && !element.classList.contains(className)) continue

			const parentNode = element.parentNode
			if (!parentNode) return

			let prevSibling = element.previousSibling as Text | null
			let nextSibling = element.nextSibling as Text | null
			if (prevSibling && prevSibling.nodeType === Node.TEXT_NODE) {
				element.innerHTML = prevSibling.textContent + element.innerHTML
				parentNode.removeChild(prevSibling)
			}

			if (nextSibling && nextSibling.nodeType === Node.TEXT_NODE) {
				element.innerHTML += nextSibling.textContent
				parentNode.removeChild(nextSibling)
			}

			const childLength = element.childNodes.length
			if (childLength === 1) {
				if (element.firstChild?.nodeType === Node.TEXT_NODE) {
					const textNode = element.firstChild as Text
					if (textNode.textContent) parentNode?.replaceChild(document.createTextNode(textNode.textContent), element)
				}
			} else if (childLength > 1) {
				while (element.firstChild) {
					const child = element.firstChild
					element.removeChild(child)
					parentNode.appendChild(child)
				}

				parentNode.removeChild(element)
			}
		}
	}

	static removeNestedTags(element: HTMLElement, disallowedNestedTags: string[]) {
		function recursivelyClean(node: Node): void {
			if (node.nodeType === Node.ELEMENT_NODE) {
				const ele = node as HTMLElement

				if (disallowedNestedTags.includes(tagNameLc(ele))) {
					Array.from(ele.querySelectorAll('*')).forEach((descendant) => {
						if (disallowedNestedTags.includes(tagNameLc(descendant))) {
							const parentNode = descendant.parentNode

							while (descendant.firstChild) {
								parentNode!.insertBefore(descendant.firstChild, descendant)
							}

							parentNode!.removeChild(descendant)
						}
					})
				}

				Array.from(ele.children).forEach(recursivelyClean)
			}
		}

		recursivelyClean(element)
	}

	static findClosestAncestorByTagName(node: Node, tagName: HTMLTagNames) {
		let nodeTemp: Node | null = node
		while (nodeTemp) {
			if (nodeTemp.nodeType === Node.ELEMENT_NODE) {
				let ele: Element = nodeTemp as Element
				if (tagNameLc(ele) === tagName) return nodeTemp
			}

			nodeTemp = nodeTemp.parentNode
		}

		return null
	}

	static findLastTextNode(nodeIpt: Node) {
		let lastTextNode = nodeIpt.nodeType === Node.TEXT_NODE ? nodeIpt : null

		for (let node = nodeIpt.lastChild; node; node = node.previousSibling) {
			if (node.nodeType === Node.TEXT_NODE) {
				lastTextNode = node
				break
			}
		}

		return lastTextNode
	}

	static replaceTagName(root: HTMLElement, oldTagName: string, newTagName: string): void {
		function traverseDOM(node: Node) {
			if (node.nodeType === Node.ELEMENT_NODE) {
				const ele = node as HTMLElement

				if (tagNameLc(ele) === oldTagName) {
					const bElement = document.createElement(newTagName)

					while (ele.firstChild) {
						bElement.appendChild(ele.firstChild)
					}

					ele.parentNode?.replaceChild(bElement, ele)
				} else {
					for (let i = 0; i < ele.childNodes.length; i++) {
						traverseDOM(ele.childNodes[i])
					}
				}
			}
		}

		traverseDOM(root)
	}

	static mergeAdjacentTextNodes(element: Element): void {
		const stack: Node[] = [element]

		while (stack.length > 0) {
			const currentNode = stack.pop()!

			if (currentNode.nodeType === Node.ELEMENT_NODE && currentNode.hasChildNodes()) {
				for (let i = currentNode.childNodes.length - 1; i >= 0; i--) {
					stack.push(currentNode.childNodes[i])
				}
			} else if (currentNode.nodeType === Node.TEXT_NODE) {
				let nextSibling = currentNode.nextSibling

				while (
					nextSibling &&
					nextSibling.nodeType === Node.TEXT_NODE &&
					currentNode.textContent &&
					nextSibling.textContent
				) {
					currentNode.textContent += nextSibling.textContent
					currentNode.parentNode!.removeChild(nextSibling)
					nextSibling = currentNode.nextSibling
				}
			}
		}
	}

	static mergeConsecutiveSameTags(root: HTMLElement, tagNamesToMerge: HTMLTagNames[]): void {
		function traverseAndMerge(parentNode: Node, startIdx: number = 0) {
			const children = Array.from(parentNode.childNodes)
			let idx = startIdx

			while (idx < children.length - 1) {
				const currentNode = children[idx] as HTMLElement
				const nextNode = children[idx + 1] as HTMLElement

				if (
					currentNode.nodeType === Node.ELEMENT_NODE &&
					nextNode.nodeType === Node.ELEMENT_NODE &&
					tagNamesToMerge.includes(tagNameLc(currentNode) as HTMLTagNames) &&
					currentNode.tagName === nextNode.tagName
				) {
					while (nextNode.firstChild) {
						currentNode.appendChild(nextNode.firstChild)
					}

					// TODO: resolve error
					parentNode.removeChild(nextNode)
				} else {
					traverseAndMerge(currentNode, 0)
					idx++
				}
			}

			if (idx < children.length) traverseAndMerge(children[idx], 0)
		}

		traverseAndMerge(root)
	}

	static getNextNode(node: Node): ChildNode | null {
		let nextSibling = node.nextSibling

		if (nextSibling) return nextSibling
		if (node.parentNode) return this.getNextNode(node.parentNode)

		return null
	}
}
