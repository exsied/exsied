export function uniqueArray<T>(array: T[]): T[] {
	const map = new Map<T, true>()
	return array.filter((value) => !map.has(value) && map.set(value, true))
}
