import { findSpecialUser, calculateTotalPoint, sortNumbers } from './mission.js';

describe('Chapter 12: 배열 누적과 정제 심화 검증', () => {
  test('Task 1: 18세 이상인 첫 번째 유저를 반환해야 합니다.', () => {
    const users = [
      { name: 'Alice', age: 15 },
      { name: 'Bob', age: 20 },
      { name: 'Charlie', age: 25 },
    ];
    expect(findSpecialUser(users)).toEqual({ name: 'Bob', age: 20 });
  });

  test('Task 1: 조건에 맞는 유저가 없거나 잘못된 입력 시 undefined를 반환해야 합니다.', () => {
    const users = [
      { name: 'Alice', age: 15 },
      { name: 'Dave', age: 17 },
    ];
    expect(findSpecialUser(users)).toBeUndefined();
    expect(findSpecialUser(null)).toBeUndefined();
    expect(findSpecialUser([])).toBeUndefined();
  });

  test('Task 2: 모든 주문의 포인트를 합산하여 반환해야 합니다.', () => {
    const orders = [
      { id: 1, point: 100 },
      { id: 2, point: 250 },
      { id: 3, point: 50 },
    ];
    expect(calculateTotalPoint(orders)).toBe(400);
  });

  test('Task 2: point 속성이 없거나 예외적인 입력 처리', () => {
    const orders = [{ id: 1, point: 100 }, { id: 2 }, { id: 3, point: 50 }, { id: 4, point: '20' }];
    expect(calculateTotalPoint(orders)).toBe(150);
    expect(calculateTotalPoint([])).toBe(0);
    expect(calculateTotalPoint(null)).toBe(0);
  });

  test('Task 3: 명시적 비교 함수를 사용해 오름차순으로 정렬해야 합니다.', () => {
    const numbers = [1, 10, 2, 21, 3];
    const sorted = sortNumbers(numbers);
    expect(sorted).toEqual([1, 2, 3, 10, 21]);
    expect(numbers).toEqual([1, 10, 2, 21, 3]); // 원본 유지 확인
  });

  test('Task 3: 빈 배열이나 배열이 아닌 입력은 빈 배열을 반환해야 합니다.', () => {
    expect(sortNumbers([])).toEqual([]);
    expect(sortNumbers(null)).toEqual([]);
  });
});
