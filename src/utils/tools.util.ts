import { cn } from '@/lib/utils'
import { type RecognitionResult } from '@/types/client-types/ai-route'
import {
  type TMatchCard,
  type TStudyCardFromSetById
} from '@/types/client-types/study-set-route'
import { createId } from '@paralleldrive/cuid2'
import { omit, shuffle } from 'lodash'

export const pagingDataReturn = <T>({
  items,
  page,
  total
}: {
  items: T
  page: number
  total: number
}) => {
  const totalPage = Math.ceil(total / 10)
  return {
    items,
    page,
    total,
    totalPage,
    hasMore: page < totalPage
  }
}

export const getLocalItem = (key: string) => {
  const value = JSON.parse(window.localStorage.getItem(key) || 'null')
  return value
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setLocalItem = (key: string, value: any) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export const levelTransformerToString = (level: number) => {
  switch (level) {
    case 0:
      return 'Beginner'
    case 1:
      return 'Intermediate'
    case 2:
      return 'Advanced'
    default:
      return 'Beginner'
  }
}

export const levelTransformerToNumber = (level: string) => {
  switch (level) {
    case 'Beginner':
      return 0
    case 'Intermediate':
      return 1
    case 'Advanced':
      return 2
    default:
      return 0
  }
}

export const getRecognitionResultExtracted = (data: RecognitionResult) => {
  const { NBest } = data
  const accuracyScore =
    NBest?.reduce((acc, cur) => {
      return acc + cur.AccuracyScore
    }, 0) / NBest?.length

  const fluencyScore =
    NBest?.reduce((acc, cur) => {
      return acc + cur.FluencyScore
    }, 0) / NBest?.length

  const completenessScore =
    NBest?.reduce((acc, cur) => {
      return acc + cur.CompletenessScore
    }, 0) / NBest?.length

  const pronScore =
    NBest?.reduce((acc, cur) => {
      return acc + cur.PronScore
    }, 0) / NBest?.length

  const wordOmitted = NBest?.reduce((acc, cur) => {
    return acc + cur.Lexical || ''
  }, '')

  const words = NBest?.[0]?.Words || []

  return {
    accuracyScore,
    fluencyScore,
    completenessScore,
    pronScore,
    wordOmitted,
    words
  }
}

export const generateColorForTableCell = (
  type: 'word' | 'phoneme',
  score: number
) => {
  if (type === 'word') {
    return cn({
      'bg-green-300': score >= 80,
      'bg-yellow-300': score >= 60 && score < 80,
      'bg-red-100': score < 60
    })
  }
  return cn({
    'bg-green-700': score >= 80,
    'bg-green-100': score >= 60 && score < 80,
    'bg-yellow-100': score >= 60 && score < 80,
    'bg-red-700': score <= 20
  })
}

export const generateColorForEachWord = (score: number) => {
  return cn({
    'text-green-500': score >= 80,
    'text-yellow-500': score >= 60 && score < 80,
    'text-red-500': score < 60
  })
}

export const autoGenerateExample = () => {
  const dataSet = [
    "Hello, Let's go to the beach",
    'I am a student',
    'She sells seashells by the seashore',
    'I scream, you scream, we all scream for ice cream'
  ]

  const randomIndex = Math.floor(Math.random() * dataSet.length)
  return dataSet[randomIndex] || ''
}

export const cloneForMatchCards = (
  cards: TStudyCardFromSetById
): TMatchCard[] => {
  const termCards = cards.map((card) => {
    const newCard: TMatchCard = {
      ...omit(card, ['term', 'definition']),
      fakeID: createId(),
      label: card.term,
      isMatched: false
    }
    return newCard
  })

  const definitionCards = cards.map((card) => {
    const newCard: TMatchCard = {
      ...omit(card, ['term', 'definition']),
      fakeID: createId(),
      label: card.definition,
      isMatched: false
    }
    return newCard
  })
  const result = [...termCards, ...definitionCards]
  return shuffle(result)
}

export const isAllMatched = (cards?: TMatchCard[]) => {
  return cards?.every((card) => card.isMatched)
}
