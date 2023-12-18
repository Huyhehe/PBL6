import { cn } from '@/lib/utils'

import { MenuBox } from './MenuBox'
import { UserBox } from './UserBox'
import { Switch } from '../ui/switch'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import useHasMounted from '@/hooks/useHasMounted'
import { Logo } from '../common/Logo'
import { useLanguage } from '@/hooks/useLanguage'
import { useRouter } from 'next/router'

interface TopBarProps {
  className?: string
}

const TopBar = ({ className = '' }: TopBarProps) => {
  const { theme, setTheme } = useTheme()
  const { hasMounted } = useHasMounted()
  const { locale } = useLanguage()
  const { push } = useRouter()

  const handleSetTheme = (value: boolean) => {
    setTheme(value ? 'dark' : 'light')
    localStorage.setItem('theme', value ? 'dark' : 'light')
  }

  return (
    <div
      className={cn(
        'bg-card text-foreground top-bar-height flex px-12 items-center gap-4 border-b border-b-foreground/20',
        className
      )}
    >
      <div
        className="cursor-pointer"
        onClick={() => {
          void push('/', undefined, { locale })
        }}
      >
        <Logo />
      </div>
      <MenuBox />

      <div className="ml-auto flex items-center gap-3">
        {hasMounted && (
          <Switch
            defaultChecked={hasMounted && theme === 'dark'}
            icon={theme && theme === 'dark' ? <Moon /> : <Sun />}
            onCheckedChange={handleSetTheme}
          />
        )}
        <UserBox />
      </div>
    </div>
  )
}

export default TopBar
