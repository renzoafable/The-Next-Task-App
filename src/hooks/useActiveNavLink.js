import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function useActiveNavLink(href) {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (router.pathname === href) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [router.pathname, href]);

  return { isActive };
}
