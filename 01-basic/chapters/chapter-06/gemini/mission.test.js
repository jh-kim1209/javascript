import { sumNumbers, findFirstEven } from './mission.js';

describe('Chapter 06: 반복문 제어 검증', () => {
  test('Task 1: 1부터 n까지의 자연수 합을 올바르게 구해야 합니다.', () => {
    expect(sumNumbers(10)).toBe(55);
    expect(sumNumbers(1)).toBe(1);
    expect(sumNumbers(100)).toBe(5050);
    expect(sumNumbers(0)).toBe(0);
    expect(sumNumbers(-5)).toBe(0);
    expect(sumNumbers('10')).toBe(0);
    expect(sumNumbers(2.5)).toBe(0);
  });

  test('Task 2: 첫 번째 짝수를 찾고 루프를 조기 종료해야 합니다.', () => {
    expect(findFirstEven([1, 3, 5, 8, 9, 10])).toBe(8);
    expect(findFirstEven([2, 4, 6])).toBe(2);
    expect(findFirstEven([1, 3, 5, 7])).toBeUndefined();
    expect(findFirstEven([])).toBeUndefined();
    expect(findFirstEven('not array')).toBeUndefined();
  });
});
