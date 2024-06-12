/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { CN_TEMP_ELE, DATA_ATTR_TEMP_EDIT } from '../../contants'
import { ClickEventHandler } from '../../core/plugin'
import { SelectionUtils } from '../../core/selection_utils'
import { createPopupView } from '../../ui/popup_view'
import { INSERT_ELEMENT_BUTTONS } from '../../ui/toolbar'
import { CN_ROOT, PLUGIN_NAME, POPUP_ID } from './base'

export const CN_INSERT_MENU_ITEM = 'exsied-toolbar-insert-menu-item'
export const dataName = 'data-name'
export function showInsertMenu(event: Event) {
	const targetEle = event.target as HTMLAnchorElement
	targetEle.setAttribute(DATA_ATTR_TEMP_EDIT, PLUGIN_NAME)

	let contentHtml = ``
	const eventMap: { [key: string]: ClickEventHandler } = {}

	for (const item of INSERT_ELEMENT_BUTTONS) {
		const name = `${item.pluginName}___${item.ctrlName}`
		eventMap[name] = item.clickCallBack

		contentHtml += `
			<div class="${CN_INSERT_MENU_ITEM}" ${dataName}="${name}">
				<i class="exsied-icon ${item.iconClassName}"></i>
				${item.ctrlName}
			</div>
			`
	}

	const ele = createPopupView({
		id: POPUP_ID,
		classNames: [CN_TEMP_ELE, CN_ROOT, 'exsied'],
		attrs: { TEMP_EDIT_ID: PLUGIN_NAME },
		contentClassNames: ['exsied-toolbar'],
		contentAttrs: {},
		contentHtml,
	})

	const rect = targetEle.getBoundingClientRect()
	ele.style.position = 'absolute'
	ele.style.top = rect.bottom + 'px'
	ele.style.left = rect.left + 'px'

	const items = ele.querySelectorAll(`.${CN_INSERT_MENU_ITEM}`)
	for (const item of items) {
		const name = item.getAttribute(dataName)
		if (name && eventMap[name]) {
			const itemEle = item as HTMLElement
			itemEle.addEventListener('click', () => {
				console.log(456, name, eventMap[name])

				SelectionUtils.restoreSelection()
				eventMap[name](event as MouseEvent)
			})
		}
	}

	document.body.appendChild(ele)
}
