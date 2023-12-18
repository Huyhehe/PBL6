import { useRouter } from 'next/router'

const mainFeatures = [
  {
    title: 'Check your spelling',
    description: `Don't know how you spell it? Let's check it out!`,
    href: '/assessment-test'
  },
  {
    title: 'Grammar Practice',
    description: 'Grammar practice with Anna',
    href: '/grammar'
  },
  {
    title: 'Grammar check your writing',
    description: 'Grammar check your writing',
    href: '/auto-correction'
  }
]

export const MainFeatures = () => {
  const router = useRouter()
  return (
    <div className="space-y-2">
      <span className="text-lg font-semibold">You may love to try these!</span>
      <div className="flex gap-4">
        {mainFeatures.map((item, index) => (
          <div
            key={index}
            className="box-with-after flex min-h-[8rem] min-w-[20rem] flex-col gap-2 rounded-2xl p-4"
            onClick={() => void router.push(item.href)}
          >
            <span className="font-bold">{item.title}</span>
            <span className="text-sm">{item.description}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
