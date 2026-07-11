/**
 * Chapter 13: Zustand 라이브러리를 이용한 Flux 아키텍처 전역 상태 관리
 */

export interface MiniZustandStore<T> {
  getState: () => T;
  setState: (nextStateOrUpdater: Partial<T> | ((state: T) => Partial<T>)) => void;
  subscribe: (listener: () => void) => () => void;
  useStore: <U>(selector: (state: T) => U, onRender: () => void) => U;
  clearSubscriptions: () => void;
}

/**
 * Task 1: Mini Zustand Store Creator
 * Simulates a closure-based Zustand store with getState, setState, subscribe, and selector-based hooks.
 * @param {T} initialState - The initial state object
 * @returns {MiniZustandStore<T>} The mini Zustand store instance
 */
export function createMiniZustandStore<T extends object>(initialState: T): MiniZustandStore<T> {
  // TODO: 클로저 상태 값과 리스너/구독자 Set 데이터를 선언하세요.

  return {
    getState(): T {
      // TODO: 현재 상태 전체를 반환하세요.
      return initialState;
    },
    setState(nextStateOrUpdater: Partial<T> | ((state: T) => Partial<T>)): void {
      // TODO: 새로운 상태를 부분 병합하고, 변경 사항이 있을 시 리스너를 호출하세요.
    },
    subscribe(listener: () => void): () => void {
      // TODO: 리스너를 등록하고 구독을 해제할 수 있는 함수를 반환하세요.
      return () => {};
    },
    useStore<U>(selector: (state: T) => U, onRender: () => void): U {
      // TODO: 셀렉터를 평가하여 값을 반환하고, 셀렉터 구독 정보에 등록하세요.
      return selector(initialState);
    },
    clearSubscriptions(): void {
      // TODO: 모든 구독 및 리스너 정보를 비우세요.
    },
  };
}
