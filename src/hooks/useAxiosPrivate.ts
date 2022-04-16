import { AxiosError, AxiosResponse } from 'axios';
import { useEffect } from 'react';
import { axiosPrivate } from 'src/api/axios';

type Options = {
  onLogout?: (error: AxiosError) => void;
};

export default function useAxiosPrivate(options: Options = {}) {
  const { onLogout } = options;

  useEffect(() => {
    const onResponse = (res: AxiosResponse): AxiosResponse => res;
    const onResponseError = (err: AxiosError): Promise<AxiosError> => {
      if (err.response?.status === 401) {
        delete axiosPrivate.defaults.headers.common.Authorization;

        if (onLogout) {
          onLogout(err);
        }
      }

      return Promise.reject(err);
    };

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      onResponse,
      onResponseError
    );

    return () => {
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  const setAuthorizationHeader = (authToken: string) => {
    axiosPrivate.defaults.headers.common.Authorization = `Bearer ${authToken}`;
  };

  return { axiosPrivate, setAuthorizationHeader };
}
