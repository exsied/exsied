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
