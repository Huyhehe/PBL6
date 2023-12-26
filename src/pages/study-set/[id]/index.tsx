import { FlashCardContainer } from '@/components/common/flash-card/FlashCardContainer'
import { InfoFooter, StudySetTabs } from '@/components/pages/study-set'
import { type TStudySetTab } from '@/components/pages/study-set/StudySetTabs'
import { Skeleton } from '@/components/ui/skeleton'
import { useLanguage } from '@/hooks/useLanguage'
import { api } from '@/utils/api'
import { CopySlash, FileText, PencilRuler, Shapes } from 'lucide-react'
import { useRouter } from 'next/router'

const FallBack = () => (
  <div className="flex justify-center pt-8">
    <div className="w-1/2 space-y-3 3xl:w-1/3">
      <Skeleton className="h-8 w-1/3" />
      <div className="grid grid-cols-4 gap-4">
        <Skeleton className="h-12" />
        <Skeleton className="h-12" />
        <Skeleton className="h-12" />
        <Skeleton className="h-12" />
      </div>
      <Skeleton className="h-96" />
      <div className="flex justify-between">
        <Skeleton className="h-12 w-1/6" />
        <Skeleton className="h-12 w-1/4" />
        <Skeleton className="h-12 w-1/6" />
      </div>
    </div>
  </div>
)

const StudySetViewPage = () => {
  const router = useRouter()
  const { t } = useLanguage()
  const { data: studySet, isLoading } = api.study.getStudySetById.useQuery({
    id: String(router?.query?.id || '')
  })

  const tabs: TStudySetTab[] = [
    {
      label: t.pages.studySet.root.sections.flashCards,
      icon: <CopySlash className="text-primary" />
    },
    {
      label: t.pages.studySet.root.sections.learn,
      icon: <PencilRuler className="text-primary" />
    },
    {
      label: t.pages.studySet.root.sections.test,
      icon: <FileText className="text-primary" />,
      href: 'test'
    },
    {
      label: t.pages.studySet.root.sections.match,
      icon: <Shapes className="text-primary" />,
      href: 'match-game'
    }
  ]

  if (isLoading) {
    return <FallBack />
  }

  return (
    <div className="min-full-height-minus-top-bar flex justify-center pt-8">
      <div className="w-3/4 space-y-3 lg:w-1/2 3xl:w-1/3">
        <span className="text-2xl font-bold">{studySet?.title}</span>
        <StudySetTabs
          studySetId={String(router?.query?.id || '')}
          tabs={tabs}
        />
        <FlashCardContainer cards={studySet?.cards || []} />
        <InfoFooter studySet={studySet} />
      </div>
    </div>
  )
}

export default StudySetViewPage
