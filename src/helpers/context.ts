import { createContext, useContext } from 'react';

/**
 * A utility function that creates a context without Typescript shouting that we haven't provided
 * a default context value.
 *
 * See https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context for details.
 */
export default function createCtx<A>() {
  const ctx = createContext<A | undefined>(undefined);
  function useCtx() {
    const c = useContext(ctx);
    if (!c) {
      throw new Error('useCtx must be used within a Provider with value');
    }
    return c;
  }
  return [useCtx, ctx.Provider] as const;
}
