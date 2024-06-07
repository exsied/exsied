# exsied

**Exsied**: **Ex**tremely **si**mple **ed**itor. The pronunciation is `/ɪkˈsiːd/`, the same as **exceed**.

**Exied** is the main editor of [Enassi](https://github.com/enassi/enassi/).
**Enassi** is your encryption assistant that supports multiple file types ( including markdown, PDF, images, etc. ), supports file encryption and synchronization

[Documents](https://enassi.github.io/enassi-docs/en/exsied/about/) / [文档](https://enassi.github.io/enassi-docs/zh-cn/exsied/about/)

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

## Demo

```js
import { exsied, exsiedPlugins } from 'exsied/dist/index.js'

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

When running **exsied** in the browser, please refer to `test_dist/index_esm.html`.

## Plugins

### About

If you have customized any functions, you should add your own information to `about.conf.deveploers`.

```js
exsiedPlugins.about.conf.deveploers.push(
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
- editData: Used to edit code, **codemirror** is recommended. After editing, use **const ele = document.querySelector(`[${DATA_ATTR.sign}="${sign}"]`)** to find the original **<code>** element, and update it.
- randomChars: Used to generate random chars.

## I18N

### How to find all words?

Search `t('` in your IDE.

### How to custom my locale?

#### Setp1: use `exsied.setDict` set a dict.

```js
exsied.setDict('zh-CN', {
	Title: '标题',
	Alternative: '别名',
	Styles: '样式',
	Width: '宽度',
	Height: '高度',
})
```

#### Setp2: use `exsied.setLocale` set a locale.

```js
exsied.setLocale('zh-CN')
```

## ABBR

- btn: button
- cn: class_name
- ctrl: controller
- ele: element
- plg: plugin
- tn: tag_name

## TODO

- Division line
- Superscript / Subscript
- Ordered List / Unordered List
- Quote
- Indent / outdent
- Alignment
- Paste
