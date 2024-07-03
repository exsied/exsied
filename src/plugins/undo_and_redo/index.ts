/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
import { Exsied } from '../../core'
import { Commands, ExsiedPlugin } from '../../core/plugin'
import { ELE_TYPE_BUTTON, ToolBarControlIds, emptyToolBarControlIds } from '../../ui/toolbar'
import { limitRange } from '../../utils/number'

export type PluginConf = {
	addToNormalToolbar: {
		redo: boolean
		undo: boolean
	}
	addToBubbleToolbar: {
		redo: boolean
		undo: boolean
	}
	compressCb?: (str: string) => any
	uncompressCb?: (value: any) => string
}

export type HistoryItem = {
	value: any
	compressed: boolean
}
export type HistoryData = {
	histories: HistoryItem[]
	offset: number
}
const REDO = 1
const UNDO = 2

export const data: HistoryData = {
	histories: [],
	offset: 0,
}

export const PLUGIN_NAME = 'RedoAndUndo'
export const CN_ICON_REDO = 'exsied-icon-redo'
export const CN_ICON_UNDO = 'exsied-icon-undo'

export const NAME_REDO = 'Redo'
export const NAME_UNDO = 'Undo'

export class RedoAndUndo implements ExsiedPlugin<Exsied> {
	private exsied: Exsied = new Exsied('')
	// private popupId = ''
	private toolbarBtnIds: ToolBarControlIds = emptyToolBarControlIds

	name = 'RedoAndUndo'
	conf: PluginConf = {
		addToNormalToolbar: {
			redo: true,
			undo: true,
		},
		addToBubbleToolbar: {
			redo: false,
			undo: false,
		},
	}

	init = (exsied: Exsied): void => {
		this.exsied = exsied
		// this.popupId = this.exsied?.genPopupId(this.name, 'index') || ''
	}

	afterToolbarInit = () => {
		this.toolbarBtnIds = this.exsied.toolbar.genButtonIdStd(this.name, 'index') || emptyToolBarControlIds
	}

	update = () => {
		const html = this.exsied?.elements.workplace?.innerHTML || ''
		data.histories.push({
			value: this.conf.compressCb ? this.conf.compressCb(html) : html,
			compressed: this.conf.compressCb ? true : false,
		})
		if (data.offset > 0) data.offset--
	}

	_do = (action: typeof REDO | typeof UNDO) => {
		const max = data.histories.length - 1
		let currentOffset = 0
		if (action === REDO) currentOffset = data.offset - 1
		if (action === UNDO) currentOffset = data.offset + 1

		currentOffset = limitRange(currentOffset, 0, max)
		let html = this.conf.uncompressCb
			? this.conf.uncompressCb(data.histories[max - currentOffset])
			: data.histories[max - currentOffset].value

		const workplace = this.exsied?.elements.workplace
		if (workplace) workplace.innerHTML = html
		data.offset = currentOffset
	}

	redo = () => {
		this._do(REDO)
	}

	undo = () => {
		this._do(UNDO)
	}

	commands: Commands = {
		redo: this.redo,
		undo: this.undo,
	}

	toolBarControl = [
		{
			name: 'Redo',
			tooltipText: 'Redo',
			addToNormalToolbar: this.conf.addToNormalToolbar.redo,
			addToBubbleToolbar: this.conf.addToBubbleToolbar.redo,

			eleType: ELE_TYPE_BUTTON,
			iconClassName: CN_ICON_REDO,
			clickCallBack: this.commands['redo'],
		},
		{
			name: 'Undo',
			tooltipText: 'Undo',
			addToNormalToolbar: this.conf.addToNormalToolbar.undo,
			addToBubbleToolbar: this.conf.addToBubbleToolbar.undo,

			eleType: ELE_TYPE_BUTTON,
			iconClassName: CN_ICON_UNDO,
			clickCallBack: this.commands['undo'],
		},
	]

	addHandler = () => {
		this.exsied?.elements.workplace?.addEventListener('input', this.update)
	}
	removeHandler = () => {}
	checkHighlight = (_event: any) => {}
	removeTempEle = (_event: any) => {}
}
