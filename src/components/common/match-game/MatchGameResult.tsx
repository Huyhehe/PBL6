import { type TMatchGameResult } from '@/types/client-types/study-set-route'

type MatchGameResultProps = {
  matchResult: TMatchGameResult
}

export const MatchGameResult = ({
  matchResult: { result, topResult }
}: MatchGameResultProps) => {
  return (
    <div>
      {result.time} {topResult?.time}
    </div>
  )
}
