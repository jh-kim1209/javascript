import { getOddSquares } from './mission.js';

describe('Chapter 11: 배열 순회와 고차 함수 기초 검증', () => {
  test('Task 1: 홀수만 걸러내어 제곱한 새 배열을 반환해야 합니다.', () => {
    const input = [1, 2, 3, 4, 5];
    const result = getOddSquares(input);

    expect(result).toEqual([1, 9, 25]);
    expect(input).toEqual([1, 2, 3, 4, 5]); // 불변성 검증
  });

  test('Task 1: 음수 및 0이 포함된 경우 처리', () => {
    expect(getOddSquares([-3, -2, -1, 0, 1, 2])).toEqual([9, 1, 1]);
  });

  test('Task 1: 예외적인 입력 처리 (배열이 아닐 때)', () => {
    expect(getOddSquares(null)).toEqual([]);
    expect(getOddSquares('not array')).toEqual([]);
    expect(getOddSquares([])).toEqual([]);
  });
});
