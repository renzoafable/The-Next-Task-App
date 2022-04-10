import Link from "next/link"
import { useRouter } from "next/router"
import clsx from 'classnames'

export default function NavLink({ children, href }) {
  const router = useRouter()
  const isHrefSelected = router.asPath === href
  const linkStyles = [
    'nav-link',
    'text-light',
    'mx-1',
    { active: isHrefSelected }
  ]

  return (
    <Link href={href}>
      <a className={clsx(...linkStyles)}>
        {children}
      </a>
    </Link>
  )
}