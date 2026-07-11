/**
 * Chapter 10: useEffect 생명주기와 부수 효과 제어
 */

let prevDeps: any[] | null = null;
let cleanupFn: (() => void) | null = null;
let effectCount = 0;
let cleanupCount = 0;

/**
 * Task 1: 시뮬레이터 리셋 함수
 * 이전 의존성 배열 정보, 등록된 클린업, 그리고 실행 통계 횟수를 모두 초기화합니다.
 */
export function resetSimulator(): void {
  // TODO: 모든 모듈 레벨 변수 및 카운터를 초기값 상태로 되돌립니다.
}

/**
 * Task 1: 시뮬레이터 통계 반환 함수
 * 이펙트와 클린업의 누적 호출 횟수를 가진 통계 객체를 반환합니다.
 * @returns {{ effectCount: number; cleanupCount: number }} 실행 통계 객체
 */
export function getSimulatorStats(): { effectCount: number; cleanupCount: number } {
  // TODO: 누적 실행 횟수를 담은 객체를 반환하세요.
  return {
    effectCount: 0,
    cleanupCount: 0
  };
}

/**
 * Task 1: 컴포넌트 언마운트 트리거 함수
 * 컴포넌트가 화면에서 제거되는 언마운트 과정을 모사하여, 등록된 클린업 함수가 있을 경우 선행 호출한 뒤 시뮬레이터 상태를 정리합니다.
 */
export function triggerUnmount(): void {
  // TODO: 보관 중인 cleanupFn이 있다면 실행하고 카운트를 증가시킨 뒤 상태를 리셋하세요.
}

/**
 * Task 1: useEffect 생명주기 및 부수 효과 시뮬레이터
 * 의존성 배열의 얕은 비교 결과에 따라 이펙트 함수와 클린업 함수를 조건부로 안전하게 제어합니다.
 * @param {any[]} depArray - 의존성 배열
 * @param {() => (() => void) | void} effectFn - 실행할 이펙트 함수 (클린업 함수를 반환할 수 있음)
 */
export function simulateEffect(depArray: any[], effectFn: () => (() => void) | void): void {
  // TODO: 의존성 배열의 이전 상태와 얕은 비교(Object.is)를 거쳐 조건이 충족될 시 기존 클린업 수행 및 신규 이펙트 실행을 제어하세요.
}
