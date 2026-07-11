/**
 * Chapter 04: 기본 연산자와 null 병합 연산자
 */

/**
 * Task 1: 널 병합 연산자를 활용한 기본 이름 대체
 * name이 null 또는 undefined인 경우 기본값인 'Guest'를 반환하고,
 * 빈 문자열("")을 포함한 다른 유효값인 경우 원래 값을 그대로 반환합니다.
 * @param {string|null|undefined} name - 검사할 이름
 * @returns {string} 원래의 이름 또는 'Guest'
 */
export function getFallbackName(name) {
  // TODO: ?? 연산자를 사용하여 nullish한 경우에만 'Guest'를 반환하도록 구현하세요.
  return '';
}

/**
 * Task 2: 널 병합 연산자를 활용한 안전한 나이 조회
 * age가 0인 유효 숫자는 그대로 0으로 반환하고, null 또는 undefined인 경우에만 100을 반환합니다.
 * @param {number|null|undefined} age - 검사할 나이
 * @returns {number} 원래의 나이 또는 100
 */
export function safeGetAge(age) {
  // TODO: ?? 연산자를 사용하여 0은 유효값으로 보존하고 nullish인 경우에만 100을 반환하도록 구현하세요.
  return 0;
}
