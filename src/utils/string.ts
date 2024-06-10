/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License,
 * and if you do not meet the conditions, authorization is required
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */

export const isNumberString = (str: string) => {
	const regex = /^\d+$/
	return regex.test(str)
}

export function formatStringWithParams(template: string, params?: { [key: string]: unknown }): string {
	if (!params) return template

	const placeholders = [...template.matchAll(/\$\{([^}]*)\}/g)].map((match) => match[1])
	placeholders.forEach((placeholder) => {
		if (!(placeholder in params)) {
			throw new Error(`Missing parameter for placeholder: ${placeholder}`)
		}

		template = template.replace(new RegExp(`\\$\\{${placeholder}\\}`, 'g'), String(params[placeholder]))
	})

	return template
}

export function isOnlyWhitespace(str: string): boolean {
	const whitespaceRegex = /^\s*$/
	return whitespaceRegex.test(str)
}

export function stringToUint8Array(str: string) {
	const encoder = new TextEncoder()

	return encoder.encode(str)
}

export function uint8ArrayToString(uint8Array: Uint8Array) {
	const decoder = new TextDecoder('utf-8')

	return decoder.decode(uint8Array)
}

export function b64ToUtf8(b64Str: string): string {
	const binaryString = atob(b64Str)
	const len = binaryString.length
	const bytes = new Uint8Array(len)

	for (let i = 0; i < len; i++) {
		bytes[i] = binaryString.charCodeAt(i)
	}

	return new TextDecoder().decode(bytes)
}

export function utf8ToB64(str: string): string {
	const encodedUtf8 = new TextEncoder().encode(str)
	const uint8Array = new Uint8Array(encodedUtf8)
	const binaryString = Array.from(uint8Array)
		.map((byte) => String.fromCharCode(byte))
		.join('')

	return btoa(binaryString)
}

export function randomChars(len: number) {
	const chars =
		'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' +
		'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ' +
		'`-=[];,./~!@#$%^&*()_+|{}:<>?'

	let result = ''

	for (let i = 0; i < len; i++) {
		result += chars.charAt(Math.floor(Math.random() * chars.length))
	}

	return result
}
