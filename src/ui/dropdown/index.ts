/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { CN_TEMP_ELE, DATA_ATTR_CN_ICON, TN_DIV } from '../../contants'
import { Exsied } from '../../core'
import { t } from '../../core/i18n'
import { SelectionUtils } from '../../core/selection_utils'
import { tagNameLc } from '../../utils'
import './styles.scss'

export const CN_DDROPDOWN = 'exsied-dropdown'
export const CN_DDROPDOWN_LIST_SHOW = 'exsied-dropdown-list-show'
export const CN_DDROPDOWN_TRIGGER = 'exsied-dropdown-trigger'

const DATA_ATTR_TEXT = 'data-text'
const DATA_ATTR_VALUE = 'data-value'

export class DropdownMenu {
	exsied: Exsied
	private eleId: string = ''
	private ele: HTMLElement | undefined

	private cnList = 'exsied-dropdown-list'
	private cnListItem = 'exsied-dropdown-list-item'
	private triggerDefaultText = '---'

	constructor(exsied: Exsied) {
		this.exsied = exsied
	}

	initSelect(selectId: string) {
		this.eleId = selectId
		this.init()
	}

	genDropdownId(id: string) {
		return `${id}---dropdown---${this.exsied.containerId}`
	}

	genTriggerClassName() {
		return `${CN_DDROPDOWN_TRIGGER}_text`
	}

	init() {
		const ele = document.getElementById(this.eleId)
		if (!ele) {
			throw new Error(`No <select> element found with ID: ${this.eleId}`)
		}
		if (tagNameLc(ele) !== 'select') {
			throw new Error(`This element is not a <select> element, ID: ${this.eleId}`)
		}

		const nativeSelect = ele as HTMLSelectElement
		nativeSelect.style.display = 'none'

		this.ele = document.createElement(TN_DIV)
		this.ele.classList.add(CN_DDROPDOWN)
		this.ele.classList.add(CN_TEMP_ELE)
		this.ele.id = this.genDropdownId(this.eleId)

		const triggerEle = document.createElement('button')
		triggerEle.classList.add(CN_DDROPDOWN_TRIGGER)
		triggerEle.classList.add('exsied-ctrl')

		const defaultText = ele.getAttribute('data-default-text') || this.triggerDefaultText
		triggerEle.innerHTML = `<span class="${this.genTriggerClassName()}">${t(defaultText)}</span>`

		triggerEle.addEventListener('click', (event: Event) => {
			const target = event.target
			if (!target) return

			const targetEle = target as HTMLElement
			const dropDownEle = targetEle.closest(`.${CN_DDROPDOWN}`)
			if (!dropDownEle) return

			const siblings = Array.from(dropDownEle.children)
			const self = this
			siblings.forEach((sibling) => {
				if (sibling.classList.contains(self.cnList)) {
					sibling.classList.add(CN_DDROPDOWN_LIST_SHOW)
				}
			})
		})

		triggerEle.addEventListener('mouseover', () => {
			SelectionUtils.backupSelection()
		})

		const listEle = document.createElement(TN_DIV)
		listEle.classList.add(this.cnList)

		for (let i = 0; i < nativeSelect.options.length; i++) {
			const option = nativeSelect.options[i]

			const listItem = document.createElement(TN_DIV)
			listItem.classList.add(this.cnListItem)
			listItem.setAttribute(DATA_ATTR_TEXT, option.text)
			listItem.setAttribute(DATA_ATTR_VALUE, option.value)

			let content = option.text

			let icon = ''
			const iconClass = option.getAttribute(DATA_ATTR_CN_ICON)
			if (iconClass) icon = `<i class="exsied-icon ${iconClass}"></i>`

			listItem.innerHTML = `
				<div class="icon">${icon}</div>
				<div class="content">${t(content)}</div>
				`

			listItem.addEventListener('click', (event: Event) => {
				nativeSelect.value = option.value
				const target = event.target
				if (!target) return

				const targetEle = target as HTMLOptionElement

				const list = targetEle.closest(`.${this.cnList}`) as HTMLDivElement
				if (!list) return
				list.classList.remove(CN_DDROPDOWN_LIST_SHOW)

				const wrap = targetEle.closest(`.${CN_DDROPDOWN}`)
				if (!wrap) return

				const listItem = targetEle.closest(`.${this.cnListItem}`) as HTMLDivElement
				if (!listItem) return

				const DT = listItem.getAttribute(DATA_ATTR_TEXT)
				const DV = listItem.getAttribute(DATA_ATTR_VALUE)
				const value = DV ? DV : ''

				// Set trigger's text
				const triggerEle = wrap.querySelector(`.${CN_DDROPDOWN_TRIGGER}`)
				if (triggerEle) triggerEle.innerHTML = DT || this.triggerDefaultText

				// Set orginal select's option
				const select = document.querySelector(`#${this.eleId}`) as HTMLSelectElement
				if (!select) return

				const secondOption = select.options
				for (const iterator of secondOption) {
					if (iterator.value === value) {
						iterator.selected = true
						break
					}
				}

				// Manually triggering the change event to execute the modification.
				SelectionUtils.restoreSelection()
				const changeEvent = new Event('change', { bubbles: true })
				select.dispatchEvent(changeEvent)
			})

			listEle.appendChild(listItem)
		}

		// FIXME: not work
		ele.addEventListener('onmouseout', () => {
			listEle.classList.remove(CN_DDROPDOWN_LIST_SHOW)
		})

		this.ele.appendChild(triggerEle)
		this.ele.appendChild(listEle)

		nativeSelect.parentNode?.insertBefore(this.ele, nativeSelect.nextSibling)
	}
}
