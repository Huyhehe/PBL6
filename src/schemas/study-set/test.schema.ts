import { z } from 'zod'

export const testSchema = z.object({
  userId: z.string(),
  studySetId: z.string(),
  answers: z.array(
    z.object({
      term: z.string(),
      definition: z.string(),
      originalDefinition: z.string(),
      type: z.union([
        z.literal('true-false'),
        z.literal('multiple-choice'),
        z.literal('written')
      ]),
      tfAnswer: z.boolean().nullable().optional(),
      mcAnswer: z
        .array(
          z.object({
            content: z.string(),
            isChosen: z.boolean().optional()
          })
        )
        .nullable(),
      writtenAnswer: z.string().nullable().optional()
    })
  )
})
