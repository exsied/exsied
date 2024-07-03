/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { CN_ACTIVE, CN_TEMP_ELE, DATA_ATTR_TEMP_EDIT, TN_DIV, TN_TABLE, TN_TD, TN_TH } from '../../contants'
import { Exsied } from '../../core'
import { DomUtils } from '../../core/dom_utils'
import { t } from '../../core/i18n'
import { Commands, ExsiedPlugin } from '../../core/plugin'
import { SelectionUtils } from '../../core/selection_utils'
import { PopupView } from '../../ui/popup_view'
import { ELE_TYPE_BUTTON, ToolBarControlIds, emptyToolBarControlIds } from '../../ui/toolbar'
import { tagNameLc } from '../../utils'
import './styles.scss'

export type PluginConf = {
	addToNormalToolbar: boolean
	addToNormalToolbarInsertMenu: boolean
	addToBubbleToolbar: boolean
}

export const PLUGIN_NAME = 'Table'
export const CN_ICON = 'exsied-icon-table'
export const POPUP_ID = `exsied_${PLUGIN_NAME}_popup`
export const CN_TABLE_CELL_ACTION_BUTTON = 'exsied-icon-table-cell-action'
export const DATA_ROW_INDEX = 'data-row-index'
export const DATA_COLUNM_INDEX = 'data-column-index'

export class Table implements ExsiedPlugin<Exsied> {
	private exsied: Exsied | undefined
	// private popupId = ''
	private toolbarBtnIds: ToolBarControlIds = emptyToolBarControlIds

	name = 'Table'

	conf: PluginConf = {
		addToNormalToolbar: false,
		addToNormalToolbarInsertMenu: true,
		addToBubbleToolbar: false,
	}

	init = (exsied: Exsied): void => {
		this.exsied = exsied
		// this.popupId = this.exsied?.genPopupId(this.name, 'index') || ''
	}

	afterToolbarInit = () => {
		this.toolbarBtnIds = this.exsied?.toolbar?.genButtonIdStd(this.name, 'index') || emptyToolBarControlIds
	}

	insertTable = () => {
		const ele = document.createElement(TN_TABLE)
		ele.innerHTML = `
			<tbody>
				<tr>
					<td><br></td>
					<td><br></td>
				</tr>
				<tr>
					<td><br></td>
					<td><br></td>
				</tr>
			</tbody>
			`

		if (this.exsied?.elements.workplace) SelectionUtils.addElementBySelection(this.exsied.elements.workplace, ele)
	}

	commands: Commands = { insertTable: this.insertTable }

	toolBarControl = [
		{
			name: this.name,
			tooltipText: 'Table',
			addToNormalToolbar: this.conf.addToNormalToolbar,
			addToNormalToolbarInsertMenu: this.conf.addToNormalToolbarInsertMenu,
			addToBubbleToolbar: this.conf.addToBubbleToolbar,

			eleType: ELE_TYPE_BUTTON,
			iconClassName: CN_ICON,
			clickCallBack: this.commands[PLUGIN_NAME],
		},
	]

	addHandler = () => {
		document.body.addEventListener('click', this.showTableActionButtons)
	}
	removeHandler = () => {}
	checkHighlight = (_event: any) => {
		const btnEle = this.exsied?.elements.editor?.querySelector(`#${this.toolbarBtnIds.normal}`)

		if (btnEle) {
			const allTagNamesArr = this.exsied?.cursorAllParentsTagNamesArr || []
			allTagNamesArr.includes(TN_TABLE) ? btnEle.classList.add(CN_ACTIVE) : btnEle.classList.remove(CN_ACTIVE)
		}
	}
	removeTempEle = (_event: any) => {
		const allTagNamesArr = this.exsied?.cursorAllParentsTagNamesArr || []
		if (!allTagNamesArr.includes(TN_TABLE)) {
			DomUtils.removeElementById(POPUP_ID)
		}
	}

	showTableActionButtons = (event: Event) => {
		const targetEle = event.target as HTMLElement
		const tagName = tagNameLc(targetEle)

		if (!(targetEle && (tagName === TN_TH || tagName === TN_TD))) return

		const parentNode = targetEle.parentNode
		if (!parentNode) return

		const tableEle = targetEle.closest(TN_TABLE)
		if (!tableEle) return

		// Remove all tables' data attribute.
		const tables = document.querySelectorAll(`[${DATA_ATTR_TEMP_EDIT}="${PLUGIN_NAME}"]`)
		for (let index = 0; index < tables.length; index++) {
			const table = tables[index]
			table.removeAttribute(`${DATA_ATTR_TEMP_EDIT}`)
		}

		// Add current table's data attribute.
		tableEle.setAttribute(DATA_ATTR_TEMP_EDIT, PLUGIN_NAME)

		const rowNode = parentNode as HTMLTableRowElement
		const rowIndex = rowNode.rowIndex
		const cellIndex = Array.from(rowNode.children).indexOf(targetEle)

		let btnEle = document.querySelector(`.${CN_TABLE_CELL_ACTION_BUTTON}`) as HTMLElement
		if (!btnEle) {
			btnEle = document.createElement(TN_DIV)
			btnEle.classList.add(CN_TABLE_CELL_ACTION_BUTTON)

			document.body.appendChild(btnEle)
		}

		const scrollTop = window.pageYOffset || window.scrollY
		const scrollLeft = window.pageXOffset || window.scrollX
		const cellRect = targetEle.getBoundingClientRect()

		btnEle.style.top = cellRect.top + scrollTop + 5 + 'px'
		btnEle.style.right = window.innerWidth - cellRect.right + scrollLeft + 5 + 'px'
		btnEle.setAttribute(DATA_ROW_INDEX, `${rowIndex}`)
		btnEle.setAttribute(DATA_COLUNM_INDEX, `${cellIndex}`)

		btnEle.addEventListener('click', this.showTableActionPopup)
	}

	getRowColumnIndex = (): { rowIndex: number; columnIndex: number } => {
		let btnEle = document.querySelector(`.${CN_TABLE_CELL_ACTION_BUTTON}`) as HTMLElement
		if (btnEle) {
			const rowIndex = btnEle.getAttribute(DATA_ROW_INDEX) || '0'
			const colunmIndex = btnEle.getAttribute(DATA_COLUNM_INDEX) || '0'

			return { rowIndex: parseInt(rowIndex), columnIndex: parseInt(colunmIndex) }
		}

		return { rowIndex: 0, columnIndex: 0 }
	}

	removeActionBtn = () => {
		let btnEle = document.querySelector(`.${CN_TABLE_CELL_ACTION_BUTTON}`) as HTMLElement
		if (btnEle) btnEle.remove()

		DomUtils.removeElementById(POPUP_ID)
	}

	showTableActionPopup = (event: Event) => {
		const contentHtml = `
		<div class="exsied-table-edit-actions">
			<div class="exsied-cell"></div>  
			<div class="exsied-cell exsied-btn exsied-icon-add-to-top">
				<i class="exsied-icon exsied-icon-add"></i>
			</div>  
			<div class="exsied-cell"></div>  
			<div class="exsied-cell exsied-btn exsied-icon-add-to-left">
				<i class="exsied-icon exsied-icon-add"></i>
			</div>  
			<div class="exsied-cell"></div>  
			<div class="exsied-cell exsied-btn exsied-icon-add-to-right">
				<i class="exsied-icon exsied-icon-add"></i>
			</div>  
			<div class="exsied-cell"></div>  
			<div class="exsied-cell exsied-btn exsied-icon-add-to-bottom">
				<i class="exsied-icon exsied-icon-add"></i>
			</div>  
			<div class="exsied-cell"></div>  

			<div class="exsied-cell exsied-btn exsied-icon-delete-row">
				<i class="exsied-icon exsied-icon-delete-row"></i>
			</div>  
			<div class="exsied-cell exsied-btn exsied-icon-delete-column">
				<i class="exsied-icon exsied-icon-delete-column"></i>
			</div>  
			<div class="exsied-cell exsied-btn exsied-icon-delete-table">
				<i class="exsied-icon exsied-icon-trash"></i>
			</div>  
		</div>
		`

		const ele = PopupView.create({
			id: POPUP_ID,
			classNames: [CN_TEMP_ELE],
			attrs: { TEMP_EDIT_ID: PLUGIN_NAME },
			contentClassNames: [],
			contentAttrs: {},
			contentHtml,
			titlebarText: t('Table actions'),
			actionsButtons: [],
		})

		const targetEle = event.target as HTMLElement
		const rect = targetEle.getBoundingClientRect()
		const scrollTop = window.pageYOffset || window.scrollY
		const scrollLeft = window.pageXOffset || window.scrollX

		ele.style.position = 'absolute'
		ele.style.top = rect.top + scrollTop + 'px'
		ele.style.right = window.innerWidth - rect.right + scrollLeft + 'px'

		document.body.appendChild(ele)

		const btnAddToTop = ele.querySelector(`.exsied-icon-add-to-top`)
		if (btnAddToTop) btnAddToTop.addEventListener('click', this.clickBtnAddToTop)

		const btnAddToLeft = ele.querySelector(`.exsied-icon-add-to-left`)
		if (btnAddToLeft) btnAddToLeft.addEventListener('click', this.clickBtnAddToLeft)

		const btnAddToRight = ele.querySelector(`.exsied-icon-add-to-right`)
		if (btnAddToRight) btnAddToRight.addEventListener('click', this.clickBtnAddToRight)

		const btnAddToBottom = ele.querySelector(`.exsied-icon-add-to-bottom`)
		if (btnAddToBottom) btnAddToBottom.addEventListener('click', this.clickBtnAddToBottom)

		const btnDeleteRow = ele.querySelector(`.exsied-icon-delete-row`)
		if (btnDeleteRow) btnDeleteRow.addEventListener('click', this.clickDeleteRow)

		const btnDeleteColumn = ele.querySelector(`.exsied-icon-delete-column`)
		if (btnDeleteColumn) btnDeleteColumn.addEventListener('click', this.clickDeleteColumn)

		const btnDeleteTable = ele.querySelector(`.exsied-icon-delete-table`)
		if (btnDeleteTable) btnDeleteTable.addEventListener('click', this.clickDeleteTable)
	}

	clickBtnAddToTop = (_event: Event) => {
		const table = this.getCurrentTable()
		const index = this.getRowColumnIndex()
		DomUtils.tableAddRow(table, index.rowIndex)
		this.removeActionBtn()
	}

	clickBtnAddToBottom = (_event: Event) => {
		const table = this.getCurrentTable()
		const index = this.getRowColumnIndex()
		DomUtils.tableAddRow(table, index.rowIndex + 1)
		this.removeActionBtn()
	}

	clickBtnAddToLeft = (_event: Event) => {
		const table = this.getCurrentTable()
		const index = this.getRowColumnIndex()
		DomUtils.tableAddColumn(table, index.columnIndex)
		this.removeActionBtn()
	}

	clickBtnAddToRight = (_event: Event) => {
		const table = this.getCurrentTable()
		const index = this.getRowColumnIndex()
		DomUtils.tableAddColumn(table, index.columnIndex + 1)
		this.removeActionBtn()
	}

	clickDeleteRow = (event: Event) => {
		const targetEle = event.target as HTMLElement
		const rowIndex = targetEle.getAttribute(DATA_ROW_INDEX) || '0'
		const table = this.getCurrentTable()

		DomUtils.tableDeleteRow(table, parseInt(rowIndex))
		this.removeActionBtn()
	}

	clickDeleteColumn = (event: Event) => {
		const targetEle = event.target as HTMLElement
		const colunmIndex = targetEle.getAttribute(DATA_COLUNM_INDEX) || '0'
		const table = this.getCurrentTable()

		DomUtils.tableDeleteRow(table, parseInt(colunmIndex))
		this.removeActionBtn()
	}

	clickDeleteTable = (_event: Event) => {
		const table = this.getCurrentTable()
		table.remove()
		this.removeActionBtn()
	}

	getCurrentTable = () => {
		const table = document.querySelector(`[${DATA_ATTR_TEMP_EDIT}="${PLUGIN_NAME}"]`) as HTMLTableElement
		return table
	}
}
