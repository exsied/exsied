import { TN_U } from '../../contants'
import { FormatTaName } from '../../core/format/tag_name'
import { isHighlight } from './base'

export function formatUnderline() {
	if (isHighlight()) {
		FormatTaName.unformatSelected(TN_U)
	} else {
		FormatTaName.formatSelected(TN_U)
	}
}
