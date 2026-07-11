import { processNumbers } from './mission.js';

describe('Chapter 08: 화살표 함수와 콜백 기초 검증', () => {
  test('Task 1: 배열의 각 요소를 콜백 함수를 통해 올바르게 처리해야 합니다.', () => {
    const double = (x) => x * 2;
    const addOne = (x) => x + 1;

    expect(processNumbers([1, 2, 3], double)).toEqual([2, 4, 6]);
    expect(processNumbers([10, 20, 30], addOne)).toEqual([11, 21, 31]);
    expect(processNumbers([], double)).toEqual([]);
  });

  test('Task 2: 잘못된 매개변수 입력 시 빈 배열을 반환해야 합니다.', () => {
    const double = (x) => x * 2;
    expect(processNumbers('not array', double)).toEqual([]);
    expect(processNumbers([1, 2], 'not function')).toEqual([]);
    expect(processNumbers(null, undefined)).toEqual([]);
  });
});
