import { add, subtract } from './mission.js';

describe('Chapter 20: ES Modules 모듈화 검증', () => {
  test('Task 1: add 함수가 올바르게 export 되고 덧셈 연산을 수행하는가', () => {
    expect(add(5, 3)).toBe(8);
    expect(add(-1, 1)).toBe(0);
  });

  test('Task 2: subtract 함수가 올바르게 export 되고 뺄셈 연산을 수행하는가', () => {
    expect(subtract(5, 3)).toBe(2);
    expect(subtract(1, 5)).toBe(-4);
  });
});
