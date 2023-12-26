import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useLanguage } from '@/hooks/useLanguage'

type MultiChoiceCardProps = {
  majority: 'Term' | 'Definition'
  question: string
  answers: string[]
}

export const MultiChoiceCard = ({
  majority,
  question,
  answers
}: MultiChoiceCardProps) => {
  const { t } = useLanguage()

  return (
    <div className="flex h-full w-full flex-col">
      <span className="text-muted-foreground">{majority}</span>
      <p className="grow py-4 text-xl">{question}</p>
      <span className="py-4 font-bold text-muted-foreground">
        {t.pages.studySet.test.card.multipleChoice.chooseMatchingItem}
      </span>
      <ToggleGroup type="single" asChild>
        <div className="grid grid-cols-2 gap-5">
          {answers.map((answer, index) => (
            <ToggleGroupItem
              key={index}
              variant="outline"
              value={answer}
              className="p-6 font-medium"
            >
              {answer}
            </ToggleGroupItem>
          ))}
        </div>
      </ToggleGroup>
    </div>
  )
}
