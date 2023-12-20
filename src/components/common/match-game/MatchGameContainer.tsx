import congratsIcon from '@/assets/icons/congrats.svg'
import crownIcon from '@/assets/icons/crown.svg'
import { useStudySetSectionContext } from '@/context/StudySetSectionContextProvider'
import { type TMatchCard } from '@/types/client-types/study-set-route'
import { isAllMatched } from '@/utils'
import { api } from '@/utils/api'
import { createId } from '@paralleldrive/cuid2'
import { useRef, useState } from 'react'
import { LogoFallback } from '../fallbacks'
import { MatchCard } from './MatchCard'
import { MilliSecondCount, type TMilliSecondCountRef } from './MilliSecondCount'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Repeat } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useLanguage } from '@/hooks/useLanguage'

export const MatchGameContainer = () => {
  const { data: session } = useSession()
  const { t } = useLanguage()
  const { matchCards, setMatchCards } = useStudySetSectionContext()
  const [currentCard, setCurrentCard] = useState<TMatchCard | null>(null)
  const milliSecondCountRef = useRef<TMilliSecondCountRef>(null)
  const router = useRouter()

  const {
    mutate: createMatchGameResult,
    data: matchResult,
    isLoading
  } = api.study.createMatchGameResult.useMutation()

  const handleCardClick = (card: TMatchCard) => {
    if (!currentCard) {
      setCurrentCard(card)
      return
    }

    if (currentCard.fakeID === card.fakeID) {
      setCurrentCard(null)
      return
    }

    if (currentCard.id === card.id) {
      setCurrentCard(null)

      setMatchCards?.((prev) =>
        prev.map((c) =>
          c.id === card.id ? { ...c, animationType: 'correct' } : c
        )
      )

      setTimeout(() => {
        setMatchCards?.((prev) =>
          prev.map((c) =>
            c.id === card.id
              ? { ...c, animationType: null, isMatched: true }
              : c
          )
        )
        if (matchCards?.filter((c) => c.isMatched === false).length === 2) {
          milliSecondCountRef.current?.stop()
          createMatchGameResult({
            userId: session?.user?.id || '',
            studySetId: matchCards?.[0]?.studySetId || '',
            time: Number(milliSecondCountRef.current?.captureValue()) || 0
          })
        }
      }, 120)
      return
    }

    setMatchCards?.((prev) =>
      prev.map((c) =>
        c.fakeID === card.fakeID || c.fakeID === currentCard?.fakeID
          ? { ...c, animationType: 'incorrect' }
          : c
      )
    )

    setTimeout(() => {
      setMatchCards?.((prev) =>
        prev.map((c) =>
          c.fakeID === card.fakeID || c.fakeID === currentCard?.fakeID
            ? { ...c, animationType: null, fakeID: createId() }
            : c
        )
      )
    }, 200)
    setCurrentCard(null)
  }

  const getTheBestTime = () => {
    return (
      matchResult?.topResult?.time ??
      matchResult?.result?.time ??
      0 + ' seconds'
    )
  }

  const Done = () => {
    if (isLoading) return <LogoFallback />

    return (
      <div className="flex w-full flex-col items-start">
        <div className="w-2/5 space-y-6">
          <div className="grid grid-cols-2 items-center">
            <h1 className="text-3xl font-bold">
              {t.pages.studySet.match.result.title}
            </h1>
            <div className="flex justify-end">
              <Image src={congratsIcon} alt="congrats" />
            </div>
          </div>
          <span>
            {t.pages.studySet.match.result.description}{' '}
            <strong>
              {getTheBestTime()} {t.pages.studySet.match.result.seconds}
            </strong>
          </span>
          <div className="space-y-2">
            <p>
              <strong>{t.pages.studySet.match.result.yourRecord}</strong>
            </p>
            <div className="flex w-full items-center gap-2 rounded-md border-[2px] border-primary px-4 py-2">
              <Image src={crownIcon} alt="crown" />
              <Avatar>
                <AvatarImage src={session?.user?.image || ''} />
                <AvatarFallback>{session?.user?.name}</AvatarFallback>
              </Avatar>
              <span className="font-medium">{session?.user?.name}</span>
              <span className="ml-auto font-medium">
                <strong>{matchResult?.result?.time} seconds</strong>
              </span>
            </div>
          </div>
          <Button
            onClick={() => void router.reload()}
            className="gap-2 p-6 text-xl"
          >
            {t.pages.studySet.match.result.playAgain} <Repeat size={18} />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container flex flex-col items-center">
      <div className="p-2 text-xl">
        {!isAllMatched(matchCards) && (
          <MilliSecondCount ref={milliSecondCountRef} />
        )}
      </div>
      <div className="flex h-full w-full flex-wrap items-center justify-center gap-2">
        {isAllMatched(matchCards) ? (
          <div className="flex w-full items-center justify-center">
            <Done />
          </div>
        ) : (
          matchCards?.map((card) => (
            <MatchCard
              className="h-1/3 p-4 text-center"
              key={card.fakeID}
              card={card}
              handleCardClick={handleCardClick}
            />
          ))
        )}
      </div>
    </div>
  )
}
