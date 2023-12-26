import { type PropsWithChildren } from 'react'
import { StudySetGameTopBar } from '../common/StudySetGameTopBar'
import { StudySetSectionContextProvider } from '@/context/StudySetSectionContextProvider'

const StudySetSectionLayout = ({ children }: PropsWithChildren<object>) => {
  return (
    <StudySetSectionContextProvider>
      <div className="flex min-h-screen flex-col">
        <StudySetGameTopBar />
        {children}
      </div>
    </StudySetSectionContextProvider>
  )
}

export default StudySetSectionLayout
