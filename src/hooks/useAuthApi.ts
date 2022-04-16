/* eslint-disable import/prefer-default-export */
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

import axios from 'src/api/axios';
import { useAuthDispatch } from 'src/context/AuthContext';

type AuthHookOptions = {
  redirectTo?: string;
};

export function useRegisterUser({ redirectTo }: AuthHookOptions = {}) {
  const { setUser } = useAuthDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<AuthResponse | null>(null);
  const [error, setError] = useState<unknown>(null);
  const router = useRouter();

  const execute = async (userPayload: AuthUserPayload): Promise<void> => {
    try {
      setIsLoading(true);

      const response = await axios.post<AuthResponse>(
        '/user/register',
        userPayload
      );

      setData(response.data);
      setUser(response.data.user);
      localStorage?.setItem('todoAuthToken', response.data.token);
      setIsLoading(false);

      if (redirectTo) {
        router.push(redirectTo);
      }
    } catch (err: unknown) {
      setError(err);
    }
  };

  return { data, error, execute: useCallback(execute, []), isLoading };
}

export function useLogin({ redirectTo }: AuthHookOptions = {}) {
  const { setUser } = useAuthDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<AuthResponse | null>(null);
  const [error, setError] = useState<unknown>(null);
  const router = useRouter();

  const execute = async (loginPayload: AuthLoginPayload): Promise<void> => {
    try {
      setIsLoading(true);

      const response = await axios.post<AuthResponse>(
        '/user/login',
        loginPayload
      );

      setData(response.data);
      setUser(response.data.user);
      localStorage?.setItem('todoAuthToken', response.data.token);
      setIsLoading(false);

      if (redirectTo) {
        router.push(redirectTo);
      }
    } catch (err: unknown) {
      setError(err);
    }
  };

  return { data, error, execute: useCallback(execute, []), isLoading };
}
