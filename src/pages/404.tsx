import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Metal_Mania } from 'next/font/google'

const fontFamily = Metal_Mania({
  weight: ['400'],
  subsets: ['latin', 'latin-ext']
})

export default function Custom404() {
  return (
    <div>
      <div className="space-y-8 py-20">
        <h1 className="m-auto text-center text-5xl font-bold">
          Hmm, looks like you're studying old notes...
        </h1>
        <h3 className="m-auto max-w-[27.5rem] text-center text-[1.4rem] font-light">
          The page you're looking for is outdated, or just isn't a thing
        </h3>
        <div className="flex">
          <Button className="m-auto" asChild>
            <Link href="/">Go back to the Earth</Link>
          </Button>
        </div>
      </div>
      <h1
        className={`text-center text-9xl font-bold text-primary ${fontFamily.className}`}
      >
        404
      </h1>
    </div>
  )
}
