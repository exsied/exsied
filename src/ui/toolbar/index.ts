import { DATA_ATTR_CN_ICON, TN_DIV } from '../../contants'
import { PLUGINS, exsied } from '../../core'
import { DomUtils } from '../../core/dom_utils'
import { execEleEventClickCallbackByTag } from '../../core/events'
import { SelectionUtils } from '../../core/selection_utils'
import { ChangeEventHandler, ClickEventHandler, HTMLTagNames } from '../../types'
import { tagNameLc } from '../../utils'
import { uniqueArray } from '../../utils/array'
import { CN_DDROPDOWN_LIST_SHOW, DropdownMenu } from '../dropdown'
import './styles.scss'

export const CN_BUBBLE_WRAP = 'exsied-toolbar-bubble-wrap'
export const CN_BUBBLE_BTNS = 'exsied-btns'

export type ToolBarButton = {
	name: string
	tooltipText: string
	addToBubble?: boolean

	eleType: 'button'
	clickCallBack: ClickEventHandler
	iconClassName?: string
}

export type ToolBarSelectOption = {
	name: string
	value: string
	tooltipText: string
	iconSvg?: string
	iconClassName?: string
}

export type ToolBarSelect = {
	name: string
	tooltipText: string
	addToBubble?: boolean

	eleType: 'select'
	changeCallBack: ChangeEventHandler
	defaultText: string
	options: ToolBarSelectOption[]
}

export type ToolBarControl = ToolBarButton | ToolBarSelect

export const PLUGINS_SELECT_ID: string[] = []

export class Toolbar {
	static genBtns = () => {
		const bubbleBtnsEle = document.querySelector(`.${CN_BUBBLE_WRAP} .${CN_BUBBLE_BTNS}`)
		const ctrlArr = []
		for (const plg of PLUGINS) {
			if (!plg.toolBarControl) continue

			for (const ctrl of plg.toolBarControl) {
				const ids = this.genButtonIds(plg.name, ctrl.name)

				if (ctrl.eleType === 'button') {
					let btnIcon = ''
					if (ctrl.iconClassName) {
						btnIcon = `<i class="exsied-icon ${ctrl.iconClassName}"></i>`
					}
					const html = `<button class="exsied-ctrl" id="___id___">${btnIcon}</button>`
					ctrlArr.push(html.replace('___id___', ids.normal))
					if (ctrl.addToBubble && bubbleBtnsEle) {
						bubbleBtnsEle.innerHTML += html.replace('___id___', ids.bubble)
					}
				}

				if (ctrl.eleType === 'select') {
					PLUGINS_SELECT_ID.push(ids.normal)

					let options = ''
					ctrl.options.map((o) => {
						options += `
						<option 
							value="${o.value}"
							${DATA_ATTR_CN_ICON}="${o.iconClassName || ''}"
						>
							${o.name}
						</option>
						`
					})
					const html = `
						<select id="___id___" data-default-text="${ctrl.defaultText}">
							${options}
						</select>
						`
					ctrlArr.push(html.replace('___id___', ids.normal))
					if (ctrl.addToBubble && bubbleBtnsEle) {
						bubbleBtnsEle.innerHTML += html.replace('___id___', ids.bubble)
						PLUGINS_SELECT_ID.push(ids.bubble)
					}
				}
			}
		}

		return ctrlArr.join('')
	}

	static genButtonIds = (pluginName: string, ctrlName: string) => {
		const normal = `exsied-toolbar-btn---${pluginName}---${ctrlName}`
		return { normal, bubble: `${normal}---bubble` }
	}

	static checkHighlight = (event: Event) => {
		const targetEle = event.target as HTMLElement
		const tagName = tagNameLc(targetEle)
		execEleEventClickCallbackByTag(tagName, event)

		exsied.cursorAllParentsTagNamesArr = this.getAllTagNamesArr(event)
		PLUGINS.map((item, _index) => {
			item.checkHighlight(event)
			// TODO: Should bind to body
			item.removeTempEle(event)
		})
	}

	static bindBtnEvents = () => {
		for (const plg of PLUGINS) {
			plg.addHhandler()

			if (!plg.toolBarControl) continue

			for (const ctrl of plg.toolBarControl) {
				const toolbarBtnIds = this.genButtonIds(plg.name, ctrl.name)

				if (ctrl.eleType === 'button') {
					document.getElementById(toolbarBtnIds.normal)?.addEventListener('click', ctrl.clickCallBack)
					if (ctrl.addToBubble) {
						document.getElementById(toolbarBtnIds.bubble)?.addEventListener('click', ctrl.clickCallBack)
					}
				}

				if (ctrl.eleType === 'select') {
					document.getElementById(toolbarBtnIds.normal)?.addEventListener('change', ctrl.changeCallBack)
					if (ctrl.addToBubble) {
						document.getElementById(toolbarBtnIds.bubble)?.addEventListener('change', ctrl.changeCallBack)
					}
				}
			}
		}

		const workplaceEle = exsied.elements.workplace
		if (workplaceEle) workplaceEle.addEventListener('click', this.checkHighlight)
	}

	static unBindBtnEvents = () => {
		for (const plg of PLUGINS) {
			plg.removeHhandler()
		}

		const editorEle = exsied.elements.editor
		if (editorEle) editorEle.removeEventListener('click', this.checkHighlight)
	}

	static initDropdownElements = () => {
		PLUGINS_SELECT_ID.map((id) => {
			new DropdownMenu(id)
		})
	}

	static hideDropdowntList = (dropDownId: string) => {
		const dropDownListEle = exsied.elements.toolbarMain?.querySelector(`#${dropDownId} .${CN_DDROPDOWN_LIST_SHOW}`)
		if (!dropDownListEle) return

		dropDownListEle.classList.remove(CN_DDROPDOWN_LIST_SHOW)
	}

	static getAllTagNamesArr = (event: Event) => {
		const targetEle = event.target as HTMLElement
		const tagName = tagNameLc(targetEle)

		const cursorEle = SelectionUtils.getCursorNode()
		const allTagNamesArr: HTMLTagNames[] = [tagName]

		const selection = window.getSelection()
		if (selection && SelectionUtils.hasSelectedContent()) {
			let hasText = false

			for (let i = 0; i < selection.rangeCount; i++) {
				const range = selection.getRangeAt(i)
				if (range.toString()) hasText = true
				const nodeIterator = document.createNodeIterator(range.commonAncestorContainer, NodeFilter.SHOW_ALL, {
					acceptNode: (node: Node) => {
						if (range.intersectsNode(node)) {
							return NodeFilter.FILTER_ACCEPT
						}
						return NodeFilter.FILTER_SKIP
					},
				})

				let currentNode: Node | null = nodeIterator.nextNode()
				while (currentNode) {
					const parentsTagNamesArr = DomUtils.getAllParentTagNames(
						currentNode as HTMLElement,
						exsied.elements.workplace as HTMLElement,
					)
					allTagNamesArr.push(...parentsTagNamesArr)

					currentNode = nodeIterator.nextNode()
				}
			}
			if (hasText) this.updateBubblePosition()
		} else {
			this.hideBubble()

			if (cursorEle && cursorEle instanceof HTMLElement) {
				const parentsTagNamesArr = DomUtils.getAllParentTagNames(cursorEle, exsied.elements.workplace as HTMLElement)
				allTagNamesArr.push(...parentsTagNamesArr)
			}
		}

		return uniqueArray(allTagNamesArr)
	}

	static initBubble = () => {
		const html = `
			<span class="exsied-toolbar-bubble-arrow"></span>			
			<div class="exsied-toolbar-bubble">
				<span class="exsied-endpoint"></span>
				<span class="${CN_BUBBLE_BTNS} exsied-toolbar">

				</span>
				<span class="exsied-endpoint"></span>
			</div>
			`

		const ele = document.createElement(TN_DIV)
		ele.classList.add(CN_BUBBLE_WRAP)
		ele.classList.add('exsied')
		ele.innerHTML = html
		ele.style.position = 'absolute'
		ele.style.display = 'none'

		document.body.appendChild(ele)

		const bubbleEle = document.querySelector(`.${CN_BUBBLE_WRAP}`)
		if (bubbleEle) exsied.elements.toolbarBubble = bubbleEle as HTMLElement
	}

	static updateBubblePosition() {
		const ele = exsied.elements.toolbarBubble
		if (!ele) return

		ele.style.display = 'block'

		const rangeRect = SelectionUtils.getRangeRect()
		if (!rangeRect) {
			console.warn('rangeRect is empty')
			return
		}
		const rectWidth = rangeRect.right - rangeRect.left
		const eleWidth = ele.clientWidth

		let left = rangeRect.left + rectWidth / 2 - eleWidth / 2
		if (left < 0) left = 0
		if (left + eleWidth > window.innerWidth) left = window.innerWidth - eleWidth

		const scrollTop = window.pageYOffset || window.scrollY
		const scrollLeft = window.pageXOffset || window.scrollX

		ele.style.top = scrollTop + rangeRect.bottom + 'px'
		ele.style.left = scrollLeft + left + 'px'
	}

	static hideBubble() {
		const ele = exsied.elements.toolbarBubble
		if (!ele) return

		ele.style.display = 'none'
	}
}
