import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Placeholder } from 'react-bootstrap';

import { useAuthState } from 'src/context/AuthContext';
import { useSilentLogin } from 'src/hooks/useAuthApi';

type AuthProps = {
  children: JSX.Element;
};

export default function Auth({ children }: AuthProps) {
  const { user } = useAuthState();
  const { isLoading, silentLogin } = useSilentLogin();
  const router = useRouter();

  useEffect(() => {
    silentLogin();
  }, []);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login', undefined);
    }
  }, [isLoading, user]);

  if (isLoading || !user) {
    return (
      <>
        <Placeholder as="p" animation="glow">
          <Placeholder xs={12} bg="light" />
        </Placeholder>
        <Placeholder as="p" animation="glow">
          <Placeholder xs={12} bg="light" />
        </Placeholder>
      </>
    );
  }

  return children;
}
