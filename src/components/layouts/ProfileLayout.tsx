import { useSession } from 'next-auth/react'
import { useMemo, type PropsWithChildren } from 'react'
import { RouterTabs } from '../common/RouterTabs'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useLanguage } from '@/hooks/useLanguage'

const ProfileLayout = ({ children }: PropsWithChildren) => {
  const { data: userSession } = useSession()
  const { t } = useLanguage()

  const routerTabItems = useMemo(() => {
    const id = userSession?.user?.id
    return [
      {
        label: t.pages.profile.tabs.studySets.header,
        value: 'sets',
        href: `/profile/${id}/sets`
      },
      {
        label: t.pages.profile.tabs.quizzes,
        value: 'quizzes',
        href: `/profile/${id}/quizzes`
      },
      {
        label: t.pages.profile.tabs.settings,
        value: 'settings',
        href: `/profile/${id}/settings`
      }
    ]
  }, [userSession])

  return (
    <div className="mt-8 flex flex-col items-center gap-4">
      <div className="flex w-2/3 items-end gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={userSession?.user.image || ''} />
          <AvatarFallback>{userSession?.user.name}</AvatarFallback>
        </Avatar>
        <div>
          <div className="text-2xl font-bold">{userSession?.user.name}</div>
          <div className="font-semibold text-muted-foreground">
            {userSession?.user.email}
          </div>
        </div>
      </div>
      <RouterTabs
        items={routerTabItems}
        variant={'underline'}
        className="w-2/3"
        classes={{
          list: 'w-full justify-start gap-2',
          trigger: 'text-md font-semibold'
        }}
      />
      <div className="w-2/3">{children}</div>
    </div>
  )
}

export default ProfileLayout
