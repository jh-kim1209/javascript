/**
 * Chapter 03: 커스텀 상태 엔진 직접 구현
 */

export interface Store<T> {
  getState(): T;
  setState(nextState: Partial<T> | ((state: T) => Partial<T>)): void;
  subscribe(listener: () => void): () => void;
}

/**
 * Task 1: getState, setState, subscribe 메커니즘을 가진 경량 상태 스토어 스키마를 생성합니다.
 * @param {T} initialState - 초기 상태 값
 * @returns {Store<T>} 스토어 인터페이스 객체
 */
export function createCustomStore<T>(initialState: T): Store<T> {
  // TODO: 클로저 공간에 상태를 보존하고, setState 시 Object.is 비교를 거쳐 리스너들에게 갱신 통지를 발행하는 스토어 엔진을 구현하십시오.
  return {
    getState: () => initialState,
    setState: () => {},
    subscribe: () => () => {}
  };
}
