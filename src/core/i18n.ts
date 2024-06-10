/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License,
 * and if you do not meet the conditions, authorization is required
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { KvStringString } from '../types'
import { formatStringWithParams } from '../utils/string'

export type Dict = { [localSymbol: string]: KvStringString }

export class I18N {
	static locale = ''
	static fullDict: Dict = {}
	static currentDict: KvStringString = {}

	static setDict = (locale: string, dict: KvStringString) => {
		this.fullDict[locale] = dict
	}

	static getLocale = () => {
		return this.locale
	}

	static setLocale = (locale: string) => {
		if (!this.fullDict[locale]) {
			console.log('Unsupported locale : ' + locale)
			return
		}

		this.currentDict = this.fullDict[locale]
		this.locale = locale
	}

	static t = (words: string, params?: { [key: string]: unknown }) => {
		let res = this.currentDict[words]
		if (!res) res = words
		return formatStringWithParams(res, params)
	}
}

export const t = I18N.t
