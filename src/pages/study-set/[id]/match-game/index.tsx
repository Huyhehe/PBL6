import MatchGameImg from '@/assets/icons/match_hero.webp'
import { MatchGameContainer } from '@/components/common/match-game/MatchGameContainer'
import StudySetSectionLayout from '@/components/layouts/StudySetSectionLayout'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useState, type ReactElement } from 'react'

const MatchGame = () => {
  const [isGameStart, setIsGameStart] = useState(false)
  return (
    <div className="flex grow">
      {isGameStart ? (
        <MatchGameContainer />
      ) : (
        <div className="flex grow flex-col items-center justify-center gap-7">
          <Image src={MatchGameImg} alt="Match Game" />
          <h1 className="text-2xl font-bold">Ready to play?</h1>
          <p className="max-w-[20rem] text-center">
            Match all the terms with their definitions as fast as you can. Avoid
            wrong matches, they add extra time!
          </p>
          <Button
            className="px-36 py-8 text-base font-semibold"
            onClick={() => setIsGameStart(true)}
          >
            Start Game
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
