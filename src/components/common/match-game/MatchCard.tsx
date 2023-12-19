import { useToggle } from '@/hooks/useToggle'
import { cn } from '@/lib/utils'
import { type TMatchCard } from '@/types/client-types/study-set-route'

type MatchCardProps = {
  card: TMatchCard
  handleCardClick: (card: TMatchCard) => void
  className?: string
}

export const MatchCard = ({
  card,
  handleCardClick,
  className
}: MatchCardProps) => {
  const [value, toggle] = useToggle(card.isMatched)

  return (
    <div
      onClick={() => {
        toggle()
        handleCardClick(card)
      }}
      className={cn(
        'flex cursor-pointer items-center justify-center rounded-[1rem] border-[2px] bg-card shadow-sm hover:bg-card/20 basis-[calc(25%-1rem)] text-xl',
        className,
        {
          'bg-primary/5 hover:bg-primary/5 border-primary': value,
          invisible: card.isMatched,
          'shake bg-destructive/5 hover:bg-destructive/5 border-destructive':
            card.animationType === 'incorrect',
          'bg-success/5 hover:bg-success/5 border-success scale-0 transition-transform duration-[25ms] delay-75':
            card.animationType === 'correct'
        }
      )}
    >
      {card.label}
    </div>
  )
}
