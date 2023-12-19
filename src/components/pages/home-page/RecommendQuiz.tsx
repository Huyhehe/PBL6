import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useLanguage } from '@/hooks/useLanguage'
import { api } from '@/utils/api'
import { useRouter } from 'next/router'

export const RecommendQuiz = () => {
  const router = useRouter()
  const { t, locale } = useLanguage()
  const { data, isLoading } = api.study.getAllStudySets.useQuery({
    isPublic: true
  })

  if (isLoading)
    return (
      <>
        <Skeleton className="h-6 w-[15rem]" />
        <div className="flex gap-4">
          <div className="space-y-2">
            <Skeleton className="flex h-[10rem] min-h-[8rem] w-[15rem] min-w-[20rem] flex-col gap-2 rounded-2xl p-4">
              <Skeleton className="h-6 w-[5rem]" />
              <Badge className="h-fit w-fit"></Badge>
            </Skeleton>
          </div>
          <div className="space-y-2">
            <Skeleton className="flex h-[10rem] min-h-[8rem] w-[15rem] min-w-[20rem] flex-col gap-2 rounded-2xl p-4">
              <Skeleton className="h-6 w-[5rem]" />
              <Badge className="h-fit w-fit"></Badge>
            </Skeleton>
          </div>
          <div className="space-y-2">
            <Skeleton className="flex h-[10rem] min-h-[8rem] w-[15rem] min-w-[20rem] flex-col gap-2 rounded-2xl p-4">
              <Skeleton className="h-6 w-[5rem]" />
              <Badge className="h-fit w-fit"></Badge>
            </Skeleton>
          </div>
        </div>
      </>
    )
  return (
    <div className="space-y-2">
      <span className="text-lg font-semibold">
        {t.pages.home.recommendQuiz.title}
      </span>
      <div className="flex w-1/2 gap-4">
        {!!data?.length &&
          data?.map((item) => (
            <div
              key={item.id}
              className="box-with-after flex min-h-[8rem] min-w-[20rem] flex-col gap-2 rounded-2xl p-4"
              onClick={() =>
                void router.push(
                  { pathname: '/study-set/[id]', query: { id: item.id } },
                  undefined,
                  { locale }
                )
              }
            >
              <span>{item.title}</span>
              <Badge className="h-fit w-fit">
                {item?.StudyCard?.length ?? 0}
                {item?.StudyCard?.length > 1
                  ? ` ${t.pages.home.recommendQuiz.term.plural}`
                  : ` ${t.pages.home.recommendQuiz.term.singular}`}
              </Badge>
            </div>
          ))}
      </div>
    </div>
  )
}
