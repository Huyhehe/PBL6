import Image from 'next/image'
import maintenance from '@/assets/icons/maintenance.png'
import { useLanguage } from '@/hooks/useLanguage'

export const WorkInProgress = () => {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col items-center">
      <Image
        src={maintenance}
        alt="Work in progress"
        width={500}
        height={500}
      />
      <h1 className="mb-4 text-5xl font-bold">{t.fallback.wip.title}</h1>
      <h4 className="text-2xl font-light">{t.fallback.wip.description}</h4>
    </div>
  )
}
