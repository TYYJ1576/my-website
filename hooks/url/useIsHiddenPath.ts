import { usePathname } from 'next/navigation'

const hiddenPaths = ['/dev', '/auth']

export function useIsHiddenPath() {
  const pathname = usePathname()
  return hiddenPaths.some((path) => pathname.startsWith(path))
}
