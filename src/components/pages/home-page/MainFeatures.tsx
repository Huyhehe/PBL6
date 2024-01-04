import { useLanguage } from '@/hooks/useLanguage'
import { Sparkles } from 'lucide-react'
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
    },
    {
      title: t.pages.home.mainFeatures.createSet.title,
      description: t.pages.home.mainFeatures.createSet.description,
      href: '/create-set',
      icon: <Sparkles />
    }
  ]
  return (
    <div className="space-y-2">
      <span className="text-lg font-semibold">
        {t.pages.home.mainFeatures.title}
      </span>
      <div className="flex w-2/3 gap-4">
        {mainFeatures.map((item, index) => (
          <div
            key={index}
            className="box-with-after flex min-h-[8rem] w-[25rem] flex-col gap-2 rounded-2xl p-4"
            onClick={() => void router.push(item.href, undefined, { locale })}
          >
            <span className="flex justify-between font-bold">
              {item.title}
              {item.icon}
            </span>
            <span className="text-sm">{item.description}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
