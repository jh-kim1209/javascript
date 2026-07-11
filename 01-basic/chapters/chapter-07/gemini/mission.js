/**
 * Chapter 07: 함수의 기본과 매개변수
 */

/**
 * Task 1: greetUser
 * 사용자 이름과 직급을 사용하여 환영 인사를 반환합니다.
 * @param {string} [name='손님'] - 사용자 이름
 * @param {string} [title='회원'] - 직급/직책
 * @returns {string} 환영 메시지
 */
export function greetUser(name = '손님', title = '회원') {
  // TODO: name과 title 매개변수 기본값을 설정하고 환영 문자열을 반환하세요.
  return '';
}

/**
 * Task 2: sumAll
 * 나머지 매개변수를 활용해 입력된 모든 숫자의 합을 구합니다.
 * @param {...number} nums - 숫자 목록
 * @returns {number} 합계
 */
export function sumAll(...nums) {
  // TODO: rest parameter를 사용해 가변 인자들의 전체 합을 구하세요.
  return 0;
}
