import { useMemo, useCallback, useContext } from 'react';
import { Context } from '../context';
import * as S from '../typing/internal';

export function useSelector<T>(selector: S.StateSelector<T>): T {
  const { store } = useContext(Context);

  return useMemo(() => selector(store.state), [store, selector]);
}

export function useDispath<T extends S.Action>(
  selector: S.DispatchSelector<T>
): T {
  const { store, reload } = useContext(Context);

  const action = useMemo(() => selector(store.dispatch), [store, selector]);

  return useCallback(
    (...rest: S.Payload[]) => {
      action(...rest);
      reload();
    },
    [action, reload]
  ) as T;
}
