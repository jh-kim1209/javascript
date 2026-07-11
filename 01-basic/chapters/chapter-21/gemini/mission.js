/**
 * Chapter 21: 비동기 자바스크립트와 Promise
 */

/**
 * Task 1: 비동기 지연 후 데이터를 반환하는 Promise 객체 생성
 * ms 밀리초 시간 뒤에 data 값을 이행(resolve)하는 Promise를 반환합니다.
 * 만약 ms가 음수이거나 올바른 숫자가 아닌 경우 즉시 거부(reject)하는 Promise를 반환합니다.
 * @param {*} data - 이행(resolve) 시 전달할 데이터
 * @param {number} ms - 지연할 시간 (밀리초)
 * @returns {Promise<*>}
 */
export function delayFetch(data, ms) {
  // TODO: setTimeout과 Promise를 사용하여 지정된 시간 뒤에 data를 resolve하는 Promise를 구현하세요.
  return Promise.resolve(null);
}
