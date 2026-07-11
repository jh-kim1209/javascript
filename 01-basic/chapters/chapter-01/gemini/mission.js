/**
 * Chapter 01: 변수와 스코프
 */

/**
 * Task 1: 블록 내외 let 변수의 스코프 격리 동작을 테스트합니다.
 * @returns {string[]} 블록 외부와 내부의 값을 순서대로 담은 배열
 */
export function testScope() {
  let value = 'outer';
  {
    let value = 'inner';
    // 여기에 코드를 추가하지 마세요.
  }
  // TODO: 외부의 value와 inner 블록 내부의 value 값을 각각 순서대로 담은 배열 ['outer', 'inner']를 반환하세요.
  return [value, 'inner'];
}

/**
 * Task 2: const 변수의 재할당 시도 시 발생하는 TypeError 예외를 처리합니다.
 * @returns {string} 예외 발생 시 'reassignment_error' 반환, 그렇지 않으면 'success' 반환
 */
export function testConstReassignment() {
  const secureValue = 'secure';
  try {
    // TODO: 아래 주석을 해제하여 const 변수에 값을 재할당하도록 수정하고, 에러가 정상적으로 catch되는지 확인하세요.
    secureValue = 'hacked';
  } catch (error) {
    return 'reassignment_error';
  }
  return 'success';
}
