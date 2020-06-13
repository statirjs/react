import { useMemo, useContext } from 'react';
import { Context } from '../context';
import * as S from '../typing/internal';

export function useSelect<T>(selector: S.StateSelector<T>): T {
  const { store } = useContext(Context);
  const memoSelector = useMemo(() => selector, []);
  return memoSelector(store.state);
}

export function useDispatch<T extends S.Action>(
  selector: S.DispatchSelector<T>
): T {
  const { store } = useContext(Context);
  const memoSelector = useMemo(() => selector, []);
  return memoSelector(store.dispatch);
}
