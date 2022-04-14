import React from 'react';
import Link from 'next/link';
import Nav from 'react-bootstrap/Nav';

import useActiveNavLink from 'src/hooks/useActiveNavLink';

interface INavLink {
  children: React.ReactNode;
  href: string;
}

export default function NavLink({ children, href }: INavLink) {
  const { isActive } = useActiveNavLink(href);

  return (
    <Link href={href} passHref>
      <Nav.Link className="text-light mx-1" active={isActive}>
        {children}
      </Nav.Link>
    </Link>
  );
}
