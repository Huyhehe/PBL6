import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useLanguage } from '@/hooks/useLanguage'

type WrittenCardProps = {
  majority: 'Term' | 'Definition'
  question: string
}

export const WrittenCard = ({ majority, question }: WrittenCardProps) => {
  const { t } = useLanguage()
  return (
    <div className="flex h-full w-full flex-col gap-4">
      <span className="text-muted-foreground">{majority}</span>
      <p className="grow text-xl">{question}</p>
      <span className="font-bold text-muted-foreground">
        {t.pages.studySet.test.card.written.yourAnswer}
      </span>
      <Input placeholder={t.pages.studySet.test.card.written.typeTheAnswer} />
      <Button className="w-fit self-end">
        {t.pages.studySet.test.card.written.next}
      </Button>
    </div>
  )
}
