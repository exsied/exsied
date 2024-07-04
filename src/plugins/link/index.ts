/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { CN_ACTIVE, CN_TEMP_ELE, DATA_ATTR_TEMP_EDIT, LIB_NAME, LIB_REPO_GITHUB, TN_A } from '../../contants'
import { Exsied } from '../../core'
import { DomUtils } from '../../core/dom_utils'
import { EleClickCallback } from '../../core/events'
import { ExsiedPlugin } from '../../core/plugin'
import { SelectionUtils } from '../../core/selection_utils'
import { ELE_TYPE_BUTTON, ToolBarControlIds, emptyToolBarControlIds } from '../../ui/toolbar'
import './styles.scss'

export type PluginConf = {
	addToNormalToolbar: boolean
	addToNormalToolbarInsertMenu: boolean
	addToBubbleToolbar: boolean
	defaultInnerHTML: string
	defaultHref: string
	clickLinkCb?: (event: MouseEvent) => void
	displayLinkCb: (link: string) => string
	saveLinkCb: (link: string) => string
}

export const PLUGIN_NAME = 'Link'
export const CN_ICON = 'exsied-icon-link'
export const POPUP_ID = `exsied_${PLUGIN_NAME}_popup`
export const CN_ROOT = 'exsied-link-editor'
export const CN_EDIT_BTN = 'exsied-link-edit'
export const CN_PREVIEW = 'exsied-preview-view'
export const CN_TRASH = 'exsied-link-trash'
export const CN_EDIT_VIEW = 'exsied-edit-view'
export const CN_EDIT_INPUT = 'exsied-link-input'
export const CN_CANCEL_BTN = 'exsied-link-cancel'
export const CN_CONFIRM_BTN = 'exsied-link-confirm'

export class PluginLink implements ExsiedPlugin<Exsied> {
	private exsied: Exsied = new Exsied('')

	private toolbarBtnIds: ToolBarControlIds = emptyToolBarControlIds
	name = 'Link'
	conf: PluginConf = {
		addToNormalToolbar: false,
		addToNormalToolbarInsertMenu: true,
		addToBubbleToolbar: true,
		defaultInnerHTML: LIB_NAME,
		defaultHref: LIB_REPO_GITHUB,
		displayLinkCb: (link: string) => link,
		saveLinkCb: (link: string) => link,
	}

	init = (exsied: Exsied): void => {
		this.exsied = exsied
	}

	afterToolbarInit = () => {
		this.toolbarBtnIds = this.exsied.toolbar.genButtonIdStd(this.name, 'index') || emptyToolBarControlIds
	}

	insertLink = () => {
		const selectedEles = SelectionUtils.getSelectedEles()

		const ele = document.createElement(TN_A)
		ele.href = this.conf.defaultHref
		ele.innerHTML = selectedEles && selectedEles.innerHTML ? selectedEles.innerHTML : this.conf.defaultInnerHTML
		if (this.exsied.elements.workplace)
			this.exsied.selectionUtils.addElementBySelection(this.exsied.elements.workplace, ele)
	}

	commands = {
		insertLink: this.insertLink,
	}

	getToolBarControl = () => [
		{
			name: 'index',
			tooltipText: 'Link',
			addToNormalToolbar: this.conf.addToNormalToolbar,
			addToNormalToolbarInsertMenu: this.conf.addToNormalToolbarInsertMenu,
			addToBubbleToolbar: this.conf.addToBubbleToolbar,

			eleType: ELE_TYPE_BUTTON,
			iconClassName: CN_ICON,
			clickCallBack: this.commands.insertLink,
		},
	]

	addHandler = () => {
		EleClickCallback.addByTag(TN_A, this.onClickLink)
	}

	checkHighlight = (_event: Event) => {
		const btnEle = this.exsied.elements.editor.querySelector(`#${this.toolbarBtnIds.normal}`)

		if (btnEle) {
			const allTagNamesArr = this.exsied.cursorAllParentsTagNamesArr
			allTagNamesArr.includes(TN_A) ? btnEle.classList.add(CN_ACTIVE) : btnEle.classList.remove(CN_ACTIVE)
		}
	}
	removeTempEle = (_event: Event) => {
		const allTagNamesArr = this.exsied.cursorAllParentsTagNamesArr
		if (!allTagNamesArr.includes(TN_A)) {
			DomUtils.removeElementById(POPUP_ID)
		}
	}

	onClickLink = (event: Event) => {
		event.stopPropagation()
		event.preventDefault()

		const targetEle = event.target as HTMLAnchorElement
		targetEle.setAttribute(DATA_ATTR_TEMP_EDIT, PLUGIN_NAME)

		const link = targetEle.href || this.conf.defaultHref

		const contentHtml = `					
			<div class="${CN_PREVIEW}">
				<a href="${link}" target="_blank" rel="noopener noreferrer">
					  ${this.conf.displayLinkCb(link)}
				</a>
				<div class="exsied-btn ${CN_EDIT_BTN}">
					  <i class="exsied-icon exsied-icon-edit"></i>
				  </div>
				<div class="exsied-btn ${CN_TRASH}">
					  <i class="exsied-icon exsied-icon-trash"></i>
				</div>
			</div>
			<div class="${CN_EDIT_VIEW}" style="display: none">
				<input class="${CN_EDIT_INPUT}" value="">	
				<div class="exsied-btn ${CN_CANCEL_BTN}">
					<i class="exsied-icon exsied-icon-cancel"></i>
				</div>
				<div class="exsied-btn ${CN_CONFIRM_BTN}">
					<i class="exsied-icon exsied-icon-confirm"></i>
				</div>
			</div>
			`

		const rect = targetEle.getBoundingClientRect()
		const ele = this.exsied.showPopup({
			id: POPUP_ID,
			classNames: [CN_TEMP_ELE, CN_ROOT],
			attrs: { TEMP_EDIT_ID: PLUGIN_NAME },
			contentClassNames: ['exsied-link-view'],
			contentHtml,
			top: rect.bottom + 'px',
			left: rect.left + 'px',
		})

		document.body.appendChild(ele)
		DomUtils.limitElementRect(ele)

		const clickLinkCb = this.conf.clickLinkCb
		if (clickLinkCb) {
			const link = ele.querySelector(`.${CN_PREVIEW} a`)
			if (link) {
				const eleLink = link as HTMLAnchorElement
				eleLink.addEventListener('click', clickLinkCb)
			}
		}

		const eleEditBtn = ele.querySelector(`.${CN_EDIT_BTN}`)
		if (eleEditBtn) {
			eleEditBtn.addEventListener('click', this.onClickEditBtn)
		}

		const eleTrashBtn = ele.querySelector(`.${CN_TRASH}`)
		if (eleTrashBtn) {
			eleTrashBtn.addEventListener('click', this.onClickTrashBtn)
		}

		const eleCancelBtn = ele.querySelector(`.${CN_CANCEL_BTN}`)
		if (eleCancelBtn) {
			eleCancelBtn.addEventListener('click', this.onClickCancelBtn)
		}

		const eleconfirmBtn = ele.querySelector(`.${CN_CONFIRM_BTN}`)
		if (eleconfirmBtn) {
			eleconfirmBtn.addEventListener('click', this.onClickConfirmBtn)
		}
	}

	onClickEditBtn = (event: Event) => {
		const root = (event.target as HTMLElement).closest(`.${CN_ROOT}`)
		const previewView = root?.querySelector(`.${CN_PREVIEW}`) as HTMLElement
		const editView = root?.querySelector(`.${CN_EDIT_VIEW}`) as HTMLElement

		const link = previewView.querySelector(`a`) as HTMLAnchorElement
		const input = editView.querySelector(`.${CN_EDIT_INPUT}`) as HTMLInputElement
		input.value = this.conf.displayLinkCb(link.href)

		previewView.style.display = 'none'
		editView.style.display = 'flex'
	}

	onClickTrashBtn = (_event: Event) => {
		const ele = document.querySelector(`[${DATA_ATTR_TEMP_EDIT}="${PLUGIN_NAME}"]`) as HTMLAnchorElement
		const textContent = ele.textContent || ele.innerText
		ele.parentNode?.replaceChild(document.createTextNode(textContent), ele)
		ele.removeAttribute(DATA_ATTR_TEMP_EDIT)

		DomUtils.removeElementById(POPUP_ID)
	}

	onClickCancelBtn = (_event: Event) => {
		const ele = document.querySelector(`[${DATA_ATTR_TEMP_EDIT}="${PLUGIN_NAME}"]`) as HTMLAnchorElement
		ele.removeAttribute(DATA_ATTR_TEMP_EDIT)

		DomUtils.removeElementById(POPUP_ID)
	}

	onClickConfirmBtn = (event: Event) => {
		const root = (event.target as HTMLElement).closest(`.${CN_ROOT}`)
		const editView = root?.querySelector(`.${CN_EDIT_VIEW}`) as HTMLElement

		const link = document.querySelector(`[${DATA_ATTR_TEMP_EDIT}="${PLUGIN_NAME}"]`) as HTMLAnchorElement
		const input = editView.querySelector(`.${CN_EDIT_INPUT}`) as HTMLInputElement
		link.setAttribute('href', this.conf.saveLinkCb(input.value))
		link.removeAttribute(DATA_ATTR_TEMP_EDIT)

		DomUtils.removeElementById(POPUP_ID)
	}
}
