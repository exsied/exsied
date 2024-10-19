import './styles/style.scss'

/*
 * Exited uses a dual license.
 * You may conditionally use exsed under the MIT License, and
 * if you do not meet the conditions, authorization is required.
 *
 * Existing license:
 *     https://github.com/exsied/exsied/blob/main/LICENSE
 *     https://gitee.com/exsied/exsied/blob/main/LICENSE
 */
export * from './contants'

export { Exsied } from './core'
export { DomUtils } from './core/dom_utils'
export { EleClickCallback } from './core/events'
export type { ExsiedPlugin } from './core/plugin'
export { FormatStyle } from './core/format/style'
export { FormatTaName } from './core/format/tag_name'
export { HotkeyUtils } from './core/hotkey_utils'
export { KEY_ALT, KEY_CTRL, KEY_META, KEY_SHIFT } from './core/hotkey_utils'
export { SelectionUtils } from './core/selection_utils'

export { emptyToolBarControlIds } from './ui/toolbar'
export type { ToolBarControlIds } from './ui/toolbar'
export { ColorPicker } from './ui/color_picker'
export { DropdownMenu } from './ui/dropdown'
export { PopupView } from './ui/popup_view'
export { Toolbar } from './ui/toolbar'

export { FindAndReplace } from './plugins/find_and_replace/find'

export { PluginAbout } from './plugins/about'
export { PluginBold } from './plugins/bold'
export { PluginColors } from './plugins/colors'
export { PluginFindAndReplace } from './plugins/find_and_replace'
export { PluginFontFamily } from './plugins/font_family'
export { PluginFontSize } from './plugins/font_size'
export { PluginHeadings } from './plugins/headings'
export { PluginHorizonalRule } from './plugins/horizontal_rule'
export { PluginImage } from './plugins/image'
export { PluginIndentAndOutdent } from './plugins/indent_and_outdent'
export { PluginInsertMenu } from './plugins/insert_menu'
export { PluginItalic } from './plugins/italic'
export { PluginLink } from './plugins/link'
export { PluginLists } from './plugins/lists'
export { PluginNewBlock } from './plugins/new_block'
export { PluginQuote } from './plugins/quote'
export { PluginRedoAndUndo } from './plugins/undo_and_redo'
export { PluginSourceCode } from './plugins/source_code'
export { PluginStrikethrough } from './plugins/strikethrough'
export { PluginSubscriptAndSupscript } from './plugins/subscript_and_supcript'
export { PluginTable } from './plugins/table'
export { PluginTextAlign } from './plugins/text_align'
export { PluginUnderline } from './plugins/underline'
