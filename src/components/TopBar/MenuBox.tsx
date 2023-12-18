'use client'

import * as React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import { useLanguage } from '@/hooks/useLanguage'

type TExploreItem = { title: string; href: string; description: string }

export function MenuBox() {
  const { t, locale } = useLanguage()
  const exploreItems: TExploreItem[] = [
    {
      title: t.topBar.navigationMenu.explore.createYourSet.title,
      href: '/create-set',
      description: t.topBar.navigationMenu.explore.createYourSet.description
    },
    {
      title: t.topBar.navigationMenu.explore.grammarPractice.title,
      href: '/grammar',
      description: t.topBar.navigationMenu.explore.grammarPractice.description
    },
    {
      title: t.topBar.navigationMenu.explore.autoCorrection.title,
      href: '/auto-correction',
      description: t.topBar.navigationMenu.explore.autoCorrection.description
    },
    {
      title: t.topBar.navigationMenu.explore.pronunciation.title,
      href: '/docs/primitives/scroll-area',
      description: t.topBar.navigationMenu.explore.pronunciation.description
    }
  ]
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-card">
            {t.topBar.navigationMenu.getStarted.title}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                    locale={locale}
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">Telziuq</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      {t.topBar.navigationMenu.briefDescription}
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem
                href="/docs"
                title={t.topBar.navigationMenu.getStarted.introduction.title}
              >
                {t.topBar.navigationMenu.getStarted.introduction.description}
              </ListItem>
              <ListItem
                href="/assessment-test"
                title={t.topBar.navigationMenu.getStarted.assessmentTest.title}
              >
                {t.topBar.navigationMenu.getStarted.assessmentTest.description}
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-card">
            {t.topBar.navigationMenu.explore.title}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {exploreItems.map((exploreItem) => (
                <ListItem
                  key={exploreItem.title}
                  title={exploreItem.title}
                  href={exploreItem.href}
                >
                  {exploreItem.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref locale={locale}>
            <NavigationMenuLink
              className={`${navigationMenuTriggerStyle()} bg-card`}
            >
              {t.topBar.navigationMenu.aboutUs}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & {
    locale?: string
  }
>(({ className, title, children, href, locale, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <Link href={href || ''} locale={locale}>
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </Link>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'
