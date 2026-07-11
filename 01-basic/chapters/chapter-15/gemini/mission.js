/**
 * Chapter 15: 클로저와 상태 은닉 모듈
 */

/**
 * Task 1: 클로저 기반 상태 저장소 (createStore)
 * 렉시컬 스코프와 클로저의 상태 은닉 특성을 활용해 Redux 스타일의 간단한 상태 저장소 모듈을 생성합니다.
 * @param {Function} reducer - 상태 변경 함수 (state, action) => newState
 * @param {*} initialState - 초기 상태 값
 * @returns {Object} { getState, dispatch, subscribe } 인터페이스를 가진 객체
 */
export function createStore(reducer, initialState) {
  // TODO: 클로저를 활용해 은닉된 state와 listeners 리스트를 정의하고 저장소 인터페이스를 반환하세요.
  return {
    getState: () => {},
    dispatch: () => {},
    subscribe: () => () => {},
  };
}
