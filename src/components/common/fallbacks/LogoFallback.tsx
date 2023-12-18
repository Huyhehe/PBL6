import { Logo } from '../Logo'

export const LogoFallback = () => {
  return (
    <div className="flex animate-bounce items-center justify-center">
      <Logo className="text-[3rem]" />
    </div>
  )
}
