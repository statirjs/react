import { ReactNode } from 'react';
import { Store, RootState, Dispatch } from '@statirjs/core';

export type Payload = any;

export type Action = (...rest: Payload[]) => void;

export interface ProviderProps {
  store: Store;
  children?: ReactNode;
}

export interface ContextValue {
  store: Store;
  reload(): void;
}

export type StateSelector<T> = (state: RootState) => T;

export type DispatchSelector<T> = (dispatch: Dispatch) => T;
