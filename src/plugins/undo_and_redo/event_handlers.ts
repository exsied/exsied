/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { exsied } from '../../core'
import { limitRange } from '../../utils/number'
import { PLUGIN_CONF } from './base'

export type HistoryItem = {
	value: any
	compressed: boolean
}
export type HistoryData = {
	histories: HistoryItem[]
	offset: number
}

const REDO = 1
const UNDO = 2

export const data: HistoryData = {
	histories: [],
	offset: 0,
}

export function update() {
	const html = exsied.elements.workplace.innerHTML
	data.histories.push({
		value: PLUGIN_CONF.compressCb ? PLUGIN_CONF.compressCb(html) : html,
		compressed: PLUGIN_CONF.compressCb ? true : false,
	})
	if (data.offset > 0) data.offset--
}

const _do = (action: typeof REDO | typeof UNDO) => {
	const max = data.histories.length - 1
	let currentOffset = 0
	if (action === REDO) currentOffset = data.offset - 1
	if (action === UNDO) currentOffset = data.offset + 1

	currentOffset = limitRange(currentOffset, 0, max)
	let html = PLUGIN_CONF.uncompressCb
		? PLUGIN_CONF.uncompressCb(data.histories[max - currentOffset])
		: data.histories[max - currentOffset].value

	exsied.elements.workplace.innerHTML = html
	data.offset = currentOffset
}

export function redo() {
	_do(REDO)
}

export function undo() {
	_do(UNDO)
}
