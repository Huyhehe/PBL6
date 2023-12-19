import { IconButton } from '@/components/common/IconButton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useLanguage } from '@/hooks/useLanguage'
import { cn } from '@/lib/utils'
import { type TStudySetById } from '@/types/client-types/study-set-route'
import { Pen, Share } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

type TInfoFooterProps = {
  studySet: TStudySetById
  className?: string
}

const InfoFooter = ({ studySet, className }: TInfoFooterProps) => {
  const router = useRouter()
  const { t } = useLanguage()
  const { data: userSession } = useSession()

  return (
    <div className={cn('!mt-10 space-y-4', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-end gap-2">
          <Avatar className="h-12 w-12">
            <AvatarImage src={studySet?.createdBy?.image || ''} />
            <AvatarFallback>
              {studySet?.createdBy?.name
                ?.split(' ')
                .map((name) => name[0]?.toUpperCase())}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">
              {t.pages.studySet.root.tools.createdBy}
            </span>
            <span className="font-semibold">
              {studySet?.createdBy?.name || studySet?.createdBy?.email}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <IconButton className="space-x-2 rounded-lg border-[2px]">
            <Share size={20} />
            <span className="text-lg">{t.pages.studySet.root.tools.share}</span>
          </IconButton>
          {studySet?.createdBy?.id === userSession?.user?.id && (
            <IconButton
              onClick={() => void router.push(`/update-set/${studySet?.id}`)}
              className="space-x-2 rounded-lg border-[2px]"
            >
              <Pen size={20} />
            </IconButton>
          )}
        </div>
      </div>
      <div>{studySet?.description}</div>
    </div>
  )
}

export default InfoFooter
