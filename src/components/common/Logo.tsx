import { cn } from '@/lib/utils'
import logo from '@/assets/icons/logo.svg'
import Image from 'next/image'

type LogoProps = {
  className?: string
  logoImgClassName?: string
}

export const Logo = ({ className, logoImgClassName }: LogoProps) => {
  return (
    <span
      className={cn('font-bold text-primary pointer-events-none', className)}
    >
      <Image
        src={logo}
        alt="Logo"
        width={80}
        height={80}
        className={cn(logoImgClassName)}
      />
    </span>
  )
}
