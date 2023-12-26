import practiceTestIcon from '@/assets/icons/practice_test_icon.svg'
import { LogoFallback } from '@/components/common/fallbacks'
import StudySetSectionLayout from '@/components/layouts/StudySetSectionLayout'
import { TestCardContainer } from '@/components/pages/study-set/test-components/TestCardContainer'
import { Button } from '@/components/ui/button'
import { useStudySetSectionContext } from '@/context/StudySetSectionContextProvider'
import { useLanguage } from '@/hooks/useLanguage'
import { type TTestSchema } from '@/types/validation-types/study-set'
import { generateTrueFalseQuestion } from '@/utils'
import { api } from '@/utils/api'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useMemo, type ReactElement } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

const TestPage = () => {
  const { studySet, isLoading } = useStudySetSectionContext()
  const { data: userSession } = useSession()
  const { t } = useLanguage()
  const router = useRouter()

  const questions = useMemo(() => {
    return generateTrueFalseQuestion(
      studySet?.cards || [],
      studySet?.cards.length
    )
  }, [studySet?.cards])
  const methods = useForm<TTestSchema>({
    values: {
      userId: userSession?.user.id || '',
      studySetId: studySet?.id || '',
      answers: questions.map((q) => ({
        term: q.term,
        definition: q.definition,
        originalDefinition: q.originalDefinition,
        type: q.type,
        tfAnswer: null,
        mcAnswer: [],
        writtenAnswer: null
      }))
    }
  })

  const { mutate: createTestResult, isLoading: isCreatingTestResult } =
    api.study.createTestResult.useMutation({
      onSuccess: (data) => {
        void router.push({
          pathname: '/study-set/[id]/test/complete/[testResultId]',
          query: { id: studySet?.id, testResultId: data?.id }
        })
      }
    })

  const handleSubmit = () => {
    createTestResult(methods.getValues())
  }

  if (isLoading) {
    return (
      <div className="flex grow items-center justify-center">
        <LogoFallback />
      </div>
    )
  }
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        <div className="flex grow flex-col items-center gap-8 p-8">
          {questions.map((question, index) => (
            <TestCardContainer
              key={question.id}
              total={questions.length}
              current={index}
              type={question.type}
              term={question.term}
              definition={question.definition}
            />
          ))}
          <Image src={practiceTestIcon} alt="Practice Test" />
          <h3 className="text-2xl font-bold text-muted-foreground">
            {t.pages.studySet.test.submitDescription}
          </h3>
          <Button
            disabled={isCreatingTestResult}
            type="submit"
            className="p-8 text-lg"
          >
            {t.pages.studySet.test.submitTest}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}

TestPage.getLayout = function getLayout(page: ReactElement) {
  return <StudySetSectionLayout>{page}</StudySetSectionLayout>
}

export default TestPage
