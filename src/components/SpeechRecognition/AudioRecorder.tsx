import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useExternalAPI } from '@/hooks/useExternalAPI'
import { cn } from '@/lib/utils'
import {
  autoGenerateExample,
  generateColorForEachWord,
  generateColorForTableCell,
  getRecognitionResultExtracted
} from '@/utils'
import { mockTTS } from '@/utils/mock'
import { Mic, MicOff, Shuffle } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useAudioRecorder } from 'react-audio-voice-recorder'
import { Button } from '../ui/button'
import { Loading } from '../common/Loading'
import { IconButton } from '../common/IconButton'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '../ui/tooltip'
import { Switch } from '../ui/switch'

const ExampleComponent = () => {
  const { data, loading, fetchData } = useExternalAPI()
  const extractedData = useMemo(() => {
    return getRecognitionResultExtracted(data || mockTTS) ?? {}
  }, [data])
  const ref = useRef<HTMLTextAreaElement>(null)
  const [randomText, setRandomText] = useState<string>('Good morning')
  const [isProfessionMode, setIsProfessionMode] = useState(false)

  const recorderControls = useAudioRecorder()
  const {
    startRecording,
    stopRecording,
    togglePauseResume,
    recordingBlob,
    isRecording,
    isPaused,
    recordingTime,
    mediaRecorder
  } = recorderControls

  useEffect(() => {
    const getBuffer = async () => {
      if (!recordingBlob) {
        return // Handle the case where recordingBlob is undefined or null
      }

      try {
        const urlBlob = await fetch(URL.createObjectURL(recordingBlob)).then(
          (r) => r.blob()
        )
        console.log({ urlBlob, recordingBlob })

        const file = new File([urlBlob], 'audio.wav', {
          type: 'audio/wav'
        })

        const buffer = await recordingBlob?.arrayBuffer()
        console.log({ buffer, file })
      } catch (error) {
        console.error('Error:', error)
      }
    }

    console.log(recordingBlob)
    console.log(getBuffer())
  }, [recordingBlob])

  return (
    <div className="flex min-w-full flex-col items-center justify-center gap-4">
      <div className="flex min-h-[5rem] w-1/2 flex-col items-center justify-center rounded-lg bg-white text-xl">
        {/* <Textarea ref={ref} className="h-full w-full bg-transparent text-xl" /> */}
        {randomText}
        <IconButton
          className="cursor-pointer justify-self-end"
          onClick={() => setRandomText(autoGenerateExample())}
        >
          <Shuffle />
        </IconButton>
      </div>

      <div
        className={cn(
          'flex aspect-square mt-auto w-[5rem] cursor-pointer items-center justify-center rounded-full bg-cyan-400 transition-colors',
          {
            'hover:bg-cyan-500': !isRecording,
            'bg-red-400 hover:bg-red-500': isRecording
          }
        )}
        onClick={isRecording ? stopRecording : startRecording}
      >
        {true ? (
          <Mic className="text-white" />
        ) : (
          <MicOff className="text-white" />
        )}
      </div>
      {recordingBlob && (
        <div>
          <audio src={URL.createObjectURL(recordingBlob)} controls />
        </div>
      )}

      <Button
        onClick={() => {
          void fetchData({
            audioStream: new File([recordingBlob as BlobPart], 'audio.wav', {
              type: 'audio/wav'
            }),
            referenceText: ref.current?.value || ''
          })
        }}
        disabled={loading}
      >
        Submit
        {loading && <Loading />}
      </Button>

      <div className="flex min-h-[5rem] w-1/2 items-center justify-center gap-1 rounded-lg bg-white text-xl">
        {!!extractedData &&
          extractedData?.words?.map((word, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span
                    className={cn(
                      generateColorForEachWord(word.AccuracyScore),
                      'hover:scale-110 transition-all animate-in cursor-pointer'
                    )}
                  >
                    {word?.Word}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  {word?.Syllables?.map((syllable, index) => (
                    <span key={index} className="font-bold">
                      {syllable.Syllable}
                    </span>
                  ))}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
      </div>
      <div className="flex w-1/2 justify-end gap-2">
        <span>Professional Mode</span>
        <Switch
          checked={isProfessionMode}
          onCheckedChange={setIsProfessionMode}
        />
      </div>
      {extractedData && isProfessionMode && (
        <div className="text-lg">
          <Table className="text-lg">
            <TableHeader>
              <TableRow>
                <TableHead>Accuracy</TableHead>
                <TableHead>Fluency Score</TableHead>
                <TableHead>Completeness Score</TableHead>
                <TableHead>Pronunciation Score</TableHead>
                <TableHead>Words Omitted</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-center">
                  {extractedData?.accuracyScore}
                </TableCell>
                <TableCell className="text-center">
                  {extractedData?.fluencyScore}
                </TableCell>
                <TableCell className="text-center">
                  {extractedData?.completenessScore}
                </TableCell>
                <TableCell className="text-center">
                  {extractedData?.pronScore}
                </TableCell>
                <TableCell className="text-center">{'none'}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="divider-horizontal my-4 bg-border" />
          <Table className="flex justify-center text-lg">
            <TableBody>
              <TableRow>
                {extractedData?.words.map((word, index) => (
                  <TableCell
                    key={index}
                    className={cn(
                      'p-1 text-center border',
                      generateColorForTableCell('word', word.AccuracyScore)
                    )}
                  >
                    {word.Word} ({word.AccuracyScore})
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                {extractedData?.words.map((word, index) => (
                  <TableCell key={index} className="p-1 text-center">
                    {word.Phonemes?.map((phoneme, index) => (
                      <TableCell
                        className={cn(
                          'p-1 border',
                          generateColorForTableCell(
                            'phoneme',
                            phoneme.AccuracyScore
                          )
                        )}
                        key={index}
                      >
                        {phoneme.Phoneme}
                        <br />({phoneme.AccuracyScore})
                      </TableCell>
                    ))}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
export default ExampleComponent
