import { useEffect, useState } from 'react';

export default function useIsAuthenticated() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage?.getItem('authToken');

    if (typeof token === 'string') {
      setIsAuthenticated(true);
    }
  }, []);

  return isAuthenticated;
}
