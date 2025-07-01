import Link from 'next/link'
import { useTheme } from 'next-themes'

import { Button } from '../ui/Button'
import { Switch } from '../ui/Switch'
import { Label } from '../ui/Label'
import { useTargetUrl } from '@/hooks/url'
import { SidebarProps } from '@/lib/types'

function Menu({ setOpen }: SidebarProps) {
  const { setTheme, resolvedTheme } = useTheme()

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
            <div className="px-4 py-2 flex gap-2">
              <Switch
                checked={resolvedTheme === 'dark' ? true : false}
                onCheckedChange={() => {
                  if (resolvedTheme === 'dark') {
                    setTheme('light')
                  } else {
                    setTheme('dark')
                  }
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
