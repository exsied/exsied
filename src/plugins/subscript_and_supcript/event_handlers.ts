/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { TN_SUB, TN_SUP } from '../../contants'
import { FormatTaName } from '../../core/format/tag_name'
import { isHighlightSub, isHighlightSup } from './base'

export function formatTextSub() {
	if (isHighlightSub()) {
		FormatTaName.unformatSelected(TN_SUB)
	} else {
		FormatTaName.formatSelected(TN_SUB)
	}
}

export function formatTextSup() {
	if (isHighlightSup()) {
		FormatTaName.unformatSelected(TN_SUP)
	} else {
		FormatTaName.formatSelected(TN_SUP)
	}
}
