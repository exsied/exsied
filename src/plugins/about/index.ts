/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import pkg from '../../../package.json'
import { CN_TEMP_ELE, DATA_ATTR_TEMP_EDIT, LIB_NAME, LIB_REPO_GITHUB } from '../../contants'
import { Exsied } from '../../core'
import { DomUtils } from '../../core/dom_utils'
import { t } from '../../core/i18n'
import { ExsiedPlugin } from '../../core/plugin'
import { ELE_TYPE_BUTTON } from '../../ui/toolbar'
import './styles.scss'

export type Deveploer = {
	name: string
	repoLink?: string
	webSiteLink?: string
	email?: string
	extContent?: string
}

export type PluginConf = {
	addToNormalToolbar: boolean
	addToBubbleToolbar: boolean
	deveploers: Deveploer[]
}

export const CN_ICON = 'exsied-icon-about'
export const CN_ROOT = 'exsied-about-view'

export class PluginAbout implements ExsiedPlugin<Exsied> {
	private exsied: Exsied = new Exsied('')
	private popupId = ''

	name = 'About'
	conf: PluginConf = {
		addToNormalToolbar: true,
		addToBubbleToolbar: false,
		deveploers: [
			// This is a demo infomation.
			// {
			// 	name: 'fivim github',
			// 	repoLink: 'https://github.com/fivim/fivim',
			// 	webSiteLink: 'https://xxx.com/xxx',
			// 	email: 'xxx@xxx.xxx',
			// 	extContent: `Fivim's github repo`,
			// },
			// {
			// 	name: 'fivim gitee',
			// 	repoLink: 'https://gitee.com/fivim/fivim',
			// 	webSiteLink: 'https://xxx.com/xxx',
			// 	email: 'xxx@xxx.xxx',
			// 	extContent: `Fivim's gitee repo`,
			// },
		],
	}

	init = (exsied: Exsied): void => {
		this.exsied = exsied
		this.popupId = this.exsied.genPopupId(this.name, 'index') || ''
	}

	showAbout = (event: Event) => {
		const targetEle = event.target as HTMLAnchorElement
		targetEle.setAttribute(DATA_ATTR_TEMP_EDIT, this.name)

		let contentHtml = `
			<p>
				${LIB_NAME} ${pkg.version} 
				<a href="https://fivim.top/en/exsied/about/">${t('Document')}</a> /
				<a href="${LIB_REPO_GITHUB}">Github</a> / 
				<a href="https://gitee.com/exsied/exsied">Gitee</a>
				, 
			<p>
			</p>
				it is a WYSIWYG editor from fivim(
				<a href="https://fivim.top/en/exsied/about/">${t('Document')}</a> /
				<a href="https://github.com/fivim/fivim">Github</a> /
				<a href="https://gitee.com/fivim/fivim">Gitee</a>
				)
			</p>
			`

		let developersHtml = ``
		if (this.conf.deveploers) {
			for (const item of this.conf.deveploers) {
				let line = `<div><b>${item.name}</b></div>`
				if (item.webSiteLink)
					line += `<div class="exsied-developer-item"> ${t('Site')}: <a href="${item.webSiteLink}">${item.webSiteLink}</a></div>`
				if (item.repoLink)
					line += `<div class="exsied-developer-item"> ${t('Repo')}: <a href="${item.repoLink}">${item.repoLink}</a></div>`
				if (item.email)
					line += `<div class="exsied-developer-item"> ${t('Email')}: <a href="mailto:${item.email}">${item.email}</a></div>`
				if (item.extContent) line += `<div class="exsied-developer-item"> ${item.extContent}</div>`

				developersHtml += line
			}
		}
		if (developersHtml)
			contentHtml += `
				<div class="exsied-developer-data">
					<div>${t('This is an extended version developed by:', { value: developersHtml })}</div>			
				</div>
				`

		const rect = targetEle.getBoundingClientRect()
		const ele = this.exsied.showPopup({
			id: this.popupId,
			classNames: [CN_TEMP_ELE, CN_ROOT],
			attrs: { TEMP_EDIT_ID: this.name },
			contentHtml,
			titlebarText: t('About'),
			top: rect.bottom + 'px',
			left: rect.left + 'px',
		})

		document.body.appendChild(ele)
		DomUtils.limitElementRect(ele)
	}

	getToolBarControl = () => [
		{
			name: this.name,
			tooltipText: 'About',
			addToNormalToolbar: this.conf.addToNormalToolbar,
			addToBubbleToolbar: this.conf.addToBubbleToolbar,

			eleType: ELE_TYPE_BUTTON,
			iconClassName: CN_ICON,
			clickCallBack: this.showAbout,
		},
	]

	removeTempEle = (event: Event) => {
		DomUtils.removeElementById(this.popupId)
	}
}
