import en from '@/locales/en'
import vi from '@/locales/vi'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const useLanguage = () => {
  const { locale, reload } = useRouter()

  const [storedLocale, setStoredLocale] = useState(locale)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setStoredLocale((prev) => {
        return localStorage.getItem('locale') || prev
      })
    }
  }, [])

  const handleSetLocale = (locale: string) => {
    setStoredLocale(locale)
    localStorage.setItem('locale', locale)
    reload()
  }

  return {
    t: storedLocale === 'en' ? en : vi,
    locale: storedLocale,
    handleSetLocale
  }
}
