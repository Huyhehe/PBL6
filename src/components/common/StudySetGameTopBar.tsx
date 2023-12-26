import { useStudySetSectionContext } from '@/context/StudySetSectionContextProvider'
import { useRouter } from 'next/router'
import { Button } from '../ui/button'
import { X } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'

export const StudySetGameTopBar = () => {
  const router = useRouter()
  const { locale } = useLanguage()

  const handleGoBackToStudySet = () => {
    void router.push(
      {
        pathname: '/study-set/[id]',
        query: { id: studySet?.id }
      },
      undefined,
      { locale }
    )
  }

  const { studySet } = useStudySetSectionContext()

  return (
    <div className="sticky inset-x-0 top-0 z-10 flex items-center justify-between bg-card p-3 shadow-md">
      <div>Selector</div>
      <h3
        className="cursor-pointer font-semibold"
        onClick={handleGoBackToStudySet}
      >
        {studySet?.title}
      </h3>
      <div className="flex items-center">
        <Button
          variant="outline"
          className="border-foreground bg-transparent p-2 text-foreground hover:bg-transparent"
          onClick={handleGoBackToStudySet}
        >
          <X />
        </Button>
      </div>
    </div>
  )
}
