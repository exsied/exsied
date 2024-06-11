/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License,
 * and if you do not meet the conditions, authorization is required
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { CN_ACTIVE, CN_BIND_EVENT, CN_TEMP_ELE, DATA_ATTR_TEMP_EDIT, TN_DIV, TN_IMG } from '../../contants'
import { exsied } from '../../core'
import { DomUtils } from '../../core/dom_utils'
import { t } from '../../core/i18n'
import { CN_POPUP_VIEW, createPopupView } from '../../ui/popup_view'
import { cssStyleDeclarationToString } from '../../utils/css'
import { isNumberString } from '../../utils/string'
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
	CN_RESIZER,
	PLUGIN_CONF,
	PLUGIN_NAME,
	RESIZER_ID,
} from './base'
import { DIRECTION, handlePointerDown, resizerConf } from './resizer'

export function insertImage() {
	const ele = document.createElement(TN_IMG)
	ele.src = PLUGIN_CONF.defaultSrc
	ele.alt = PLUGIN_CONF.defaultAlt
	if (exsied.elements.workplace) DomUtils.addElementBySelection(exsied.elements.workplace, ele)
}

export function onClickImage(event: Event) {
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
	if (eleTl) eleTl.addEventListener('pointerdown', onPointerDownBtnTl)

	const eleTc = ele.querySelector(`.${CN_BTN_TC}`)
	if (eleTc) eleTc.addEventListener('pointerdown', onPointerDownBtnTc)

	const eleTr = ele.querySelector(`.${CN_BTN_TR}`)
	if (eleTr) eleTr.addEventListener('pointerdown', onPointerDownBtnTr)

	const eleL = ele.querySelector(`.${CN_BTN_L}`)
	if (eleL) eleL.addEventListener('pointerdown', onPointerDownBtnL)

	const eleR = ele.querySelector(`.${CN_BTN_R}`)
	if (eleR) eleR.addEventListener('pointerdown', onPointerDownBtnR)

	const eleBl = ele.querySelector(`.${CN_BTN_BL}`)
	if (eleBl) eleBl.addEventListener('pointerdown', onPointerDownBtnBl)

	const eleBc = ele.querySelector(`.${CN_BTN_BC}`)
	if (eleBc) eleBc.addEventListener('pointerdown', onPointerDownBtnBc)

	const eleBr = ele.querySelector(`.${CN_BTN_BR}`)
	if (eleBr) eleBr.addEventListener('pointerdown', onPointerDownBtnBr)
}

const setBaseData = () => {
	resizerConf.editorEle = exsied.elements.workplace
	resizerConf.imageEle = document.querySelector(`[${DATA_ATTR_TEMP_EDIT}="${PLUGIN_NAME}"]`) as HTMLImageElement
	resizerConf.resizerEle = document.querySelector(`#${RESIZER_ID}`) as HTMLImageElement
}

export const onPointerDownBtnTl = (event: Event) => {
	setBaseData()
	handlePointerDown(event as MouseEvent, DIRECTION.top | DIRECTION.left)
}

export const onPointerDownBtnTc = (event: Event) => {
	setBaseData()
	handlePointerDown(event as MouseEvent, DIRECTION.top)
}

export const onPointerDownBtnTr = (event: Event) => {
	setBaseData()
	handlePointerDown(event as MouseEvent, DIRECTION.top | DIRECTION.right)
}

export const onPointerDownBtnL = (event: Event) => {
	setBaseData()
	handlePointerDown(event as MouseEvent, DIRECTION.left)
}

export const onPointerDownBtnR = (event: Event) => {
	setBaseData()
	handlePointerDown(event as MouseEvent, DIRECTION.right)
}

export const onPointerDownBtnBl = (event: Event) => {
	setBaseData()
	handlePointerDown(event as MouseEvent, DIRECTION.bottom | DIRECTION.left)
}

export const onPointerDownBtnBc = (event: Event) => {
	setBaseData()
	handlePointerDown(event as MouseEvent, DIRECTION.bottom)
}

export const onPointerDownBtnBr = (event: Event) => {
	setBaseData()
	handlePointerDown(event as MouseEvent, DIRECTION.bottom | DIRECTION.right)
}

const POPUP_ID = `exsied_${PLUGIN_NAME}_popup`
const CN_IMG_SRC = `exsied-edit-image-src`
const CN_IMG_TITLE = `exsied-edit-image-title`
const CN_IMG_ALT = `exsied-edit-image-alt`
const CN_IMG_WIDTH = `exsied-edit-image-width`
const CN_IMG_HEIGHT = `exsied-edit-image-height`
const CN_IMG_STYLE = `exsied-edit-image-style`

export const onClickImageSettingButton = (event: Event) => {
	event.stopPropagation()
	event.preventDefault()

	DomUtils.removeElementById(RESIZER_ID)

	const imageEle = document.querySelector(`[${DATA_ATTR_TEMP_EDIT}="${PLUGIN_NAME}"]`) as HTMLImageElement

	const targetEle = event.target as HTMLAnchorElement
	targetEle.setAttribute(DATA_ATTR_TEMP_EDIT, PLUGIN_NAME)

	//Src Title Alternative Styles
	const contentHtml = `
		<div>
			<label>${t('Src')}</label>
			<input class="${CN_IMG_SRC}" value="${imageEle.src}" />
		</div>

		<div>
			<label>${t('Title')}</label>
			<input class="${CN_IMG_TITLE}" value="${imageEle.title}" />
		</div>
		<div>
			<label>${t('Alternative')}</label>
			<input class="${CN_IMG_ALT}" value="${imageEle.alt}" />
		</div>		
		<div>
			<label>${t('Width')}</label>
			<input class="${CN_IMG_WIDTH}" value="${imageEle.width || ''}" />
		</div>
		<div>
			<label>${t('Height')}</label>
			<input class="${CN_IMG_HEIGHT}" value="${imageEle.height || ''}" />
		</div>
		<div>
			<label>${t('Styles')}</label>
			<input class="${CN_IMG_STYLE}" value="${cssStyleDeclarationToString(imageEle.style)}" />
		</div>
		`

	const ele = createPopupView({
		id: POPUP_ID,
		classNames: [CN_TEMP_ELE],
		attrs: { TEMP_EDIT_ID: PLUGIN_NAME },
		contentClassNames: ['exsied-image-edit-view'],
		contentAttrs: {},
		contentHtml,
		titlebarText: t('Image settings'),
		actionsButtons: [
			{
				text: t('OK'),
				id: `${POPUP_ID}_ok`,
				callback: (event) => {
					const targetEle = event.target as HTMLElement
					const popupEle = targetEle.closest(`.${CN_POPUP_VIEW}`) as HTMLElement

					const srcInput = popupEle.querySelector(`.${CN_IMG_SRC}`) as HTMLInputElement
					const titleInput = popupEle.querySelector(`.${CN_IMG_TITLE}`) as HTMLInputElement
					const altInput = popupEle.querySelector(`.${CN_IMG_ALT}`) as HTMLInputElement
					const widthInput = popupEle.querySelector(`.${CN_IMG_WIDTH}`) as HTMLInputElement
					const heightInput = popupEle.querySelector(`.${CN_IMG_HEIGHT}`) as HTMLInputElement
					const styleInput = popupEle.querySelector(`.${CN_IMG_STYLE}`) as HTMLInputElement

					if (srcInput && srcInput.value) imageEle.setAttribute('src', srcInput.value)
					if (titleInput && titleInput.value) imageEle.setAttribute('title', titleInput.value)
					if (altInput && altInput.value) imageEle.setAttribute('alt', altInput.value)
					if (styleInput && styleInput.value) imageEle.setAttribute('style', styleInput.value)
					if (widthInput && widthInput.value) {
						let v = widthInput.value
						if (isNumberString(v)) v = `${v}px`
						imageEle.style.width = v
					}
					if (heightInput && heightInput.value) {
						let v = heightInput.value
						if (isNumberString(v)) v = `${v}px`
						imageEle.style.height = v
					}

					DomUtils.removeElementById(POPUP_ID)
					imageEle.classList.remove(CN_ACTIVE)
					imageEle.removeAttribute(DATA_ATTR_TEMP_EDIT)
				},
			},
			{
				text: t('Cancel'),
				id: `${POPUP_ID}_cancel`,
				callback: (_event) => {
					DomUtils.removeElementById(POPUP_ID)
					imageEle.classList.remove(CN_ACTIVE)
					imageEle.removeAttribute(DATA_ATTR_TEMP_EDIT)
				},
			},
		],
	})

	const windowHeight = window.innerHeight
	const windowWidth = window.innerWidth

	const height = windowHeight > 768 ? windowHeight * 0.5 : windowHeight * 0.8
	const width = windowWidth > 768 ? windowWidth * 0.5 : windowWidth * 0.8

	ele.style.position = 'absolute'
	ele.style.top = (windowHeight - height) / 2 + 'px'
	ele.style.left = (windowWidth - width) / 2 + 'px'
	ele.style.height = height + 'px'
	ele.style.width = width + 'px'

	document.body.appendChild(ele)
}
