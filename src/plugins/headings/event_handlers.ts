import { TN_DIV, TN_H1, TN_H2, TN_H3, TN_H4, TN_H5, TN_H6 } from '../../contants'
import { FormatTaName } from '../../core/format/tag_name'
import {
	OPTION_HEADING1,
	OPTION_HEADING2,
	OPTION_HEADING3,
	OPTION_HEADING4,
	OPTION_HEADING5,
	OPTION_HEADING6,
	OPTION_NORMAL_BLOCK,
} from './base'

export function formatHeading(event: Event) {
	if (event.target instanceof HTMLSelectElement) {
		const value = event.target.value

		if (value === OPTION_NORMAL_BLOCK) FormatTaName.formatSelected(TN_DIV)
		if (value === OPTION_HEADING1) FormatTaName.formatSelected(TN_H1)
		if (value === OPTION_HEADING2) FormatTaName.formatSelected(TN_H2)
		if (value === OPTION_HEADING3) FormatTaName.formatSelected(TN_H3)
		if (value === OPTION_HEADING4) FormatTaName.formatSelected(TN_H4)
		if (value === OPTION_HEADING5) FormatTaName.formatSelected(TN_H5)
		if (value === OPTION_HEADING6) FormatTaName.formatSelected(TN_H6)
	}
}
