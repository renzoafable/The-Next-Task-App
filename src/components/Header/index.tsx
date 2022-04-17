import Nav from 'react-bootstrap/Nav';
import { Button } from 'react-bootstrap';

import { useAuthState } from 'src/context/AuthContext';
import { useLogout } from 'src/hooks/useAuthApi';
import NavLink from './NavLink';
import DateStats from './DateStats';

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
  const { user } = useAuthState();
  const { execute } = useLogout();

  const onClickLogout = () => {
    execute();
  };

  const greeting = user ? (
    <p className="text-white fs-6 mb-0">
      Hi, <span className="text-primary fw-bolder">{user.name}</span>! Finish
      your tasks today!
    </p>
  ) : null;

  return (
    <div>
      <div className="d-flex mb-4 align-items-center">
        {greeting}
        <div className="flex-grow-1" />
        <Button
          variant="link"
          onClick={onClickLogout}
          className="fs-6 text-white text-decoration-none"
        >
          Logout
        </Button>
      </div>
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
