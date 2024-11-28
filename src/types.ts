export interface SearchResult {
  // id: string
  slug: string
  kanji: string
  reading: string
  definition: string[]
  senses: JishoSearchResult['senses']
}

export interface JishoSearchResult {
  slug: string
  is_common: boolean
  tags: string[]
  jlpt: string[]
  japanese: {
    word: string
    reading: string
  }[]
  senses: {
    english_definitions: string[]
    parts_of_speech: string[]
    links: {
      text: string
      url: string
    }[]
    tags: string[]
    restrictions: string[]
    see_also: string[]
    antonyms: string[]
    source: string[]
    info: string[]
    sentences: string[]
  }[]
  attribution: {
    jmdict: boolean
    jmnedict: boolean
    dbpedia: string
  }
}
