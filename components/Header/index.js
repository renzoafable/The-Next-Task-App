import NavLink from './NavLink'
import DateStats from './DateStats'
import clsx from 'classnames'


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
      <nav className="nav nav-pills">
        {pagePaths.map(path => (
          <NavLink key={path.href} href={path.href}>
            {path.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}