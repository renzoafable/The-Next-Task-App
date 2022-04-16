/* eslint-disable import/prefer-default-export */
import { useCallback, useState } from 'react';

import axios from 'src/api/axios';
import { useAuthDispatch } from 'src/context/AuthContext';

export function useRegisterUser() {
  const { setUser } = useAuthDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<AuthResponse | null>(null);
  const [error, setError] = useState<unknown>(null);

  const execute = useCallback(
    async (userPayload: AuthUserPayload): Promise<void> => {
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
      } catch (err: unknown) {
        setError(err);
      }
    },
    []
  );

  return { execute, data, isLoading, error };
}

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<AuthResponse | null>(null);
  const [error, setError] = useState<unknown>(null);

  const execute = useCallback(
    async (loginPayload: AuthLoginPayload): Promise<void> => {
      try {
        setIsLoading(true);

        const response = await axios.post<AuthResponse>(
          '/user/login',
          loginPayload
        );

        setData(response.data);
        setIsLoading(false);
      } catch (err: unknown) {
        setError(err);
      }
    },
    []
  );

  return { data, error, execute, isLoading };
}
