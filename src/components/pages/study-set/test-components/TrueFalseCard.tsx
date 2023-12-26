import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useLanguage } from '@/hooks/useLanguage'
import { useFormContext } from 'react-hook-form'

type TrueFalseCardProps = {
  definition: string
  term: string
  index: number
}

export const TrueFalseCard = ({
  definition,
  term,
  index
}: TrueFalseCardProps) => {
  const { t } = useLanguage()
  const { setValue } = useFormContext()

  return (
    <div className="flex h-full w-full flex-col space-y-2">
      <div className="flex grow">
        <div className="basis-1/2 space-y-4">
          <h5 className="text-muted-foreground">
            {t.pages.studySet.test.card.definition}
          </h5>
          <p className="text-xl">{definition}</p>
        </div>
        <span className="divider-vertical bg-border" />
        <div className="basis-1/2 space-y-4 pl-4">
          <h5 className="text-muted-foreground">
            {t.pages.studySet.test.card.term}
          </h5>
          <p className="text-xl">{term}</p>
        </div>
      </div>
      <span className="py-4 font-bold text-muted-foreground">
        {t.pages.studySet.test.card.truefalse.chooseAnswer}
      </span>

      <ToggleGroup
        type="single"
        asChild
        onValueChange={(e) => {
          setValue(`answers.${index}.tfAnswer`, e === '' ? null : e === 'true')
        }}
      >
        <div className="grid grid-cols-2 gap-5">
          <ToggleGroupItem
            variant="outline"
            value="true"
            className="p-6 font-medium"
          >
            {t.pages.studySet.test.card.truefalse.true}
          </ToggleGroupItem>
          <ToggleGroupItem
            variant="outline"
            value="false"
            className="p-6 font-medium"
          >
            {t.pages.studySet.test.card.truefalse.false}
          </ToggleGroupItem>
        </div>
      </ToggleGroup>
    </div>
  )
}
