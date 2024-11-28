import { TextTranslateResult } from '@bob-translate/types'

export type Language = TextTranslateResult['to']

export const supportLanguageList: [Language, Language][] = [
  ['auto', 'auto'],
  ['zh-Hans', 'zh-Hans'],
  ['zh-Hant', 'zh-Hant'],
  ['en', 'en'],
  ['ja', 'ja'],
]

export const langMap = new Map(supportLanguageList.map(([key, value]) => [key, value]))

export function supportLanguages() {
  return supportLanguageList.map(([standardLang]) => standardLang)
}
