import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useLanguage } from '@/hooks/useLanguage'
import { cn } from '@/lib/utils'
import { checkIsUserAnswerCorrect } from '@/utils'
import { random } from 'lodash'

type ReadOnlyTrueFalseCardProps = {
  testCardResult: {
    id: string
    term: string
    definition: string
    type: string
    isCorrectAnswer: boolean
    testResultId: string
    TestCardResultChoice: {
      id: string
      content: string
      index: number
      isChosen: boolean
      isCorrect: boolean
      testCardResultId: string
    }[]
  }
  current: number
  total: number
}

export const ReadOnlyTrueFalseCard = ({
  testCardResult,
  current,
  total
}: ReadOnlyTrueFalseCardProps) => {
  const { t } = useLanguage()

  return (
    <div className="relative box-border h-[30rem] w-[50rem] rounded-lg bg-card p-5 shadow-lg">
      <span className="absolute right-4 text-sm text-muted-foreground">
        {current + 1} {t.pages.studySet.test.card.of} {total}
      </span>
      <div className="flex h-full w-full flex-col space-y-2">
        <div className="flex grow">
          <div className="basis-1/2 space-y-4">
            <h5 className="text-muted-foreground">
              {t.pages.studySet.test.card.definition}
            </h5>
            <p className="text-xl">{testCardResult.definition}</p>
          </div>
          <span className="divider-vertical bg-border" />
          <div className="basis-1/2 space-y-4 pl-4">
            <h5 className="text-muted-foreground">
              {t.pages.studySet.test.card.term}
            </h5>
            <p className="text-xl">{testCardResult.term}</p>
          </div>
        </div>
        {checkIsUserAnswerCorrect(testCardResult.TestCardResultChoice) ? (
          <span className="py-4 font-bold text-success">
            {
              [
                t.pages.studySet.test.result.youGotThis,
                t.pages.studySet.test.result.awesome
              ][random(0, 1)]
            }
          </span>
        ) : (
          <span className="py-4 font-bold text-destructive">
            {
              [
                t.pages.studySet.test.result.noWorries,
                t.pages.studySet.test.result.notQuite
              ][random(0, 1)]
            }
          </span>
        )}

        <ToggleGroup type="single" asChild>
          <div className="grid grid-cols-2 gap-5">
            {testCardResult.TestCardResultChoice.map((choice) => (
              <ToggleGroupItem
                key={choice.id}
                variant="outline"
                value={choice.isChosen ? choice.isCorrect.toString() : ''}
                className={cn(
                  'p-6 font-medium text-base border-muted-foreground/10 text-muted-foreground/50 pointer-events-none',
                  {
                    'border-success bg-success/5 text-success':
                      choice.isChosen && choice.isCorrect,
                    'border-destructive bg-destructive/5 text-destructive':
                      choice.isChosen && !choice.isCorrect
                  }
                )}
              >
                {choice.content === 'true'
                  ? t.pages.studySet.test.card.truefalse.true
                  : t.pages.studySet.test.card.truefalse.false}
              </ToggleGroupItem>
            ))}
          </div>
        </ToggleGroup>
      </div>
    </div>
  )
}
