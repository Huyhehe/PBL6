import { testSchema } from '@/schemas/study-set'
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import {
  checkIsCorrectTestAnswer,
  generateTestResultChoicesForServer,
  getScoreFromTestResult,
  pagingDataReturn
} from '@/utils'
import { createId } from '@paralleldrive/cuid2'
import { flatten } from 'lodash'

import { z } from 'zod'

export const studyRouter = createTRPCRouter({
  getPagingStudySets: protectedProcedure
    .input(z.object({ page: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const { page } = input
      try {
        const studySets = await ctx.db.studySet.findMany({
          skip: (page - 1) * 10,
          take: 10
        })
        const total = await ctx.db.studySet.count()

        return pagingDataReturn({ items: studySets || [], page, total })
      } catch (error) {
        throw new Error((error as Error)?.message)
      }
    }),
  getAllStudySetsByUserId: protectedProcedure
    .input(
      z.object({ userId: z.string(), filter: z.string().optional().nullable() })
    )
    .query(async ({ ctx, input }) => {
      const { userId, filter } = input
      try {
        const studySets = await ctx.db.studySet.findMany({
          where: {
            userId,
            title: {
              contains: filter || ''
            }
          },
          orderBy: [
            {
              createdAt: 'desc'
            }
          ],
          include: {
            StudyCard: true
          }
        })

        return studySets
      } catch (error) {
        throw new Error((error as Error)?.message)
      }
    }),
  getAllStudySets: protectedProcedure
    .input(
      z.object({
        filter: z.string().optional().nullable(),
        isPublic: z.boolean()
      })
    )
    .query(async ({ ctx, input }) => {
      const { isPublic, filter } = input
      try {
        const studySets = await ctx.db.studySet.findMany({
          where: {
            isPublic,
            title: {
              contains: filter || ''
            }
          },
          include: {
            StudyCard: true
          },
          orderBy: [
            {
              createdAt: 'desc'
            }
          ]
        })

        return studySets
      } catch (error) {
        throw new Error((error as Error)?.message)
      }
    }),
  getStudySetById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input
      try {
        const studySet = await ctx.db.studySet.findFirst({
          where: { id }
        })

        const cards = await ctx.db.studyCard.findMany({
          where: { studySetId: id }
        })

        const createdBy = await ctx.db.user.findFirst({
          where: { id: studySet?.userId }
        })

        return { ...studySet, cards, createdBy }
      } catch (error) {
        throw new Error((error as Error)?.message)
      }
    }),
  createStudySet: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        userId: z.string(),
        isPublic: z.boolean(),
        cards: z
          .array(
            z.object({
              term: z.string(),
              definition: z.string(),
              imageURL: z.string().optional().nullable(),
              index: z.number()
            })
          )
          .min(2)
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { cards, ...studySetValues } = input
      try {
        const studySet = await ctx.db.studySet.create({
          data: studySetValues
        })

        const returnedCards = await ctx.db.studyCard.createMany({
          data: cards.map((card) => ({
            ...card,
            studySetId: studySet.id
          }))
        })

        return { ...studySet, cards: returnedCards }
      } catch (error) {
        throw new Error((error as Error)?.message)
      }
    }),
  updateStudySet: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        isPublic: z.boolean(),
        cards: z
          .array(
            z.object({
              term: z.string(),
              definition: z.string(),
              imageURL: z.string().optional().nullable(),
              index: z.number()
            })
          )
          .min(2)
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { cards, id, ...rest } = input
      try {
        const studySet = await ctx.db.studySet.update({
          where: { id },
          data: rest
        })

        await ctx.db.studyCard.deleteMany({
          where: { studySetId: input.id }
        })

        const returnedCards = await ctx.db.studyCard.createMany({
          data: cards.map((card) => ({
            ...card,
            studySetId: studySet.id
          }))
        })

        return { ...studySet, cards: returnedCards }
      } catch (error) {
        throw new Error((error as Error)?.message)
      }
    }),
  createMatchGameResult: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        studySetId: z.string(),
        time: z.number()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId, studySetId, time } = input
      try {
        const topResult = await ctx.db.matchGameResult.findFirst({
          where: {
            studySetId,
            isRecord: true
          }
        })

        const isRecord = topResult?.time ? time < topResult.time : true

        const result = await ctx.db.matchGameResult.create({
          data: {
            userId,
            studySetId,
            time,
            isRecord
          }
        })

        if (isRecord) {
          await ctx.db.matchGameResult.updateMany({
            where: {
              studySetId,
              NOT: {
                id: result.id
              }
            },
            data: {
              isRecord: false
            }
          })

          return { result }
        }

        return { result, topResult }
      } catch (error) {
        throw new Error((error as Error)?.message)
      }
    }),
  createTestResult: protectedProcedure
    .input(testSchema)
    .mutation(async ({ ctx, input }) => {
      const { userId, studySetId, answers } = input
      const answersWithId = answers.map((ans) => ({
        ...ans,
        id: createId(),
        isCorrectAnswer: checkIsCorrectTestAnswer(ans)
      }))

      try {
        const testResult = await ctx.db.testResult.create({
          data: {
            userId,
            studySetId,
            score: getScoreFromTestResult(answers)
          }
        })

        await ctx.db.testCardResult.createMany({
          data: answersWithId.map((ans) => ({
            id: ans.id,
            testResultId: testResult.id,
            term: ans.term,
            definition: ans.definition,
            type: ans.type,
            isCorrectAnswer: checkIsCorrectTestAnswer(ans)
          }))
        })

        const testCardResultChoicesFlatten = flatten(
          answersWithId?.map((ans) => {
            return generateTestResultChoicesForServer(ans)
          })
        )

        await ctx.db.testCardResultChoice.createMany({
          data: testCardResultChoicesFlatten
        })

        return testResult
      } catch (error) {
        throw new Error((error as Error)?.message)
      }
    }),
  getTestResultById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input
      try {
        const testResult = await ctx.db.testResult.findFirst({
          where: { id },
          include: {
            TestCardResult: {
              include: {
                TestCardResultChoice: true
              }
            }
          }
        })

        return testResult
      } catch (error) {
        throw new Error((error as Error)?.message)
      }
    })
})
