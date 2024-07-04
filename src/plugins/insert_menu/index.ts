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
import { Exsied } from '../../core'
import { DomUtils } from '../../core/dom_utils'
import { t } from '../../core/i18n'
import { ClickEventHandler, ExsiedPlugin } from '../../core/plugin'
import { ELE_TYPE_BUTTON } from '../../ui/toolbar'
import './styles.scss'

export type PluginConf = {
	addToNormalToolbar: boolean
	addToBubbleToolbar: boolean
}

export const PLUGIN_NAME = 'InsertMenu'
export const CN_ICON = 'exsied-icon-plus'
export const POPUP_ID = `exsied_${PLUGIN_NAME}_popup`
export const CN_ROOT = 'exsied-insert-menu-view'

export const CN_INSERT_MENU_ITEM = 'exsied-toolbar-insert-menu-item'
export const dataName = 'data-name'

export class PluginInsertMenu implements ExsiedPlugin<Exsied> {
	private exsied: Exsied = new Exsied('')

	name = 'InsertMenu'
	conf: PluginConf = {
		addToNormalToolbar: true,
		addToBubbleToolbar: false,
	}

	init = (exsied: Exsied): void => {
		this.exsied = exsied
	}

	showInsertMenu = (event: Event) => {
		const targetEle = event.target as HTMLAnchorElement
		targetEle.setAttribute(DATA_ATTR_TEMP_EDIT, PLUGIN_NAME)

		let contentHtml = ``
		const eventMap: { [key: string]: ClickEventHandler } = {}

		const insertElementButtons = this.exsied.toolbar.insertElementButtons
		for (const item of insertElementButtons) {
			const name = `${item.pluginName}___${item.ctrlName}`
			eventMap[name] = item.clickCallBack

			contentHtml += `
				<div class="${CN_INSERT_MENU_ITEM}" ${dataName}="${name}">
					<div class="icon">
						<i class="exsied-icon ${item.iconClassName}"></i>
					</div>
					<div class="content">${t(item.tooltipText)}</div>								
				</div>
				`
		}

		const rect = targetEle.getBoundingClientRect()
		const ele = this.exsied.showPopup({
			id: POPUP_ID,
			classNames: [CN_TEMP_ELE, CN_ROOT, 'exsied'],
			attrs: { TEMP_EDIT_ID: PLUGIN_NAME },
			contentClassNames: ['exsied-toolbar'],
			contentHtml,
			top: rect.bottom + 'px',
			left: rect.left + 'px',
		})

		const items = ele.querySelectorAll(`.${CN_INSERT_MENU_ITEM}`)
		for (const item of items) {
			const name = item.getAttribute(dataName)
			if (name && eventMap[name]) {
				const itemEle = item as HTMLElement
				itemEle.addEventListener('click', () => {
					this.exsied.selectionUtils.restoreSelection()
					eventMap[name](event as MouseEvent)
				})
			}
		}

		document.body.appendChild(ele)
	}

	commands = {
		showInsertMenu: this.showInsertMenu,
	}

	getToolBarControl = () => [
		{
			name: PLUGIN_NAME,
			buttonText: 'Insert',
			tooltipText: 'Insert menu',
			addToNormalToolbar: this.conf.addToNormalToolbar,
			addToBubbleToolbar: this.conf.addToBubbleToolbar,

			eleType: ELE_TYPE_BUTTON,
			iconClassName: CN_ICON,
			clickCallBack: this.commands.showInsertMenu,
		},
	]

	addHandler = () => {
		this.exsied.elements.toolbarMain.addEventListener('mouseover', () => {
			this.exsied.selectionUtils.backupSelection()
		})
	}

	removeTempEle = (_event: Event) => {
		DomUtils.removeElementById(POPUP_ID)
	}
}
