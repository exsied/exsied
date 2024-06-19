/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */

export const PLUGIN_NAME = 'About'
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
	addToNormalToolbar: boolean
	addToBubbleToolbar: boolean
	deveploers: Deveploer[]
}

export const PLUGIN_CONF: PluginConf = {
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
