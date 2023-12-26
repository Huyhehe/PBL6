import { cn } from '@/lib/utils'
import { Logo } from '../Logo'

type LogoFallbackProps = {
  className?: string
}

export const LogoFallback = ({ className }: LogoFallbackProps) => {
  return (
    <div
      className={cn(
        'flex animate-bounce items-center justify-center',
        className
      )}
    >
      <Logo className="text-[3rem]" />
    </div>
  )
}
