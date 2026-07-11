/**
 * Chapter 09: useState를 이용한 반응형 상태 제어와 불변성
 */

export interface Action<T> {
  type: "add" | "remove";
  payload: T;
}

/**
 * Task 1: 상태 업데이트 헬퍼 함수
 * 원본 배열의 불변성을 유지하면서 요소를 추가하거나 제거한 새 배열 참조를 리턴합니다.
 * @template T
 * @param {T[]} currentState - 현재 상태 배열
 * @param {Action<T>} action - 수행할 업데이트 동작 객체 (type: 'add' | 'remove', payload: 요소)
 * @returns {T[]} 새로운 상태 배열
 */
export function updateStateHelper<T>(currentState: T[], action: Action<T>): T[] {
  // TODO: 원본 배열의 불변성을 보존(직접 변경 금지)하며 요소를 추가/삭제하는 상태 갱신 함수를 작성하세요.
  return currentState;
}
