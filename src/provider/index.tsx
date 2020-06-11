import React, { useMemo } from 'react';
import { Context } from '../context';
import * as S from '../typing/internal';

export function Provider(props: S.ProviderProps) {
  const { store, children = null } = props;

  const value = useMemo(() => ({ store }), [store.counter]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
