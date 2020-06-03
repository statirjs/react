import React, { useMemo, useState, useCallback, memo } from 'react';
import { Context } from '../context';
import * as S from '../typing/internal';

const INIT_RELOADER = {};

function ProviderComponent(props: S.ProviderProps) {
  const { store, children = null } = props;

  const [reloader, setReload] = useState(INIT_RELOADER);

  const reload = useCallback(() => setReload({ ...reloader }), [
    reloader,
    setReload
  ]);

  const value = useMemo(
    () => ({
      store,
      reload
    }),
    [store, reload, reloader]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export const Provider = memo(ProviderComponent);
