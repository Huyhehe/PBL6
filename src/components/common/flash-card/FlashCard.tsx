import { useState } from 'react'

type TFlashCardProps = {
  front: string
  back: string
}

export const FlashCard = ({ front, back }: TFlashCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      className="flip-card cursor-pointer"
      onClick={() => setIsFlipped((prev) => !prev)}
      aria-hidden={isFlipped}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front flex items-center justify-center">
          <div className="text-4xl">{front}</div>
        </div>
        <div className="flip-card-back flex items-center justify-center">
          <div className="text-4xl">{back}</div>
        </div>
      </div>
    </div>
  )
}
