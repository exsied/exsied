/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { TN_B, TN_STRONG } from '../../contants'
import { FormatTaName } from '../../core/format/tag_name'
import { isHighlight } from './base'

export function formatTextBold() {
	if (isHighlight()) {
		FormatTaName.unformatSelected(TN_B)
		FormatTaName.unformatSelected(TN_STRONG)
	} else {
		FormatTaName.formatSelected(TN_B)
	}
}
