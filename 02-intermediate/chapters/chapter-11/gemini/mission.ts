/**
 * Chapter 11: React 커스텀 훅(Custom Hooks) 설계 및 로직 재사용
 */

export interface CustomHookSimulator {
  render: (renderFn: () => void) => void;
  useState: <T>(initialState?: T) => [T, (update: T | ((prev: T) => T)) => void];
  getHookStates: () => any[];
}

/**
 * Task 1: Custom Hook Simulator Creator
 * Creates a simulator that tracks hook states and detects Rules of Hooks violations.
 * @param {any} initialValue - Default initial state value if none is passed to useState
 * @returns {CustomHookSimulator} Simulator instance
 */
export function createCustomHookSimulator(initialValue?: any): CustomHookSimulator {
  // TODO: 시뮬레이션용 상태 데이터(상태 배열, 인덱스 카운터 등)를 선언하세요.

  return {
    render(renderFn: () => void): void {
      // TODO: 훅 인덱스 초기화 및 렌더 함수 실행 후 호출 개수 불일치 시 에러 처리를 구현하세요.
    },
    useState<T>(initialState?: T): [T, (update: T | ((prev: T) => T)) => void] {
      // TODO: 인덱스에 따라 상태를 저장하고 반환하며, Setter를 구현하세요.
      return [initialState as T, () => {}];
    },
    getHookStates(): any[] {
      // TODO: 현재까지의 상태 데이터 복사본을 반환하세요.
      return [];
    }
  };
}
