import { type PropsWithChildren } from 'react'
import { StudySetGameTopBar } from '../common/StudySetGameTopBar'
import { StudySetSectionContextProvider } from '@/context/StudySetSectionContextProvider'

const StudySetSectionLayout = ({ children }: PropsWithChildren<object>) => {
  return (
    <StudySetSectionContextProvider>
      <div className="min-full-height-minus-top-bar flex flex-col">
        <StudySetGameTopBar />
        {children}
      </div>
    </StudySetSectionContextProvider>
  )
}

export default StudySetSectionLayout
