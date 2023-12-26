import { type testSchema } from '@/schemas/study-set'
import { type z } from 'zod'

export type TTestSchema = z.infer<typeof testSchema>
