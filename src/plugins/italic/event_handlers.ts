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
