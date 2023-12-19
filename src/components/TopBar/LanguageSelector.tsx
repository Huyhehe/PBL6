import { useLanguage } from '@/hooks/useLanguage'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select'
import viflag from '@/assets/icons/vnflag.svg'
import usflag from '@/assets/icons/usflag.svg'
import Image from 'next/image'

export const LanguageSelector = () => {
  const { locale, handleSetLocale } = useLanguage()

  return (
    <Select value={locale} onValueChange={handleSetLocale}>
      <SelectTrigger className="w-[80px] bg-card p-2 focus:ring-0 focus:ring-offset-0">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold">En</span>
            <Image src={usflag} alt="Vietnamese flag" width={20} height={20} />
          </div>
        </SelectItem>
        <SelectItem value="vi">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold">Vi</span>
            <Image src={viflag} alt="Vietnamese flag" width={20} height={20} />
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
