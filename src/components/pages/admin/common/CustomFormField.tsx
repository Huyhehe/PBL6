import { Loading } from '@/components/common/Loading'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { api } from '@/utils/api'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

type CustomFormFieldProps = {
  name: string
}

export const CustomFormField = ({ name }: CustomFormFieldProps) => {
  const { control, setValue, getValues } = useFormContext()
  const [isShowCorrection, setIsShowCorrection] = useState(false)

  const {
    mutate: autoCorrect,
    isLoading: autoCorrectLoading,
    data: { result: correctText } = {}
  } = api.ai.autoCorrection.useMutation({
    onSuccess: () => {
      setIsShowCorrection(true)
    }
  })

  return (
    <div className="space-y-2">
      <FormField
        name={name}
        control={control}
        render={({ field }) => (
          <FormItem className="grow">
            <FormLabel>Term</FormLabel>
            <FormControl>
              <Input {...field} className="bg-card" />
            </FormControl>
          </FormItem>
        )}
      />
      {getValues(name) && (
        <div className="flex items-center justify-end gap-2">
          {correctText && isShowCorrection && (
            <>
              <span className="grow">{correctText}</span>
              <Button
                onClick={(e) => {
                  e.preventDefault()
                  setValue(name, correctText)
                  setIsShowCorrection(false)
                }}
              >
                Apply correction
              </Button>
            </>
          )}
          <Button
            disabled={autoCorrectLoading}
            onClick={(e) => {
              e.preventDefault()
              autoCorrect({
                text: getValues(name)
              })
            }}
          >
            Correct {autoCorrectLoading && <Loading />}
          </Button>
        </div>
      )}
    </div>
  )
}
