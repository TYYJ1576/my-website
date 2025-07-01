'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from '../ui/Button'
import { SidebarProps } from '@/lib/types'
import { cn } from '@/lib/utils'
import ThemeSwitch from '../themes/ThemeSwitch'
import { useTargetUrl } from '@/hooks/url'

function MainNav({ open }: SidebarProps) {
  const router = useRouter()

  return (
    <div className={cn('hidden items-center gap-4', open ? '' : 'md:flex')}>
      <div className="px-4">
        <ThemeSwitch />
      </div>
      <Button
        asChild
        variant="ghost"
        className="text-zinc-500 dark:hover:text-zinc-50 hover:text-zinc-950  text-base"
      >
        <Link href={useTargetUrl() + '/'}>Home</Link>
      </Button>
      <Button
        asChild
        variant="ghost"
        className="text-zinc-500 dark:hover:text-zinc-50 hover:text-zinc-950 text-base"
      >
        <Link href={useTargetUrl({ authToDev: true }) + '/about'}>About</Link>
      </Button>
      <Button
        asChild
        variant="ghost"
        className="text-zinc-500 dark:hover:text-zinc-50 hover:text-zinc-950 text-base"
      >
        <Link href={useTargetUrl({ authToDev: true }) + '/projects'}>
          Projects
        </Link>
      </Button>
    </div>
  )
}
export default MainNav
