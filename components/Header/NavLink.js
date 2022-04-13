import { useEffect, useState, memo } from 'react'
import { useRouter } from "next/router"
import Link from "next/link"
import Nav from 'react-bootstrap/Nav'

import useActiveNavLink from 'hooks/useActiveNavLink'

export default memo(function NavLink({ children, href }) {
  const { isActive } = useActiveNavLink(href)

  return (
    <Link href={href} passHref>
      <Nav.Link className="text-light mx-1" active={isActive}>
        {children}
      </Nav.Link>
    </Link>
  )
})