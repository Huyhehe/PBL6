import { useStudySetSectionContext } from '@/context/StudySetSectionContextProvider'
import { useRouter } from 'next/router'
import { Button } from '../ui/button'
import { X } from 'lucide-react'

export const StudySetGameTopBar = () => {
  const router = useRouter()

  const { studySet } = useStudySetSectionContext()

  return (
    <div className="flex items-center justify-between bg-card p-3">
      <div>Selector</div>
      <h3
        className="cursor-pointer font-semibold"
        onClick={() => void router.push(`/study-set/${studySet?.id || ''}`)}
      >
        {studySet?.title}
      </h3>
      <div className="flex items-center">
        <Button
          variant="outline"
          className="border-foreground bg-transparent p-2 text-foreground hover:bg-transparent"
          onClick={() => void router.push(`/study-set/${studySet?.id || ''}`)}
        >
          <X />
        </Button>
      </div>
    </div>
  )
}
