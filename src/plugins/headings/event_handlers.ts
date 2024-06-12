/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { TN_DIV, TN_H1, TN_H2, TN_H3, TN_H4, TN_H5, TN_H6 } from '../../contants'
import { FormatTaName } from '../../core/format/tag_name'
import {
	OPTION_HEADING1,
	OPTION_HEADING2,
	OPTION_HEADING3,
	OPTION_HEADING4,
	OPTION_HEADING5,
	OPTION_HEADING6,
	OPTION_Paragraph,
} from './base'

export function formatParagraph(_event: Event) {
	FormatTaName.formatSelected(TN_DIV)
}

export function formatH1(_event: Event) {
	FormatTaName.formatSelected(TN_H1)
}

export function formatH2(_event: Event) {
	FormatTaName.formatSelected(TN_H2)
}

export function formatH3(_event: Event) {
	FormatTaName.formatSelected(TN_H3)
}

export function formatH4(_event: Event) {
	FormatTaName.formatSelected(TN_H4)
}

export function formatH5(_event: Event) {
	FormatTaName.formatSelected(TN_H5)
}

export function formatH6(_event: Event) {
	FormatTaName.formatSelected(TN_H6)
}

export function formatHeading(event: Event) {
	if (event.target instanceof HTMLSelectElement) {
		const value = event.target.value

		if (value === OPTION_Paragraph) formatParagraph(event)
		if (value === OPTION_HEADING1) formatH1(event)
		if (value === OPTION_HEADING2) formatH2(event)
		if (value === OPTION_HEADING3) formatH3(event)
		if (value === OPTION_HEADING4) formatH4(event)
		if (value === OPTION_HEADING5) formatH5(event)
		if (value === OPTION_HEADING6) formatH6(event)
	}
}
