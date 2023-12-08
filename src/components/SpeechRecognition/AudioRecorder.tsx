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
  generateColorForTableCell,
  getRecognitionResultExtracted
} from '@/utils'
import { mockTTS } from '@/utils/mock'
import { Mic, MicOff } from 'lucide-react'
import { useEffect, useMemo } from 'react'
import { useAudioRecorder } from 'react-audio-voice-recorder'
import { Button } from '../ui/button'

const ExampleComponent = () => {
  const { data, fetchData } = useExternalAPI()
  const extractedData = useMemo(() => {
    return getRecognitionResultExtracted(data || mockTTS) ?? {}
  }, [data])

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
    <div className="flex flex-col items-center justify-center gap-4">
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
            })
          })
        }}
      >
        Submit
      </Button>
      {extractedData && (
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
