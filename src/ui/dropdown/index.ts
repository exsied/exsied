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
import { DomUtils } from '../../core/dom_utils'
import { t } from '../../core/i18n'
import { tagNameLc } from '../../utils'
import './styles.scss'

export const CN_DDROPDOWN = 'exsied-dropdown'
export const CN_DDROPDOWN_LIST_SHOW = 'exsied-dropdown-list-show'
export const CN_DDROPDOWN_TRIGGER = 'exsied-dropdown-trigger'

const DATA_ATTR_TEXT = 'data-text'
const DATA_ATTR_VALUE = 'data-value'
const CN_LIST = 'exsied-dropdown-list'
const CN_LIST_ITEM = 'exsied-dropdown-list-item'

export class DropdownMenu {
	exsied: Exsied
	private selectId: string = ''
	private ele: HTMLElement | undefined

	private triggerDefaultText = '---'

	constructor(exsied: Exsied) {
		this.exsied = exsied
	}

	initSelect(selectId: string) {
		this.selectId = selectId
		this.init()
	}

	genDropdownId(id: string) {
		return `${id}___dropdown`
	}

	genTriggerClassName(id: string) {
		return `${id}___dropdown_trigger`
	}

	private init() {
		const ele = document.getElementById(this.selectId)
		if (!ele) {
			throw new Error(`No <select> element found with ID: ${this.selectId}`)
		}
		if (tagNameLc(ele) !== 'select') {
			throw new Error(`This element is not a <select> element, ID: ${this.selectId}`)
		}

		const nativeSelect = ele as HTMLSelectElement
		nativeSelect.style.display = 'none'

		this.ele = document.createElement(TN_DIV)
		this.ele.classList.add(CN_DDROPDOWN)
		this.ele.classList.add(CN_TEMP_ELE)
		this.ele.id = this.genDropdownId(this.selectId)

		const triggerEle = document.createElement('button')
		triggerEle.classList.add(CN_DDROPDOWN_TRIGGER)
		triggerEle.classList.add('exsied-ctrl')

		const defaultText = ele.getAttribute('data-default-text') || this.triggerDefaultText
		triggerEle.innerHTML = `<span class="${this.genTriggerClassName(this.selectId)}">${t(defaultText)}</span>`

		triggerEle.addEventListener('click', (event: Event) => {
			const target = event.target
			if (!target) return

			const targetEle = target as HTMLElement
			const rect = targetEle.getBoundingClientRect()

			const dropDownEle = targetEle.closest(`.${CN_DDROPDOWN}`)
			if (!dropDownEle) return

			const siblings = Array.from(dropDownEle.children)
			siblings.forEach((sibling) => {
				if (sibling.classList.contains(CN_LIST)) {
					sibling.classList.add(CN_DDROPDOWN_LIST_SHOW)

					const siblingEle = sibling as HTMLElement
					siblingEle.style.top = `${rect.bottom}px`
					siblingEle.style.bottom = `unset`

					DomUtils.limitElementRect(siblingEle)
				}
			})
		})

		triggerEle.addEventListener('mouseover', () => {
			this.exsied.selectionUtils.backupSelection()
		})

		const listEle = document.createElement(TN_DIV)
		listEle.classList.add(CN_LIST)

		for (let i = 0; i < nativeSelect.options.length; i++) {
			const option = nativeSelect.options[i]

			const listItemEle = document.createElement(TN_DIV)
			listItemEle.classList.add(CN_LIST_ITEM)
			listItemEle.setAttribute(DATA_ATTR_TEXT, option.text)
			listItemEle.setAttribute(DATA_ATTR_VALUE, option.value)

			let content = option.text

			let icon = ''
			const iconClass = option.getAttribute(DATA_ATTR_CN_ICON)
			if (iconClass) icon = `<i class="exsied-icon ${iconClass}"></i>`

			listItemEle.innerHTML = `
				<div class="icon">${icon}</div>
				<div class="content">${t(content)}</div>
				`

			listItemEle.addEventListener('click', (event: Event) => {
				nativeSelect.value = option.value
				const target = event.target
				if (!target) return

				const targetEle = target as HTMLOptionElement

				const list = targetEle.closest(`.${CN_LIST}`) as HTMLDivElement
				if (!list) return
				list.classList.remove(CN_DDROPDOWN_LIST_SHOW)

				const wrap = targetEle.closest(`.${CN_DDROPDOWN}`)
				if (!wrap) return

				const listItem = targetEle.closest(`.${CN_LIST_ITEM}`) as HTMLDivElement
				if (!listItem) return

				const dat = listItem.getAttribute(DATA_ATTR_TEXT)
				const dav = listItem.getAttribute(DATA_ATTR_VALUE)
				const value = dav ? dav : ''

				// Set trigger's text
				const triggerEle = wrap.querySelector(`.${CN_DDROPDOWN_TRIGGER}`)
				if (triggerEle) triggerEle.innerHTML = dat || this.triggerDefaultText

				// Set orginal select's option
				const selectEle = document.querySelector(`#${this.selectId}`) as HTMLSelectElement
				if (!selectEle) return

				const secondOption = selectEle.options
				for (const iterator of secondOption) {
					if (iterator.value === value) {
						iterator.selected = true
						break
					}
				}

				// Manually triggering the change event to execute the modification.
				this.exsied.selectionUtils.restoreSelection()
				const changeEvent = new Event('change', { bubbles: true })
				selectEle.dispatchEvent(changeEvent)
			})

			listEle.appendChild(listItemEle)
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
