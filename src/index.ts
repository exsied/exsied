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
// import { about } from './plugins/about'
export { PluginBold as Bold } from './plugins/bold'
export { Colors } from './plugins/colors'
export { PluginFindAndReplace as FindAndReplace } from './plugins/find_and_replace'
export { PluginFontFamily as FontFamily } from './plugins/font_family'
export { PluginFontSize as FontSize } from './plugins/font_size'
export { PluginHeadings as Headings } from './plugins/headings'
export { PluginHorizonalRule as HorizonalRule } from './plugins/horizontal_rule'
export { PluginImage as Image } from './plugins/image'
export { PluginIndentAndOutdent as IndentAndOutdent } from './plugins/indent_and_outdent'
export { PluginInsertMenu as InsertMenu } from './plugins/insert_menu'
export { PluginItalic as Italic } from './plugins/italic'
export { PluginLink as Link } from './plugins/link'
export { PluginLists as Lists } from './plugins/lists'
export { PluginQuote as Quote } from './plugins/quote'
export { PluginSourceCode as SourceCode } from './plugins/source_code'
export { PluginStrikethrough as Strikethrough } from './plugins/strikethrough'
export { PluginSubscriptAndSupscript as SubscriptAndSupscript } from './plugins/subscript_and_supcript'
export { PluginTable as Table } from './plugins/table'
export { PluginTextAlign as TextAlign } from './plugins/text_align'
export { PluginUnderline as Underline } from './plugins/underline'
export { PluginRedoAndUndo as RedoAndUndo } from './plugins/undo_and_redo'

export { DomUtils } from './core/dom_utils'
export { FormatStyle } from './core/format/style'
export { FormatTaName } from './core/format/tag_name'
export { HotkeyUtils } from './core/hotkey_utils'
export { SelectionUtils } from './core/selection_utils'
export { FindAndReplace as FindReplace } from './plugins/find_and_replace/find'
export { ColorPicker } from './ui/color_picker'
export { DropdownMenu } from './ui/dropdown'
export { PopupView } from './ui/popup_view'
export { Toolbar } from './ui/toolbar'
export { EleClickCallback } from './core/events'
export * from './contants'
export { KEY_ALT, KEY_CTRL, KEY_META, KEY_SHIFT } from './core/hotkey_utils'
