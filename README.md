# exsied

**Exsied**: **Ex**tremely **si**mple **ed**itor. The pronunciation is `/ɪkˈsiːd/`, the same as **exceed**.

**Exied** is the main editor of [Enassi](https://github.com/enassi/enassi/).
**Enassi** is your encryption assistant that supports multiple file types ( including markdown, source code, PDF, images, etc. ), supports file encryption and synchronization.

[Documents](https://enassi.pages.dev/en/exsied/about/) / [文档](https://enassi.pages.dev/zh-cn/exsied/about/)

[Github repo](https://github.com/exsied/exsied) / [Gitee repo](https://gitee.com/exsied/exsied)

## Features:

- No complex concepts, **exsied** is written entirely in native JavaScript events binding.

- No dependencies.

- Easy to configure / custom / develop.

- All functions are based on plugins.

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
	import { exsied, plugins } from 'https://cdn.jsdelivr.net/npm/@exsied/exsied@0.3.0/dist/index.js'
</script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@exsied/exsied@0.3.0/dist/style.css" />
```

When running **exsied** in the browser, please refer to `test_dist/index_esm.html`.

### Initialize

```js
import { exsied } from '@exsied/exsied'

exsied.init({
	id: 'app',
	plugins: [
		exsiedPlugins.bold,
		exsiedPlugins.italic,
		exsiedPlugins.underline,
		exsiedPlugins.strikethrough, // ...
	],
	enableToolbarBubble: true,
})

exsied.setHtml('some HTML code')
```

## Plugins

### About

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

If you have the authorization and want disable the **about** plugin:

```js
exsied.init({
	id: 'app',
	plugins: [],
	enableToolbarBubble: true,
	iAbideByExsiedLicenseAndDisableTheAboutPlugin: true, // Add this param
})
```

### Code block

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

sourceCodeConf.renderData = (ele: HTMLElement) => {
	const lang = ele.getAttribute('lang') || ''
	const res = highlighCode(ele.innerHTML, lang)
	return `<pre><code>${res}</code></pre>`
}
sourceCodeConf.editData = (ele: HTMLElement, sign: string) => {
	// do something
}
// replace the default randomChars with uuid
sourceCodeConf.randomChars = () => {
	return uuidv4()
}
```

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

- current:	
	- source_code toggleSourceView
- Division line
- Superscript / Subscript
- Ordered List / Unordered List
- Quote
- Indent / outdent
- Alignment
- Paste
