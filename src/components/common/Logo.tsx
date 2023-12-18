import { cn } from '@/lib/utils'

type LogoProps = {
  className?: string
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <span
      className={cn(
        'text-2xl font-bold text-primary pointer-events-none',
        className
      )}
    >
      Telziuq
    </span>
  )
}
