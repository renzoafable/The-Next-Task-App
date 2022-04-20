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

export default function Header() {
  return (
    <div className="pt-1">
      <AuthDetails />
      <hr className="divider my-2 my-md-3" />
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
        <DateStats className="mt-1" />
        <Nav variant="pills" className="mt-3 mb-2">
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
