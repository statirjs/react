import { createContext } from 'react';
import { Listener } from '@statirjs/core';
import * as S from '../typing/internal';

const context: S.ContextValue = {
  store: {
    state: {},
    dispatch: {},
    listeners: [],
    counter: 0,
    subscribe(listener: Listener) {
      this.listeners.push(listener);
    }
  }
};

export const Context = createContext(context);
