import { Badge } from '@/components/ui/badge'
import { api } from '@/utils/api'

export const RecommendQuiz = () => {
  const { data, isLoading } = api.study.getAllStudySets.useQuery({
    isPublic: true
  })

  console.log(data)
  return (
    <div className="space-y-2">
      <span className="text-lg font-semibold">Some Quiz you may love!</span>
      <div className="flex gap-4">
        {!!data?.length &&
          data?.map((item) => (
            <div
              key={item.id}
              className="box-with-after flex min-h-[8rem] min-w-[20rem] flex-col gap-2 rounded-2xl p-4"
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
