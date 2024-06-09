

export type Prettify<T> = {
	[P in keyof T]: T[P]
}

export type HTMLTagNames = Prettify<keyof HTMLElementTagNameMap>

export type Style = Partial<CSSStyleDeclaration>

export type KvStringString = {
	[key: string]: string
}

