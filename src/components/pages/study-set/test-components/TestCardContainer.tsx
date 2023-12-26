import { useCallback } from 'react'
import { MultiChoiceCard } from './MultiChoiceCard'
import { TrueFalseCard } from './TrueFalseCard'
import { WrittenCard } from './WrittenCard'
import { useLanguage } from '@/hooks/useLanguage'

type TestCardContainerProps = {
  total: number
  current: number
  type?: 'true-false' | 'multiple-choice' | 'written' | 'matching'
  term: string
  definition: string
}

export const TestCardContainer = ({
  type,
  total,
  current,
  term,
  definition
}: TestCardContainerProps) => {
  const { t } = useLanguage()

  const Card = useCallback(() => {
    switch (type) {
      case 'true-false':
        return (
          <TrueFalseCard term={term} definition={definition} index={current} />
        )
      case 'multiple-choice':
        return (
          <MultiChoiceCard
            majority="Definition"
            question="World"
            answers={[
              'The Earth',
              'The Universe',
              'The Galaxy',
              'The Solar System'
            ]}
          />
        )
      case 'written':
        return <WrittenCard majority="Definition" question="Hello" />
      case 'matching':
        return <div>Matching</div>
      default:
        return <div>Default</div>
    }
  }, [type])

  return (
    <div className="relative box-border h-[30rem] w-[50rem] rounded-lg bg-card p-5 shadow-lg">
      <span className="absolute right-4 text-sm text-muted-foreground">
        {current + 1} {t.pages.studySet.test.card.of} {total}
      </span>
      <Card />
    </div>
  )
}
