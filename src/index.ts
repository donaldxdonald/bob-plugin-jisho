import { TextTranslate, TextTranslateResult } from '@bob-translate/types'
import { langMap, supportLanguages } from './lang'
import { JishoSearchResult, SearchResult } from './types'

const translate: TextTranslate = (query, completion) => {
  if (!langMap.has(query.detectTo)) {
    query.onCompletion({
      error: {
        type: 'unsupportedLanguage',
        message: '不支持该语种',
        addition: '不支持该语种',
      },
    })
    return
  }

  (async() => {
    const res = await $http.request({
      url: `https://jisho.org/api/v1/search/words?keyword=${query.text}`,
      method: 'GET',
      header: {
        'User-Agent': 'Bob Jisho Plugin',
      },
    }) as { data: { data: JishoSearchResult[] } }
    $log.info(JSON.stringify(res.data.data))
    const word = res.data.data[0]
    if (!word) {
      completion({
        error: {
          type: 'notFound',
          message: 'No Result',
        },
      })
      return
    }
    const data: SearchResult = {
      slug: word?.slug ?? '',
      kanji: word?.japanese[0]?.word ?? '',
      reading: word?.japanese[0]?.reading ?? '',
      senses: word.senses || [],
      definition: [],
    }
    $log.info(JSON.stringify(data))

    completion({
      result: {
        from: query.detectFrom,
        to: query.detectTo,
        toDict: toDict(data),
        toParagraphs: [],
      },
    })
  })()
}

function toDict(data: SearchResult): TextTranslateResult['toDict'] {
  const word = data.kanji || data.reading

  const parts: NonNullable<TextTranslateResult['toDict']>['parts'] = []
  const additions: NonNullable<TextTranslateResult['toDict']>['additions'] = []

  if (data.reading) {
    parts.push({
      part: 'kana',
      means: [data.reading],
    })
  }

  const length = data.senses.length
  for (let i = 0; i < length; i++) {
    const p = data.senses[i]
    additions.push({
      name: `${p.parts_of_speech.join(', ')}`,
      value: `${i + 1}. ${p.english_definitions.join('; ')}`,
    })
  }

  return {
    word,
    phonetics: [],
    parts,
    additions,
  }
}

export {
  supportLanguages,
  translate,
}
