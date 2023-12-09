import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/utils/api'
import { useRouter } from 'next/router'

export const RecommendQuiz = () => {
  const router = useRouter()
  const { data, isLoading } = api.study.getAllStudySets.useQuery({
    isPublic: true
  })

  console.log(data)
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
      <span className="text-lg font-semibold">Some Quiz you may love!</span>
      <div className="flex gap-4">
        {!!data?.length &&
          data?.map((item) => (
            <div
              key={item.id}
              className="box-with-after flex min-h-[8rem] min-w-[20rem] flex-col gap-2 rounded-2xl p-4"
              onClick={() => void router.push(`/study-set/${item.id}`)}
            >
              <span>{item.title}</span>
              <Badge className="h-fit w-fit">
                {item?.StudyCard?.length ?? 0}
                {item?.StudyCard?.length > 1 ? ' terms' : ' term'}
              </Badge>
            </div>
          ))}
      </div>
    </div>
  )
}
