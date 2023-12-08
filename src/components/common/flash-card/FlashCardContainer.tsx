import { type TStudyCardFromSetById } from '@/types/client-types/study-set-route'
import { FlashCard } from './FlashCard'
import { useMemo, useState } from 'react'
import { Maximize, MoveLeft, MoveRight, Play, Shuffle } from 'lucide-react'

import { IconButton } from '../IconButton'
import { shuffle } from 'lodash'
import { Progress } from '@/components/ui/progress'

type TFlashCardContainerProps = {
  cards: TStudyCardFromSetById
}

export const FlashCardContainer = ({ cards }: TFlashCardContainerProps) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isShuffled, setIsShuffled] = useState(false)

  const extractedCards = useMemo(() => {
    if (!isShuffled) return cards
    return shuffle(cards)
  }, [isShuffled, cards])

  const currentProgress = useMemo(
    () =>
      extractedCards?.length
        ? ((currentCardIndex + 1) / extractedCards.length) * 100
        : 0,
    [extractedCards, currentCardIndex]
  )

  const currentCard = useMemo(
    () => (extractedCards ? extractedCards[currentCardIndex] : null),
    [extractedCards, currentCardIndex]
  )

  const handleCardChange = (type: 'next' | 'prev') => {
    if (type === 'next') return setCurrentCardIndex((prev) => prev + 1)
    return setCurrentCardIndex((prev) => prev - 1)
  }

  return (
    <div className="space-y-4">
      <FlashCard
        key={Math.random()}
        front={currentCard?.term || ''}
        back={currentCard?.definition || ''}
      />
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <IconButton>
              <Play size={20} />
            </IconButton>
            <IconButton
              toggle
              toggleOn={isShuffled}
              onClick={() => setIsShuffled((prev) => !prev)}
            >
              <Shuffle size={20} />
            </IconButton>
          </div>
          <div className="flex items-center gap-4">
            <IconButton
              className="border"
              disabled={currentCardIndex === 0}
              onClick={() => handleCardChange('prev')}
            >
              <MoveLeft />
            </IconButton>
            <div>
              {currentCardIndex + 1} / {cards?.length}
            </div>
            <IconButton
              className="border"
              disabled={currentCardIndex === cards?.length - 1}
              onClick={() => handleCardChange('next')}
            >
              <MoveRight />
            </IconButton>
          </div>
          <div>
            <IconButton>
              <Maximize />
            </IconButton>
          </div>
        </div>
        <div>
          <Progress value={currentProgress} className="h-1 bg-border" />
        </div>
      </div>
    </div>
  )
}
