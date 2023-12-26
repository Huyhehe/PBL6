import { LogoFallback } from '@/components/common/fallbacks'
import { api } from '@/utils/api'
import { ReadOnlyTrueFalseCard } from './ReadOnlyTrueFalseCard'
import { useLanguage } from '@/hooks/useLanguage'
import { type CSSProperties } from 'react'
import { CopySlash, Shapes } from 'lucide-react'

type TestResultDetailProps = {
  testResultId: string
}

export const TestResultDetail = ({ testResultId }: TestResultDetailProps) => {
  const { t } = useLanguage()
  const { data, isLoading } = api.study.getTestResultById.useQuery(
    {
      id: testResultId
    },
    {
      refetchOnWindowFocus: false
    }
  )

  const percent =
    ((data?.score || 0) / (data?.TestCardResult?.length || 0)) * 100

  if (isLoading) {
    return <LogoFallback className="mt-80" />
  }

  return (
    <div className="flex items-center justify-center">
      <div className="flex w-[50rem] flex-col gap-4 py-12">
        <h1 className="text-3xl font-bold">
          {t.pages.studySet.test.result.title}
        </h1>
        <div className="flex items-center">
          <div
            className="pie animate"
            style={
              {
                '--p': String(percent)
              } as CSSProperties
            }
          >
            {percent.toFixed(0)}%
          </div>
          <div className="flex flex-col gap-2">
            <span className="rounded-md border-[3px] border-success bg-success/5 px-4 py-2 text-success">
              {data?.score}{' '}
              {(data?.score || 0) > 1
                ? t.pages.studySet.test.result.board.correctAnswer.plural
                : t.pages.studySet.test.result.board.correctAnswer.singular}
            </span>
            <span className="rounded-md border-[3px] border-pending bg-pending/5 px-4 py-2 text-pending">
              {Number(data?.TestCardResult?.length) - Number(data?.score)}{' '}
              {(Number(data?.TestCardResult?.length) - Number(data?.score) ||
                0) > 1
                ? t.pages.studySet.test.result.board.incorrectAnswer.plural
                : t.pages.studySet.test.result.board.incorrectAnswer.singular}
            </span>
          </div>
          <div className="ml-auto space-y-2">
            <div className="flex items-center gap-2 rounded-md bg-primary p-3 text-white">
              <CopySlash size={30} />
              {t.pages.studySet.test.result.board.tryFlashCards}
            </div>
            <div className="flex items-center gap-2 rounded-md bg-primary p-3 text-white">
              <Shapes size={30} />
              {t.pages.studySet.test.result.board.tryMatchGame}
            </div>
          </div>
        </div>
        <div className="space-y-4">
          {data?.TestCardResult?.map((result, index) => (
            <ReadOnlyTrueFalseCard
              key={result.id}
              testCardResult={result}
              current={index}
              total={data?.TestCardResult?.length}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
