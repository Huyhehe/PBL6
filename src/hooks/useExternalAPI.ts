import { type RecognitionResult } from '@/types/client-types/ai-route'
import axios from 'axios'
import { useState } from 'react'

export const useExternalAPI = () => {
  const subscriptionKey = 'ebffcb2968fa489691001189d50f939d'
  const region = 'eastus'

  const [data, setData] = useState<RecognitionResult | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchData = ({
    audioStream,
    referenceText
  }: {
    audioStream: unknown
    referenceText: string
  }) => {
    const pronAssessmentParamsJson = `{"ReferenceText":"${referenceText}","GradingSystem":"HundredMark","Dimension":"Comprehensive"}`
    const pronAssessmentParams = Buffer.from(
      pronAssessmentParamsJson,
      'utf-8'
    ).toString('base64')

    console.log({ referenceText, pronAssessmentParams, audioStream })

    const axiosConfig = {
      baseURL: `https://${region}.stt.speech.microsoft.com/`,
      url: 'speech/recognition/conversation/cognitiveservices/v1?language=en-us',
      headers: {
        Accept: 'application/json;text/xml',
        Connection: 'Keep-Alive',
        'Transfer-Encoding': 'chunked',
        Expect: '100-continue',
        'Content-Type': 'audio/wav; codecs=audio/pcm; samplerate=16000',
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Pronunciation-Assessment': pronAssessmentParams
      }
    }

    setLoading(true)
    axios
      .post(axiosConfig.baseURL + axiosConfig.url, audioStream, axiosConfig)
      .then((response) => {
        const result = response.data
        console.log('Pronunciation assessment result:\n', result)
        setData(result)
        setLoading(false)
        return result
      })
      .catch((error) => {
        setLoading(false)
        console.error('Error in pronunciation assessment:', error.message)
      })
    // setData(mockTTS)
  }

  return { data, fetchData, loading }
}
