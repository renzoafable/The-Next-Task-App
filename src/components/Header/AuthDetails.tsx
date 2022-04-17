import { Button } from 'react-bootstrap';

import { useAuthState } from 'src/context/AuthContext';
import { useLogout } from 'src/hooks/useAuthApi';

export default function AuthDetails() {
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
  );
}
