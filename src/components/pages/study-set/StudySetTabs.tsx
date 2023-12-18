import { useRouter } from 'next/router'

export type TStudySetTab = {
  label: string
  icon: React.ReactNode
  href?: string
}

type TStudySetTabsProps = {
  tabs: TStudySetTab[]
  studySetId: string
}

const StudySetTabs = ({ tabs, studySetId }: TStudySetTabsProps) => {
  const router = useRouter()

  return (
    <div className="grid grid-cols-4 gap-4">
      {tabs.map((tab) => (
        <div
          key={tab.label}
          className="box-with-after flex items-center gap-2 font-semibold"
          onClick={() =>
            void router.push(`/study-set/${studySetId}/${tab.href ?? ''}`)
          }
        >
          {tab.icon}
          {tab.label}
        </div>
      ))}
    </div>
  )
}

export default StudySetTabs
