/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License,
 * and if you do not meet the conditions, authorization is required
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { exsied } from '../../core'

export type HistoryData = {
	histories: string[]
	offset: number
}

const REDO = 1
const UNDO = 2

export const data: HistoryData = {
	histories: [],
	offset: 0,
}

const _do = (action: typeof REDO | typeof UNDO) => {
	console.log('>>> data.histories::: ', data.histories)

	let currentOffset = 0
	if (action === REDO) currentOffset = data.offset - 1
	if (action === UNDO) currentOffset = data.offset + 1

	if (currentOffset < 0) currentOffset = 0
	if (currentOffset > data.histories.length) currentOffset = data.histories.length

	exsied.elements.workplace.innerHTML = data.histories[data.histories.length - currentOffset]

	data.offset = currentOffset

	console.log('>>> currentOffset::: ', currentOffset)
	console.log('>>> data.offset::: ', data.offset)
}

export function redo() {
	console.log('>>> redo')

	_do(REDO)
}

export function undo() {
	console.log('>>> undo')

	_do(UNDO)
}
