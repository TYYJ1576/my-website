import Link from 'next/link'
import NameLogo from '../logo/NameLogo'
import { useTargetUrl } from '@/hooks/url'

function MainLogo() {
  const targetUrl = useTargetUrl() + '/'

  return (
    <Link href={targetUrl}>
      <NameLogo />
    </Link>
  )
}

export default MainLogo
