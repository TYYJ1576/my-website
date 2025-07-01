import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Loader2Icon } from 'lucide-react'

import { Button } from '../ui/Button'
import { Switch } from '../ui/Switch'
import { Label } from '../ui/Label'
import { useTargetUrl, useIsHiddenPath } from '@/hooks/url'
import { SidebarProps } from '@/lib/types'

function Menu({ open, setOpen }: SidebarProps) {
  const { status } = useSession()
  const { setTheme, resolvedTheme } = useTheme()
  const router = useRouter()

  const clickHandler = async () => {
    if (status === 'authenticated') {
      await signOut({ callbackUrl: '/dev', redirect: true })
    } else if (status === 'unauthenticated') {
      router.push('/dev/login')
    }
    setOpen(false)
  }

  const normalClickHandler = () => {
    setOpen(false)
  }

  return (
    <div className="fixed w-full h-[calc(100vh-var(--nav-height))] bg-white dark:bg-black z-10">
      <div className="max-w-[1450px] h-full mx-auto px-3 py-3">
        <ul>
          <li>
            <Button
              asChild
              variant="ghost"
              className="text-zinc-500 dark:hover:text-zinc-50 hover:text-zinc-950 text-base"
              onClick={normalClickHandler}
            >
              <Link href={useTargetUrl() + '/'}>Home</Link>
            </Button>
          </li>
          <li>
            <Button
              asChild
              variant="ghost"
              className="text-zinc-500 dark:hover:text-zinc-50 hover:text-zinc-950 text-base"
              onClick={normalClickHandler}
            >
              <Link href={useTargetUrl({ authToDev: true }) + '/about'}>
                About
              </Link>
            </Button>
          </li>
          <li>
            <Button
              asChild
              variant="ghost"
              className="text-zinc-500 dark:hover:text-zinc-50 hover:text-zinc-950 text-base"
              onClick={normalClickHandler}
            >
              <Link href={useTargetUrl({ authToDev: true }) + '/projects'}>
                Projects
              </Link>
            </Button>
          </li>
          <li>
            <Button
              asChild
              variant="ghost"
              className="text-zinc-500 dark:hover:text-zinc-50 hover:text-zinc-950 text-base"
              onClick={normalClickHandler}
            >
              <Link href={useTargetUrl({ authToDev: true }) + '/contact'}>
                Contact
              </Link>
            </Button>
          </li>
          {useIsHiddenPath() && (
            <li>
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
            </li>
          )}
          <li>
            <div className="px-4 py-2 flex gap-2">
              <Switch
                checked={resolvedTheme === 'dark' ? true : false}
                onCheckedChange={() => {
                  resolvedTheme === 'dark'
                    ? setTheme('light')
                    : setTheme('dark')
                }}
              />
              <Label className="text-zinc-500">{resolvedTheme} Mode</Label>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default Menu
