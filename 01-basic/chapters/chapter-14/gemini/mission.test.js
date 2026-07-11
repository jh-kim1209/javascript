import { testHoistingBehavior } from './mission.js';

describe('Chapter 14: 호이스팅과 실행 컨텍스트 검증', () => {
  test('Task 1: var 변수와 let 변수의 선언 전 접근 동작 및 TDZ 예외를 정상적으로 포착해야 합니다.', () => {
    const result = testHoistingBehavior();

    expect(result.varVal).toBeUndefined();
    expect(result.letError).toBe('ReferenceError');
    expect(result).toEqual({
      varVal: undefined,
      letError: 'ReferenceError',
    });
  });
});
