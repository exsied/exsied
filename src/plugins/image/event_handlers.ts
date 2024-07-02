/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { CN_ACTIVE, CN_TEMP_ELE, DATA_ATTR_TEMP_EDIT } from '../../contants'
import { DomUtils } from '../../core/dom_utils'
import { t } from '../../core/i18n'
import { CN_POPUP_VIEW, PopupView } from '../../ui/popup_view'
import { cssStyleDeclarationToString } from '../../utils/css'
import { isNumberString } from '../../utils/string'

export const PLUGIN_NAME = 'Image'
export const CN_ICON = 'exsied-icon-image'
export const CN_RESIZER = 'exsied-image-resizer'
export const CN_BTN_TL = 'exsied-image-resizer-tl'
export const CN_BTN_TC = 'exsied-image-resizer-tc'
export const CN_BTN_TR = 'exsied-image-resizer-tr'
export const CN_BTN_L = 'exsied-image-resizer-l'
export const CN_BTN_R = 'exsied-image-resizer-r'
export const CN_BTN_BL = 'exsied-image-resizer-bl'
export const CN_BTN_BC = 'exsied-image-resizer-bc'
export const CN_BTN_BR = 'exsied-image-resizer-br'
export const CN_BTN_SETTING = 'exsied-image-settings-btn'

export const RESIZER_ID = `exsied_${PLUGIN_NAME}_resizer`

const POPUP_ID = `exsied_${PLUGIN_NAME}_popup`
const CN_IMG_SRC = `exsied-edit-image-src`
const CN_IMG_TITLE = `exsied-edit-image-title`
const CN_IMG_ALT = `exsied-edit-image-alt`
const CN_IMG_WIDTH = `exsied-edit-image-width`
const CN_IMG_HEIGHT = `exsied-edit-image-height`
const CN_IMG_STYLE = `exsied-edit-image-style`

export function onClickImageSettingButton(event: Event) {
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

	const ele = PopupView.create({
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
