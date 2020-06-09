import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { createForme, initStore } from '@statirjs/core';
import { Provider, useSelector, useDispath } from '../src';

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

type Dispatch = typeof store.dispatch;

function App() {
  const count = useSelector((rootState: RootState) => rootState.counter.count);

  const increment = useDispath(
    (dispatch: Dispatch) => dispatch.counter.increment
  );

  return <button onClick={increment}>{count}</button>;
}

describe('Test useDispatch', () => {
  test('snapshot', () => {
    const component = renderer.create(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('store value', () => {
    const component = renderer.create(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const tree = component.toJSON();

    expect(tree?.children?.[0]).toEqual('0');
  });

  test('rerender by dispatch', () => {
    const store = initStore({
      formes: {
        counter
      }
    });

    const component = renderer.create(
      <Provider store={store}>
        <App />
      </Provider>
    );

    let tree = component.toJSON();

    expect(tree?.children?.[0]).toEqual('0');

    act(() => {
      tree?.props?.onClick?.();
      tree?.props?.onClick?.();
      component.update(
        <Provider store={store}>
          <App />
        </Provider>
      );
    });

    tree = component.toJSON();

    expect(tree?.children?.[0]).toEqual('2');
  });

  test('listner calls', () => {
    const listner = jest.fn(() => {});

    const store = initStore({
      formes: {
        counter
      }
    });

    store.subscribe(listner);

    const component = renderer.create(
      <Provider store={store}>
        <App />
      </Provider>
    );

    let tree = component.toJSON();

    expect(tree?.children?.[0]).toEqual('0');

    act(() => {
      tree?.props?.onClick?.();
    });

    const mock = listner.mock.calls as any;

    expect(mock[0][0].counter.count).toEqual(1);

    act(() => {
      tree?.props?.onClick?.();
    });

    expect(mock[1][0].counter.count).toEqual(2);

    expect(mock.length).toEqual(2);
  });

  test('effected rerender', () => {
    const selectorRerender = jest.fn(() => {});

    const dispatchRerender = jest.fn(() => {});

    const store = initStore({
      formes: {
        counter
      }
    });

    function Display() {
      const count = useSelector(
        (rootState: RootState) => rootState.counter.count
      );

      selectorRerender();

      return <h1>{count}</h1>;
    }

    function Button() {
      const increment = useDispath(
        (dispatch: Dispatch) => dispatch.counter.increment
      );

      dispatchRerender();

      return <button onClick={increment}>Press</button>;
    }

    const component = renderer.create(
      <Provider store={store}>
        <Display />

        <Button />
      </Provider>
    );

    act(() => {
      component.update(
        <Provider store={store}>
          <Display />

          <Button />
        </Provider>
      );
    });

    expect(selectorRerender.mock.calls.length).toEqual(2);

    expect(dispatchRerender.mock.calls.length).toEqual(2);
  });
});
