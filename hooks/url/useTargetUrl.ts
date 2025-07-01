import { usePathname } from 'next/navigation'

interface Props {
  authToDev?: boolean
}

interface Route {
  prefix: string
  url: string
}

export function useTargetUrl({ authToDev = false }: Props = {}) {
  const pathname = usePathname()

  const routes: Route[] = authToDev
    ? [
        { prefix: '/dev', url: '/dev' },
        { prefix: '/auth', url: '/dev' },
        { prefix: '', url: '' },
      ]
    : [
        { prefix: '/dev', url: '/dev' },
        { prefix: '/auth', url: '/auth' },
        { prefix: '', url: '' },
      ]

  const matchedRoute = routes.find((route) => pathname.startsWith(route.prefix))

  return matchedRoute ? matchedRoute.url : ''
}
