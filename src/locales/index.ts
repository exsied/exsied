import { KvStringString } from '../types'
import de from './de.json'
import en from './en.json'
import es from './es.json'
import fr from './fr.json'
import ru from './ru.json'
import zh_Hans from './zh_Hans.json'
import zh_Hant from './zh_Hant.json'

export const localesMap: { [key: string]: KvStringString } = {
	de,
	en,
	es,
	fr,
	ru,
	'zh-Hans': zh_Hans,
	'zh-Hant': zh_Hant,
}
