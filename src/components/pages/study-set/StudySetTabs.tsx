export type TStudySetTab = {
  label: string
  icon: React.ReactNode
  href?: string
}

type TStudySetTabsProps = {
  tabs: TStudySetTab[]
}

const StudySetTabs = ({ tabs }: TStudySetTabsProps) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {tabs.map((tab) => (
        <div
          key={tab.label}
          className="box-with-after flex items-center gap-2 font-semibold"
        >
          {tab.icon}
          {tab.label}
        </div>
      ))}
    </div>
  )
}

export default StudySetTabs
