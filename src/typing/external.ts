import { Context as ReactContext, ReactNode } from 'react';
import * as S from './internal';

export declare function useSelect<T>(selector: S.StateSelector<T>): T;

export declare function useDispatch<T>(selector: S.DispatchSelector<T>): T;

export declare function Provider(props: S.ProviderProps): ReactNode;

export declare const Context: ReactContext<S.ContextValue>;
