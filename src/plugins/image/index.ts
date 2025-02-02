/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { CN_ACTIVE, CN_BIND_EVENT, CN_TEMP_ELE, DATA_ATTR_TEMP_EDIT, TN_DIV, TN_IMG } from '../../contants'
import { Exsied } from '../../core'
import { DomUtils } from '../../core/dom_utils'
import { EleClickCallback } from '../../core/events'
import { ExsiedPlugin } from '../../core/plugin'
import { ELE_TYPE_BUTTON, ToolBarControlIds, emptyToolBarControlIds } from '../../ui/toolbar'
import {
	CN_BTN_BC,
	CN_BTN_BL,
	CN_BTN_BR,
	CN_BTN_L,
	CN_BTN_R,
	CN_BTN_SETTING,
	CN_BTN_TC,
	CN_BTN_TL,
	CN_BTN_TR,
	CN_ICON,
	CN_RESIZER,
	PLUGIN_NAME,
	RESIZER_ID,
	onClickImageSettingButton,
} from './event_handlers'
import { DIRECTION, handlePointerDown, resizerConf } from './resizer'
import './styles.scss'

export type PluginConf = {
	addToNormalToolbar: boolean
	addToNormalToolbarInsertMenu: boolean
	addToBubbleToolbar: boolean
	defaultAlt: string
	defaultSrc: string
	defaultTitle: string
	defaultHeight: string
	defaultWidth: string
}

export class PluginImage implements ExsiedPlugin<Exsied> {
	private exsied: Exsied = new Exsied('')

	private toolbarBtnIds: ToolBarControlIds = emptyToolBarControlIds
	name = 'Image'
	conf: PluginConf = {
		addToNormalToolbar: false,
		addToNormalToolbarInsertMenu: true,
		addToBubbleToolbar: false,
		defaultAlt: 'this is an image',
		defaultSrc: '',
		defaultTitle: '',
		defaultHeight: '200px',
		defaultWidth: '200px',
	}

	init = (exsied: Exsied): void => {
		this.exsied = exsied
	}

	afterToolbarInit = () => {
		this.toolbarBtnIds = this.exsied.toolbar.genButtonIdStd(this.name, 'index') || emptyToolBarControlIds
	}

	insertImage = () => {
		const ele = document.createElement(TN_IMG)
		ele.alt = this.conf.defaultAlt
		ele.src = this.conf.defaultSrc
		ele.title = this.conf.defaultTitle
		ele.style.height = this.conf.defaultHeight
		ele.style.width = this.conf.defaultWidth
		if (this.exsied.elements.workplace)
			this.exsied.selectionUtils.addElementBySelection(this.exsied.elements.workplace, ele)
	}

	commands = {
		insertImage: this.insertImage,
	}

	getToolBarControl = () => [
		{
			name: 'index',
			tooltipText: 'Image',
			addToNormalToolbar: this.conf.addToNormalToolbar,
			addToNormalToolbarInsertMenu: this.conf.addToNormalToolbarInsertMenu,
			addToBubbleToolbar: this.conf.addToBubbleToolbar,

			eleType: ELE_TYPE_BUTTON,
			iconClassName: CN_ICON,
			clickCallBack: this.commands.insertImage,
		},
	]

	addHandler = () => {
		EleClickCallback.addByTag(TN_IMG, this.onClickImage)
		EleClickCallback.addByClass(CN_BTN_SETTING, onClickImageSettingButton)
	}

	checkHighlight = (_event: Event) => {
		const btnEle = this.exsied.elements.editor.querySelector(`#${this.toolbarBtnIds.normal}`)

		if (btnEle) {
			const allTagNamesArr = this.exsied.cursorAllParentsTagNamesArr
			allTagNamesArr.includes(TN_IMG) ? btnEle.classList.add(CN_ACTIVE) : btnEle.classList.remove(CN_ACTIVE)
		}
	}
	removeTempEle = (_event: Event) => {
		const allTagNamesArr = this.exsied.cursorAllParentsTagNamesArr
		if (!allTagNamesArr.includes(TN_IMG)) {
			DomUtils.removeElementById(RESIZER_ID)
		}
	}

	onClickImage(event: Event) {
		// event.stopPropagation()
		// event.preventDefault()

		const targetEle = event.target as HTMLElement
		targetEle.setAttribute(DATA_ATTR_TEMP_EDIT, PLUGIN_NAME)
		targetEle.classList.add(CN_ACTIVE)

		const rect = targetEle.getBoundingClientRect()
		const html = `
			<div class="${CN_BIND_EVENT} ${CN_RESIZER} ${CN_BTN_TL}"></div>
			<div class="${CN_BIND_EVENT} ${CN_RESIZER} ${CN_BTN_TC}"></div>
			<div class="${CN_BIND_EVENT} ${CN_RESIZER} ${CN_BTN_TR}"></div>
			<div class="${CN_BIND_EVENT} ${CN_RESIZER} ${CN_BTN_L}"></div>
			<div class="${CN_BIND_EVENT} ${CN_RESIZER} ${CN_BTN_R}"></div>
			<div class="${CN_BIND_EVENT} ${CN_RESIZER} ${CN_BTN_BL}"></div>
			<div class="${CN_BIND_EVENT} ${CN_RESIZER} ${CN_BTN_BC}"></div>
			<div class="${CN_BIND_EVENT} ${CN_RESIZER} ${CN_BTN_BR}"></div>
			<div class="${CN_BIND_EVENT} ${CN_RESIZER} ${CN_BTN_SETTING}"></div>
			`
		const ele = document.createElement(TN_DIV)
		ele.id = RESIZER_ID
		ele.setAttribute(DATA_ATTR_TEMP_EDIT, PLUGIN_NAME)
		ele.classList.add(CN_TEMP_ELE)
		ele.style.position = 'absolute'
		ele.style.top = rect.top + 'px'
		ele.style.left = rect.left + 'px'
		ele.style.width = rect.width + 'px'
		ele.style.height = rect.height + 'px'

		ele.innerHTML = html
		document.body.appendChild(ele)

		const eleTl = ele.querySelector(`.${CN_BTN_TL}`)
		if (eleTl) eleTl.addEventListener('pointerdown', this.onPointerDownBtnTl)

		const eleTc = ele.querySelector(`.${CN_BTN_TC}`)
		if (eleTc) eleTc.addEventListener('pointerdown', this.onPointerDownBtnTc)

		const eleTr = ele.querySelector(`.${CN_BTN_TR}`)
		if (eleTr) eleTr.addEventListener('pointerdown', this.onPointerDownBtnTr)

		const eleL = ele.querySelector(`.${CN_BTN_L}`)
		if (eleL) eleL.addEventListener('pointerdown', this.onPointerDownBtnL)

		const eleR = ele.querySelector(`.${CN_BTN_R}`)
		if (eleR) eleR.addEventListener('pointerdown', this.onPointerDownBtnR)

		const eleBl = ele.querySelector(`.${CN_BTN_BL}`)
		if (eleBl) eleBl.addEventListener('pointerdown', this.onPointerDownBtnBl)

		const eleBc = ele.querySelector(`.${CN_BTN_BC}`)
		if (eleBc) eleBc.addEventListener('pointerdown', this.onPointerDownBtnBc)

		const eleBr = ele.querySelector(`.${CN_BTN_BR}`)
		if (eleBr) eleBr.addEventListener('pointerdown', this.onPointerDownBtnBr)
	}

	setBaseData = () => {
		const workplace = this.exsied.elements.workplace
		if (!workplace) return

		resizerConf.editorEle = workplace
		resizerConf.imageEle = document.querySelector(`[${DATA_ATTR_TEMP_EDIT}="${PLUGIN_NAME}"]`) as HTMLImageElement
		resizerConf.resizerEle = document.querySelector(`#${RESIZER_ID}`) as HTMLImageElement
	}

	onPointerDownBtnTl(event: Event) {
		this.setBaseData()
		handlePointerDown(event as MouseEvent, DIRECTION.top | DIRECTION.left)
	}

	onPointerDownBtnTc(event: Event) {
		this.setBaseData()
		handlePointerDown(event as MouseEvent, DIRECTION.top)
	}

	onPointerDownBtnTr(event: Event) {
		this.setBaseData()
		handlePointerDown(event as MouseEvent, DIRECTION.top | DIRECTION.right)
	}

	onPointerDownBtnL(event: Event) {
		this.setBaseData()
		handlePointerDown(event as MouseEvent, DIRECTION.left)
	}

	onPointerDownBtnR(event: Event) {
		this.setBaseData()
		handlePointerDown(event as MouseEvent, DIRECTION.right)
	}

	onPointerDownBtnBl(event: Event) {
		this.setBaseData()
		handlePointerDown(event as MouseEvent, DIRECTION.bottom | DIRECTION.left)
	}

	onPointerDownBtnBc(event: Event) {
		this.setBaseData()
		handlePointerDown(event as MouseEvent, DIRECTION.bottom)
	}

	onPointerDownBtnBr(event: Event) {
		this.setBaseData()
		handlePointerDown(event as MouseEvent, DIRECTION.bottom | DIRECTION.right)
	}
}
