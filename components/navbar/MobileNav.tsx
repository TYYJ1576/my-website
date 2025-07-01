import { FiMenu, FiX } from 'react-icons/fi'
import { Button } from '../ui/Button'
import type { SidebarProps } from '@/lib/types'
import { cn } from '@/lib/utils'

function MobileNav({ open, setOpen }: SidebarProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(
        'hover:bg-zinc-200 dark:hover:bg-zinc-800',
        open ? '' : 'md:hidden'
      )}
      onClick={() => {
        setOpen(!open)
      }}
    >
      {open && <FiX />}
      {!open && <FiMenu />}
    </Button>
  )
}
export default MobileNav
