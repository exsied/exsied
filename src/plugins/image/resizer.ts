/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License,
 * and if you do not meet the conditions, authorization is required
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */

export const DIRECTION = {
	top: 1,
	right: 2,
	bottom: 4,
	left: 8,
}

const POSITIONING = {
	currentHeight: 0,
	currentWidth: 0,
	direction: 0,
	isResizing: false,
	ratio: 0,
	startHeight: 0,
	startWidth: 0,
	startX: 0,
	startY: 0,
}

const clamp = (value: number, min: number, max: number) => {
	return Math.min(Math.max(value, min), max)
}

const maxWidth = () => {
	return resizerConf.editorEle !== null ? resizerConf.editorEle.getBoundingClientRect().width - 20 : 100
}
const maxHeight = () => {
	return resizerConf.editorEle !== null ? resizerConf.editorEle.getBoundingClientRect().height - 20 : 100
}

type ResizerConf = {
	editorEle: HTMLElement | null
	imageEle: HTMLImageElement | null
	minHeight: number
	minWidth: number
	resizerEle: HTMLImageElement | null
}

export const resizerConf: ResizerConf = {
	editorEle: null,
	imageEle: null,
	minHeight: 50,
	minWidth: 50,
	resizerEle: null,
}

export const handlePointerDown = (event: MouseEvent, direction: number) => {
	const imageEle = resizerConf.imageEle
	if (imageEle == null) return

	event.preventDefault()
	const { width, height } = imageEle.getBoundingClientRect()

	POSITIONING.currentHeight = height
	POSITIONING.currentWidth = width
	POSITIONING.direction = direction
	POSITIONING.isResizing = true
	POSITIONING.ratio = width / height
	POSITIONING.startHeight = height
	POSITIONING.startWidth = width
	POSITIONING.startX = event.clientX
	POSITIONING.startY = event.clientY

	imageEle.style.height = `${height}px`
	imageEle.style.width = `${width}px`

	document.addEventListener('pointermove', handlePointerMove)
	document.addEventListener('pointerup', handlePointerUp)
}

export const handlePointerMove = (event: PointerEvent) => {
	const isHorizontal = POSITIONING.direction & (DIRECTION.right | DIRECTION.left)
	const isVertical = POSITIONING.direction & (DIRECTION.bottom | DIRECTION.top)

	const imageEle = resizerConf.imageEle
	if (!(imageEle !== null && POSITIONING.isResizing)) return

	if (isHorizontal && isVertical) {
		let diffX = Math.floor(POSITIONING.startX - event.clientX)
		diffX = POSITIONING.direction & DIRECTION.right ? -diffX : diffX

		const width = clamp(POSITIONING.startWidth + diffX, resizerConf.minWidth, maxWidth())
		const height = width / POSITIONING.ratio
		imageEle.style.width = `${width}px`
		imageEle.style.height = `${height}px`
		POSITIONING.currentHeight = height
		POSITIONING.currentWidth = width
	} else if (isVertical) {
		let diffY = Math.floor(POSITIONING.startY - event.clientY)
		diffY = POSITIONING.direction & DIRECTION.bottom ? -diffY : diffY

		const height = clamp(POSITIONING.startHeight + diffY, resizerConf.minHeight, maxHeight())
		imageEle.style.height = `${height}px`
		POSITIONING.currentHeight = height
	} else {
		let diffX = Math.floor(POSITIONING.startX - event.clientX)
		diffX = POSITIONING.direction & DIRECTION.right ? -diffX : diffX

		const width = clamp(POSITIONING.startWidth + diffX, resizerConf.minWidth, maxWidth())
		imageEle.style.width = `${width}px`
		POSITIONING.currentWidth = width
	}

	const resizerEle = resizerConf.resizerEle
	if (resizerEle) {
		resizerEle.style.width = imageEle.style.width
		resizerEle.style.height = imageEle.style.height
	}
}

export const handlePointerUp = () => {
	const imageEle = resizerConf.imageEle
	if (!(imageEle !== null && POSITIONING.isResizing)) return

	POSITIONING.currentHeight = 0
	POSITIONING.currentWidth = 0
	POSITIONING.isResizing = false
	POSITIONING.ratio = 0
	POSITIONING.startHeight = 0
	POSITIONING.startWidth = 0
	POSITIONING.startX = 0
	POSITIONING.startY = 0

	document.removeEventListener('pointermove', handlePointerMove)
	document.removeEventListener('pointerup', handlePointerUp)
}
