/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License,
 * and if you do not meet the conditions, authorization is required
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { TN_DEL, TN_S } from '../../contants'
import { FormatTaName } from '../../core/format/tag_name'
import { isHighlight } from './base'

export function formatStrikethough() {
	if (isHighlight()) {
		FormatTaName.unformatSelected(TN_S)
		FormatTaName.unformatSelected(TN_DEL)
	} else {
		FormatTaName.formatSelected(TN_S)
	}
}
