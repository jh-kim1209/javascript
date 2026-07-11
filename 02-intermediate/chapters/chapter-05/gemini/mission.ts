/**
 * Chapter 05: TypeScript 제네릭 기초
 */

/**
 * Task 1: 제네릭 컨테이너 래핑 함수
 * 입력된 데이터 값을 제네릭 타입 T로 포장하여 타임스탬프와 함께 객체로 반환합니다.
 * @template T
 * @param {T} value - 컨테이너에 담을 데이터 값
 * @returns {{ data: T; timestamp: number }} 제네릭 컨테이너 객체
 */
export function wrapInContainer<T>(value: T): { data: T; timestamp: number } {
  // TODO: 전달된 value 값과 Date.now()를 활용해 { data, timestamp } 구조의 컨테이너를 반환하세요.
  return {
    data: value,
    timestamp: 0
  };
}
