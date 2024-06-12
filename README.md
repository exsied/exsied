# exsied

**Exsied**: **Ex**tremely **si**mple **ed**itor. The pronunciation is `/ɪkˈsiːd/`, the same as **exceed**.

**Exied** is the main editor of [Enassi](https://github.com/enassi/enassi/).
**Enassi** is your encryption assistant that supports multiple file types ( including markdown, source code, PDF, images, etc. ), supports file encryption and synchronization.

**Exied** provides a variety of plugins that are basically ready to use out of the box, but there are a few plugins that need to be configured with callback functions to achieve a better user experience, such as **sourceCode** , **redoAndUndo** ,**fontSize** ,**fontFamily** .

[Documents](https://enassi.pages.dev/en/exsied/about/) / [文档](https://enassi.pages.dev/zh-cn/exsied/about/)

[Github repo](https://github.com/exsied/exsied) / [Gitee repo](https://gitee.com/exsied/exsied)

[Live demo](https://exsied.pages.dev/demo)

## Features:

- No complex concepts, **exsied** is written entirely in native JavaScript events binding.

- No dependencies.

- Easy to configure / custom / develop.

- All functions are based on plugins.

## License

Exited uses a dual license.

You may conditionally use exsed under the MIT License,
and if you do not meet the conditions, authorization is required

Existing license:

- [in Github repo](https://github.com/exsied/exsied/blob/main/LICENSE)
- [in Gitee repo](https://gitee.com/exsied/exsied/blob/main/LICENSE)

## Donate

1. [Open collective](https://opencollective.com/enassi)

2. [Alipay / Weixin pay](https://github.com/newproplus)

3. Cryptocurrency:

   - XMR: 46df6rwnqcUCFaSummLobcH3J9sWgqYASF8Znq5HnhgrLeASh8u4TPJ2LaLnoQk3uV6t18CgNuFVCDfLUR9G94AZUj1TtGr
   - SOL: BbrRkLArfTeAieAtDpvBHNE4KBKX9fmbjPb5JDmKHWE7
   - ETH: 0xA59186a08424BE262FBacA922E87Ab82F3C5245B

## Usage

### Install

```bash
npm install @exsied/exsied
# or
yarn add @exsied/exsied
# or
pnpm i @exsied/exsied
```

### Import

```js
import { exsied, plugins } from '@exsied/exsied'
import '@exsied/exsied/style.css'
```

or

```html
<script type="module">
	import { exsied, plugins } from 'https://cdn.jsdelivr.net/npm/@exsied/exsied@0.9.0/dist/index.js'
</script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@exsied/exsied@0.9.0/dist/style.css" />
```

When running **exsied** in the browser, please refer to `test_dist/index_esm.html`.

### Initialize

```js
import { exsied, plugins } from '@exsied/exsied'

exsied.init({
	id: 'app',
	plugins: [
		plugins.bold,
		plugins.italic,
		plugins.underline,
		plugins.strikethrough, // ...
	],
	enableToolbarBubble: true,
})

exsied.setHtml('some HTML code')
```

## Style

### Dark mode

Add `class="dark"` to body.

### Chromium scrollbar

You can add some style, like:

```css
// scrollbar
::-webkit-scrollbar {
	width: 5px;
	height: 5px;
}

::-webkit-scrollbar-thumb {
	-webkit-border-radius: 5px;
	background-color: var(--exd-border-color);
}

::-webkit-scrollbar-corner {
	display: none;
}
```

## Plugins

We provide many built-in plugins, most of which are easy to use. Below are a few special plugins.

You can set the `config` of a plugin to change some values. Take a look at the **about** plugin.

### Configure

All plugins have some toolbar conf, like:

- **addToNormalToolbar**: add the button(s) and / or select(s) to **normal toolbar**
- **addToNormalToolbarInsertMenu**: add the button(s) and / or select(s) to **normal toolbar's insert menu**
- **addToBubbleToolbar**: add the button(s) and / or select(s) to **bubble toolbar**

If the plugin **only has one button or select**, these three field is **boolean** type, otherwise they are **object** type.

For example, in plugin **image**, it likes:

```ts
export type PluginConf = {
	addToNormalToolbar: boolean
	addToNormalToolbarInsertMenu: boolean
	addToBubbleToolbar: boolean
	defaultAlt: string
	defaultSrc: string
}
```

and in plugin `lists`, it likes:

```ts
export type PluginConf = {
	addToNormalToolbar: {
		ol: boolean
		ul: boolean
	}
	addToNormalToolbarInsertMenu: {
		ol: boolean
		ul: boolean
	}
	addToBubbleToolbar: {
		ol: boolean
		ul: boolean
	}
	defaultInnerHTML: string
}
```

### Plugin about

The **about** plugin is automatically loaded by default.

There is no need to add it to the `plugins` parameter of the `existing.init` function.

If you have the authorization and want disable the **about** plugin:

```js
exsied.init({
	id: 'app',
	plugins: [],
	enableToolbarBubble: true,
	iAbideByExsiedLicenseAndDisableTheAboutPlugin: true, // Add this param
})
```

If you have customized any functions, you should add your own information to `about.conf.deveploers`.

```js
import { exsied, plugins } from '@exsied/exsied'

plugins.about.conf.deveploers.push(
	{
		name: 'enassi github',
		repoLink: 'https://github.com/enassi/enassi',
		webSiteLink: 'https://xxx.com/xxx',
		email: 'xxx@xxx.xxx',
		extContent: `Enassi's github repo`,
	},
	{
		name: 'enassi gitee',
		repoLink: 'https://gitee.com/enassi/enassi',
		webSiteLink: 'https://xxx.com/xxx',
		email: 'xxx@xxx.xxx',
		extContent: `Enassi's gitee repo`,
	},
)
```

### Plugin sourceCode

It will process the `<pre><code>` tags.

Due to the fact that **exsied** does not have any dependencies, so it cannot highlight or edit code, developers should overwrite the functions in `sourceCode.conf`:

- renderData: Used to highlight code, **highlight.js** is recommended
- editData: Used to edit code, **codemirror** is recommended. After editing, use **const ele = document.querySelector(`[${DATA_ATTR.sign}="${sign}"]`)** to find the original **code** element, and update it.
- randomChars: Used to generate random chars.

#### Sample code

```js
import { exsied, plugins } from '@exsied/exsied'
import { PluginConf } from '@exsied/exsied/dist/plugins/source_code/base'
import hljs from 'highlight.js'
import c from 'highlight.js/lib/languages/c'
import cpp from 'highlight.js/lib/languages/cpp'
import { v4 as uuidv4 } from 'uuid'

// Register some languages
hljs.registerLanguage('c', c)
hljs.registerLanguage('cpp', cpp)

export const highlighCode = (str: string, lang: string) => {
	if (lang in hljsLangMap) {
		return hljs.highlight(str, { language: lang }).value
	}

	return str
}

const sourceCodeConf = plugins.sourceCode.conf as PluginConf

sourceCodeConf.renderDataCb = (ele: HTMLElement) => {
	const lang = ele.getAttribute('lang') || ''
	const res = highlighCode(ele.innerHTML, lang)
	return `<pre><code>${res}</code></pre>`
}
sourceCodeConf.editDataCb = (ele: HTMLElement, sign: string) => {
	// do something
}
// replace the default randomChars with uuid
sourceCodeConf.randomChars = () => {
	return uuidv4()
}
```

### Plugin redoAndUndo

You can provied two callback in `redoAndUndo.conf` to compress and uncompress:

- compressCb: (str: string) => any
- uncompressCb: (value: any) => string

## I18N

Currently, **exsied** only supports English. Developers can add support for other locales by following these steps:

### Setp1: serach all words

Search `t('` in your IDE.

### Setp2: use `exsied.setDict` set a dict.

```js
exsied.i18n.setDict('zh-CN', {
	Title: '标题',
	Alternative: '别名',
	Styles: '样式',
	Width: '宽度',
	Height: '高度',
})
```

### Setp3: use `exsied.setLocale` set a locale.

```js
exsied.i18n.setLocale('zh-CN')
```

## ABBR

- btn: button
- cn: class_name
- ctrl: controller
- ele: element
- plg: plugin
- tn: tag_name

## TODO

- custom block
- Paste
