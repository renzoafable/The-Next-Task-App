import { createContext, useContext } from 'react';

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
