import StudySetSectionLayout from '@/components/layouts/StudySetSectionLayout'
import { TestResultDetail } from '@/components/pages/study-set/test-components/TestResultDetail'
import { useRouter } from 'next/router'
import { type ReactElement } from 'react'

const TestCompleted = () => {
  const router = useRouter()

  return (
    <div className="min-full-height-minus-top-bar">
      <TestResultDetail testResultId={String(router.query.testResultId)} />
    </div>
  )
}

TestCompleted.getLayout = function getLayout(page: ReactElement) {
  return <StudySetSectionLayout>{page}</StudySetSectionLayout>
}

export default TestCompleted
