import { cn } from '@/lib/utils'
import { type ButtonHTMLAttributes, type PropsWithChildren } from 'react'

type TIconButtonProps = {
  className?: string
  toggle?: boolean
  toggleOn?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export const IconButton = ({
  children,
  className,
  toggle,
  toggleOn,
  disabled,
  ...props
}: PropsWithChildren<TIconButtonProps>) => {
  return (
    <button
      {...props}
      disabled={disabled}
      className={cn(
        'flex justify-center items-center rounded-full p-2 hover:bg-border cursor-pointer w-fit h-fit',
        disabled && 'opacity-50 cursor-not-allowed hover:bg-transparent',
        toggle && {
          'bg-primary text-primary-foreground hover:bg-primary/70': toggleOn
        },
        className
      )}
    >
      {children}
    </button>
  )
}
