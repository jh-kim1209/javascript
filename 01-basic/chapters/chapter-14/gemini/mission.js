/**
 * Chapter 14: 호이스팅과 실행 컨텍스트
 */

/**
 * Task 1: 호이스팅과 TDZ 검증
 * var 변수와 let 변수를 선언 전 접근할 때의 동작 차이를 검증하여 객체로 반환합니다.
 * @returns {Object} varVal과 letError 정보를 담은 객체
 */
export function testHoistingBehavior() {
  // TODO: var 변수와 let 변수를 선언 전에 접근할 때 발생하는 예외 상황을 try-catch로 포착해 객체 { varVal: undefined, letError: 'ReferenceError' }를 반환하도록 구현하십시오.
  return {
    varVal: null,
    letError: null,
  };
}
