export const cssStyleDeclarationToString = (styleDeclaration: CSSStyleDeclaration) => {
	let stylesString = ''

	for (let i = 0; i < styleDeclaration.length; i++) {
		const styleName = styleDeclaration[i]
		const styleValue = styleDeclaration.getPropertyValue(styleName)

		if (styleValue && styleValue !== '' && !styleName.startsWith('-')) {
			stylesString += `${styleName}: ${styleValue}; `
		}
	}

	return stylesString.trim()
}

export const cssStyleDeclarationToKeyArray = (style: CSSStyleDeclaration) => {
	const keyArr: string[] = []

	for (let prop in style) {
		if (style.hasOwnProperty(prop) && typeof style[prop] === 'string') {
			keyArr[prop] = style[prop]
		}
	}

	return keyArr
}
