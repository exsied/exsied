/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License,
 * and if you do not meet the conditions, authorization is required
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */

export const PLUGIN_NAME = 'about'
export const CN_ICON = 'exsied-btn-about'
export const POPUP_ID = `exsied_${PLUGIN_NAME}_popup`
export const CN_ROOT = 'exsied-about-view'

export type Deveploer = {
	name: string
	repoLink?: string
	webSiteLink?: string
	email?: string
	extContent?: string
}

export type PluginConf = {
	addToBubble: boolean
	deveploers: Deveploer[]
}

export const PLUGIN_CONF: PluginConf = {
	addToBubble: false,
	deveploers: [
		// This is a demo infomation.
		// {
		// 	name: 'enassi github',
		// 	repoLink: 'https://github.com/enassi/enassi',
		// 	webSiteLink: 'https://xxx.com/xxx',
		// 	email: 'xxx@xxx.xxx',
		// 	extContent: `Enassi's github repo`,
		// },
		// {
		// 	name: 'enassi gitee',
		// 	repoLink: 'https://gitee.com/enassi/enassi',
		// 	webSiteLink: 'https://xxx.com/xxx',
		// 	email: 'xxx@xxx.xxx',
		// 	extContent: `Enassi's gitee repo`,
		// },
	],
}
