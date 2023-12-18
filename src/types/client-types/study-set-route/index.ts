import type { AppRouter } from '@/server/api/root'
import type { inferRouterOutputs, inferRouterInputs } from '@trpc/server'

type RouterOutput = inferRouterOutputs<AppRouter>
type RouterInput = inferRouterInputs<AppRouter>

export type TStudySetById =
  | RouterOutput['study']['getStudySetById']
  | null
  | undefined
export type TStudyCardFromSetById =
  RouterOutput['study']['getStudySetById']['cards']

export type TMatchCard = Omit<
  TStudyCardFromSetById[number],
  'term' | 'definition'
> & {
  fakeID: string
  label: string
  isMatched: boolean
  animationType?: 'correct' | 'incorrect' | null
}

export type TMatchGameResult = RouterOutput['study']['createMatchGameResult']
