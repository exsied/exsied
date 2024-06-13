/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { CN_TOOLBAR_NORMAL_ELE, DATA_ATTR_CN_ICON, TN_DIV } from '../../contants'
import { exsied } from '../../core'
import { DomUtils } from '../../core/dom_utils'
import { execEleEventClickCallbackByTag } from '../../core/events'
import { t } from '../../core/i18n'
import { ChangeEventHandler, ClickEventHandler, PLUGINS } from '../../core/plugin'
import { SelectionUtils } from '../../core/selection_utils'
import { HTMLTagNames } from '../../types'
import { tagNameLc } from '../../utils'
import { uniqueArray } from '../../utils/array'
import { CN_DDROPDOWN_LIST_SHOW, DropdownMenu, genDropdownId } from '../dropdown'
import './styles.scss'

export type ToolBarButton = {
	name: string
	buttonText?: string
	tooltipText: string
	addToNormalToolbar: boolean
	addToNormalToolbarInsertMenu?: boolean
	addToBubbleToolbar: boolean

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
	addToNormalToolbar: boolean
	addToBubbleToolbar?: boolean

	eleType: 'select'
	changeCallBack: ChangeEventHandler
	defaultText: string
	options: ToolBarSelectOption[]
}

export type ToolBarControl = ToolBarButton | ToolBarSelect

export type InsertElementButton = {
	pluginName: string
	ctrlName: string
	tooltipText: string
	iconClassName?: string
	clickCallBack: ClickEventHandler
}

export const CN_BUBBLE_BTNS = 'exsied-btns'
export const ID_TOOLBAR_EXT = 'exsied-toolbar-ext'
export const ID_BUBBLE_WRAP = 'exsied-toolbar-bubble-wrap'
export const EXTTOOLBAR_NAME = 'ExtToolbar'
export const PLUGINS_SELECT_ID: string[] = []
export const INSERT_ELEMENT_BUTTONS: InsertElementButton[] = []

const checkExistInsertElementButtons = (ctrl: InsertElementButton) => {
	for (const iterator of INSERT_ELEMENT_BUTTONS) {
		if (iterator.pluginName === ctrl.pluginName && iterator.ctrlName === ctrl.ctrlName) {
			return true
		}
	}

	return false
}

export class Toolbar {
	static genButtonId = (tp: string, pluginName: string, ctrlName: string) => {
		return `exsied-toolbar-btn___${tp}___${pluginName}---${ctrlName}`
	}
	static genButtonIdStd = (pluginName: string, ctrlName: string) => {
		return {
			normal: this.genButtonId('normal', pluginName, ctrlName),
			bubble: this.genButtonId('bubble', pluginName, ctrlName),
		}
	}

	static genHtmlButton = (ctrl: ToolBarButton) => {
		let btnIcon = ctrl.iconClassName ? `<i class="exsied-icon ${ctrl.iconClassName}"></i>` : ''
		const buttonText = ctrl.buttonText ? t(ctrl.buttonText) : ''
		return `<button class="exsied-ctrl" id="___id___">${btnIcon}${buttonText || ''}</button>`
	}

	static genHtmlSelect = (ctrl: ToolBarSelect) => {
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

		return `
			<select id="___id___" data-default-text="${ctrl.defaultText}">
				${options}
			</select>
			`
	}

	static genToolbarStd = () => {
		const bubbleBtnsEle = document.querySelector(`#${ID_BUBBLE_WRAP} .${CN_BUBBLE_BTNS}`)
		if (bubbleBtnsEle) bubbleBtnsEle.innerHTML = ''

		const ctrlHtmlArr = []
		for (const plg of PLUGINS) {
			if (!plg.toolBarControl) continue

			for (const ctrl of plg.toolBarControl) {
				const ids = this.genButtonIdStd(plg.name, ctrl.name)

				if (ctrl.eleType === 'button') {
					const html = this.genHtmlButton(ctrl)
					if (ctrl.addToNormalToolbar) ctrlHtmlArr.push(html.replace('___id___', ids.normal))
					if (ctrl.addToNormalToolbarInsertMenu) {
						const insertCtrl = {
							pluginName: plg.name,
							ctrlName: ctrl.name,
							tooltipText: ctrl.tooltipText,
							iconClassName: ctrl.iconClassName,
							clickCallBack: ctrl.clickCallBack,
						}
						if (!checkExistInsertElementButtons(insertCtrl)) INSERT_ELEMENT_BUTTONS.push(insertCtrl)
					}
					if (ctrl.addToBubbleToolbar && bubbleBtnsEle) {
						if (!DomUtils.existElementById(ids.bubble)) bubbleBtnsEle.innerHTML += html.replace('___id___', ids.bubble)
					}
				}

				if (ctrl.eleType === 'select') {
					const html = this.genHtmlSelect(ctrl)
					if (ctrl.addToNormalToolbar) {
						ctrlHtmlArr.push(html.replace('___id___', ids.normal))
						if (!PLUGINS_SELECT_ID.includes(ids.normal)) PLUGINS_SELECT_ID.push(ids.normal)
					}
					if (ctrl.addToBubbleToolbar && bubbleBtnsEle) {
						bubbleBtnsEle.innerHTML += html.replace('___id___', ids.bubble)
						if (!PLUGINS_SELECT_ID.includes(ids.bubble)) PLUGINS_SELECT_ID.push(ids.bubble)
					}
				}
			}
		}

		return ctrlHtmlArr.join('')
	}

	static genButtonIdExt = (pluginName: string, ctrlName: string) => {
		return {
			ext: this.genButtonId('ext', pluginName, ctrlName),
		}
	}

	static genToolbarExt = (ctrls: ToolBarControl[]) => {
		const ctrlHtmlArr = []

		for (const ctrl of ctrls) {
			const ids = this.genButtonIdExt(EXTTOOLBAR_NAME, ctrl.name)

			if (ctrl.eleType === 'button') {
				const html = this.genHtmlButton(ctrl)
				ctrlHtmlArr.push(html.replace('___id___', ids.ext))
			}

			if (ctrl.eleType === 'select') {
				const html = this.genHtmlSelect(ctrl)
				ctrlHtmlArr.push(html.replace('___id___', ids.ext))
				if (!PLUGINS_SELECT_ID.includes(ids.ext)) PLUGINS_SELECT_ID.push(ids.ext)
			}
		}

		const extToolbar = document.createElement(TN_DIV)
		extToolbar.classList.add('exsied-toolbar-ext')
		extToolbar.id = ID_TOOLBAR_EXT
		extToolbar.innerHTML = ctrlHtmlArr.join('')

		this.addAfterNormalToolbar(extToolbar)
		this.hideNormalToolbar(true)

		// addEventListener
		for (const ctrl of ctrls) {
			const ids = this.genButtonIdExt(EXTTOOLBAR_NAME, ctrl.name)

			if (ctrl.eleType === 'button') {
				const btn = extToolbar.querySelector(`#${ids.ext}`)
				if (btn) {
					const btnEle = btn as HTMLElement
					btnEle.addEventListener('click', ctrl.clickCallBack)
				}
			}

			if (ctrl.eleType === 'select') {
				const btn = extToolbar.querySelector(`#${ids.ext}`)
				if (btn) {
					const btnEle = btn as HTMLElement
					btnEle.addEventListener('click', ctrl.changeCallBack)
				}
			}
		}
	}

	static addAfterNormalToolbar = (ele: HTMLElement) => {
		const normalToolbar = exsied.elements.toolbarMain.querySelector(`.${CN_TOOLBAR_NORMAL_ELE}`)
		if (!normalToolbar) return

		const normalToolbarEle = normalToolbar as HTMLElement
		normalToolbarEle.after(ele)
	}

	static hideNormalToolbar = (hide: boolean) => {
		const normalToolbar = exsied.elements.toolbarMain.querySelector(`.${CN_TOOLBAR_NORMAL_ELE}`)
		if (!normalToolbar) return

		const normalToolbarEle = normalToolbar as HTMLElement
		normalToolbarEle.style.display = hide ? 'none' : ''
	}

	static clickWorkplace = (event: Event) => {
		exsied.cursorAllParentsTagNamesArr = this.getAllTagNamesArr(event)
		for (const item of exsied.cursorAllParentsTagNamesArr) {
			execEleEventClickCallbackByTag(item, event)
		}

		PLUGINS.map((item, _index) => {
			item.checkHighlight(event)
			// TODO: Should bind to body
			item.removeTempEle(event)
		})
	}

	static bindBtnEvents = () => {
		for (const plg of PLUGINS) {
			plg.addHandler()

			if (!plg.toolBarControl) continue

			for (const ctrl of plg.toolBarControl) {
				const toolbarBtnIds = this.genButtonIdStd(plg.name, ctrl.name)

				if (ctrl.eleType === 'button') {
					document.getElementById(toolbarBtnIds.normal)?.addEventListener('click', ctrl.clickCallBack)
					if (ctrl.addToBubbleToolbar) {
						document.getElementById(toolbarBtnIds.bubble)?.addEventListener('click', ctrl.clickCallBack)
					}
				}

				if (ctrl.eleType === 'select') {
					document.getElementById(toolbarBtnIds.normal)?.addEventListener('change', ctrl.changeCallBack)
					if (ctrl.addToBubbleToolbar) {
						document.getElementById(toolbarBtnIds.bubble)?.addEventListener('change', ctrl.changeCallBack)
					}
				}
			}
		}

		const workplaceEle = exsied.elements.workplace
		if (workplaceEle) workplaceEle.addEventListener('click', this.clickWorkplace)
	}

	static unBindBtnEvents = () => {
		for (const plg of PLUGINS) {
			plg.removeHandler()
		}

		const editorEle = exsied.elements.editor
		if (editorEle) editorEle.removeEventListener('click', this.clickWorkplace)
	}

	static initDropdownElements = () => {
		PLUGINS_SELECT_ID.map((id) => {
			if (!DomUtils.existElementById(genDropdownId(id))) new DropdownMenu(id)
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
		let bubbleEle = document.querySelector(`#${ID_BUBBLE_WRAP}`)
		if (!bubbleEle) {
			const ele = document.createElement(TN_DIV)
			ele.id = ID_BUBBLE_WRAP
			ele.classList.add('exsied')

			ele.innerHTML = `
				<span class="exsied-toolbar-bubble-arrow"></span>			
				<div class="exsied-toolbar-bubble">
					<span class="exsied-endpoint"></span>
					<span class="${CN_BUBBLE_BTNS} exsied-toolbar">
	
					</span>
					<span class="exsied-endpoint"></span>
				</div>
				`

			document.body.appendChild(ele)
			bubbleEle = ele
		}

		exsied.elements.toolbarBubble = bubbleEle as HTMLElement
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
