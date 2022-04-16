const AUTH_TOKEN_NAME = 'todoAuthToken';

export default function useSession() {
  const getAuthToken = () => localStorage?.getItem(AUTH_TOKEN_NAME);

  const isAuthenticated = () => !!getAuthToken();

  const setAuthToken = (token?: string) => {
    if (token) {
      localStorage?.setItem(AUTH_TOKEN_NAME, token);
    } else {
      localStorage?.removeItem(AUTH_TOKEN_NAME);
    }
  };

  return { getAuthToken, isAuthenticated, setAuthToken };
}
