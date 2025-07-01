'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Loader2Icon } from 'lucide-react'

import { Button } from '../ui/Button'
import { SidebarProps } from '@/lib/types'
import { cn } from '@/lib/utils'
import ThemeSwitch from '../themes/ThemeSwitch'
import { useTargetUrl, useIsHiddenPath } from '@/hooks/url'

function MainNav({ open, setOpen }: SidebarProps) {
  const { status } = useSession()
  const router = useRouter()

  // ====== Sign Out Button Handlers ======
  const clickHandler = async () => {
    if (status === 'authenticated') {
      await signOut({ callbackUrl: '/dev', redirect: true })
    } else if (status === 'unauthenticated') {
      router.push('/dev/login')
    }
    setOpen(false)
  }

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
      {useIsHiddenPath() && (
        <div>
          {status === 'unauthenticated' && (
            <Button
              asChild
              variant="ghost"
              className="text-zinc-500 dark:hover:text-zinc-50 hover:text-zinc-950 text-base cursor-pointer"
              onClick={clickHandler}
            >
              <p>Log In</p>
            </Button>
          )}
          {status === 'authenticated' && (
            <Button
              asChild
              variant="ghost"
              className="text-zinc-500 dark:hover:text-zinc-50 hover:text-zinc-950 text-base cursor-pointer"
              onClick={clickHandler}
            >
              <p>Sign Out</p>
            </Button>
          )}
          {status === 'loading' && (
            <Button status="loading" disabled>
              <Loader2Icon className="animate-spin" />
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
export default MainNav
