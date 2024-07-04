# exsied

**Exsied**: **Ex**tremely **si**mple **ed**itor. The pronunciation is `/ɪkˈsiːd/`, the same as **exceed**.

**Exied** is the main editor of [Fivim](https://github.com/fivim/fivim/).
**Fivim** is your encryption assistant that supports multiple file types ( including markdown, source code, PDF, images, etc. ), supports file encryption and synchronization.

**Exied** provides a variety of plugins that are basically ready to use out of the box, but there are a few plugins that need to be configured with callback functions to achieve a better user experience, such as **sourceCode** , **redoAndUndo** ,**fontSize** ,**fontFamily** .

[Documents](https://fivim.top/en/exsied/about/) / [文档](https://fivim.top/zh-cn/exsied/about/)

Our official repositories are [Github repo](https://github.com/exsied/exsied) and [Gitee repo](https://gitee.com/exsied/exsied).

[Live demo](https://exsied.pages.dev/demo)

## Features:

- No complex concepts, **exsied** is written entirely in native JavaScript events binding.
- No dependencies.
- Easy to configure / custom / develop.
- All functions are based on plugins.
- Support for multiple instances

## Zen of Fivim

Based on **Zen of Python**

```
Standardization is better than customization.
Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
Complex is better than complicated.
```

## License

Exited uses a dual license.

You may conditionally use exsed under the MIT License,
and if you do not meet the conditions, authorization is required

Existing license:

- [in Github repo](https://github.com/exsied/exsied/blob/main/LICENSE)
- [in Gitee repo](https://gitee.com/exsied/exsied/blob/main/LICENSE)

## Donate

1. [Open collective](https://opencollective.com/fivim)

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
	import { exsied, plugins } from 'https://cdn.jsdelivr.net/npm/@exsied/exsied@0.11.0/dist/index.js'
</script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@exsied/exsied@0.11.0/dist/style.css" />
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
	locale: 'en',
})

exsied.setHtml('some HTML code')
```

## I18N

Currently, **exsied** only supports English(en), French(fr), German(de), Russian(ru), Spanish(es), Simplified Chinese(zh-Hans), and Traditional Chinese(zh-Hant).

You can add a `locale` parameter in `exsied.init` to set a default locale, or use the following functions to set a new locale.

**Notice**: Changing the locale after `exsied.init` will require reinitializing **exsied** . Developers should backup the content first.

```js
exsied.i18n.setLocale('en')
```

### Add support for other locales

#### Setp1: serach all words

Search `t('` in your IDE.

#### Setp2: set a dict.

```js
exsied.i18n.setDict('zh-CN', {
	Title: '标题',
	Alternative: '别名',
	Styles: '样式',
	Width: '宽度',
	Height: '高度',
})
```

#### Setp3: set a locale.

```js
exsied.i18n.setLocale('zh-CN')
```

## Style

### Dark mode

Add `class="dark"` to body.

### Chromium scrollbar

You can add some style, like:

```css
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

For example, in plugin **image**, like:

```ts
export type PluginConf = {
	addToNormalToolbar: boolean
	addToNormalToolbarInsertMenu: boolean
	addToBubbleToolbar: boolean
	defaultAlt: string
	defaultSrc: string
}
```

and in plugin **lists**, like:

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

The **about** plugin is automatically loaded by default. There is no need to add it to the `plugins` parameter of the `existing.init` function.

If you have the authorization and want disable the **about** plugin:

```js
exsied.init({
	id: 'app',
	plugins: [],
	enableToolbarBubble: true,
})
```

If you have customized any functions, you should add your own information to `about.conf.deveploers`.

```js
import { exsied, plugins } from '@exsied/exsied'

plugins.about.conf.deveploers.push(
	{
		name: 'fivim github',
		repoLink: 'https://github.com/fivim/fivim',
		webSiteLink: 'https://xxx.com/xxx',
		email: 'xxx@xxx.xxx',
		extContent: `Fivim's github repo`,
	},
	{
		name: 'fivim gitee',
		repoLink: 'https://gitee.com/fivim/fivim',
		webSiteLink: 'https://xxx.com/xxx',
		email: 'xxx@xxx.xxx',
		extContent: `Fivim's gitee repo`,
	},
)
```

### Plugin sourceCode

It will process the `<pre><code>` tags.

Due to the fact that **exsied** does not have any dependencies, so it cannot highlight or edit code, developers should overwrite the functions in `sourceCode.conf`:

- renderDataCb: Used to highlight code, **highlight.js** is recommended
- editDataCb: Used to edit code, **codemirror** is recommended. After editing, use **const ele = document.querySelector(`[${dataAttr.sign}="${sign}"]`)** to find the original **code** element, and update it.
- randomCharsCb: Used to generate random chars.
- aferInitSourceCodeViewCb: call it afer init source code view, you can add highlight functions here.
- inputInSourceCodeViewCb: call it when user input in source code view, you can add highlight functions here.

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

export function highlighCode(str: string, lang: string){
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
sourceCodeConf.randomCharsCb = () => {
	return uuidv4()
}
```

### Plugin redoAndUndo

You can provied two callback in `redoAndUndo.conf` to compress and uncompress the content:

- compressCb: (str: string) => any
- uncompressCb: (value: any) => string

### Plugin link

You can provied a callback in `redoAndUndo.conf`:

- clickLinkCb: handle click event of tag `a`

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
