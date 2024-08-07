/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { TN_CODE, TN_DIV, TN_PRE } from '../../contants'
import { Exsied } from '../../core'
import { EventWithElement, ExsiedPlugin, getEventWithElementEle } from '../../core/plugin'
import { SelectionUtils } from '../../core/selection_utils'
import { ELE_TYPE_BUTTON, ID_TOOLBAR_EXT } from '../../ui/toolbar'
import { randomChars } from '../../utils/string'
import { afterSetHtml, beforeGetHtml, renderElement } from './hooks'

export type PluginConf = {
	addToNormalToolbar: boolean
	addToNormalToolbarInsertMenu?: boolean
	addToBubbleToolbar: boolean
	defaultText: string
	renderDataCb: (ele: HTMLElement) => string
	editDataCb: (ele: HTMLElement, sign: string) => void
	toggleSourceViewCb?: () => void
	toggleSourceViewAferInitCb?: (exsied: Exsied, sourceCodeWorkplaceEle: HTMLElement) => void
	randomCharsCb(): string
}

export const PLUGIN_NAME = 'SourceCode'
export const CN_ICON_BRACES = 'exsied-icon-braces'
export const CN_ICON_XML = 'exsied-icon-xml'
export const CN_ICON_BACK = 'exsied-icon-back'
export const ID_SOURCE_CODE_EDIT_VIEW = 'sourceCodeEditView'

export const NAME_SOURCE_CODE_VIEW = 'sourceCodeView'
export const NAME_INSERT_SOURCE_CODE_BOCK = 'insertSourceCodeBock'

export class PluginSourceCode implements ExsiedPlugin<Exsied> {
	private exsied: Exsied = new Exsied('')

	name = PLUGIN_NAME
	conf: PluginConf = {
		addToNormalToolbar: false,
		addToNormalToolbarInsertMenu: true,
		addToBubbleToolbar: false,
		defaultText: '// Source code placeholder',
		renderDataCb: (ele: HTMLElement) => {
			console.warn(`Developer didn't implement the callback: ${PLUGIN_NAME}.conf.renderData`)

			return `
				<pre>
					<p>Source code:</p>
					<code>${ele.innerHTML}</code>
				</pre>`
		},
		editDataCb: (_ele: HTMLElement, _sign: string) => {
			alert(`Developer didn't implement the callback: ${PLUGIN_NAME}.conf.editData`)
		},
		randomCharsCb: () => {
			return randomChars(28)
		},
	}

	init = (exsied: Exsied): void => {
		this.exsied = exsied
	}

	toggleSourceView = () => {
		if (this.conf.toggleSourceViewCb) {
			this.conf.toggleSourceViewCb()
			return
		}

		const sourceCodeWorkplaceEle = document.createElement(TN_DIV)
		sourceCodeWorkplaceEle.classList.add('exsied-workplace')
		sourceCodeWorkplaceEle.id = ID_SOURCE_CODE_EDIT_VIEW
		sourceCodeWorkplaceEle.contentEditable = 'true'

		const workplaceEle = this.exsied.elements.workplace
		if (!workplaceEle) return

		workplaceEle.after(sourceCodeWorkplaceEle)
		workplaceEle.style.display = 'none'

		this.exsied.toolbar.genToolbarExt([
			{
				name: 'exit',
				buttonText: 'Exit',
				tooltipText: 'Exit',
				addToNormalToolbar: false,
				addToBubbleToolbar: false,

				eleType: ELE_TYPE_BUTTON,
				iconClassName: CN_ICON_BACK,
				clickCallBack: () => {
					const extToolbar = this.exsied.elements.toolbarMain.querySelector(`#${ID_TOOLBAR_EXT}`)
					if (extToolbar) extToolbar.remove()

					workplaceEle.style.display = ''
					sourceCodeWorkplaceEle.remove()
					if (!this.conf.toggleSourceViewAferInitCb) {
						workplaceEle.innerHTML = sourceCodeWorkplaceEle.textContent || ''
					}

					this.exsied.toolbar.hideNormalToolbar(false)
				},
			},
		])

		if (this.conf.toggleSourceViewAferInitCb) {
			this.conf.toggleSourceViewAferInitCb(this.exsied, sourceCodeWorkplaceEle)
		} else {
			sourceCodeWorkplaceEle.textContent = workplaceEle.innerHTML || ''
		}
	}

	insertCodeBlock = () => {
		const ele = document.createElement(TN_PRE)
		const codeEle = document.createElement(TN_CODE)

		const text = SelectionUtils.getSelectedText()
		codeEle.textContent = text ? text : this.conf.defaultText
		ele.appendChild(codeEle)
		if (this.exsied.elements.workplace)
			this.exsied.selectionUtils.addElementBySelection(this.exsied.elements.workplace, ele)

		renderElement(this.exsied, codeEle)
	}

	renderCodeEle = (event: Event | EventWithElement) => {
		const ele = getEventWithElementEle(event)
		if (ele) renderElement(this.exsied, ele)
	}

	commands = {
		toggleSourceView: this.toggleSourceView,
		insertCodeBlock: this.insertCodeBlock,
		renderCodeEle: this.renderCodeEle,
	}

	getToolBarControl = () => [
		{
			name: NAME_SOURCE_CODE_VIEW,
			tooltipText: 'Toggle source code view',
			addToNormalToolbar: true, // TODO
			addToNormalToolbarInsertMenu: false, // TODO
			addToBubbleToolbar: this.conf.addToBubbleToolbar,

			eleType: ELE_TYPE_BUTTON,
			iconClassName: CN_ICON_XML,
			clickCallBack: this.commands.toggleSourceView,
		},
		{
			name: NAME_INSERT_SOURCE_CODE_BOCK,
			tooltipText: 'Insert source code bock',
			addToNormalToolbar: this.conf.addToNormalToolbar,
			addToNormalToolbarInsertMenu: this.conf.addToNormalToolbarInsertMenu,
			addToBubbleToolbar: this.conf.addToBubbleToolbar,

			eleType: ELE_TYPE_BUTTON,
			iconClassName: CN_ICON_BRACES,
			clickCallBack: this.commands.insertCodeBlock,
		},
	]

	hooks = {
		afterSetHtml,
		beforeGetHtml,
	}
}
