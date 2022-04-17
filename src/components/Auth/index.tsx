import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAuthState } from 'src/context/AuthContext';
import { useSilentLogin } from 'src/hooks/useAuthApi';
import SkeletonLoader from '../SkeletonLoader';

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
    return <SkeletonLoader levels={3} />;
  }

  return children;
}
