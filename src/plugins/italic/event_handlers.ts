/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License,
 * and if you do not meet the conditions, authorization is required
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { TN_EM, TN_I } from '../../contants'
import { FormatTaName } from '../../core/format/tag_name'
import { isHighlight } from './base'

export function formatItalic() {
	if (isHighlight()) {
		FormatTaName.unformatSelected(TN_I)
		FormatTaName.unformatSelected(TN_EM)
	} else {
		FormatTaName.formatSelected(TN_I)
	}
}
