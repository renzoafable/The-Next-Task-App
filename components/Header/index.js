import Nav from 'react-bootstrap/Nav'

import NavLink from './NavLink'
import DateStats from './DateStats'

const pagePaths = [
  {
    href: '/',
    label: 'Incomplete Tasks'
  },
  {
    href: '/complete',
    label: 'Completed Tasks'
  }
]

export default function Navbar() {
  return (
    <div className='d-flex justify-content-between align-items-center'>
      <DateStats />
      <Nav variant='pills'>
        {pagePaths.map(path => (
          <NavLink key={path.href} href={path.href}>
            {path.label}
          </NavLink>
        ))}
      </Nav>
    </div>
  )
}