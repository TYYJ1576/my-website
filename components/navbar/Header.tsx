'use client'

import MainNav from './MainNav'
import MobileNav from './MobileNav'
import { useState } from 'react'
import Menu from './Menu'
import MainLogo from './MainLogo'

function Header() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 w-full px-6 shadow-2xl dark:shadow-gray-500/50 bg-white dark:bg-black backdrop:blur-md z-20">
        <div className="max-w-[1400px] h-[var(--nav-height)] flex items-center justify-between mx-auto">
          {/* Both Desktop & Mobile */}
          <MainLogo />

          {/* Desktop */}
          <MainNav open={open} setOpen={setOpen} />

          {/* Mobile */}
          <MobileNav open={open} setOpen={setOpen} />
        </div>
      </header>
      <div>{open && <Menu open={open} setOpen={setOpen} />}</div>
    </>
  )
}

export default Header
