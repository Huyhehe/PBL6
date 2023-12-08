import dynamic from 'next/dynamic'

const TTS = dynamic(
  () => import('@/components/SpeechRecognition/AudioRecorder'),
  {
    ssr: false
  }
)

// const Test = dynamic(
//   () => import('@/components/SpeechRecognition/AudioRecorder'),
//   {
//     ssr: false
//   }
// )

const AssessmentTest = () => {
  // const { mutate, data } = api.ai.azureSpeechToText.useMutation()
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      {/* <SpeechRec /> */}
      <TTS />
    </div>
  )
}

export default AssessmentTest
