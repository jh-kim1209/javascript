import { processQueue, safeSplice } from './mission.js';

describe('Chapter 10: 배열 기본 조작과 스프레드 검증', () => {
  test("Task 1: processQueue는 맨 앞을 제거하고 맨 뒤에 'final'을 추가해야 합니다.", () => {
    const queue = ['first', 'second', 'third'];
    const result = processQueue(queue);

    expect(result).toEqual(['second', 'third', 'final']);
    expect(queue).toBe(result); // 원본 변형 검증 (in-place)
  });

  test('Task 1: processQueue 예외적인 입력 처리', () => {
    expect(processQueue([])).toEqual(['final']);
    expect(processQueue(null)).toEqual(['final']);
  });

  test('Task 2: safeSplice는 원본을 변경하지 않고 지정된 영역이 삭제된 새 배열을 반환해야 합니다.', () => {
    const original = ['a', 'b', 'c', 'd', 'e'];
    const result = safeSplice(original, 1, 2);

    expect(result).toEqual(['a', 'd', 'e']);
    expect(original).toEqual(['a', 'b', 'c', 'd', 'e']); // 원본 유지 검증
    expect(original).not.toBe(result); // 참조 분리 검증
  });

  test('Task 2: safeSplice 예외적인 입력 처리', () => {
    expect(safeSplice(null, 1, 2)).toEqual([]);
    expect(safeSplice('not array', 1, 2)).toEqual([]);
  });
});
