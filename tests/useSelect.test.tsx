import React from 'react';
import renderer from 'react-test-renderer';
import { createForme, initStore } from '@statirjs/core';
import { Provider, useSelect } from '../src';

const counter = createForme(
  {
    count: 0
  },
  () => ({
    actions: {
      increment(state) {
        return {
          ...state,
          count: state.count + 1
        };
      }
    }
  })
);

const store = initStore({
  formes: {
    counter
  }
});

type RootState = typeof store.state;

function App() {
  const count = useSelect((rootState: RootState) => rootState.counter.count);

  return <span>{count}</span>;
}

describe('Test useSelect', () => {
  test('snapshot', () => {
    const component = renderer.create(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('value', () => {
    const component = renderer.create(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const tree = component.toJSON();

    expect(tree?.children?.[0]).toEqual('0');
  });
});
