import Nav from 'react-bootstrap/Nav';

import NavLink from './NavLink';
import DateStats from './DateStats';
import AuthDetails from './AuthDetails';

const pagePaths: { href: string; label: string }[] = [
  {
    href: '/incomplete',
    label: 'Incomplete Tasks',
  },
  {
    href: '/complete',
    label: 'Completed Tasks',
  },
];

export default function Navbar() {
  return (
    <div className="pt-1">
      <AuthDetails />
      <hr className="divider my-1 my-md-2" />
      <div className="d-flex justify-content-between align-items-center">
        <DateStats />
        <Nav variant="pills">
          {pagePaths.map((path) => (
            <NavLink key={path.href} href={path.href}>
              {path.label}
            </NavLink>
          ))}
        </Nav>
      </div>
    </div>
  );
}
