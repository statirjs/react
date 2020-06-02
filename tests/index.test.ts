import { main } from '../src';

describe('main test', () => {
  test('hello test', () => {
    expect(main()).toEqual('Hello @statirjs/react!');
  });
});
