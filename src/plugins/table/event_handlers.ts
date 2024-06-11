/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License,
 * and if you do not meet the conditions, authorization is required
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { CN_TEMP_ELE, DATA_ATTR_TEMP_EDIT, TN_DIV, TN_TABLE, TN_TD, TN_TH } from '../../contants'
import { exsied } from '../../core'
import { DomUtils } from '../../core/dom_utils'
import { t } from '../../core/i18n'
import { createPopupView } from '../../ui/popup_view'
import { tagNameLc } from '../../utils'
import { CN_TABLE_CELL_ACTION_BUTTON, DATA_COLUNM_INDEX, DATA_ROW_INDEX, PLUGIN_NAME, POPUP_ID } from './base'

export function insertTable() {
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

	if (exsied.elements.workplace) DomUtils.addElementBySelection(exsied.elements.workplace, ele)
}

export function showTableActionButtons(event: Event) {
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

	btnEle.addEventListener('click', showTableActionPopup)
}

const getRowColumnIndex = (): { rowIndex: number; columnIndex: number } => {
	let btnEle = document.querySelector(`.${CN_TABLE_CELL_ACTION_BUTTON}`) as HTMLElement
	if (btnEle) {
		const rowIndex = btnEle.getAttribute(DATA_ROW_INDEX) || '0'
		const colunmIndex = btnEle.getAttribute(DATA_COLUNM_INDEX) || '0'

		return { rowIndex: parseInt(rowIndex), columnIndex: parseInt(colunmIndex) }
	}

	return { rowIndex: 0, columnIndex: 0 }
}

const removeTempEle = () => {
	let btnEle = document.querySelector(`.${CN_TABLE_CELL_ACTION_BUTTON}`) as HTMLElement
	if (btnEle) btnEle.remove()

	DomUtils.removeElementById(POPUP_ID)
}

export function showTableActionPopup(event: Event) {
	const contentHtml = `
		<div class="exsied-table-edit-actions">
			<div class="exsied-cell"></div>  
			<div class="exsied-cell exsied-btn exsied-btn-add-to-top">
				<i class="add"></i>
			</div>  
			<div class="exsied-cell"></div>  
			<div class="exsied-cell exsied-btn exsied-btn-add-to-left">
				<i class="add"></i>
			</div>  
			<div class="exsied-cell"></div>  
			<div class="exsied-cell exsied-btn exsied-btn-add-to-right">
				<i class="add"></i>
			</div>  
			<div class="exsied-cell"></div>  
			<div class="exsied-cell exsied-btn exsied-btn-add-to-bottom">
				<i class="add"></i>
			</div>  
			<div class="exsied-cell"></div>  

			<div class="exsied-cell exsied-btn exsied-btn-delete-row">
				<i class="delete-row"></i>
			</div>  
			<div class="exsied-cell exsied-btn exsied-btn-delete-column">
				<i class="delete-column"></i>
			</div>  
			<div class="exsied-cell exsied-btn exsied-btn-delete-table">
				<i class="trash"></i>
			</div>  
		</div>
		`

	const ele = createPopupView({
		id: POPUP_ID,
		classNames: [CN_TEMP_ELE],
		attrs: { TEMP_EDIT_ID: PLUGIN_NAME },
		contentClassNames: [],
		contentAttrs: {},
		contentHtml,
		titlebarText: t('Table actions'),
		actionsButtons: [],
	})

	const width = 150

	const targetEle = event.target as HTMLElement
	const rect = targetEle.getBoundingClientRect()
	const scrollTop = window.pageYOffset || window.scrollY
	const scrollLeft = window.pageXOffset || window.scrollX

	ele.style.position = 'absolute'
	ele.style.top = rect.top + scrollTop + 'px'
	ele.style.right = window.innerWidth - rect.right + scrollLeft + 'px'
	ele.style.width = width + 'px'

	document.body.appendChild(ele)

	const btnAddToTop = ele.querySelector(`.exsied-btn-add-to-top`)
	if (btnAddToTop) btnAddToTop.addEventListener('click', clickBtnAddToTop)

	const btnAddToLeft = ele.querySelector(`.exsied-btn-add-to-left`)
	if (btnAddToLeft) btnAddToLeft.addEventListener('click', clickBtnAddToLeft)

	const btnAddToRight = ele.querySelector(`.exsied-btn-add-to-right`)
	if (btnAddToRight) btnAddToRight.addEventListener('click', clickBtnAddToRight)

	const btnAddToBottom = ele.querySelector(`.exsied-btn-add-to-bottom`)
	if (btnAddToBottom) btnAddToBottom.addEventListener('click', clickBtnAddToBottom)

	const btnDeleteRow = ele.querySelector(`.exsied-btn-delete-row`)
	if (btnDeleteRow) btnDeleteRow.addEventListener('click', clickDeleteRow)

	const btnDeleteColumn = ele.querySelector(`.exsied-btn-delete-column`)
	if (btnDeleteColumn) btnDeleteColumn.addEventListener('click', clickDeleteColumn)

	const btnDeleteTable = ele.querySelector(`.exsied-btn-delete-table`)
	if (btnDeleteTable) btnDeleteTable.addEventListener('click', clickDeleteTable)
}

const clickBtnAddToTop = (_event: Event) => {
	const table = getCurrentTable()
	const index = getRowColumnIndex()
	DomUtils.tableAddRow(table, index.rowIndex)
	removeTempEle()
}

const clickBtnAddToBottom = (_event: Event) => {
	const table = getCurrentTable()
	const index = getRowColumnIndex()
	DomUtils.tableAddRow(table, index.rowIndex + 1)
	removeTempEle()
}

const clickBtnAddToLeft = (_event: Event) => {
	const table = getCurrentTable()
	const index = getRowColumnIndex()
	DomUtils.tableAddColumn(table, index.columnIndex)
	removeTempEle()
}

const clickBtnAddToRight = (_event: Event) => {
	const table = getCurrentTable()
	const index = getRowColumnIndex()
	DomUtils.tableAddColumn(table, index.columnIndex + 1)
	removeTempEle()
}

const clickDeleteRow = (event: Event) => {
	const targetEle = event.target as HTMLElement
	const rowIndex = targetEle.getAttribute(DATA_ROW_INDEX) || '0'
	const table = getCurrentTable()

	DomUtils.tableDeleteRow(table, parseInt(rowIndex))
	removeTempEle()
}

const clickDeleteColumn = (event: Event) => {
	const targetEle = event.target as HTMLElement
	const colunmIndex = targetEle.getAttribute(DATA_COLUNM_INDEX) || '0'
	const table = getCurrentTable()

	DomUtils.tableDeleteRow(table, parseInt(colunmIndex))
	removeTempEle()
}

const clickDeleteTable = (_event: Event) => {
	const table = getCurrentTable()
	table.remove()
	removeTempEle()
}

const getCurrentTable = () => {
	const table = document.querySelector(`[${DATA_ATTR_TEMP_EDIT}="${PLUGIN_NAME}"]`) as HTMLTableElement
	return table
}
