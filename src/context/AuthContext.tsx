import React, { Reducer, useCallback, useMemo, useReducer } from 'react';
import createCtx from 'src/helpers/context';

enum ACTION_TYPES {
  SET_USER = 'SET_USER',
  UNSET_USER = 'UNSET_USER',
}

type SetUserAction = { type: ACTION_TYPES.SET_USER; payload: AuthUser };
type UnsetUserAction = { type: ACTION_TYPES.UNSET_USER };

type ACTIONS = SetUserAction | UnsetUserAction;

type AuthState = {
  user: AuthUser | null;
};

type AppDispatch = {
  setUser: (user: AuthUser) => void;
  unsetUser: () => void;
};

const [useAuthState, AuthStateProvider] = createCtx<AuthState>();
const [useAuthDispatch, AuthDispatchProvider] = createCtx<AppDispatch>();

const initialState: AuthState = {
  user: null,
};

const reducer: Reducer<AuthState, ACTIONS> = (state, action): AuthState => {
  switch (action.type) {
    case ACTION_TYPES.SET_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }

    case ACTION_TYPES.UNSET_USER: {
      return {
        ...state,
        user: null,
      };
    }

    default:
      return state;
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setUser = useCallback(
    (user: AuthUser) =>
      dispatch({ type: ACTION_TYPES.SET_USER, payload: user }),
    []
  );

  const unsetUser = useCallback(
    () => dispatch({ type: ACTION_TYPES.UNSET_USER }),
    []
  );

  const actions = useMemo(() => ({ setUser, unsetUser }), []);

  return (
    <AuthStateProvider value={state}>
      <AuthDispatchProvider value={actions}>{children}</AuthDispatchProvider>
    </AuthStateProvider>
  );
}

export { useAuthDispatch, useAuthState };
