import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { type TTextCorrectionReturn } from '@/types/client-types/ai-route'
import { z } from 'zod'
import axios from 'axios'

const subscriptionKey = process.env.subscriptionKey
const region = process.env.region

const aiEndpoint = process.env.AI_ENDPOINT
export const aiRouter = createTRPCRouter({
  autoCorrection: publicProcedure
    .input(
      z.object({
        text: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const response = await fetch(`${aiEndpoint}/correct_text`, {
        method: 'POST',
        body: JSON.stringify(input),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      return data as TTextCorrectionReturn
    }),
  azureSpeechToText: publicProcedure
    .input(
      z
        .object({
          text: z.string().optional()
        })
        .optional()
    )
    .mutation(async () => {
      const referenceText = 'Good morning.'
      const pronAssessmentParamsJson = `{"ReferenceText":"${referenceText}","GradingSystem":"HundredMark","Dimension":"Comprehensive"}`
      const pronAssessmentParams = Buffer.from(
        pronAssessmentParamsJson,
        'utf-8'
      ).toString('base64')

      const options = {
        method: 'POST',
        baseUrl: `https://${region}.stt.speech.microsoft.com/`,
        url: 'speech/recognition/conversation/cognitiveservices/v1?language=en-us',
        headers: {
          Accept: 'application/json;text/xml',
          Connection: 'Keep-Alive',
          'Content-Type': 'audio/wav; codecs=audio/pcm; samplerate=16000',
          'Transfer-Encoding': 'chunked',
          Expect: '100-continue',
          'Ocp-Apim-Subscription-Key': subscriptionKey,
          'Pronunciation-Assessment': pronAssessmentParams
        }
      }
      const res = await axios(options)
      return res.data
    })
})
