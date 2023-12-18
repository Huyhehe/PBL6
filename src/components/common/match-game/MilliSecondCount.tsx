import {
  type Ref,
  forwardRef,
  useEffect,
  useState,
  useImperativeHandle
} from 'react'

export type TMilliSecondCountRef = {
  captureValue: () => string
  stop: () => void
}

export const MilliSecondCount = forwardRef(
  (_, ref: Ref<TMilliSecondCountRef>) => {
    const [isStop, setIsStop] = useState(false)
    const [time, setTime] = useState(0)
    useImperativeHandle(ref, () => {
      return {
        captureValue: () => time.toFixed(1),
        stop: () => {
          setIsStop(true)
        }
      }
    })
    useEffect(() => {
      if (isStop) return
      const interval = setInterval(() => {
        setTime((prev) => prev + 0.1)
      }, 100)
      return () => clearInterval(interval)
    }, [isStop])
    return <>{time.toFixed(1)}</>
  }
)

MilliSecondCount.displayName = 'MilliSecondCount'
