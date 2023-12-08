import { Loading } from '@/components/common/Loading'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/utils/api'
import { useRef } from 'react'

const AutoCorrection = () => {
  const ref = useRef<HTMLTextAreaElement>(null)
  const { mutate, data, isLoading } = api.ai.autoCorrection.useMutation()

  const handleSubmit = () => {
    if (!ref.current?.value) return
    mutate({
      text: ref.current?.value
    })
  }

  console.log(data?.corrected_text)
  return (
    <div className="flex justify-center py-8">
      <div className="max-w-[50rem] basis-1/2 space-y-4">
        <div className="rounded-lg bg-card shadow-sm">
          <Textarea
            ref={ref}
            className="min-h-[20rem] border-none bg-transparent text-xl !outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Type something..."
          />
        </div>
        <Button onClick={handleSubmit} disabled={isLoading}>
          Submit {isLoading && <Loading />}
        </Button>
        {data?.corrected_text && (
          <div className="min-h-[20rem] rounded-lg bg-card p-2 text-xl shadow-sm">
            {data.corrected_text}
          </div>
        )}
      </div>
    </div>
  )
}

export default AutoCorrection
