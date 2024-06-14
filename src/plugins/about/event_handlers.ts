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
import { DomUtils } from '../../core/dom_utils'
import { t } from '../../core/i18n'
import { createPopupView } from '../../ui/popup_view'
import { CN_ROOT, PLUGIN_CONF, PLUGIN_NAME, POPUP_ID } from './base'

export function showAbout(event: Event) {
	const targetEle = event.target as HTMLAnchorElement
	targetEle.setAttribute(DATA_ATTR_TEMP_EDIT, PLUGIN_NAME)

	let contentHtml = `
		<p>
			${LIB_NAME} ${pkg.version} 
			<a href="https://enassi.pages.dev/en/exsied/about/">${t('Document')}</a> /
			<a href="${LIB_REPO_GITHUB}">Github</a> / 
			<a href="https://gitee.com/exsied/exsied">Gitee</a>
		</p>
		<p>
			${LIB_NAME} is a WYSIWYG editor from enassi(
			<a href="https://enassi.pages.dev/en/exsied/about/">${t('Document')}</a> /
			<a href="https://github.com/enassi/enassi">Github</a> /
			<a href="https://gitee.com/enassi/enassi">Gitee</a>
			)
		</p>
		`

	let developersHtml = ``
	if (PLUGIN_CONF.deveploers) {
		for (const item of PLUGIN_CONF.deveploers) {
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

	const ele = createPopupView({
		id: POPUP_ID,
		classNames: [CN_TEMP_ELE, CN_ROOT],
		attrs: { TEMP_EDIT_ID: PLUGIN_NAME },
		contentClassNames: [''],
		contentAttrs: {},
		contentHtml,
		titlebarText: t('About'),
	})

	const rect = targetEle.getBoundingClientRect()
	ele.style.position = 'absolute'
	ele.style.top = rect.bottom + 'px'
	ele.style.left = rect.left + 'px'

	document.body.appendChild(ele)
	DomUtils.limitElementRect(ele)
}
