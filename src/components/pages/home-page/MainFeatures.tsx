import { useLanguage } from '@/hooks/useLanguage'
import { useRouter } from 'next/router'

export const MainFeatures = () => {
  const router = useRouter()
  const { t, locale } = useLanguage()
  const mainFeatures = [
    {
      title: t.pages.home.mainFeatures.checkYourSpelling.title,
      description: t.pages.home.mainFeatures.checkYourSpelling.description,
      href: '/assessment-test'
    },
    {
      title: t.pages.home.mainFeatures.grammarPractice.title,
      description: t.pages.home.mainFeatures.grammarPractice.description,
      href: '/grammar'
    },
    {
      title: t.pages.home.mainFeatures.autoCorrection.title,
      description: t.pages.home.mainFeatures.autoCorrection.description,
      href: '/auto-correction'
    }
  ]
  return (
    <div className="space-y-2">
      <span className="text-lg font-semibold">You may love to try these!</span>
      <div className="grid w-1/2 grid-cols-3 gap-4">
        {mainFeatures.map((item, index) => (
          <div
            key={index}
            className="box-with-after flex min-h-[8rem] min-w-[20rem] flex-col gap-2 rounded-2xl p-4"
            onClick={() => void router.push(item.href, undefined, { locale })}
          >
            <span className="font-bold">{item.title}</span>
            <span className="text-sm">{item.description}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
