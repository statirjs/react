import React from 'react';
import renderer from 'react-test-renderer';
import { createForme, initStore } from '@statirjs/core';
import { Provider } from '../src';

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
  forms: {
    counter
  }
});

describe('Test Provider', () => {
  test('snapshot', () => {
    const component = renderer.create(<Provider store={store} />);

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
