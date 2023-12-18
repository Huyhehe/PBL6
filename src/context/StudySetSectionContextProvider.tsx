import {
  type TMatchCard,
  type TStudySetById
} from '@/types/client-types/study-set-route'
import { cloneForMatchCards } from '@/utils'
import { api } from '@/utils/api'
import { useRouter } from 'next/router'
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useState,
  type Dispatch,
  type SetStateAction
} from 'react'

type TStudySetSectionContext = {
  studySet?: TStudySetById
  isLoading?: boolean
  matchCards?: TMatchCard[]
  setMatchCards?: Dispatch<SetStateAction<TMatchCard[]>>
}

const StudySetSectionContext = createContext<TStudySetSectionContext>({})

export const StudySetSectionContextProvider = ({
  children
}: PropsWithChildren<object>) => {
  const router = useRouter()
  const [matchCards, setMatchCards] = useState<TMatchCard[]>([])
  const { data: studySet, isLoading } = api.study.getStudySetById.useQuery(
    {
      id: String(router?.query?.id || '')
    },
    {
      onSuccess: (data) => {
        setMatchCards(cloneForMatchCards(data.cards))
        return
      },
      refetchOnWindowFocus: false
    }
  )

  const providerValue = {
    studySet,
    isLoading,
    matchCards,
    setMatchCards
  }

  return (
    <StudySetSectionContext.Provider value={providerValue}>
      {children}
    </StudySetSectionContext.Provider>
  )
}

export const useStudySetSectionContext = () => {
  const context = useContext(StudySetSectionContext)
  return context
}
