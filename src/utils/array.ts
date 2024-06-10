/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License,
 * and if you do not meet the conditions, authorization is required
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */

export function uniqueArray<T>(array: T[]): T[] {
	const map = new Map<T, true>()
	return array.filter((value) => !map.has(value) && map.set(value, true))
}
