'use client'

import { RecommendQuiz, MainFeatures } from '@/components/pages/home-page'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Home() {
  const { locale } = useRouter()
  console.log({ locale })
  return (
    <>
      <Head>
        <title>Anna speak | Home</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col">
        <div className="flex flex-col gap-12 p-8">
          <div className="flex flex-col gap-2">
            <MainFeatures />
            <RecommendQuiz />
          </div>
        </div>
      </main>
    </>
  )
}
