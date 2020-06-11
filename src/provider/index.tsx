import React, { useState, useEffect, useMemo } from 'react';
import { INITER_FORME, INITER_ACTION } from '@statirjs/core';
import { Context } from '../context';
import * as S from '../typing/internal';

const RELOADER = {};

export function Provider(props: S.ProviderProps) {
  const { store, children = null } = props;

  const [reloader, setReloader] = useState(RELOADER);

  const value = useMemo(() => ({ store }), [reloader]);

  useEffect(() => {
    store.subscribe(() => {
      setReloader({ ...RELOADER });
    });

    store.dispatch[INITER_FORME][INITER_ACTION]();
  }, []);

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
