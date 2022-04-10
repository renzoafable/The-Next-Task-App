import Link from "next/link"
import { useRouter } from "next/router"
import clsx from 'classnames'

export default function NavLink({ children, href }) {
  const router = useRouter()
  const linkStyles = [
    'nav-link',
    { active: router.asPath === href }
  ]

  return (
    <Link href={href}>
      <a className={clsx(...linkStyles)}>
        {children}
      </a>
    </Link>
  )
}