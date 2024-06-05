import pkg from '../../../package.json'
import { CN_TEMP_ELE, DATA_ATTR_TEMP_EDIT, LIB_NAME, LIB_REPO } from '../../contants'
import { t } from '../../core/i18n'
import { createPopupView } from '../../ui/popup-view'
import { CN_ROOT, PLUGIN_CONF, PLUGIN_NAME, POPUP_ID } from './base'

export function insertLink(event: Event) {
	const targetEle = event.target as HTMLAnchorElement
	targetEle.setAttribute(DATA_ATTR_TEMP_EDIT, PLUGIN_NAME)

	let contentHtml = `
		<p>${LIB_NAME} v${pkg.version} ,<a href="${LIB_REPO}">github repo</a></p>
		<p>
			${LIB_NAME} is a WYSIWYG editor from enassi(
			<a href="https://github.com/enassi/enassi">github</a> 
			/
			<a href="https://gitee.com/enassi/enassi">gitee</a>
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
			<div>${t('This is an extended version developed by:')}</div>
			${developersHtml}
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
}
