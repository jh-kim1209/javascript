/**
 * Chapter 04: React 성능 최적화: `useMemo`, `useCallback`, `React.memo` 튜닝
 */

/**
 * Task 1: 전달된 함수의 계산 결과를 메모리에 캐싱하는 고차 함수를 반환합니다.
 * @param {Function} computeFn - 메모이제이션을 적용할 원본 연산 함수
 * @returns {Function} 메모이제이션 기능이 결합된 고차 함수
 */
export function memoize<T>(computeFn: (...args: any[]) => T): (...args: any[]) => T {
  // TODO: 인자값 변경 여부를 메모리에 렉시컬 보존하여 동일 인자 입력 시 연산 없이 이전 결과 캐시값을 조기 리턴하는 고차 함수를 구현하십시오.
  return computeFn;
}
