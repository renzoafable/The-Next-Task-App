import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

import axios from 'src/api/axios';
import { useAuthDispatch } from 'src/context/AuthContext';
import useAxiosPrivate from './useAxiosPrivate';
import useSession from './useSession';

type AuthHookOptions = {
  redirectTo?: string;
};

type AuthUserPayload = {
  name: string;
  age: number;
  email: string;
  password: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

type AuthenticatedResponse = {
  user: AuthUser;
  token: string;
};

export function useRegisterUser({ redirectTo }: AuthHookOptions = {}) {
  const { setUser } = useAuthDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<AuthenticatedResponse | null>(null);
  const [error, setError] = useState<unknown>(null);
  const router = useRouter();
  const session = useSession();

  const execute = async (userPayload: AuthUserPayload): Promise<void> => {
    try {
      setIsLoading(true);

      const response = await axios.post<AuthenticatedResponse>(
        '/user/register',
        userPayload
      );

      setData(response.data);
      setUser(response.data.user);
      session.setAuthToken(response.data.token);

      if (redirectTo) {
        await router.push(redirectTo);
      }

      setIsLoading(false);
    } catch (err: unknown) {
      setError(err);
    }
  };

  return { data, error, execute: useCallback(execute, []), isLoading };
}

export function useLogin({ redirectTo }: AuthHookOptions = {}) {
  const { setUser } = useAuthDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<AuthenticatedResponse | null>(null);
  const [error, setError] = useState<unknown>(null);
  const router = useRouter();
  const session = useSession();

  const execute = async (loginPayload: LoginPayload): Promise<void> => {
    try {
      setIsLoading(true);

      const response = await axios.post<AuthenticatedResponse>(
        '/user/login',
        loginPayload
      );

      setData(response.data);
      setUser(response.data.user);
      session.setAuthToken(response.data.token);

      if (redirectTo) {
        await router.push(redirectTo);
      }

      setIsLoading(false);
    } catch (err: unknown) {
      setError(err);
      setIsLoading(false);
    }
  };

  return { data, error, execute: useCallback(execute, []), isLoading };
}

export function useSilentLogin() {
  const { setUser } = useAuthDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const session = useSession();
  const { axiosPrivate, setAuthorizationHeader } = useAxiosPrivate({
    onLogout: () => {
      session.setAuthToken();
    },
  });

  const silentLogin = async () => {
    const authToken = session.getAuthToken();

    if (authToken) {
      setAuthorizationHeader(authToken);

      const response = await axiosPrivate.get<AuthUser>('/user/me');

      setUser(response.data);
    }

    setIsLoading(false);
  };

  return { isLoading, silentLogin };
}

export function useLogout() {
  const { unsetUser } = useAuthDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const session = useSession();
  const { axiosPrivate } = useAxiosPrivate();

  const execute = async () => {
    setIsLoading(true);

    try {
      // Purposely remove user and token before sending the logout request to the API since we don't really care about the result at this point
      unsetUser();
      session.setAuthToken();

      await axiosPrivate.post('/user/logout');

      setIsLoading(false);
    } catch (err: unknown) {
      setError(err);
      setIsLoading(false);
    }
  };

  return { error, execute: useCallback(execute, []), isLoading };
}
