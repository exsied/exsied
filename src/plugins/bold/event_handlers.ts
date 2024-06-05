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
