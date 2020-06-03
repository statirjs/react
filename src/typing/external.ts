import { Context as ReactContext } from 'react';
import * as S from './internal';

export declare function useSelector<T>(selector: S.StateSelector<T>): T;

export declare function useDispath<T>(selector: S.DispatchSelector<T>): T;

export declare function Provider(props: S.ProviderProps): JSX.Element;

export declare const Context: ReactContext<S.ContextValue>;
