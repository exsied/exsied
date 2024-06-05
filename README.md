# exsied

**Exsied**: **Ex**tremely **si**mple **ed**itor. The pronunciation is `/ɪkˈsiːd/`, the same as **exceed**.

## Features:

- No complex concepts, **exsied** is written entirely in native JavaScript events binding.

- No dependencies.

- Easy to configure / custom / develop.

- All functions are based on plugins.

## License

### You may use exsied under the MIT license if you comply with the following terms:

- Use **exsied** as an editor.

- If you add, modify, or overwrite anything of **exsied**, you must add your own information in the **about** plugin's `PLUGIN_CONF.developers`.

- Ensure the **about** plugin functions correctly.

### Other uses require authorization.

## ABBR

- btn: button
- cn: class_name
- ctrl: controller
- ele: element
- plg: plugin
- tn: tag_name

## Demo

```js
import { exsied, exsiedPlugins } from 'exsied/dist/index.js'

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

exsied.setHtml(DEMO_CONTENT)
```

When running **exsied** in the browser, please refer to `test_dist/index_esm.html`.

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

## TODO

- Shortcut keys
- Division line
- Superscript / Subscript
- Ordered List / Unordered List
- Quote
- Indent / outdent
- Alignment
- Paste
