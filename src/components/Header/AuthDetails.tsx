import { Button, Container, Nav, Navbar } from 'react-bootstrap';

import { useAuthState } from 'src/context/AuthContext';
import { useLogout } from 'src/hooks/useAuthApi';

export default function AuthDetails() {
  const { user } = useAuthState();
  const { execute } = useLogout();

  const onClickLogout = () => {
    execute();
  };

  const greeting = user ? (
    <Navbar.Brand className="text-white mb-0">
      Welcome, <span className="text-info fw-bolder">{user.name}</span>!
    </Navbar.Brand>
  ) : null;

  return (
    <Navbar collapseOnSelect expand="md" variant="dark">
      <Container fluid>
        {greeting}
        <Navbar.Toggle aria-controls="navbar-nav" className="ms-auto" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto mt-2">
            <Nav.Link
              as={Button}
              variant="link"
              onClick={onClickLogout}
              className="text-decoration-none text-light"
            >
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
