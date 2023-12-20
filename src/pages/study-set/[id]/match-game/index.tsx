import MatchGameImg from '@/assets/icons/match_hero.webp'
import { MatchGameContainer } from '@/components/common/match-game/MatchGameContainer'
import StudySetSectionLayout from '@/components/layouts/StudySetSectionLayout'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/hooks/useLanguage'
import Image from 'next/image'
import { useState, type ReactElement } from 'react'

const MatchGame = () => {
  const { t } = useLanguage()
  const [isGameStart, setIsGameStart] = useState(false)
  return (
    <div className="flex grow">
      {isGameStart ? (
        <MatchGameContainer />
      ) : (
        <div className="flex grow flex-col items-center justify-center gap-7">
          <Image src={MatchGameImg} alt="Match Game" />
          <h1 className="text-2xl font-bold">
            {t.pages.studySet.match.cover.title}
          </h1>
          <p className="max-w-[20rem] text-center">
            {t.pages.studySet.match.cover.description}
          </p>
          <Button
            className="px-36 py-8 text-base font-semibold"
            onClick={() => setIsGameStart(true)}
          >
            {t.pages.studySet.match.cover.startGame}
          </Button>
        </div>
      )}
    </div>
  )
}

MatchGame.getLayout = function getLayout(page: ReactElement) {
  return <StudySetSectionLayout>{page}</StudySetSectionLayout>
}

export default MatchGame
