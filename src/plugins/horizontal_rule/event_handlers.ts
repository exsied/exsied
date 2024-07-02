/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { TN_HR } from '../../contants'



export function insertHorizontalRule() {
	const ele = document.createElement(TN_HR)

	if (exsied.elements.workplace) SelectionUtils.addElementBySelection(exsied.elements.workplace, ele)
}
