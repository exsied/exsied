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
import { limitRange } from '../../utils/number'

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

export const update = () => {
	data.histories.push(exsied.elements.workplace.innerHTML)
	if (data.offset > 0) data.offset--
}

const _do = (action: typeof REDO | typeof UNDO) => {
	const max = data.histories.length - 1
	let currentOffset = 0
	if (action === REDO) currentOffset = data.offset - 1
	if (action === UNDO) currentOffset = data.offset + 1

	currentOffset = limitRange(currentOffset, 0, max)
	exsied.elements.workplace.innerHTML = data.histories[max - currentOffset]
	data.offset = currentOffset
}

export const redo = () => {
	_do(REDO)
}

export const undo = () => {
	_do(UNDO)
}
