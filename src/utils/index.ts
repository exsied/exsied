import { HTMLTagNames } from '../types'

export const tagNameLc = (ele: HTMLElement | Element) => {
	return ele.tagName.toLowerCase() as HTMLTagNames
}
